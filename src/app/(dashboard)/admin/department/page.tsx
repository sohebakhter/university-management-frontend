import DepartmentList from "@/components/modules/departments/department-list";

const AdminDepartmentPage = () => {
  return (
    <div className="p-4">
      <div className="my-5">
        <h1 className="text-2xl font-semibold">Departments</h1>
        <p>here is the departments.</p>
      </div>
      <DepartmentList />
    </div>
  );
};

export default AdminDepartmentPage;
