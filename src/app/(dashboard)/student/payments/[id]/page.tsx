"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  ReceiptText,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGetPaymentById } from "@/hooks";

const formatDate = (date: string | null) => {
  if (!date) return "Not available";

  return new Date(date).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const formatAmount = (amount: string, currency: string) => {
  return `${currency} ${Number(amount).toLocaleString("en-BD")}`;
};

const PaymentDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useGetPaymentById(id);
  const payment = data?.data;

  if (isLoading) {
    return (
      <div className="space-y-4 p-2">
        <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="h-40 animate-pulse rounded-lg bg-muted" />
        <div className="h-64 animate-pulse rounded-lg bg-muted" />
      </div>
    );
  }

  if (isError || !payment) {
    return (
      <div className="space-y-4 rounded-lg border p-8 text-center">
        <h2 className="text-lg font-semibold">Payment Not Found</h2>
        <p className="text-sm text-muted-foreground">
          Unable to retrieve payment details. Please try again.
        </p>

        <Button variant="outline" asChild>
          <Link href="/student/payments">Back to Payments</Link>
        </Button>
      </div>
    );
  }

  const gateway = payment.getwayResponse;

  return (
    <div className="w-full p-2 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild>
            <Link href="/student/payments" aria-label="Back to payments">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Payment Details
            </h1>
            <p className="text-sm text-muted-foreground">
              View your transaction information
            </p>
          </div>
        </div>

        <Badge
          variant={
            payment.status === "SUCCESS"
              ? "default"
              : payment.status === "PENDING"
                ? "secondary"
                : "destructive"
          }
          className="px-3 py-1"
        >
          {payment.status}
        </Badge>
      </div>

      {/* Payment Summary */}
      <Card>
        <CardContent className="flex flex-col justify-between gap-5 pt-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-3">
              {payment.status === "SUCCESS" ? (
                <CheckCircle2 className="size-6 text-primary" />
              ) : (
                <CreditCard className="size-6 text-primary" />
              )}
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <h2 className="text-3xl font-bold">
                {formatAmount(payment.amount, payment.currency)}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {payment.semester.name} {payment.semester.year}
              </p>
            </div>
          </div>

          <div className="space-y-1 sm:text-right">
            <p className="text-sm text-muted-foreground">Payment Provider</p>
            <p className="font-semibold">{payment.provider}</p>
            <p className="text-sm text-muted-foreground">
              {payment.bkashTrxId || "Transaction ID unavailable"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ReceiptText className="size-5" />
              Transaction Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <InfoRow
              label="Invoice Number"
              value={payment.merchantInvoiceNumber}
            />
            <Separator />

            <InfoRow
              label="Payment ID"
              value={payment.bkashPaymentId || "N/A"}
            />
            <Separator />

            <InfoRow
              label="Transaction ID"
              value={payment.bkashTrxId || "N/A"}
            />
            <Separator />

            <InfoRow
              label="Payer Reference"
              value={payment.payerReference || "N/A"}
            />
            <Separator />

            <InfoRow label="Created At" value={formatDate(payment.createdAt)} />
            <Separator />

            <InfoRow label="Paid At" value={formatDate(payment.paidAt)} />
          </CardContent>
        </Card>

        {/* Student Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <UserRound className="size-5" />
              Student Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <InfoRow label="Student Name" value={payment.student.name} />
            <Separator />

            <InfoRow label="Email" value={payment.student.email} />
            <Separator />

            <InfoRow label="Student ID" value={payment.student.id} />
            <Separator />

            <InfoRow label="Account Name" value={payment.student.user.name} />
          </CardContent>
        </Card>

        {/* Semester Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <GraduationCap className="size-5" />
              Semester Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <InfoRow label="Semester" value={payment.semester.name} />
            <Separator />

            <InfoRow
              label="Academic Year"
              value={String(payment.semester.year)}
            />
            <Separator />

            <InfoRow
              label="Semester Fee"
              value={formatAmount(payment.semester.feeAmount, payment.currency)}
            />
            <Separator />

            <InfoRow label="Semester Status" value={payment.semester.status} />
          </CardContent>
        </Card>

        {/* Refund Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CalendarDays className="size-5" />
              Refund Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <InfoRow
              label="Refund Transaction ID"
              value={payment.refundTrxId || "No refund"}
            />
            <Separator />

            <InfoRow
              label="Refund Amount"
              value={
                payment.refundAmount
                  ? formatAmount(payment.refundAmount, payment.currency)
                  : "N/A"
              }
            />
            <Separator />

            <InfoRow
              label="Refund Reason"
              value={payment.refundReason || "N/A"}
            />
            <Separator />

            <InfoRow
              label="Refunded At"
              value={formatDate(payment.refundedAt)}
            />
          </CardContent>
        </Card>
      </div>

      {/* Gateway Response */}
      {gateway && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Gateway Response</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <InfoRow
                label="Gateway Status"
                value={String(gateway.statusMessage ?? "N/A")}
              />

              <Separator />

              <InfoRow
                label="Transaction Status"
                value={String(gateway.transactionStatus ?? "N/A")}
              />

              <Separator />

              <InfoRow
                label="Gateway Amount"
                value={
                  gateway.amount != null
                    ? formatAmount(
                        String(gateway.amount),
                        String(gateway.currency ?? payment.currency),
                      )
                    : "N/A"
                }
              />
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button variant="default" asChild>
          <Link href="/student/payments">Back to Payments</Link>
        </Button>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
      <span className="shrink-0 text-sm text-muted-foreground">{label}</span>
      <span className="break-all text-sm font-medium sm:text-right">
        {value}
      </span>
    </div>
  );
};

export default PaymentDetailsPage;
