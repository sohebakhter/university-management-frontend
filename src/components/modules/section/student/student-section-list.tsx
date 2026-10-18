"use client";
import { Suspense, useState } from "react";
import SectionTable from "./section-table";
import SectionTableLoading from "./section-table-loading";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/debounce.hook";
import { ISectionFilterParams } from "@/types";

const StudentSectionList = () => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput);

  const queryParams: ISectionFilterParams = {
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };
  return (
    <div>
      <div className="my-3">
        <h1 className="text-2xl font-semibold">Available Sections</h1>
        <Input
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by section, course code or title"
        />
      </div>

      <Suspense fallback={<SectionTableLoading />}>
        <SectionTable {...queryParams} />
      </Suspense>
    </div>
  );
};

export default StudentSectionList;
