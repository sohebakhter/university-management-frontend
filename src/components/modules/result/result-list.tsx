"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileEdit, ClipboardList } from "lucide-react";
import BulkResultForm from "./bulk-result-form";
import ResultViewTable from "./result-view-table";
import ResultCreateDialog from "./result-create-dialog";

type TabView = "bulk-entry" | "view-results";

const ResultList = () => {
  const [activeTab, setActiveTab] = useState<TabView>("bulk-entry");

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-semibold">Result Management</h1>
        <p className="text-sm text-muted-foreground">
          Enter and manage exam results for your sections
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <Button
            variant={activeTab === "bulk-entry" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("bulk-entry")}
          >
            <FileEdit className="mr-2 h-4 w-4" />
            Bulk Entry
          </Button>
          <Button
            variant={activeTab === "view-results" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("view-results")}
          >
            <ClipboardList className="mr-2 h-4 w-4" />
            View Results
          </Button>
        </div>

        <ResultCreateDialog />
      </div>

      {activeTab === "bulk-entry" && <BulkResultForm />}
      {activeTab === "view-results" && <ResultViewTable />}
    </div>
  );
};

export default ResultList;
