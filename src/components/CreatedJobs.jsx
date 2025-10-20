import { getMyJobs } from '@/api/apiJobs';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { BarLoader } from 'react-spinners';
import Pagination from './Pagination';

const CreatedJobs = () => {
  const { user } = useUser();
  const [page, setPage] = useState(1);
  const jobsPerPage = 9;

  const { loading: loadingCreatedJobs, data: createdJobs, fn: fnCreatedJobs } = useFetch(getMyJobs, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fnCreatedJobs();
  }, [user]);

  if (loadingCreatedJobs) {
    return <BarLoader className='mb-4' width={"100%"} color='#016fb9' />;
  }

  const startIndex = (page - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const paginatedJobs = createdJobs?.slice(startIndex, endIndex) || [];
  const totalPages = Math.ceil((createdJobs?.length || 0) / jobsPerPage);

  return (
    <div>
      {paginatedJobs.length ? (
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {paginatedJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onJobSaved={fnCreatedJobs}
              isMyJob
            />
          ))}
        </div>
      ) : (
        <div>No Jobs Found</div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;
