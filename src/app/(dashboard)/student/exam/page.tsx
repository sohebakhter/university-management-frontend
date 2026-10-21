import StudentExamList from "@/components/modules/exam/student/student-exam-list";

const StudentExamPage = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="my-3">
        <h1 className="text-2xl font-semibold tracking-tight">
          Available Exams
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          View all scheduled exams and assessments for your enrolled courses and
          sections.
        </p>
      </div>
      <StudentExamList />
    </div>
  );
};

export default StudentExamPage;
