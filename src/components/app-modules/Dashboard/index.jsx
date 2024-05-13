"use client";

import React, { useEffect } from "react";
import useSWR from "swr";
import Button from "react-bootstrap/Button";
import { Col, Row } from "react-bootstrap";
import { MdGroups } from "react-icons/md";
import Spinner from "react-bootstrap/Spinner";
import AOS from "aos";
import classEase from "classease";
import { fetcher } from "../../../lib/fetch";

const index = () => {
  useEffect(() => {
    AOS.init();
  });

  const {
    data: dashboardData,
    error,
    isValidating,
    isLoading,
    mutate,
  } = useSWR(`/dashboard/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const dataObj = dashboardData ? dashboardData.data[0] : {};
  const data = dataObj
    ? {
        Employees: dataObj.total_employee,
        Departments: dataObj.total_departments,
        Devices: dataObj.total_device,
        "Active Devices": dataObj.total_active_devices,
        "Inactive Devices": dataObj.total_device - dataObj.total_active_devices,
        // "Checkable Devices": dataObj.total_chekable_devices,
        Groups: dataObj.total_group,
        // Shifts: dataObj.total_shift,
      }
    : {};

  return (
    <>
      <h3>This is Dashboard</h3>
    </>
  );
};

export default index;
