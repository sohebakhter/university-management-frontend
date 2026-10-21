import UserList from "@/components/modules/users/user-list";

const AdminUsersPage = () => {
  return (
    <div className="p-4">
      <div className="my-5">
        <h1 className="text-2xl font-semibold">All Users</h1>
        <p>Manage all users — block or activate accounts.</p>
      </div>
      <UserList />
    </div>
  );
};

export default AdminUsersPage;
