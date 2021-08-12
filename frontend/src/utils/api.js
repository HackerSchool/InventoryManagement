export const handleData = (fn) => async (...args) => {
  const response = await fn(...args);
  return response.data;
};
