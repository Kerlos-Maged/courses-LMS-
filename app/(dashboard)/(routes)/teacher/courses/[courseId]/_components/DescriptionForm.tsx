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
import { Toaster } from '@/components/ui/toaster';
import { Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';


interface DescriptionFormProps {
  initailtData: {
    description: any
  },
  courseId: string
}


const descriptionSchema = z.object({
  description: z.string().min(1, {
    message: 'The Description is required'
  })
})

const DescriptionForm = ({
  initailtData,
  courseId
}: DescriptionFormProps ) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false);
  const form = useForm<z.infer<typeof descriptionSchema>>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: initailtData,
  });

  const toggleEdit = () => setIsEditing((current) => !current);

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof descriptionSchema>) => {
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
        Course description
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
                Edit Description
              </>
            )
          }
        </Button>
      </div>
      {
        !isEditing && (
          <p className={cn(
            'text-sm mt-2',
            !initailtData.description && 'text-slate-500 italic'
          )}>{initailtData.description || 'No Description'}</p>
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
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder='e.g "This is course is about..." '
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

export default DescriptionForm