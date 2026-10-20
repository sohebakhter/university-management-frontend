"use client";

import CreateResultForm from "@/components/form/result/create-result-form";
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

const ResultCreateDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          Add Single Result
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Result</DialogTitle>
          <DialogDescription>
            Add a result for a single student in an exam
          </DialogDescription>
        </DialogHeader>

        <CreateResultForm handleClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default ResultCreateDialog;
