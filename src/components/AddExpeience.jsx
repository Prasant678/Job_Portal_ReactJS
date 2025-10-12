import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from './ui/button';
import { Input } from './ui/input';
import useFetch from '@/hooks/useFetch';
import { BarLoader } from 'react-spinners';
import { Label } from '@radix-ui/react-label';
import { addNewExperience } from '@/api/apiExperience';


const schema = z.object({
  exp: z.string().min(1, { message: "Experience Required!" })
});

const AddExperience = ({ fetchExperiences }) => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  const { loading: loadingAddExperience, error: errorAddExperience, data: dataAddExperience, fn: fnAddExperience,} = useFetch(addNewExperience);

  const onSubmit = (data) =>{
    fnAddExperience({
      ...data
    })
  };

  useEffect(()=>{
    if (dataAddExperience?.length > 0) fetchExperiences();
  }, [loadingAddExperience]);
  return (
    <div className='sm:mt-0.5'>
      <Drawer>
        <DrawerTrigger>
          <Button type="button" size="sm" variant="blue">
            Add Experience
          </Button>
        </DrawerTrigger>
        <DrawerContent className="mx-8">
          <DrawerHeader>
            <DrawerTitle>Add new Experience</DrawerTitle>
          </DrawerHeader>
          <form className='flex gap-2 p-4 pb-0'>
            <Label>Experience with middle highphane </Label>
            <Input placeholder="eg. 0 - 1, Fresher or Experienced" {...register("exp")} />
            {errors.exp && <p className='text-red-500'>{errors.exp.message}</p>}
            <Button type="button" onClick={handleSubmit(onSubmit)} variant="destructive" className="w-40">ADD</Button>
          </form>

          {errorAddExperience?.message && (
            <p className='text-red-500'>{errorAddExperience?.message}</p>
          )}
          {loadingAddExperience && <BarLoader width={"100%"} color='#016fb9' className='mt-4'/>}
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary" type="button">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default AddExperience;
