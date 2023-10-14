import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useUser from './useUser';

export function HandleLogin() {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    user ? navigate('/info') : navigate('/login');
  });

  return <></>;
}
