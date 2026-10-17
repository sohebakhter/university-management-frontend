import RegistrationList from "@/components/modules/registration/registration-list";

const AdminRegistrationPage = () => {
  return (
    <div className="p-4">
      <div className="my-3">
        <h1 className="text-2xl font-semibold">Registrations</h1>
        <p>all the register student list here in various section.</p>
      </div>
      <RegistrationList />
    </div>
  );
};

export default AdminRegistrationPage;
