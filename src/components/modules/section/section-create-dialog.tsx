import CreateSectionForm from "@/components/form/section/create-section-form";
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

const SectionCreateDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Create Section
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Section</DialogTitle>
          <DialogDescription>
            This Section will be visible to students
          </DialogDescription>
        </DialogHeader>

        <CreateSectionForm handleClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default SectionCreateDialog;
