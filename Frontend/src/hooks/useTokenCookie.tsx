import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function useCookieToken() {
  const [token, setToken] = useState('');

  useEffect(() => {
    // Get the token from the specified cookie
    const tokenFromCookie = Cookies.get('authToken');

    // Check if the token exists in the cookie
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }
  }, []);

  return token;
}

export default useCookieToken;
