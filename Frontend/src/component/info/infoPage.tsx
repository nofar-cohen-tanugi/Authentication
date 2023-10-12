import { Card } from 'primereact/card';
import { selectCurrentUser } from '../../redux/auth/authSlice';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Projects } from './projects';
import { useGetProjectsQuery } from '../../redux/project/projectApi';

export const InfoPage = () => {
  const { data: projectData, isFetching, isLoading } = useGetProjectsQuery();

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
        <div className='card flex justify-content-start h-screen'>
          <Card
            title={'My Profile'}
            header={header}
            className='info-card w-20rem'
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
          <Card title={'My Projects'} className='mx-3 mt-2 project-card'>
            <Projects
              projects={projectData}
              isFetching={isFetching}
              isLoading={isLoading}
            />
          </Card>
        </div>
      )}
    </>
  );
};
