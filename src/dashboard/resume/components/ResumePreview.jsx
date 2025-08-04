import React, { useContext } from 'react'
import { ResumeInfoContext } from '../../../Context/ResumeInfoContext'
import PersonalDetails from './preview/PersonalDetails';
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillPreview';
const ResumePreview= () => {
const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);

  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'     style={{
        borderColor:resumeInfo?.themeColor
    }}>
     {/* Personal Detail */}
<PersonalDetails resumeInfo={resumeInfo}/>
     {/* Summary  */}
     <SummaryPreview resumeInfo={resumeInfo}/>
     {/* Proffesional Experience  */}
     <ExperiencePreview resumeInfo={resumeInfo}/>
     {/* Educational detail  */}
     <EducationalPreview resumeInfo={resumeInfo}/>
     {/* Skills */}
     <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview
