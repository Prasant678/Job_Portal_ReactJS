import { getSingleJob, updateHiringStatus } from '@/api/apiJobs';
import ApplicationCard from '@/components/ApplicationCard';
import ApplyJob from '@/components/ApplyJob';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/useFetch';
import { useUser } from '@clerk/clerk-react'
import MDEditor from '@uiw/react-md-editor';
import { BriefcaseBusiness, DoorClosed, DoorOpen, MapPin, UserRound } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import Pagination from '@/components/Pagination';

const Job = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const applicationsPerPage = 10;

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(updateHiringStatus, { job_id: id, })

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  }

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  if (!isLoaded || loadingJob) {
    return <BarLoader className='mb-4' width={"100%"} color='#016fb9' />
  }

  const startIndex = (page - 1) * applicationsPerPage;
  const endIndex = startIndex + applicationsPerPage;
  const sortedApplications = job?.applications
    ? [...job.applications].sort((a, b) => new Date(b.applied_at) - new Date(a.applied_at))
    : [];
  const paginatedApplications = sortedApplications.slice(startIndex, endIndex) || [];
  const totalPages = Math.ceil((job?.applications?.length || 0) / applicationsPerPage);
  return (
    <div className='flex flex-col sm:gap-6 gap-4 sm:mt-12 mt-6'>
      <div className='flex flex-col-reverse gap-6 md:flex-row justify-between items-center'>
        <h1 className='gredient-title font-semibold sm:font-bold tracking-wide sm:tracking-widest sm:pb-3 pb-0 text-3xl sm:text-5xl'>{job?.title}</h1>
        <img src={job?.company?.logo_url} className='sm:h-12 h-10 mt-7 sm:mt-0 max-w-60' alt={job?.title} />
      </div>
      <div className='flex flex-col sm:flex-row gap-3.5 sm:gap-0 justify-between mt-6 sm:mt-0'>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-1.5'>
            <BriefcaseBusiness strokeWidth={1.25} /><p className='tracking-[2px] mt-0.5'>{job?.experience && job?.experience?.exp}</p>
          </div>
          <div className='flex gap-1.5'>
            <MapPin strokeWidth={1.25} /> <p className='tracking-[2px] mt-0.5'>{job?.location && job?.location?.city}</p>
          </div>
        </div>
        <div className='flex items-center justify-between sm:w-[40rem]'>
          <div className="flex gap-1.5 items-center">
            <UserRound strokeWidth={1.25} />
            <p className='tracking-widest mt-0.5'>{job?.applications?.length} Applicants</p>
          </div>
          <div className="flex gap-1 items-center">
            {job?.isOpen ? (
              <>
                <DoorOpen stroke='#22c55e' size={30} />
                <p className='tracking-widest'>Open</p>
              </>
            ) : (
              <>
                <DoorClosed stroke='#dc2626' size={30} />
                <p className='tracking-widest'>Closed</p>
              </>
            )}
          </div>
        </div>
      </div>

      {loadingHiringStatus && <BarLoader width={"100%"} color='#016fb9' />}
      {
        job?.recruiter_id === user?.id && <Select onValueChange={handleStatusChange}>
          <SelectTrigger className={`w-full ${job?.isOpen ? "bg-green-800" : "bg-red-700"}`}>
            <SelectValue placeholder={(job?.isOpen ? <p className='tracking-widest'>Hiring Status ( Open )</p> : <p className='tracking-widest'>Hiring Status ( Closed )</p>)
            } />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed </SelectItem>
          </SelectContent>
        </Select>
      }

      <h2 className='text-xl sm:text-2xl font-semibold mb-[-5px] tracking-widest'>About the Job</h2>
      <p className='text-lg font-extralight tracking-wider'>{job?.description}</p>

      <h2 className='text-2xl sm:text-3xl font-semibold mb-[-5px] tracking-wider'>
        What we are Looking For..
      </h2>

      <MDEditor.Markdown
        source={job?.requirements} className='bg-transparent text-md tracking-wider' />

      {
        job?.recruiter_id !== user?.id && (
          <ApplyJob job={job} user={user} fetchJob={fnJob} applied={job?.applications?.find((ap) => ap.candidate_id === user.id)} />
        )
      }

      {
        job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
          <div className='flex flex-col gap-2'>
            <h2 className='text-2xl sm:text-3xl font-bold mb-3'>Applications</h2>

            {paginatedApplications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}

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
        )
      }
    </div >
  )
}

export default Job
