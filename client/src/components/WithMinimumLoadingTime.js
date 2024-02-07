// Ensure a minimum display time for the spinner
export default function withMinimumLoadingTime(promise) {
    const minLoadingTime = 500; 
    //store current time 
    const startTime = new Date().getTime();
  //wait for two promises to resolve, (argument, setTimeOut Promise)
    return Promise.all([
      promise,
      new Promise((resolve) => setTimeout(resolve, minLoadingTime))
    ]).then(([result]) => {
      const endTime = new Date().getTime();
      const elapsedTime = endTime - startTime;
  
      // If the min time has passed, resolve promises
      if (elapsedTime >= minLoadingTime) {
        return result;
      }
  
      // Otherwise, wait until the min time has passed
      return new Promise((resolve) => setTimeout(() => resolve(result), minLoadingTime - elapsedTime));
    });
  }