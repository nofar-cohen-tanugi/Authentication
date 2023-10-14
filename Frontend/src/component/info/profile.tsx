import { Card } from 'primereact/card';
import useUser from '../../hooks/useUser';
import { useMemo } from 'react';

export const Profile = () => {
  const user = useUser();
  const userDetails = { ...user };
  delete userDetails?.avatar;

  const header = useMemo(
    () => (
      <div className='flex justify-content-center w-full'>
        <img alt='Card' src={user?.avatar} className='w-8rem h-9rem p-3' />
      </div>
    ),
    [user?.avatar]
  );

  return (
    <Card title={'My Profile'} header={header} className='w-20rem h-25rem'>
      <>
        {Object.entries(userDetails).map(([key, value]) => (
          <div className='flex my-3' key={key}>
            <p className='font-semibold m-0'>{key}:</p>
            <p className='ml-1 m-0'>
              {key === 'joinedAt' ? new Date(value).toDateString() : value}
            </p>
          </div>
        ))}
      </>
    </Card>
  );
};
