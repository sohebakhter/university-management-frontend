import { Suspense } from "react";
import MyRegistrationTable from "./my-registration-table";
import MyRegistrationTableLoading from "./my-registration-table-loading";

const MyRegistrationList = () => {
  return (
    <div>
      <Suspense fallback={<MyRegistrationTableLoading />}>
        <MyRegistrationTable />
      </Suspense>
    </div>
  );
};

export default MyRegistrationList;
