import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Boxes, BriefcaseBusiness, Download, School } from 'lucide-react'
import useFetch from '@/hooks/useFetch';
import { updateApplications } from '@/api/apiApplications';
import { BarLoader } from 'react-spinners';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUser } from '@clerk/clerk-react';

const ApplicationCard = ({ application, isCandidate = false }) => {
    const { user } = useUser();

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = application?.resume;
        link.target = "_blank";
        link.click();
    };

    const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(updateApplications, { job_id: application.job_id, })

    const handleStatusChange = (status) => {
        fnHiringStatus(status);
    }
    return (
        <Card>
            {loadingHiringStatus && <BarLoader width={"100%"} color='#016fb9' />}
            <CardHeader className='p-4'>
                <CardTitle className='flex justify-between font-light items-center'>
                    {isCandidate
                        ? <div className='flex flex-col sm:flex-row gap-2'>
                            <p className='sm:ml-1.5'>{`${application?.job?.title}`}</p>
                            <p>{`at ${application?.job?.company?.name}`}</p>
                        </div>
                        : <p className='sm:ml-1.5'>{application?.name}</p>}
                    {user?.unsafeMetadata?.role === "recruiter" ? <Download size={18} className='bg-transparent text-white h-8 w-8 p-1 cursor-pointer' onClick={handleDownload} /> : ""}
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-2 flex-1'>
                <div className='flex flex-col md:flex-row gap-2 sm:gap-0 justify-between'>
                    <div className='flex gap-2 items-center tracking-wider'>
                        <BriefcaseBusiness size={15} /> <p className='font-thin'>{application?.experience} years of experience</p>
                    </div>
                    <div className='flex gap-2 items-center tracking-wider'>
                        <School size={15} /> <p className='font-thin'>{application?.education}</p>
                    </div>
                </div>
                <div className='flex gap-2 items-start tracking-wider mb-1'>
                    <Boxes size={15} className='mt-1' />Skills: <p className='font-thin'>{application?.skills}</p>
                </div>
                <hr />
            </CardContent>
            <CardFooter className='flex flex-col sm:flex-row justify-between tracking-wider my-[-12px]'>
                <span className='font-light'>Applied: <span className='font-thin'>{new Date(application?.created_at).toLocaleString()}</span></span>
                {isCandidate ? (
                    <span className='capitalize font-light'>Status: <span className='font-thin'>{application?.status}</span></span>
                ) : (
                    <Select onValueChange={handleStatusChange} defaultValue={application.status}>
                        <SelectTrigger className="w-52">
                            <SelectValue placeholder="Application Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="applied">Applied</SelectItem>
                            <SelectItem value="interviewing">Interviewing </SelectItem>
                            <SelectItem value="hired">Hired</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            </CardFooter>
        </Card>
    )
}

export default ApplicationCard
