export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};