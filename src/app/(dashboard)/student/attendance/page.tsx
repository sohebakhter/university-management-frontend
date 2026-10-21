import StudentAttendanceList from "@/components/modules/attendance/student/student-attendance-list";

const StudentAttendancePage = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="my-3">
        <h1 className="text-2xl font-semibold tracking-tight">My Attendance</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Review your attendance history, section-wise attendance rates, and
          session logs.
        </p>
      </div>
      <StudentAttendanceList />
    </div>
  );
};

export default StudentAttendancePage;
