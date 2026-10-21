import InstructorList from "@/components/modules/users/instructor-list";

const AdminInstructorsPage = () => {
  return (
    <div className="p-4">
      <div className="my-5">
        <h1 className="text-2xl font-semibold">Instructor Management</h1>
        <p>Approve or reject instructor applications.</p>
      </div>
      <InstructorList />
    </div>
  );
};

export default AdminInstructorsPage;
