import { getApplications, updateApplications } from '@/api/apiApplications';
import useFetch from '@/hooks/useFetch';
import React, { useEffect, useState } from 'react';
import ApplicationCard from './ApplicationCard';
import { BarLoader } from 'react-spinners';
import { useUser } from '@clerk/clerk-react';
import Pagination from './Pagination';

const CreatedApplications = () => {
    const { user } = useUser();
    const [page, setPage] = useState(1);
    const applicationsPerPage = 10;

    const { fn: fnApplications, data: applications, loading: loadingApplications } = useFetch(getApplications, {
        user_id: user.id
    });

    useEffect(() => {
        if (user?.id) fnApplications();
    }, [user]);

    if (loadingApplications) {
        return <BarLoader className='mb-4' width={"100%"} color='#016fb9' />;
    }

    const startIndex = (page - 1) * applicationsPerPage;
    const endIndex = startIndex + applicationsPerPage;
    const sortedApplications = applications
        ? [...applications].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        : [];
    const paginatedApplications = sortedApplications.slice(startIndex, endIndex) || [];
    const totalPages = Math.ceil((applications?.length || 0) / applicationsPerPage);

    return (
        <div>
            {paginatedApplications.length ? (
                <div className='flex flex-col gap-2'>
                    {paginatedApplications.map(application => (
                        <ApplicationCard key={application.id} application={application} isCandidate />
                    ))}
                </div>
            ) : (
                <div>No Applications Found</div>
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

export default CreatedApplications;
