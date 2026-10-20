"use client";

import CreateExamForm from "@/components/form/exam/create-exam-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

const ExamCreateDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Create Exam
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Exam</DialogTitle>
          <DialogDescription>
            Create a new examination for one of your assigned sections
          </DialogDescription>
        </DialogHeader>

        <CreateExamForm handleClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default ExamCreateDialog;
