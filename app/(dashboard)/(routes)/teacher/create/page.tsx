'use client'
import React from 'react'
import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import toast from 'react-hot-toast'

const CourseSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required'
  }).max(255),
})


const CreateCoursePage = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof CourseSchema>>({
    resolver: zodResolver(CourseSchema),
    defaultValues: {
      title: ''
    }
  })

  const { isValid , isSubmitting } = form.formState

  const onSubmit = async (values : z.infer<typeof CourseSchema>) => {
    try {
      const response = await axios.post('/api/courses', values)
      router.push(`/teacher/courses/${response.data.id}`)
      toast.success('Course Created')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className='max-w-5xl mx-auto flex items-center md:justify-center h-full p-6'>
      <div className="">
        <h1 className="text-2x;">Name Your Course</h1>
        <p className='text-sm text-slate-600'>What would you like to name your course? Don't worry, you can change it later</p>
        <Form {...form} >
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 mt-8'>
              <FormField 
                control={form.control}
                name='title'
                render={ ( { field } ) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input 
                        disabled={isSubmitting}
                        placeholder='e.g "Advanced Web Development" '
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What will you teach in this course
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Link href={'/'}>
                  <Button variant={'ghost'} type='button'>Cancle</Button>
                </Link>
                <Button disabled={!isValid || isSubmitting} type='submit'>Continue</Button>
              </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateCoursePage