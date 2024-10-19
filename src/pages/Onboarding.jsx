import { useUser } from '@clerk/clerk-react'
import { BarLoader } from 'react-spinners'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const { user, isLoaded } = useUser();

  const navigate = useNavigate();

  const handleRoleSelection = async(role)=>{
    await user.update({
      unsafeMetadata: { role }
    }).then(()=>{
      navigate(role === 'recruiter' ? "/post-job" : "/jobs")
    }).catch((err)=>{
      console.error("Error updating role:", err)
    })
  }

  useEffect(()=>{
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs"
      );
    }
  }, [user]);
  if (!isLoaded){
    return <BarLoader className='mb-4' width={"100%"} color='#016fb9'/>
  }
  return (
    <div className='flex flex-col items-center justify-center mt-32'>
      <h2 className='gredient-title font-extrabold text-7xl sm:text-8xl tracking-tighter'>I am a...</h2>
      <div className='mt-16 grid grid-cols-2 gap-4 w-full md:px-60'>
        <Button variant='blue' className='h-24 text-2xl' onClick={()=>handleRoleSelection("candidate")}>Candidate</Button>
        <Button variant='destructive' className='h-24 text-2xl' onClick={()=>handleRoleSelection("recruiter")}>Recruiter</Button>
      </div>
    </div>
  )
}

export default Onboarding
