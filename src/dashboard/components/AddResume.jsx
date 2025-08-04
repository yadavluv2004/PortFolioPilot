import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "./../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
 
  const onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };

    GlobalApi.CreateNewResume(data)
      .then((resp) => {
        console.log("Create Resume Response:", resp);

        const documentId = resp?.data?.data?.id; // <- Strapi returns `id` here
        if (documentId) {
          setLoading(false);
          navigation(`/dashboard/resume/${resp.data.data.documentId}/edit`);
        } else {
          console.error("No document ID returned");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error creating resume:", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <div
        className="p-14 py-24 border 
        items-center flex 
        justify-center bg-secondary
        rounded-lg h-[280px]
        hover:scale-105 transition-all hover:shadow-md
        cursor-pointer border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

     <Dialog open={openDialog} onOpenChange={setOpenDialog}>
  <DialogContent className="bg-white rounded-xl border border-gray-200 shadow-lg">
    <DialogHeader>
      <DialogTitle>Create New Resume</DialogTitle>
      <DialogDescription>
        Add a title for your new resume
        <Input
          className="my-2"
          placeholder="Ex. Full Stack resume"
          onChange={(e) => setResumeTitle(e.target.value)}
        />
      </DialogDescription>
      <div className="flex justify-end gap-5 mt-4">
        <Button 
          onClick={() => setOpenDialog(false)} 
          variant="ghost"
        >
          Cancel
        </Button>
        <Button
          disabled={!resumeTitle || loading}
          onClick={onCreate}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Create"}
        </Button>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>


    </div>
  );
}

export default AddResume;
