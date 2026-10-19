export type PaymentStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentProvider = "BKASH" | "STRIPE" | "SSLCOMMERZ";

export interface Payment {
  id: string;
  studentId: string;
  semesterId: string;
  amount: string;
  currency: string;
  provider: PaymentProvider;
  status: PaymentStatus;
  merchantInvoiceNumber: string;
  bkashPaymentId: string | null;
  bkashTrxId: string | null;
  payerReference: string | null;
  paidAt: string | null;
  gatewayResponse: Record<string, unknown> | null;
  refundTrxId: string | null;
  refundAmount: string | null;
  refundReason: string | null;
  refundedAt: string | null;
  createdAt: string;
  updatedAt: string;
  semester: {
    id: string;
    name: string;
    year: number;
    feeAmount: string;
  };
}
