'use client'
import React, { useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Course } from '@prisma/client';
import Image from 'next/image';
import FileUpload from '@/components/FileUpload';


interface ImageFormProps {
  initailtData: Course,
  courseId: string
}


const imageSchema = z.object({
  imageUrl: z.string().min(1, {
    message: 'The Description is required'
  })
})

const ImageForm = ({
  initailtData,
  courseId
}: ImageFormProps ) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof imageSchema>) => {
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
        Course Image
        <Button variant={'ghost'} onClick={toggleEdit}>
          {
            isEditing && (
              <>Cancle</>
            )
          }
          {
            !isEditing && !initailtData.imageUrl && (
              <>
                <PlusCircle className='h-4 w-4 mr-2'/>
                Add an Image
              </>
            )
          }
          {
            !isEditing &&  initailtData.imageUrl && (
              <>
                <Pencil className='size-4 mr-2'/>
                Edit Image
              </>
            )
          }
        </Button>
      </div>
      {
        !isEditing && (
          !initailtData.imageUrl ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                <ImageIcon className='h-10 w-10 text-slate-500'/>
            </div>
          ) : (
            <div className="relative aspect-video mt-2">
              <Image
                alt=''
                fill
                className='object-cover rounded-md'
                src={initailtData.imageUrl}
              />
            </div>
          )
        )
      }
      {
        isEditing && (
          <div className="">
            <FileUpload
              endpoint='courseImage'
              onChnage={(url) => {
                if (url) {
                  onSubmit({imageUrl: url})
                }
              }}
            />
            <div className="text-sm text-muted-foreground mt-4">
              16:9 aspect ratio is recommended 
            </div>
          </div>
        )
      }
    </div>
  ) 
}

export default ImageForm