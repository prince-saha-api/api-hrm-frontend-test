import React from "react";
import { fetchData } from "@/lib/get";
import ProfileView from "@/components/app-modules/ProfileView";

export const metadata = {
  title: "Profile - API HRM",
};

async function getData(id) {
  const res = await fetchData(`/api/user/get-profiledetails/${id}`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  console.log(res);

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error("Failed to fetch data");
  // }

  // return res.json();
  return res?.data;
}

// export async function generateStaticParams() {
//   const res = await fetchData("/api/user/get-employee/");
//   const employees = (await res?.data?.result) || [];

//   return employees.map((employee) => ({
//     id: employee.id,
//   }));
// }

// export const fetchCache = "force-no-store";
// export const dynamicParams = true;
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return [];
}

const Page = async ({ params }) => {
  const data = await getData(params.id);

  return <ProfileView data={data} />;
};

export default Page;
