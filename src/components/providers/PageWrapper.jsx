"use client";

import { useEffect } from "react";
import classEase from "classease";
import { useSidebar } from "@/components/contexts/SidebarContext";
import { useUser } from "@/components/contexts/UserContext";

const PageWrapper = ({ children, user }) => {
  const { isSidebarOpen } = useSidebar();
  const { setUser } = useUser();

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  return (
    <div className={classEase(isSidebarOpen && "main", "wrapper")}>
      {children}
    </div>
  );
};

export default PageWrapper;
