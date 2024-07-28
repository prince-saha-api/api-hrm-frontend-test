import React from "react";
import { fetchData } from "@/lib/get";
import ProfileView from "@/components/app-modules/ProfileView";

async function getData() {
  const res = await fetchData("/api/user/get-profiledetails/14");
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

const Page = async () => {
  const data = await getData();

  return <ProfileView data={data} />;
};

export default Page;
