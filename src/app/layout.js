import { ToastContainer } from "react-toastify";
import { Notifications } from "@mantine/notifications";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { SidebarProvider } from "@/components/contexts/SidebarContext";
import { UserProvider } from "@/components/contexts/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "mantine-datatable/styles.css";
import "aos/dist/aos.css";
import "../styles/globals.scss";

export const metadata = {
  title: "API HRM",
  description:
    "API HRM is a comprehensive human resource management system designed to simplify employee onboarding, attendance management, shift management, payroll, and document handling. Efficiently manage your workforce with powerful API integrations and user-friendly interfaces.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <UserProvider>
          <MantineProvider>
            <SidebarProvider>{children}</SidebarProvider>

            <Notifications />
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </MantineProvider>
        </UserProvider>
      </body>
    </html>
  );
}
