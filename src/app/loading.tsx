import { BookOpen, GraduationCap } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
          <GraduationCap size={34} />
        </div>

        <div className="relative flex h-10 w-10 items-center justify-center">
          <div className="absolute h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
          <BookOpen size={16} className="text-blue-600" />
        </div>

        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-800">
            University Portal
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Loading your experience...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
