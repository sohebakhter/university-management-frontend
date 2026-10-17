import SectionList from "@/components/modules/section/section-list";

const AdminSectionPage = () => {
  return (
    <div className="p-4">
      <div className="my-5">
        <h1 className="text-2xl font-semibold">Sections</h1>
        <p>here is the Sections.</p>
      </div>
      <SectionList />
    </div>
  );
};

export default AdminSectionPage;
