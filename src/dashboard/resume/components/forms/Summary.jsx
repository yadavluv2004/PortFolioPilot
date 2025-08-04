import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '../../../../Context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { generateAISummary } from "../../../../../service/AIModel";

function Summery({enableNext}) {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [summery,setSummery]=useState();
    const [loading,setLoading]=useState(false);
    const params=useParams();
    const [aiGeneratedSummeryList,setAiGenerateSummeryList]=useState();
    useEffect(()=>{
        summery&&setResumeInfo({
            ...resumeInfo,
            summery:summery
        })
    },[summery])

  const GenerateSummaryAi = async () => {
    try {
      setLoading(true);
      setSummery(""); // clear textarea
      setAiGenerateSummeryList([]); // clear old suggestions

      const jobTitle = resumeInfo?.jobTitle || "Software Engineer";

      const prompt = `Job Title: ${jobTitle}, give 3 summaries for Fresher, Mid-Level, and Senior in 3-4 lines. Return in JSON: [{ experience_level, summary }]`;

      const response = await generateAISummary(prompt);

      // Clean up Markdown-style response
      const cleaned = response
        .replace(/```json/i, "")
        .replace(/```/, "")
        .trim();

      const parsed = JSON.parse(cleaned); // ✅ parse clean JSON
      setAiGenerateSummeryList(parsed);

      toast("✅ AI Summaries generated");
    } catch (err) {
      console.error("AI Summary Error:", err);
      toast.error("Failed to generate AI summary");
    } finally {
      setLoading(false);
    }
  };

    const onSave=(e)=>{
        e.preventDefault();
       
        setLoading(true)
        const data={
            data:{
                summery:summery
            }
        }
        GlobalApi.UpdateResumeDetail(params?.resumeId,data).then(resp=>{
            console.log(resp);
            enableNext(true);
            setLoading(false);
            toast("Details updated")
        },(error)=>{
            setLoading(false);
        })
    }
    return (
    <div>
         <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summery</h2>
        <p>Add Summery for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
            <div className='flex justify-between items-end'>
                <label>Add Summery</label>
                <Button variant="outline"  onClick={()=>GenerateSummaryAi()} 
                type="button" size="sm" className="bg-purple-600 text-white flex gap-2"> 
                <Brain className='h-4 w-4' />  Generate from AI</Button>
            </div>
            <Textarea className="mt-5" required
            value={summery}
                defaultValue={summery?summery:resumeInfo?.summery}
            onChange={(e)=>setSummery(e.target.value)}
            />
            <div className='mt-2 flex justify-end'>
            <Button type="submit" className="bg-purple-600 text-white"
                disabled={loading}>
                    {loading?<LoaderCircle className='animate-spin' />:'Save'}
                    </Button>
            </div>
        </form>
        </div>

        
       {aiGeneratedSummeryList&& <div className='my-5'>
            <h2 className='font-bold text-lg'>Suggestions</h2>
            {aiGeneratedSummeryList?.map((item,index)=>(
                <div key={index} 
                onClick={()=>setSummery(item?.summary)}
                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                    <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                    <p>{item?.summary}</p>
                </div>
            ))}
        </div>}

    </div>
  )
}

export default Summery

