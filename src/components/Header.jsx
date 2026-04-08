import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusiness, Heart, PenBox } from 'lucide-react'

const Header = () => {

    const [showSignIn, setShowSignIn] = useState(false);

    const [search, setSearch] = useSearchParams();

    const { user } = useUser();

    useEffect(() => {
        if (search.get("sign-in")) {
            setShowSignIn(true);
        }
    }, [search])

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowSignIn(false);
            setSearch({});
        }
    }
    return (
        <>
            <nav className='pb-4 flex justify-between items-center pt-6'>
                <Link>
                    <img className='sm:h-12 h-10 w-full' src="logo.png" alt="" />
                </Link>

                <div className='flex gap-4'>
                    <SignedOut>
                        <Button variant="outline" onClick={() => setShowSignIn(true)}>Login</Button>
                    </SignedOut>
                    <SignedIn>
                        { user?.unsafeMetadata?.role === "recruiter" && (<Link to={'/post-job'}>
                            <Button variant='destructive' className="rounded-full">
                                <PenBox size={20} className='mr-2' />
                                <p>Post a Job</p>
                            </Button>
                        </Link>
                    )}
                        <UserButton appearance={{
                            elements: {
                                avatarBox: "w-10 h-10"
                            }
                        }}>
                            <UserButton.MenuItems>
                                <UserButton.Link label={user?.unsafeMetadata?.role === "recruiter" ? "My Jobs" : "My Applications"} labelIcon={<BriefcaseBusiness size={15} />} href='/my-jobs' />
                                <UserButton.Link label="Saved Jobs" labelIcon={<Heart size={15} />} href='/saved-jobs' />
                            </UserButton.MenuItems>
                        </UserButton>
                    </SignedIn>
                </div>
            </nav>

            {showSignIn && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50' onClick={handleOverlayClick}>
                    <SignIn
                        signUpForceRedirectUrl="/onboarding"
                        fallbackRedirectUrl="/onboarding"
                    />
                </div>
            )}
        </>
    )
}

export default Header
