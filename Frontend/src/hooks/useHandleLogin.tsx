import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useEffect } from 'react';

export function HandleLogin() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    debugger;
    auth.user ? navigate('/info') : navigate('/login');
  });

  return <></>;
}
