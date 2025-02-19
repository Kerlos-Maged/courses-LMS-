'use client'
import React from 'react'
import { UploadDropzone } from '@/lib/uploadthing';
import { ourFileRouter, OurFileRouter } from '@/app/api/uploadthing/core';
import toast from 'react-hot-toast';

interface FileUploadProps {
  onChnage: (url?: string) => void,
  endpoint: keyof typeof ourFileRouter
}

const FileUpload = ({
  onChnage,
  endpoint
}: FileUploadProps) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res)=>{
        onChnage(res?.[0].url)
      }}
      onUploadError={(err: Error) => {
        toast.error(err.message)
      }}
    />
  )
}

export default FileUpload