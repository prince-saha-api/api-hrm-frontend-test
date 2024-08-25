"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useDisclosure } from "@mantine/hooks";
import { Grid } from "@mantine/core";
import { toast } from "react-toastify";
import { countries } from "@/data/countries";
import { DataTable } from "mantine-datatable";
import {
  Button,
  Select,
  Breadcrumbs,
  Anchor,
  Accordion,
  TextInput,
  MultiSelect,
  Popover,
  Box,
  Modal,
  NumberInput,
  Menu,
} from "@mantine/core";
import { constants } from "@/lib/config";
import { submit } from "@/lib/submit";
import { fetcher, getData } from "@/lib/fetch";
import { formatDate, getDate, getTime, getStoragePath } from "@/lib/helper";
import Breadcrumb from "@/components/utils/Breadcrumb";
import FilterModal from "@/components/utils/EmployeeFilterModal";

const PAGE_SIZES = [20, 30, 40, 50];

const Index = () => {
  const [filterOpened, { open: filterOpen, close: filterClose }] =
    useDisclosure(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "username",
    direction: "asc", // desc
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPolicies, setSelectedPolicies] = useState([]);

  const [filterData, setFilterData] = useState(null);

  let apiUrl = `/api/user/get-employee/?page=${currentPage}&page_size=${pageSize}&column_accessor=${
    sortStatus?.direction === "desc" ? "-" : ""
  }${sortStatus.columnAccessor}`;

  if (filterData) {
    Object.keys(filterData).forEach((key) => {
      const value = filterData[key];

      if (Array.isArray(value)) {
        if (value[0] !== null && value[1] !== null) {
          apiUrl += `&${key}_from=${encodeURIComponent(
            value[0]
          )}&${key}_to=${encodeURIComponent(value[1])}`;
        }
      } else if (value) {
        apiUrl += `&${key}=${encodeURIComponent(value)}`;
      }
    });
  }

  const {
    data: apiData,
    error,
    isValidating,
    isLoading,
    mutate,
  } = useSWR(apiUrl, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
    revalidateOnFocus: false,
  });

  const {
    data: leavepolicyData,
    error: leavepolicyError,
    isLoading: isLeavepolicyLoading,
  } = useSWR(`/api/leave/get-leavepolicy/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const leavepolicies = leavepolicyData?.data?.result?.map((item) => ({
    label: item?.name?.toString() || "",
    value: item?.id.toString() || "",
  }));

  const [selectedRecords, setSelectedRecords] = useState([]);

  const handleSortStatusChange = (status) => {
    console.log(status);
    setSortStatus(status);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    // mutate();
  };

  useEffect(() => {
    setSelectedRecords([]);
  }, [filterData]);

  const handleBulkAssign = async () => {
    const employees = selectedRecords.map((e) => Number(e?.id)).filter(Boolean);
    const policies = selectedPolicies.map((p) => Number(p)).filter(Boolean);
    // console.log(employees, policies);
    // return;

    const values = {
      user: employees,
      leavepolicy: policies,
    };

    if (!values?.leavepolicy?.length) {
      toast.error("Select leave policy");
      return;
    }

    setIsSubmitting(true);

    // return;

    try {
      const response = await submit("/api/leave/assign-leavepolicy/", values);

      if (response?.status === "success") {
        // console.log(response);
        setIsSubmitting(false);
        // form.reset();
        // close();
        setSelectedPolicies([]);
        setSelectedRecords([]);
        mutate();
        toast.success("Leave policy assigned successfully");
      } else {
        setIsSubmitting(false);
        // toast.error(
        //   response?.status === "error"
        //     ? response?.message[0]
        //     : "Error submitting form"
        // );
        if (response?.status === "error" && Array.isArray(response.message)) {
          response.message.forEach((msg) => {
            toast.error(msg);
          });
        } else {
          toast.error("Error updating");
        }
      }
    } catch (error) {
      console.error("Error updating:", error);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 500);
    }
  };

  return (
    <>
      <FilterModal
        opened={filterOpened}
        close={filterClose}
        data={filterData}
        setData={setFilterData}
      />

      <div className="pageTop mb-4">
        <Breadcrumb
          title="Leave Policy Assign"
          items={[
            { title: "Dashboard", href: "/dashboard" },
            { title: "Leave Policy Assign" },
          ]}
        />
      </div>

      <div id="leavePolicy" className="itemCard">
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
            <MultiSelect
              label="Leave Policy"
              placeholder="Leave Policy"
              data={leavepolicies}
              searchable
              value={selectedPolicies}
              onChange={setSelectedPolicies}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <div className="d-flex align-items-center mt-4">
              <p className="mb-0 me-3">Employee</p>
              <Button onClick={filterOpen}>Filter</Button>
            </div>
          </Grid.Col>
          <Grid.Col span={12}>
            <Button
              className="mb-3"
              loading={isSubmitting}
              loaderProps={{ type: "dots" }}
              disabled={selectedRecords?.length === 0}
              onClick={() => handleBulkAssign()}
            >
              Assign
            </Button>
            <div className="itemCard p-0 datatable-wrapper">
              <DataTable
                style={{
                  height: apiData?.results?.length === 0 ? "300px" : "auto",
                }}
                classNames={{
                  root: "datatable",
                  table: "datatable_table",
                  header: "datatable_header",
                  pagination: "datatable_pagination",
                }}
                // borderColor="#e0e6ed66"
                // rowBorderColor="#e0e6ed66"
                // c={{ dark: "#ffffff", light: "#0E1726" }}
                // highlightOnHover
                horizontalSpacing="sm"
                verticalSpacing="sm"
                fz="sm"
                verticalAlign="center"
                striped
                columns={[
                  {
                    title: "#",
                    accessor: "na",
                    width: 40,
                    noWrap: true,
                    sortable: false,
                    render: (_, index) =>
                      (currentPage - 1) * pageSize + index + 1,
                  },
                  {
                    // for table display
                    accessor: "photo",
                    title: "Employee",
                    sortable: false,
                    width: 170,
                    render: ({ id, photo, first_name, last_name }) => (
                      <div className="d-flex justify-content-start align-items-center">
                        {photo ? (
                          <img
                            src={getStoragePath(photo)}
                            alt="img"
                            className="table_user_img"
                          />
                        ) : (
                          ""
                        )}
                        <Link
                          href={`/profile/${id}`}
                          className="ms-2 text-decoration-none color-inherit"
                        >
                          {first_name + " " + last_name}
                        </Link>
                      </div>
                    ),
                  },
                  {
                    accessor: "designation",
                    title: "Designation",
                    width: 250,
                    // visibleMediaQuery: aboveXs,
                    render: ({ designation }) => designation?.name || "N/A",
                  },
                  {
                    accessor: "department_name",
                    title: "Department",
                    width: 250,
                    // visibleMediaQuery: aboveXs,
                    render: ({ departmenttwo }) =>
                      departmenttwo?.[0]?.name || "N/A",
                  },
                  {
                    // for table display
                    accessor: "official_id",
                    title: "Employee ID",
                    width: 170,
                    noWrap: true,
                    sortable: true,
                    render: ({ official_id }) => official_id || "N/A",
                  },
                  {
                    accessor: "employee_type",
                    title: "Employee Type",
                    width: 170,
                    noWrap: true,
                    sortable: true,
                    render: ({ employee_type }) => employee_type || "N/A",
                  },
                ]}
                fetching={isLoading}
                records={apiData?.data.result || []}
                page={currentPage}
                onPageChange={setCurrentPage}
                totalRecords={apiData?.data?.count || 0}
                recordsPerPage={pageSize}
                sortStatus={sortStatus}
                onSortStatusChange={handleSortStatusChange}
                selectedRecords={selectedRecords}
                onSelectedRecordsChange={setSelectedRecords}
                // recordsPerPageOptions={PAGE_SIZES}
                // onRecordsPerPageChange={setPageSize}
                // rowExpansion={rowExpansion}
                // onRowContextMenu={handleContextMenu}
                // onScroll={hideContextMenu}
              />
            </div>
          </Grid.Col>
        </Grid>
      </div>
    </>
  );
};

export default Index;
