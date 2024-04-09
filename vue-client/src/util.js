export function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export function debounce(fn, delay) {
  let timeoutID = null;
  return () => {
    clearTimeout(timeoutID);
    const args = arguments;
    timeoutID = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export function exclude_array_of_objects_keys(arrayOfObjects, keysToExclude) {
  return arrayOfObjects.map(obj => {
    const filteredObj = {};
    for (let key in obj) {
      if (!keysToExclude.includes(key)) {
        filteredObj[key] = obj[key];
      }
    }
    return filteredObj;
  });
}