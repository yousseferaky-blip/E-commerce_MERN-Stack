import Cookies from "universal-cookie";

const getToken = () => {
    return localStorage.getItem('token');
  };
  
  const setToken = (token) => {
    localStorage.setItem('token', token);
  
    const cookies = new Cookies();
    cookies.set('Ecommerce', token, { sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
  };
  
  const removeToken = () => {
    localStorage.removeItem('token');
  
    const cookies = new Cookies();
    cookies.remove('Ecommerce', { sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
  };
  
  export { getToken, setToken, removeToken };
  