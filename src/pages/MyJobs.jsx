import CreatedApplications from '@/components/CreatedApplications';
import CreatedJobs from '@/components/CreatedJobs';
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { BarLoader } from 'react-spinners';

const MyJobs = () => {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color='#016fb9' />
  }
  return (
    <div>
      <h1 className='gredient-title font-semibold text-4xl sm:text-5xl text-center pt-7 sm:pb-3'>
        {user?.unsafeMetadata?.role === "candidate" ? <p className='pb-6'>My Applications</p> : "My Jobs"}
      </h1>

      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreatedApplications />
      ) : (
        <CreatedJobs />
      )}
    </div>
  )
}

export default MyJobs
