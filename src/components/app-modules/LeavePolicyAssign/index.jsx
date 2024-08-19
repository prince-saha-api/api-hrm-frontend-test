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

// const items = [
//   { title: "Dashboard", href: "/" },
//   { title: "Leave Policy" },
// ].map((item, index) => (
//   <Anchor href={item.href} key={index}>
//     {item.title}
//   </Anchor>
// ));

const Index = () => {
  const [filterOpened, { open: filterOpen, close: filterClose }] =
    useDisclosure(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "username",
    direction: "asc", // desc
  });

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
          title="Employees"
          items={[
            { title: "Dashboard", href: "/dashboard" },
            { title: "Leave Policy Assign" },
          ]}
        />
      </div>

      <div id="leavePolicy" className="itemCard">
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={5}>
            <MultiSelect
              classNames={{
                root: "cust_iputRoot",
                label: "cust_iputLabel",
                wrapper: "cust_iputWrapper",
              }}
              mb="md"
              label="Leave Policy"
              placeholder="Leave Policy"
              data={[
                "Policy-1",
                "Policy-2",
                "Policy-3",
                "Policy-4",
                "Policy-5",
                "Policy-6",
              ]}
              searchable
            />

            <div className="d-flex align-items-center mt-4">
              <p className="cust_iputLabel mb-0">Employee</p>
              <Button onClick={filterOpen}>Filter</Button>
            </div>
          </Grid.Col>
          <Grid.Col span={12}>
            <Button
              className="mb-3"
              component="a"
              href="/#"
              data-disabled
              onClick={(event) => event.preventDefault()}
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
                    // visibleMediaQuery: aboveXs,
                    render: ({ designation }) => designation?.name || "N/A",
                  },
                  {
                    accessor: "department_name",
                    title: "Department",
                    // visibleMediaQuery: aboveXs,
                    render: ({ departmenttwo }) =>
                      departmenttwo?.[0]?.name || "N/A",
                  },
                  {
                    // for table display
                    accessor: "official_id",
                    title: "Employee ID",
                    noWrap: true,
                    sortable: true,
                    render: ({ official_id }) => official_id || "N/A",
                  },
                  {
                    accessor: "employee_type",
                    title: "Employee Type",
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
