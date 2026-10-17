// import UpdateSemesterForm from "@/components/form/semester/update-semester-form";
import UpdateSectionForm from "@/components/form/section/update-section-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Section } from "@/types";

interface SectionUpdateDialogProps {
  section: Section;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SectionUpdateDialog = ({
  section,
  open,
  onOpenChange,
}: SectionUpdateDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update section</DialogTitle>
          <DialogDescription>
            This section will be visible to students
          </DialogDescription>
        </DialogHeader>

        <UpdateSectionForm
          handleClose={() => onOpenChange(false)}
          section={section}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SectionUpdateDialog;
