import { getSavedJobs } from '@/api/apiJobs';
import JobCard from '@/components/JobCard';
import Pagination from '@/components/Pagination';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';

const SavedJob = () => {
  const { isLoaded } = useUser();
  const [page, setPage] = useState(1);
  const jobsPerPage = 12;

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) fnSavedJobs();
  }, [isLoaded]);

  if (!isLoaded || loadingSavedJobs) {
    return <BarLoader className="mb-4" width="100%" color="#016fb9" />;
  }

  const startIndex = (page - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const paginatedJobs = savedJobs?.slice(startIndex, endIndex) || [];
  const totalPages = Math.ceil((savedJobs?.length || 0) / jobsPerPage);

  return (
    <div>
      <h1 className="gredient-title font-semibold text-4xl sm:text-5xl text-center pt-7 sm:pb-3">
        Saved Jobs
      </h1>

      {paginatedJobs.length ? (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedJobs.map((saved) => (
            <JobCard
              key={saved.id}
              job={saved.job}
              savedInit={true}
              onJobSaved={fnSavedJobs}
            />
          ))}
        </div>
      ) : (
        <div>No Saved Jobs Found</div>
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

export default SavedJob;
