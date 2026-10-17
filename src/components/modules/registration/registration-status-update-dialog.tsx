"use client";

import UpdateRegistrationStatusForm from "@/components/form/registration/update-registration-status-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Registration } from "@/types";

interface RegistrationUpdateDialogProps {
  registration: Registration;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegistrationStatusUpdateDialog = ({
  registration,
  open,
  onOpenChange,
}: RegistrationUpdateDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Registration Status</DialogTitle>
          <DialogDescription>
            This Registration will be visible to students
          </DialogDescription>
        </DialogHeader>
        <UpdateRegistrationStatusForm
          handleClose={() => onOpenChange(false)}
          registration={registration}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationStatusUpdateDialog;
