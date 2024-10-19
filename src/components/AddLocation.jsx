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
import { addNewLocation } from '@/api/apiLocation';
import { Label } from '@radix-ui/react-label';


const schema = z.object({
  city: z.string().min(1, { message: "City is Required" })
});

const AddLocation = ({ fetchLocations }) => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  })

  const { loading: loadingAddLocation, error: errorAddLocation, data: dataAddLocation, fn: fnAddLocation,} = useFetch(addNewLocation);

  const onSubmit = (data) =>{
    fnAddLocation({
      ...data
    })
  };

  useEffect(()=>{
    if (dataAddLocation?.length > 0) fetchLocations();
  }, [loadingAddLocation]);
  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <Button type="button" size="sm" variant="blue">
            Add Location
          </Button>
        </DrawerTrigger>
        <DrawerContent className="mx-8">
          <DrawerHeader>
            <DrawerTitle>Add a New Location</DrawerTitle>
          </DrawerHeader>
          <form className='flex gap-2 p-4 pb-0'>
            <Label>City and state name with comma </Label>
            <Input placeholder="eg. Bengalore, Karnataka" {...register("city")} />
            {errors.city && <p className='text-red-500'>{errors.city.message}</p>}
            <Button type="button" onClick={handleSubmit(onSubmit)} variant="destructive" className="w-40">ADD</Button>
          </form>

          {errorAddLocation?.message && (
            <p className='text-red-500'>{errorAddLocation?.message}</p>
          )}
          {loadingAddLocation && <BarLoader width={"100%"} color='#016fb9' className='mt-4'/>}
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

export default AddLocation
