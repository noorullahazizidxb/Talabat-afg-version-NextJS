// Patch for Next.js path handling issues
// This file monkey-patches the Next.js router to handle undefined paths gracefully

// Store the original path module
const originalPath = require('path');

// Create a patched version of the relative function
const originalRelative = originalPath.relative;
originalPath.relative = function(from, to) {
  // Handle undefined paths gracefully
  if (to === undefined) {
    console.warn('Warning: Received undefined path in path.relative. Using empty string instead.');
    to = '';
  }
  
  // Call the original function with the sanitized path
  return originalRelative(from, to);
};

// Export the patched path module
module.exports = originalPath;
