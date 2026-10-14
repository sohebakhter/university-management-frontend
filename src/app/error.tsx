"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = ({ reset }: ErrorProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
          <AlertTriangle size={32} />
        </div>

        <h2 className="mt-5 text-xl font-semibold text-slate-800">
          Something Went Wrong!
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          We couldn't load this page. Please try again in a moment.
        </p>

        <Button
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <RefreshCw size={16} />
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
