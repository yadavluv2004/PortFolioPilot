import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '../../../Context/ResumeInfoContext'
import ResumePreview from '../../../dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from '../../../../service/GlobalApi'

function ViewResume() {

  const [resumeInfo, setResumeInfo] = useState()
  const { resumeId } = useParams()

  useEffect(() => {
    GetResumeInfo()
  }, [])

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then(resp => {
      console.log(resp.data.data)
      setResumeInfo(resp.data.data)
    })
  }

  const HandleDownload = () => {
    window.print()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} resume`,
          text: 'Hello Everyone, This is my resume. Please open the URL to see it.',
          url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`,
        })
        console.log('shared successfully!')
      } catch (err) {
        console.error('Share failed:', err.message)
      }
    } else {
      alert('Web Share is not supported in this browser.')
    }
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />

        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
          <h2 className='text-center text-2xl font-medium'>
            Congrats! Your Ultimate AI generated Resume is ready!
          </h2>
          <p className='text-center text-gray-400'>
            Now you are ready to download your resume and you can share unique 
            resume URL with your friends and family
          </p>
          <div className='flex justify-between px-44 my-10'>
            <Button className="bg-purple-600 text-white" onClick={HandleDownload}>
              Download
            </Button>

            <Button className="bg-purple-600 text-white" onClick={handleShare}>
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <div id="print-area">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume
