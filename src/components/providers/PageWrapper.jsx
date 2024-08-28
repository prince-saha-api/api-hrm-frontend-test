"use client";

import { useEffect, useState } from "react";
import classEase from "classease";
import { useSidebar } from "@/components/contexts/SidebarContext";
import { useUser } from "@/components/contexts/UserContext";
import Preloader from "@/components/utils/Preloader";

const PageWrapper = ({ children, user }) => {
  const { isSidebarOpen } = useSidebar();
  const { setUser } = useUser();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
    setIsLoaded(true);
  }, [user]);

  if (!isLoaded) {
    return <Preloader />;
  }

  return (
    <div className={classEase(isSidebarOpen && "main", "wrapper")}>
      {children}
    </div>
  );
};

export default PageWrapper;
