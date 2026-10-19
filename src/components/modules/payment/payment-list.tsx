"use client";

import { Button } from "@/components/ui/button";
import { useGetMyPayments } from "@/hooks";
import { Payment } from "@/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PaymentList = () => {
  const params = useSearchParams();
  const status = params.get("status");

  const { data, isLoading } = useGetMyPayments();
  const payments: Payment[] = data?.data || [];

  if (status === "success" || status === "failure" || status === "cancel") {
    const isSuccess = status === "success";
    const isCancelled = status === "cancel";

    return (
      <div className="space-y-3 rounded-lg border p-6 text-center">
        <h1 className="text-xl font-semibold">
          {isSuccess
            ? "Payment Successful"
            : isCancelled
              ? "Payment Cancelled"
              : "Payment Failed"}
        </h1>

        <p className="text-sm text-muted-foreground">
          {isSuccess
            ? "Your payment has been completed successfully."
            : isCancelled
              ? "You cancelled the payment. You can try again whenever you are ready."
              : "Your payment could not be completed. Please try again."}
        </p>

        <Button variant="outline" asChild>
          <Link href="/student/payments">Go Back to Payments</Link>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading payments...</p>;
  }

  if (payments.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">There are no payments.</p>
    );
  }

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <div key={payment.id} className="rounded-lg border p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1 space-y-1">
              <h3 className="font-semibold">{payment.semester.name}</h3>

              <p className="text-sm text-muted-foreground">
                Academic Year: {payment.semester.year}
              </p>

              <p className="text-sm">
                Amount:{" "}
                <span className="font-medium">
                  {payment.currency}{" "}
                  {Number(payment.amount).toLocaleString("en-BD")}
                </span>
              </p>

              <p className="text-sm text-muted-foreground">
                Provider: {payment.provider}
              </p>

              <p className="break-all text-sm text-muted-foreground">
                Transaction ID: {payment.bkashTrxId || "N/A"}
              </p>

              <p className="text-sm text-muted-foreground">
                Paid At:{" "}
                {payment.paidAt
                  ? new Date(payment.paidAt).toLocaleString("en-BD")
                  : "Not paid yet"}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  payment.status === "SUCCESS"
                    ? "bg-green-100 text-green-700"
                    : payment.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : payment.status === "REFUNDED"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                }`}
              >
                {payment.status}
              </span>

              {payment.status === "SUCCESS" && (
                <Button size="sm" variant="outline" asChild>
                  <Link href={`/student/payments/${payment.id}`}>
                    View Details
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentList;
