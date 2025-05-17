// Safe router wrapper to prevent Next.js navigation errors
// This module patches the Next.js router to handle undefined paths gracefully

if (typeof window !== 'undefined') {
  try {
    // Wait for Next.js to load
    setTimeout(() => {
      const nextNavigation = require('next/navigation');
      
      // Store the original useRouter function
      const originalUseRouter = nextNavigation.useRouter;
      
      // Create a safe wrapper for the useRouter function
      nextNavigation.useRouter = function safeUseRouter() {
        const router = originalUseRouter();
        
        // Create a safe wrapper for the push function
        const originalPush = router.push;
        router.push = function safePush(href, options) {
          if (href === undefined || href === null) {
            console.warn('Warning: Attempted to navigate to undefined path. Redirecting to home.');
            href = '/';
          }
          return originalPush(href, options);
        };
        
        // Create a safe wrapper for the replace function
        const originalReplace = router.replace;
        router.replace = function safeReplace(href, options) {
          if (href === undefined || href === null) {
            console.warn('Warning: Attempted to navigate to undefined path. Redirecting to home.');
            href = '/';
          }
          return originalReplace(href, options);
        };
        
        return router;
      };
      
      console.log('Next.js router patched successfully to handle undefined paths.');
    }, 500);
  } catch (error) {
    console.error('Failed to patch Next.js router:', error);
  }
}
