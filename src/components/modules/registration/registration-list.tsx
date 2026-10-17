import { Suspense } from "react";
import RegistrationTable from "./registration-table";
import RegistrationTableLoading from "./registration-table-loading";

const RegistrationList = () => {
  return (
    <div>
      <Suspense fallback={<RegistrationTableLoading />}>
        <RegistrationTable />
      </Suspense>
    </div>
  );
};

export default RegistrationList;
