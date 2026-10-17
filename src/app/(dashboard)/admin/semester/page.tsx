import SemesterList from "@/components/modules/semesters/semester-list";

const AdminSemesterPage = () => {
  return (
    <div className="p-4">
      <div className="my-5">
        <h1 className="text-2xl font-semibold">Semesters</h1>
        <p>here is the Semesters.</p>
      </div>
      <SemesterList />
    </div>
  );
};

export default AdminSemesterPage;
