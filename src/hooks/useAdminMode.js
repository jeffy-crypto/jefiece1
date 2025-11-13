// src/hooks/useAdminMode.js
import { useState, useEffect } from 'react';

export const useAdminMode = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check the URL for a query parameter
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }
  }, []); // Empty array ensures this runs only once

  return isAdmin;
};