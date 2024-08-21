// import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import "ag-grid-community/styles/ag-grid.css"; // Core CSS
// import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
// import { authTokenKey } from "../../lib/config";
// import Accessible from "../../components/utils/CheckAccessibleForMainPages";
import SideMenu from "../../components/app-layouts/SideMenu";
import Navbar from "../../components/app-layouts/TopNavbar";
import { checkIsAuthenticated } from "../../lib/check";
import PageContent from "@/components/providers/PageContent";
import PageWrapper from "@/components/providers/PageWrapper";
// import "../../styles/main.scss";

export const metadata = {
  title: "Dashboard",
  description: "API HRM",
};

export default async function RootLayout({ children }) {
  // const cookieStore = cookies();
  // let token = cookieStore.get(authTokenKey);
  // if (token === undefined || token === null) {
  //   redirect("/auth/login");
  // }

  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated?.status) {
    redirect("/auth/login");
  }

  return (
    <>
      {/* <Accessible /> */}
      <PageWrapper user={isAuthenticated?.user}>
        <SideMenu />
        <Navbar />
        <PageContent>{children}</PageContent>
      </PageWrapper>
    </>
  );
}
