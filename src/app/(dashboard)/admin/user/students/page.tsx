import StudentList from "@/components/modules/users/student-list";

const AdminStudentsPage = () => {
  return (
    <div className="p-4">
      <div className="my-5">
        <h1 className="text-2xl font-semibold">Student Management</h1>
        <p>View and manage all enrolled students.</p>
      </div>
      <StudentList />
    </div>
  );
};

export default AdminStudentsPage;
