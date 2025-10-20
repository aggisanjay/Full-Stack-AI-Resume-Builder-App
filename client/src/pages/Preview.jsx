import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ResumePreview from '../Components/ResumePreview';
import Loader from '../Components/Loader';
import { ArrowLeftIcon } from 'lucide-react';
import api from '../configs/api';

const Preview = () => {

  const {resumeId}=useParams()
  
  const [isLoading,setIsLoading]=useState(true);
  const [resumeData,setResumeData]=useState(null);

  const loadResume=async()=>{
    try {
      const {data}=await api.get('/api/resumes/public/'+resumeId)
      setResumeData(data.resume)
    } catch (error) {
      console.log(error.message)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{

    loadResume();

  },[])

  return resumeData ? (
    <div className="bg-slate-100">
      <div className='max-w-3xl mx-auto py-10'>
        <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classes='py-4 bg-white' />

      </div>
     
    </div>
  ):(
    <div>
     {isLoading? <Loader/>:(
      <div className='flex flex-col items-center justify-center h-screen'>
        <p className='text-center text-6xl text-slate-400'>Resume not found</p>
        <a className='mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors' href='/'> 
          <ArrowLeftIcon className='mr-2 sie-4'/>
          go to home page
        </a>
      </div>
     )}
    </div>
  )
}

export default Preview
