import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '../../Context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar
} from 'react-simple-wysiwyg';
import { generateAISummary } from "../../../service/AIModel";
import { toast } from 'sonner';

const PROMPT = `
You are a resume writing assistant. Based on the position title: "{positionTitle}", generate 5–7 bullet points for the experience section of a resume.

🔴 IMPORTANT: Only return the result as an HTML <ul> list with <li> items.
❌ DO NOT include any introduction, explanation, description, or headings.
❌ DO NOT use phrases like "Here are", "Below are", or "Formatted in HTML".
✅ ONLY return pure HTML content.

Example output:
<ul>
  <li>Designed and deployed...</li>
  <li>Managed and optimized...</li>
</ul>
`;


function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummaryAi = async () => {
    try {
      if (!resumeInfo?.experience[index]?.title) {
        toast('Please Add Position Title');
        return;
      }

      setLoading(true);
      const prompt = PROMPT.replace('{positionTitle}', resumeInfo.experience[index].title);
      const response = await generateAISummary(prompt);

      const cleaned = response
        .replace(/```html|```json|```/gi, '') // remove markdown-style wrappers
        .trim();

      // Apply the HTML summary to editor
      setValue(cleaned);
      onRichTextEditorChange({ target: { value: cleaned } });

      toast("✅ AI Summary generated");
    } catch (err) {
      console.error("AI Summary Error:", err);
      toast.error("Failed to generate AI summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summery</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryAi}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className='animate-spin' />
          ) : (
            <>
              <Brain className='h-4 w-4' /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;




