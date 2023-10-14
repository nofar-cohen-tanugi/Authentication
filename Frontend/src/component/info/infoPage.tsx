import { Card } from 'primereact/card';
import { useMemo } from 'react';
import { Projects } from './projects';
import { useGetProjectsQuery } from '../../redux/project/projectApi';
import useCookieToken from '../../hooks/useTokenCookie';
import useUser from '../../hooks/useUser';

export const InfoPage = () => {
  const token = useCookieToken();
  console.log(token);

  const {
    data: projectData,
    isFetching,
    isLoading,
  } = useGetProjectsQuery(token);

  const user = useUser();
  const userDetails = { ...user };
  delete userDetails?.avatar;

  const header = useMemo(
    () => <img alt='Card' src={user?.avatar} className='max-h-15rem p-3' />,
    [user?.avatar]
  );

  return (
    <>
      {userDetails && (
        <div className='card flex justify-content-start info'>
          <Card
            title={'My Profile'}
            header={header}
            className='w-20rem h-25rem'
          >
            <>
              {Object.entries(userDetails).map(([key, value]) => (
                <p className='flex my-3' key={key}>
                  <p className='font-semibold m-0'>{key}:</p>
                  <p className='ml-1 m-0'>{value}</p>
                </p>
              ))}
            </>
          </Card>
          <Card title={'My Projects'} className='mx-3 project-card'>
            <Projects
              projects={projectData?.data}
              isFetching={isFetching}
              isLoading={isLoading}
            />
          </Card>
        </div>
      )}
    </>
  );
};
