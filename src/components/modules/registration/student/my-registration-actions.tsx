"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useBkashCheckout,
  useDropRegistration,
  useInitiateBkashPayment,
} from "@/hooks";
import { Registration } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

interface IPayConfirmation {
  paymentId: string;
}

const MyRegistrationActions = ({
  registration,
}: {
  registration: Registration;
}) => {
  const [confirmation, setConfirmation] = useState(false);
  const [paymentConfirmation, setPaymentConfirmation] =
    useState<IPayConfirmation | null>(null);
  const { mutate: dropReg, isPending: isDropping } = useDropRegistration();
  const { mutate: checkout, isPending: isCheckingout } = useBkashCheckout();
  const { mutate: payment, isPending: isPaymenting } =
    useInitiateBkashPayment();

  const locked = registration.status === "DROPPED";
  const isPendingStatus = registration.status === "PENDING";

  const handleCheckout = () => {
    checkout(
      { semesterId: registration.section.semesterId },
      {
        onSuccess: (res) => {
          setPaymentConfirmation({
            paymentId: res.data.paymentId,
          });
          console.log(res);
        },
        onError: (error) => {
          console.error("Checkout error:", error);
          toast.error(error.message || "Checkout failed");
        },
      },
    );
  };

  const handlePayment = () => {
    if (!paymentConfirmation?.paymentId) {
      toast.error("Payment information not found");
      return;
    }

    payment(
      { paymentId: paymentConfirmation.paymentId },
      {
        onSuccess: (res) => {
          window.location.href = res.data.paymentUrl;
        },
        onError: (error) => {
          console.error("Payment initiation error:", error);
          toast.error(error.message || "Payment initiation failed");
        },
      },
    );
  };

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
    <>
      <div className="flex justify-end gap-2">
        {isPendingStatus && (
          <Button
            variant="default"
            size="sm"
            onClick={handleCheckout}
            disabled={isCheckingout}
          >
            {isCheckingout ? "Processing..." : "Checkout"}
          </Button>
        )}

        <Button
          variant="destructive"
          size="sm"
          onClick={() => setConfirmation(true)}
          disabled={locked}
        >
          Drop
        </Button>
      </div>

      <Dialog
        open={!!paymentConfirmation}
        onOpenChange={(open) => {
          if (!open) {
            setPaymentConfirmation(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Checkout Successful</DialogTitle>
            <DialogDescription>
              Please complete your payment within 10 minutes to keep your
              registration.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPaymentConfirmation(null)}
            >
              Pay Later
            </Button>
            <Button onClick={handlePayment} disabled={isPaymenting}>
              {isPaymenting ? "Redirecting..." : "Pay Now"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyRegistrationActions;
