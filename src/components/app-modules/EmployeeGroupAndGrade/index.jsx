"use client";
import React from "react";
import { Grid } from "@mantine/core";
import Breadcrumb from "@/components/utils/Breadcrumb";
import EmployeeGroup from "../EmployeeGroup";
import EmployeeGrade from "../EmployeeGrade";

const index = () => {
  return (
    <>
      <div className="mb-4">
        <Breadcrumb
          title="Employee Group And Grade"
          items={[
            { title: "Dashboard", href: "/dashboard" },
            { title: "Employee Group And Grade" },
          ]}
        />
      </div>

      <Grid>
        <Grid.Col span={{ base: 12, xl: 6 }}>
          <div className="itemCard">
            <EmployeeGroup />
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xl: 6 }}>
          <div className="itemCard">
            <EmployeeGrade />
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default index;
