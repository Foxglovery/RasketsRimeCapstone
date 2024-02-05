// Ensure a minimum display time for a spinner or loading indicator
export default function withMinimumLoadingTime(promise) {
    const minLoadingTime = 500; // Minimum loading time in milliseconds
    const startTime = new Date().getTime();
  
    return Promise.all([
      promise,
      new Promise((resolve) => setTimeout(resolve, minLoadingTime))
    ]).then(([result]) => {
      const endTime = new Date().getTime();
      const elapsedTime = endTime - startTime;
  
      // If the operation and minimum time have passed, resolve immediately
      if (elapsedTime >= minLoadingTime) {
        return result;
      }
  
      // Otherwise, wait until the minimum time has passed (should be already done)
      return new Promise((resolve) => setTimeout(() => resolve(result), minLoadingTime - elapsedTime));
    });
  }