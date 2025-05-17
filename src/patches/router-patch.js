
// Router patch to fix undefined path errors
if (typeof window !== 'undefined') {
  // Wait for Next.js to initialize
  setTimeout(() => {
    try {
      // Override path.relative to handle undefined inputs
      const originalPath = require('path');
      const originalRelative = originalPath.relative;
      
      originalPath.relative = function safeRelative(from, to) {
        if (to === undefined || to === null) {
          console.warn('⚠️ Path.relative called with undefined path. Using empty string.');
          return '';
        }
        return originalRelative(from, to);
      };
      
      console.log('✅ Path module patched successfully.');
    } catch (error) {
      console.error('❌ Failed to patch path module:', error);
    }
  }, 100);
}
  