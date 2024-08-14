"use client"

import classEase from "classease";
import { useSidebar } from "@/components/contexts/SidebarContext";

const PageContent = ({ children }) => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className={classEase(isSidebarOpen && "Side", "pageContent")}>
      {children}
    </div>
  );
};

export default PageContent;
