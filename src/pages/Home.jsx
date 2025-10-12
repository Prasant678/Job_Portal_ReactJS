import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import React from 'react'
import { Link } from 'react-router-dom'
import companies from '../data/companies.json'
import faqs from '../data/faq.json'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useUser } from '@clerk/clerk-react'

const Home = () => {
    const { user } = useUser();
    return (
        <>
            <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
                <section className='text-center'>
                    <h1 className='flex flex-col justify-center items-center gredient-title text-4xl font-extrabold sm:text-6xl lg:text-7xl tracking-tighter py-4'>find your dream Job <span className='gap-3 sm:gap-6'>and get hired</span></h1>
                    <p className='text-gray-300 sm:mt-4 text-sm sm:text-xl tracking-wider'>
                        Explore thoushands of job listings or find the perfect candidate
                    </p>
                </section>
                <div className='flex gap-5 justify-center'>
                    <Link to={'/jobs'}>
                        <Button variant='blue' size="xl">Find Jobs</Button>
                    </Link>
                    { user?.unsafeMetadata?.role === "recruiter" && (<Link to={'/post-job'}>
                            <Button variant='destructive' size='xl'>
                                Post a Job
                            </Button>
                        </Link> )}
                </div>
                <Carousel
                    plugins={[Autoplay({ delay: 2000 })]}
                    className="w-full py-10"
                >
                    <CarouselContent className='flex gap-5 sm:gap-20 items-center'>
                        {companies.map(element => {
                            return <CarouselItem key={element.id} className="basis-1/3 lg:basis-1/6">
                                <img src={element.path} alt={element.name} className='h-9 sm:h-14 object-contain' />
                            </CarouselItem>
                        })}
                    </CarouselContent>
                </Carousel>
                <img src="9880796.jpg" className='w-full' />
                <section className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <Card>
                        <CardHeader>
                            <CardTitle className="tracking-wider">For JobSeekers</CardTitle>
                        </CardHeader>
                        <CardContent className="tracking-widest">
                            Search and Apply for jobs , Track Application and More.
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="tracking-wider">For Employees</CardTitle>
                        </CardHeader>
                        <CardContent className="tracking-widest">
                            Post Jobs, manage Application, and find the best candidate.
                        </CardContent>
                    </Card>
                </section>

                <Accordion type="single" collapsible>
                    {faqs.map((element, index) => {
                        return (<AccordionItem key={index} value={`item-${index + 1}`}>
                            <AccordionTrigger className="text-lg tracking-wide">{element.question}</AccordionTrigger>
                            <AccordionContent className="text-sm tracking-wider">
                                {element.answer}
                            </AccordionContent>
                        </AccordionItem>)
                    })}
                </Accordion>
            </main>
        </>
    )
}

export default Home
