import CreatedApplications from '@/components/CreatedApplications';
import CreatedJobs from '@/components/CreatedJobs';
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { BarLoader } from 'react-spinners';

const MyJobs = () => {
  const { isLoaded, user} = useUser();

  if (!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color='#016fb9' />
  }
  return (
    <div>
      <h1 className='gredient-title font-extrabold text-5xl sm:text-6xl text-center pb-8'>
        {user?.unsafeMetadata?.role === "candidate" ? "My Applications" : "My Jobs"}
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