import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { BriefcaseBusiness, Heart, MapPin, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { deleteJob, saveJob } from '@/api/apiJobs';
import useFetch from '@/hooks/useFetch';
import { BarLoader } from 'react-spinners';

const JobCard = ({ job,
    isMyJob = false,
    savedInit = false,
    onJobSaved = () => { },
}) => {
    const [saved, setSaved] = useState(savedInit);

    const { fn: fnSavedJob, data: savedJob, loading: loadingSavedJob } = useFetch(
        saveJob, {
        alreadySaved: saved,
    });

    const { user } = useUser();

    const handleSaveJob = async () => {
        await fnSavedJob({
            user_id: user.id,
            job_id: job.id
        });
        onJobSaved();
    };

    const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
        job_id: job.id,
    })

    const handleDeleteJob = async () => {
        await fnDeleteJob()
        onJobSaved()
    }
    useEffect(() => {
        if (savedJob !== undefined) setSaved(savedJob?.length > 0);
    }, [savedJob]);
    return (
        <Card className='flex flex-col w-full'>
            {loadingDeleteJob && (
                <BarLoader width={"100%"} color='#016fb9' />
            )}
            <CardHeader>
                <CardTitle className="flex justify-between font-extralight tracking-widest text-2xl 
                mb-[-9px]">
                    {job.title}

                    {isMyJob && (
                        <Trash fill='red' size={18} className='text-red-300 cursor-pointer' onClick={handleDeleteJob} />
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1">
                <div className='flex justify-between'>
                    <div className='flex flex-col gap-1.5'>
                        <div className='flex gap-2 items-center'>
                            <BriefcaseBusiness size={15} /><p className='text-xs tracking-widest mt-0.5'>{job.experience && job.experience.exp}</p>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <MapPin size={15} /> <p className='text-xs tracking-[2px] mt-0.5'>{job.location && job.location.city}</p>
                        </div>
                    </div>
                    {job.company && <img src={job.company.logo_url} className='h-6 mt-3' />}
                </div>
                <hr className='my-[-5px]'/>
                <p className='text-[15px] font-extralight tracking-[0.9px]'>{job.description.substring(0, job.description.indexOf("."))}</p>
            </CardContent>
            <CardFooter className="flex gap-2 mt-[-12px]">
                <Link to={`/job/${job.id}`} className='flex-1'>
                    <Button variant='secondary' size="sm" className="w-full">
                        <p className='tracking-widest'>More Details</p>
                    </Button>
                </Link>
                {!isMyJob && (
                    <Button variant="outline" size="sm" className="w-11" onClick=
                        {handleSaveJob} disabled={loadingSavedJob}>
                        {saved ? (
                            <Heart size={19} stroke='red' fill='red' />) : (
                            <Heart size={19}/>
                        )}
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}

export default JobCard
