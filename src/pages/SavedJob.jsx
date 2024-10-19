import { getSavedJobs } from '@/api/apiJobs';
import JobCard from '@/components/JobCard';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';

const SavedJob = () => {
  const {isLoaded } = useUser();

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded)
      fnSavedJobs();
  }, [isLoaded])

  if (!isLoaded || loadingSavedJobs) {
    return <BarLoader className='mb-4' width={"100%"} color='#016fb9' />
  }
  return (
    <div>
      <h1 className='gredient-title font-extrabold text-5xl sm:text-6xl text-center pb-8'>Saved Jobs</h1>

      {loadingSavedJobs === false && (
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {savedJobs?.length ? (
            savedJobs.map((saved) => {
              return <JobCard key={saved.id} job={saved?.job} savedInit={true} onJobSaved={fnSavedJobs} />
            })
          ) : (
            <div>No Saved Jobs Found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SavedJob