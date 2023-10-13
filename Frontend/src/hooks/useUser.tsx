import { useState, useEffect } from 'react';
import { ILoginDto } from '../models/login/ILoginResponse.model';

function useUser() {
  const [user, setUser] = useState<ILoginDto['personalDetails'] | null>();

  useEffect(() => {
    const _userString = localStorage.getItem('user');
    const _user = _userString ? JSON.parse(_userString) : null;
    setUser(_user);
  }, []);

  return user;
}

export default useUser;
