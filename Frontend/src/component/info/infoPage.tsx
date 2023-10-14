//import useCookieToken from '../../hooks/useTokenCookie';
import { Projects } from './projects';
import { Profile } from './profile';

export const InfoPage = () => {
  //const token = useCookieToken();

  return (
    <>
      <div className='card flex justify-content-start info'>
        <Profile />
        <Projects />
      </div>
    </>
  );
};
