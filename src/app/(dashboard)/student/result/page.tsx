import StudentResultList from "@/components/modules/result/student/student-result-list";

const StudentResultPage = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="my-3">
        <h1 className="text-2xl font-semibold tracking-tight">My Results</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review your published exam grades, marks, and GPA performance across
          all enrolled courses.
        </p>
      </div>
      <StudentResultList />
    </div>
  );
};

export default StudentResultPage;
