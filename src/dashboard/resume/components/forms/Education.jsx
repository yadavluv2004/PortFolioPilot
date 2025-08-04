import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Brain, LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { generateAISummary } from "../../../../../service/AIModel";


function Education() {

  const [loading,setLoading]=useState(false);
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
  const params=useParams();
  const [educationalList,setEducationalList]=useState([
    {
      universityName:'',
      degree:'',
      major:'',
      startDate:'',
      endDate:'',
      description:''
    }
  ])

  useEffect(()=>{
    resumeInfo&&setEducationalList(resumeInfo?.education)
  },[])
  const handleChange=(event,index)=>{
    const newEntries=educationalList.slice();
    const {name,value}=event.target;
    newEntries[index][name]=value;
    setEducationalList(newEntries);
  }

const GenerateSummaryAi = async () => {
  try {
    setLoading(true);

    const edu = educationalList?.[educationalList.length - 1];
    if (!edu) {
      toast.error("Education data not found");
      setLoading(false);
      return;
    }

    const jobTitle = resumeInfo?.jobTitle || "Software Engineer";

    const prompt = `
Given the following educational background:
- University Name: ${edu.universityName}
- Degree: ${edu.degree}
- Major: ${edu.major}
- Job Title: ${jobTitle}

Write 3 professional resume summary lines (2-3 sentences each) tailored for:
1. Fresher
2. Mid-Level Professional
3. Senior Professional

Each summary should highlight achievements, technical focus, or relevance to the job title. Return response as a JSON array: 
[
  { "experience_level": "Fresher", "summary": "..." },
  { "experience_level": "Mid-Level", "summary": "..." },
  { "experience_level": "Senior", "summary": "..." }
]
`;

    const response = await generateAISummary(prompt);

    const cleaned = response
      .replace(/```json/i, "")
      .replace(/```/, "")
      .trim();

    const parsed = JSON.parse(cleaned);
    const fresherSummary = parsed.find(p => p.experience_level === "Fresher")?.summary;

    if (fresherSummary) {
      const updatedList = [...educationalList];
      updatedList[updatedList.length - 1].description = fresherSummary;
      setEducationalList(updatedList);
      toast("✅ Summary added to description");
    } else {
      toast("❌ Couldn't find Fresher summary in response");
    }

  } catch (err) {
    console.error("AI Summary Error:", err);
    toast.error("Failed to generate AI summary");
  } finally {
    setLoading(false);
  }
};




  const AddNewEducation=()=>{
    setEducationalList([...educationalList,
      {
        universityName:'',
        degree:'',
        major:'',
        startDate:'',
        endDate:'',
        description:''
      }
    ])
  }
  const RemoveEducation=()=>{
    setEducationalList(educationalList=>educationalList.slice(0,-1))

  }
  const onSave=()=>{
    setLoading(true)
    const data={
      data:{
        education:educationalList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateResumeDetail(params.resumeId,data).then(resp=>{
      console.log(resp);
      setLoading(false)
      toast('Details updated !')
    },(error)=>{
      setLoading(false);
      toast('Server Error, Please try again!')
    })

  }

  useEffect(()=>{
    setResumeInfo({
      ...resumeInfo,
      education:educationalList
    })
  },[educationalList])
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Education</h2>
    <p>Add Your educational details</p>

    <div>
      {educationalList.map((item,index)=>(
        <div>
          <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
            <div className='col-span-2'>
              <label>University Name</label>
              <Input name="universityName" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.universityName}
              />
            </div>
            <div>
              <label>Degree</label>
              <Input name="degree" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.degree} />
            </div>
            <div>
              <label>Major</label>
              <Input name="major" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.major} />
            </div>
            <div>
              <label>Start Date</label>
              <Input type="date" name="startDate" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.startDate} />
            </div>
            <div>
              <label>End Date</label>
              <Input type="date" name="endDate" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.endDate} />
            </div>
          <div className='col-span-2'>
  <label>Description</label>
  <Button
    size="sm"
    variant="outline"
    disabled={loading}
    className="float-right text-xs text-white bg-purple-600 hover:bg-purple-100"
    onClick={GenerateSummaryAi}
  >
    {loading ? (
      <LoaderCircle className="w-4 h-4 animate-spin" />
    ) : (
      <>
        <Brain className="w-4 h-4 mr-1" /> Generate from AI
      </>
    )}
  </Button>
  <Textarea
    name="description"
    onChange={(e) => handleChange(e, index)}
    defaultValue={item?.description}
  />
</div>


          </div>
       
        </div>
      ))}
    </div>
    <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewEducation} className="text-primary"> + Add More Education</Button>
            <Button variant="outline" onClick={RemoveEducation} className="text-primary"> - Remove</Button>

            </div>
            <Button disabled={loading} onClick={()=>onSave()}>
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
    </div>
  )
}

export default Education



