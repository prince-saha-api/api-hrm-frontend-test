"use client";

import classEase from "classease";
import { useSidebar } from "@/components/contexts/SidebarContext";

const PageWrapper = ({ children }) => {
  const { isSidebarOpen } = useSidebar();
  return (
    <div className={classEase(isSidebarOpen && "main", "wrapper")}>
      {children}
    </div>
  );
};

export default PageWrapper;
