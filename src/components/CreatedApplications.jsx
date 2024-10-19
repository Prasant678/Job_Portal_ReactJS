import { getApplications } from '@/api/apiApplications';
import useFetch from '@/hooks/useFetch';
import React, { useEffect } from 'react'
import ApplicationCard from './ApplicationCard';
import { BarLoader } from 'react-spinners';
import { useUser } from '@clerk/clerk-react';

const CreatedApplications = () => {
    const { user } = useUser();

    const { fn: fnApplications, data: applications, loading: loadingApplications } = useFetch(getApplications, {
        user_id: user.id
    });

    useEffect(() => {
        fnApplications();
    }, []);

    if (loadingApplications) {
        return <BarLoader className='mb-4' width={"100%"} color='#016fb9' />
    }
    return (
        <div className='flex flex-col gap-2'>
            {applications?.map((application) => {
                return <ApplicationCard key={application.id} application={application} isCandidate />
            })}
        </div>
    )
}

export default CreatedApplications
