import _ from 'lodash';
import { useMemo } from 'react';
import { ProjectDto } from '../../models/project/projectDto.model';

export const Summary = (props: { projects: ProjectDto[] | undefined }) => {
  const dadelineSuccessPercent = useMemo(() => {
    const projectCount = props.projects?.length;
    const successCount =
      _.countBy(props.projects, (p) => p.madeDadeline).true || 0; // Count of successful dadeline

    // Calculate success percentage
    return !projectCount ? 0 : (successCount / projectCount) * 100;
  }, [props.projects]);

  const average = useMemo(
    () =>
      !props.projects?.length ? 0 : _.meanBy(props.projects, (p) => p.score),
    [props.projects]
  );

  return (
    <div className='my-3'>
      <div className='flex my-1 p-0'>
        <p className='font-semibold my-0'>Dadeline Success Percent: </p>
        <p className='ml-2 my-0'>{dadelineSuccessPercent.toFixed(2)}%</p>
      </div>
      <div className='flex my-1 p-0'>
        <p className='font-semibold my-0'>Average:</p>
        <p className='ml-2 my-0'>{average}</p>
      </div>
    </div>
  );
};
