import MyRegistrationList from "@/components/modules/registration/student/my-registration-list";

const StudentRegistrationPage = () => {
  return (
    <div className="p-4">
      <div className="my-3">
        <h1 className="text-2xl font-semibold">My Registrations</h1>
        <p>all the registion list here in various section.</p>
      </div>
      <MyRegistrationList />
    </div>
  );
};

export default StudentRegistrationPage;
