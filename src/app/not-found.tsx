import Link from "next/link";
import { ArrowLeft, GraduationCap } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
          <GraduationCap size={36} />
        </div>

        <h1 className="text-7xl font-bold tracking-tight text-blue-700">404</h1>

        <h2 className="mt-4 text-xl font-semibold text-slate-800">
          Page Not Found
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Sorry, the page you are looking for doesn't exist or may have been
          moved.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
