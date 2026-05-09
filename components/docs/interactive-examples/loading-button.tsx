"use client";

import { useState } from "react";
import { LoadingButton } from "@/registry/radix-nova/loading-button";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function LoadingButtonInteractiveExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);

  const triggerLoading = async () => {
    setIsLoading(true);
    await wait(1200);
    setIsLoading(false);
    setCount((prev) => prev + 1);
  };

  return (
    <div className="space-y-2">
      <LoadingButton type="button" isLoading={isLoading} onClick={() => void triggerLoading()}>
        {isLoading ? "Submitting..." : "Submit"}
      </LoadingButton>
      <p className="text-xs text-muted-foreground">Completed: {count}</p>
    </div>
  );
}
