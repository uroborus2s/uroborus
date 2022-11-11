export default (() => {
  let isAvaiable: boolean | undefined;
  return () => {
    if (isAvaiable !== undefined) return isAvaiable;
    try {
      const key = '_typeof_localStorage_is_use';
      window.localStorage.setItem(key, 'has');
      window.localStorage.removeItem(key);
      isAvaiable = true;
    } catch (e) {
      isAvaiable = false;
    }
    return isAvaiable;
  };
})();
