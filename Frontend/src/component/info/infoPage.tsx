import { Card } from 'primereact/card';
import { selectCurrentUser } from '../../redux/auth/authSlice';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export const InfoPage = () => {
  const user = useSelector(selectCurrentUser);
  const userDetails = { ...user };
  delete userDetails?.avatar;

  const header = useMemo(
    () => <img alt='Card' src={user?.avatar} className='max-h-15rem p-3' />,
    [user?.avatar]
  );

  return (
    <>
      {userDetails && (
        <div className='card flex justify-content-center info-card '>
          <Card title={'My profile'} header={header} className='w-20rem'>
            <>
              {Object.entries(userDetails).map(([key, value]) => (
                <p className='flex my-3' key={key}>
                  <p className='font-semibold m-0'>{key}:</p>
                  <p className='ml-1 m-0'>{value}</p>
                </p>
              ))}
            </>
          </Card>
        </div>
      )}
    </>
  );
};
