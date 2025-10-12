import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/useFetch';
import { getCompanies } from '@/api/apiCompanies';
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import { Navigate, useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '@/components/ui/button';
import { addNewJob } from '@/api/apiJobs';
import AddCompany from '@/components/AddCompany';
import { getLocations } from '@/api/apiLocation';
import AddLocation from '@/components/AddLocation';
import { getExperiences } from '@/api/apiExperience';
import AddExperience from '@/components/AddExpeience';

const schema = z.object({
  title: z.string().min(1, { message: "Title is Required" }),
  description: z.string().min(1, { message: "Description is Required" }),
  location: z.string().min(1, { message: "Select a Location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirements: z.string().min(1, { message: "Requirements are Required" }),
  experience: z.string().min(1, { message: "Select Experience" }),
});

const PostJob = () => {
  const { isLoaded, user } = useUser();

  const navigate = useNavigate();

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirements: "",
      experience: "",
    },
    resolver: zodResolver(schema),
  });

  const { fn: fnCompanies, data: companies, loading: loadingCompanies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded)
      fnCompanies();
  }, [isLoaded]);

  const { fn: fnLocations, data: locations } = useFetch(getLocations);

  useEffect(() => {
    if (isLoaded)
      fnLocations();
  }, [isLoaded]);

  const { fn: fnExperiences, data: experience } = useFetch(getExperiences);

  useEffect(() => {
    if (isLoaded)
      fnExperiences();
  }, [isLoaded]);

  const {
    loading: loadingCreateJob,
    error: errorCreateJob,
    data: dataCreateJob,
    fn: fnCreateJob,
  } = useFetch(addNewJob);

  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    })
  }

  useEffect(() => {
    if (dataCreateJob?.length > 0)
      navigate("/jobs");
  }, [loadingCreateJob])

  if (!isLoaded || loadingCompanies) {
    return <BarLoader className='mb-4' width={"100%"} color='#016fb9' />
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to={"/jobs"} />
  }
  return (
    <div>
      <h1 className='gredient-title font-extrabold text-4xl sm:text-5xl text-center py-7'>Post a Job</h1>
      <form className='flex flex-col gap-4 sm:p-4 pb-0' onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Job Title" {...register("title")} />
        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
        <Textarea placeholder="Job Description" {...register("description")} />
        {errors.description && (
          <p className='text-red-500'>{errors.description.message}</p>
        )}

        <div className='flex flex-col sm:flex-row gap-3 items-center'>
          <div className='w-full flex gap-3'>
            <Controller name='location' control={control} render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by location">
                    {field.value ? locations?.find((cit) => cit.id === Number(field.value))?.city : "City"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {locations?.map(({ city, id }) => {
                      return (
                        <SelectItem key={city} value={id}>{city} </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>)} />
            <AddLocation fetchLocations={fnLocations} />
          </div>
          <div className='w-full flex gap-3'>
            <Controller name='experience' control={control} render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Experience">
                    {field.value ? experience?.find((exp) => exp.id === Number(field.value))?.exp : "exp"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {experience?.map(({ exp, id }) => {
                      return (
                        <SelectItem key={exp} value={id}>{exp} </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>)} />
            <AddExperience fetchExperiences={fnExperiences} />
          </div>
        </div>
        <div className='flex gap-3 items-center'>
          <Controller name='company_id' control={control} render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Company">
                  {field.value ? companies?.find((com) => com.id === Number(field.value))?.name : "Company"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {companies?.map(({ name, id }) => {
                    return (
                      <SelectItem key={name} value={id}>{name} </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>)} />
          <AddCompany fetchCompanies={fnCompanies} />
        </div>
        {errors.location && (
          <p className='text-red-500'>{errors.location.message}</p>
        )}
        {errors.company_id && (
          <p className='text-red-500'>{errors.company_id.message}</p>
        )}

        <Controller name='requirements' control={control} render={({ field }) => (
          <MDEditor value={field.value} onChange={field.onChange} />
        )} />
        {errors.requirements && (
          <p className='text-red-500'>{errors.requirements.message}</p>
        )}
        {errorCreateJob?.message && (
          <p className='text-red-500'>{errorCreateJob?.message}</p>
        )}

        {loadingCreateJob && <BarLoader width={"100%"} color='#016fb9' />}
        <Button type="submit" variant="blue" size="lg" className="mt-2">
          Post
        </Button>
      </form>
    </div>
  )
}

export default PostJob
