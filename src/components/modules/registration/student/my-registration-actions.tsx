"use client";

import { Button } from "@/components/ui/button";
import { useDropRegistration } from "@/hooks";
import { Registration } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

const MyRegistrationActions = ({
  registration,
}: {
  registration: Registration;
}) => {
  const [confirmation, setConfirmation] = useState(false);
  const { mutate: dropReg, isPending: isDropping } = useDropRegistration();

  const locked = registration.status === "DROPPED";

  const handleDrop = () => {
    dropReg(registration.id, {
      onSuccess: () => {
        toast.success("Registration dropped successfully");
        setConfirmation(false);
      },
      onError: (error) => {
        console.error("Error dropping registration:", error);
        toast.error(error.message || "Registration drop failed");
      },
    });
  };

  if (confirmation) {
    return (
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setConfirmation(false)}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDrop}
          disabled={isDropping}
        >
          Confirm
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setConfirmation(true)}
        disabled={locked}
      >
        Drop
      </Button>
    </div>
  );
};

export default MyRegistrationActions;
