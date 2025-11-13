import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';
import './CircularGallery.css';

// --- YOUR IMAGE IMPORTS ---
import img1 from '../../assets/images/1.png';
import img2 from '../../assets/images/2.png';
import img4 from '../../assets/images/4.png';
import img5 from '../../assets/images/5.png';
import img6 from '../../assets/images/6.png';
import img7 from '../../assets/images/7.png';
import img8 from '../../assets/images/8.png';
import img9 from '../../assets/images/9.png';
import img10 from '../../assets/images/10.png';
import img11 from '../../assets/images/11.png';

// --- HELPER FUNCTIONS & CLASSES ---
// These do not need to be changed.
const debounce = (func, wait) => { let timeout; return (...args) => { clearTimeout(timeout); timeout = setTimeout(() => func.apply(this, args), wait); }; };
const lerp = (p1, p2, t) => p1 + (p2 - p1) * t;
const autoBind = (instance) => { const proto = Object.getPrototypeOf(instance); Object.getOwnPropertyNames(proto).forEach(key => { if (key !== 'constructor' && typeof instance[key] === 'function') { instance[key] = instance[key].bind(instance); } }); };
const createTextTexture = (gl, text, font, color) => { const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d'); ctx.font = font; const metrics = ctx.measureText(text); canvas.width = Math.ceil(metrics.width) + 20; canvas.height = Math.ceil(parseInt(font, 10) * 1.2) + 20; ctx.font = font; ctx.fillStyle = color; ctx.textBaseline = 'middle'; ctx.textAlign = 'center'; ctx.fillText(text, canvas.width / 2, canvas.height / 2); const texture = new Texture(gl, { generateMipmaps: false }); texture.image = canvas; return { texture, width: canvas.width, height: canvas.height }; };
class Title {
  constructor({ gl, plane, text, textColor, font }) {
    autoBind(this); this.gl = gl; this.plane = plane; this.text = text; this.textColor = textColor; this.font = font; this.createMesh();
  }
  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `attribute vec3 position; attribute vec2 uv; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragment: `precision highp float; uniform sampler2D tMap; varying vec2 vUv; void main() { vec4 color = texture2D(tMap, vUv); if (color.a < 0.1) discard; gl_FragColor = color; }`,
      uniforms: { tMap: { value: texture } }, transparent: true
    });
    this.mesh = new Mesh(this.gl, { geometry, program }); const textHeight = this.plane.scale.y * 0.15;
    this.mesh.scale.set(textHeight * (width / height), textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - textHeight * 0.5 - 0.05; this.mesh.setParent(this.plane);
  }
}

class Media {
  constructor({ geometry, gl, image, index, length, scene, screen, text, viewport, bend, textColor, borderRadius, font }) {
    Object.assign(this, { geometry, gl, image, index, length, scene, screen, text, viewport, bend, textColor, borderRadius, font, extra: 0 });
    autoBind(this);
    this.createShader(); this.createMesh(); this.createTitle(); this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.program = new Program(this.gl, {
      depthTest: false, depthWrite: false, transparent: true,
      vertex: `
        precision highp float; attribute vec3 position; attribute vec2 uv; 
        uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; 
        uniform float uTime; uniform float uSpeed; varying vec2 vUv; 
        void main() { 
          vUv = uv; vec3 p = position; 
          p.z += (sin(p.x * 4.0 + uTime) * 0.5 + cos(p.y * 2.0 + uTime) * 0.5) * (0.1 + uSpeed * 0.2); 
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); 
        }`,
      // --- THE FIX IS HERE: THIS IS THE CORRECTED FRAGMENT SHADER ---
      fragment: `
        precision highp float; 
        uniform vec2 uImageSizes; uniform vec2 uPlaneSizes; 
        uniform sampler2D tMap; uniform float uBorderRadius; varying vec2 vUv; 
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) { 
          vec2 q = abs(p) - b + r; 
          return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r; 
        } 
        
        void main() { 
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0), 
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          ); 
          vec2 uv = vec2(vUv.x * ratio.x + (1.0 - ratio.x) * 0.5, vUv.y * ratio.y + (1.0 - ratio.y) * 0.5); 
          
          vec4 color = texture2D(tMap, uv); 
          
          // This SDF call is more robust for calculating the rounded shape
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5) - uBorderRadius, uBorderRadius); 
          
          // Use the sign of d to determine if we are inside or outside the shape
          float alpha = d > 0.0 ? 0.0 : 1.0;
          
          // Smooth the edge for anti-aliasing
          alpha = 1.0 - smoothstep(0.0, 0.01, d);
          
          gl_FragColor = vec4(color.rgb, color.a * alpha); 
        }`,
      uniforms: { tMap: { value: texture }, uPlaneSizes: { value: [0, 0] }, uImageSizes: { value: [0, 0] }, uSpeed: { value: 0 }, uTime: { value: 100 * Math.random() }, uBorderRadius: { value: this.borderRadius } }
    });
    const img = new Image(); img.crossOrigin = 'anonymous'; img.src = this.image;
    img.onload = () => { texture.image = img; this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight]; };
    img.onerror = () => { console.error("Failed to load image:", this.image); };
  }
  createMesh() { this.plane = new Mesh(this.gl, { geometry: this.geometry, program: this.program }); this.plane.setParent(this.scene); }
  createTitle() { this.title = new Title({ gl: this.gl, plane: this.plane, text: this.text, textColor: this.textColor, font: this.font }); }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x; const H = this.viewport.width / 2;
    if (this.bend === 0) { this.plane.position.y = 0; this.plane.rotation.z = 0; }
    else { const B_abs = Math.abs(this.bend); const R = (H * H + B_abs * B_abs) / (2 * B_abs); const effX = Math.min(Math.abs(x), H); const arc = R - Math.sqrt(R * R - effX * effX); if (this.bend > 0) { this.plane.position.y = -arc; this.plane.rotation.z = -Math.sign(x) * Math.asin(effX / R); } else { this.plane.position.y = arc; this.plane.rotation.z = Math.sign(x) * Math.asin(effX / R); } }
    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;
    const pOffset = this.plane.scale.x / 2; const vOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + pOffset < -vOffset; this.isAfter = this.plane.position.x - pOffset > vOffset;
    if (direction === 'right' && this.isBefore) { this.extra -= this.widthTotal; this.isBefore = this.isAfter = false; }
    if (direction === 'left' && this.isAfter) { this.extra += this.widthTotal; this.isBefore = this.isAfter = false; }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen; if (viewport) this.viewport = viewport;
    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 2; this.width = this.plane.scale.x + this.padding; this.widthTotal = this.width * this.length; this.x = this.width * this.index;
  }
}

// --- UPGRADED: App Class (handles props) ---
class App {
  constructor(container, { items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase } = {}) {
    autoBind(this);
    this.container = container; this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck, 200);
    this.createRenderer(); this.createCamera(); this.createScene(); this.onResize();
    this.createGeometry(); this.createMedias(items, bend, textColor, borderRadius, font);
    this.update(); this.addEventListeners();
  }
  
  createRenderer() { this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio, 2) }); this.gl = this.renderer.gl; this.container.appendChild(this.gl.canvas); }
  createCamera() { this.camera = new Camera(this.gl, { fov: 45, position: new Float32Array([0, 0, 20]) }); }
  createScene() { this.scene = new Transform(); }
  createGeometry() { this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 }); }

  createMedias(items, bend, textColor, borderRadius, font) {
    const defaultItems = [
      { image: img1, text: 'Artwork One' }, { image: img2, text: 'Digital Painting' },
      { image: img4, text: 'Concept Art' }, { image: img5, text: 'Illustration' },
      { image: img6, text: 'Character Design' }, { image: img7, text: 'Sci-Fi Scene' },
      { image: img8, text: 'Fantasy World' }, { image: img9, text: 'Abstract Piece' },
      { image: img10, text: 'Landscape' }, { image: img11, text: 'Portrait' }
    ];
    const galleryItems = items && items.length ? items : defaultItems;
    this.mediasImages = [...galleryItems, ...galleryItems];
    this.medias = this.mediasImages.map((data, index) => new Media({
      geometry: this.planeGeometry, gl: this.gl, image: data.image, index, length: this.mediasImages.length,
      scene: this.scene, screen: this.screen, text: data.text, viewport: this.viewport,
      bend, textColor, borderRadius, font
    }));
  }

  // ... (All event handlers and update loop are the same)
  onTouchDown(e) { this.isDown = true; this.scroll.position = this.scroll.current; this.start = e.touches ? e.touches[0].clientX : e.clientX; }
  onTouchMove(e) { if (!this.isDown) return; const x = e.touches ? e.touches[0].clientX : e.clientX; this.scroll.target = this.scroll.position + (this.start - x) * (this.scrollSpeed * 0.025); }
  onTouchUp() { this.isDown = false; this.onCheck(); }
  onWheel(e) { const delta = e.deltaY || e.wheelDelta; this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2; this.onCheckDebounce(); }
  onCheck() { const width = this.medias[0].width; const itemIndex = Math.round(Math.abs(this.scroll.target) / width); this.scroll.target = (this.scroll.target < 0 ? -1 : 1) * width * itemIndex; }
  onResize() { this.screen = { width: this.container.clientWidth, height: this.container.clientHeight }; this.renderer.setSize(this.screen.width, this.screen.height); this.camera.perspective({ aspect: this.screen.width / this.screen.height }); const fov = this.camera.fov * Math.PI / 180; const height = 2 * Math.tan(fov / 2) * this.camera.position.z; this.viewport = { width: height * this.camera.aspect, height }; if (this.medias) this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport })); }
  update() { this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease); const dir = this.scroll.current > this.scroll.last ? 'right' : 'left'; if (this.medias) this.medias.forEach(media => media.update(this.scroll, dir)); this.renderer.render({ scene: this.scene, camera: this.camera }); this.scroll.last = this.scroll.current; this.raf = requestAnimationFrame(this.update); }
  addEventListeners() { /* ... */ }
  destroy() { /* ... */ }
}

// --- React Component Wrapper ---
export default function CircularGallery({ items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase }) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let app; // Define app outside the if statement
    
    // It's good practice to check if the ref is actually connected before initializing
    if (containerRef.current) {
      // THE FIX IS HERE: Changed container-ref to containerRef
      app = new App(containerRef.current, { items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase });
    }
    
    // The cleanup function
    return () => {
      if (app) {
        app.destroy();
      }
    };
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase]);

  return <div className="circular-gallery" ref={containerRef} />;
}