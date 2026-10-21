"use client";
import { Suspense, useState } from "react";
import UserTable from "./user-table";
import UserTableLoading from "./user-table-loading";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useDebounce } from "@/hooks/debounce.hook";
import { IUserFilterParams, UserRole } from "@/types";

const roles: ["ALL" | UserRole, string][] = [
  ["ALL", "All"],
  ["ADMIN", "Admin"],
  ["INSTRUCTOR", "Instructor"],
  ["STUDENT", "Student"],
];

const UserList = () => {
  const [tab, setTab] = useState<"ALL" | UserRole>("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchInput);

  const queryParams: IUserFilterParams = {
    ...(tab === "ALL" ? {} : { role: tab }),
    page: page,
    limit: 10,
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 my-3">
        <Input
          type="search"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setPage(1);
          }}
          placeholder="Search by name or email"
          className="sm:max-w-xs"
        />
        <Tabs
          value={tab}
          onValueChange={(value) => {
            setTab(value as "ALL" | UserRole);
            setPage(1);
          }}
        >
          <TabsList>
            {roles.map(([value, label]) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Suspense key={JSON.stringify(queryParams)} fallback={<UserTableLoading />}>
        <UserTable params={queryParams} setPage={setPage} />
      </Suspense>
    </div>
  );
};

export default UserList;
