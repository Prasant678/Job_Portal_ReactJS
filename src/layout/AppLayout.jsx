import Header from '@/components/Header';
import React from 'react'
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
    return (
        <div>
            <div className='grid-background'></div>
            <main className="min-h-screen px-7 sm:px-16 lg:px-18">
                <Header />
                <Outlet />
            </main>
            <div className='p-4 text-center bg-gray-800 mt-8'>
                @2024 JobReady.com find all types of jobs and post any type of job.
            </div>
        </div>
    )
}

export default AppLayout;
