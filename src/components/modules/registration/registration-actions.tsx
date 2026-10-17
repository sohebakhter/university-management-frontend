"use client";

import { Button } from "@/components/ui/button";
import { useDropRegistration } from "@/hooks";
import { Registration } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import RegistrationStatusUpdateDialog from "./registration-status-update-dialog";

const RegistrationActions = ({
  registration,
}: {
  registration: Registration;
}) => {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const { mutate: dropReg, isPending: isDropping } = useDropRegistration();

  const locked = registration.status === "DROPPED";

  const handleDrop = () => {
    dropReg(registration.id, {
      onSuccess: () => {
        toast.success("Registration dropped successfully");
      },
      onError: (error) => {
        console.error("Error dropping registration:", error);
        toast.error(error.message || "Registration drop failed");
      },
    });
  };

  return (
    <div className="flex justify-end gap-2">
      <Button variant="default" size="sm" onClick={() => setIsUpdateOpen(true)}>
        Update Status
      </Button>

      <RegistrationStatusUpdateDialog
        registration={registration}
        open={isUpdateOpen}
        onOpenChange={setIsUpdateOpen}
      />

      <Button
        variant="destructive"
        size="sm"
        onClick={handleDrop}
        disabled={isDropping || locked}
      >
        Drop
      </Button>
    </div>
  );
};

export default RegistrationActions;
