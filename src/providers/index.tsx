"use client";
import { ReactNode } from "react";
import { QueryProvider } from "./query.provider";

export const Providers = ({ children }: { children: ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>;
};
