"use client";

import { Button } from "@/components/ui/button";
import { Result } from "@/types";
import { useState } from "react";
import ResultUpdateDialog from "./result-update-dialog";

const ResultActions = ({ result }: { result: Result }) => {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  return (
    <div className="flex justify-end gap-2">
      <Button variant="default" size="sm" onClick={() => setIsUpdateOpen(true)}>
        Update
      </Button>

      <ResultUpdateDialog
        result={result}
        open={isUpdateOpen}
        onOpenChange={setIsUpdateOpen}
      />
    </div>
  );
};

export default ResultActions;
