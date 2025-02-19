'use client'
import React, { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { title } from 'process';
import { Toaster } from '@/components/ui/toaster';
import { Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


interface TitleFormProps {
  initailtData: {
    title: string
  },
  courseId: string
}

const titleSchema = z.object({
  title: z.string().min(1, {
    message: 'The title is required'
  })
})

const TitleForm = ({
  initailtData,
  courseId
}: TitleFormProps ) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof titleSchema>>({
    resolver: zodResolver(titleSchema),
    defaultValues: initailtData,
  });

  const toggleEdit = () => setIsEditing((current) => !current);

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof titleSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success('Course updated!')
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Title
        <Button variant={'ghost'} onClick={toggleEdit}>
          {
            isEditing && (
              <>Cancle</>
            )
          }
          {
            !isEditing && (
              <>
                <Pencil className='size-4 mr-2'/>
                Edit Course
              </>
            )
          }
        </Button>
      </div>
      {
        !isEditing && (
          <p>{initailtData.title}</p>
        )
      }
      {
        isEditing && (
          <Form {...form}>
            <form 
              className="space-y-4 mt-4" 
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder='e.g "Advanced Web Development" '
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Button type='submit' disabled={!isValid || isSubmitting}>Save</Button>
              </div>
            </form>
          </Form>
        )
      }
    </div>
  ) 
}

export default TitleForm