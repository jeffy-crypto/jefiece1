// api/analyzeImage.js (Improved Version)

import { ImageAnnotatorClient } from '@google-cloud/vision';

function getGoogleCredentials() {
  if (!process.env.GCLOUD_SERVICE_KEY_JSON) {
    throw new Error('The GCLOUD_SERVICE_KEY_JSON environment variable was not found!');
  }
  // Add a try-catch here to catch parsing errors in your .env.local file
  try {
    return JSON.parse(process.env.GCLOUD_SERVICE_KEY_JSON);
  } catch (e) {
    console.error("CRITICAL: Failed to parse GCLOUD_SERVICE_KEY_JSON. Check your .env.local file for syntax errors.", e);
    throw new Error("CRITICAL: Failed to parse GCLOUD_SERVICE_KEY_JSON.");
  }
}

const client = new ImageAnnotatorClient({ credentials: getGoogleCredentials() });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { imageUrl } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: 'imageUrl is required' });
    }

    const [labelResult, propertiesResult] = await Promise.all([
      client.labelDetection(imageUrl),
      client.imageProperties(imageUrl)
    ]);

    // Check if Google returned an error inside a successful response
    if (labelResult[0].error || propertiesResult[0].error) {
        console.error("Google Vision API returned an error inside the response:", labelResult[0].error || propertiesResult[0].error);
        throw new Error("The Vision API could not process the image. Check the image URL.");
    }

    const labels = labelResult[0].labelAnnotations;
    const tags = labels.map(label => label.description);

    const colors = propertiesResult[0].imagePropertiesAnnotation.dominantColors.colors;
    const colorPalette = colors.map(colorInfo => {
      const { red, green, blue } = colorInfo.color;
      const hex = `#${[red, green, blue].map(c => c.toString(16).padStart(2, '0')).join('')}`;
      return hex;
    });

    res.status(200).json({ tags, colorPalette });

  } catch (error) {
    // This log is crucial. Check your terminal for this message.
    console.error("Backend Error in /api/analyzeImage:", error);
    res.status(500).json({ error: 'Failed to analyze the image. Check the server logs for details.' });
  }
}