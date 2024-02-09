// Ensure a min display time for the spinner
export default function withMinimumLoadingTime(promise) {
    const minLoadingTime = 500; 
    //store current time 
    const startTime = new Date().getTime();
  //wait for two promises to resolve, (argument, setTimeOut Promise)
    return Promise.all([
      //the original promise
      promise,
      //and the min loading time promise
      new Promise((resolve) => setTimeout(resolve, minLoadingTime))
    ]).then(([result]) => {
      const endTime = new Date().getTime();
      const elapsedTime = endTime - startTime;
  
      // If the min time has passed, resolve promises
      if (elapsedTime >= minLoadingTime) {
        return result;
      }
  
      //if it loaded quickly, calculate how much time is left and makes new setTimeout Promise to be resolved
      return new Promise((resolve) => setTimeout(() => resolve(result), minLoadingTime - elapsedTime));
    });
  }