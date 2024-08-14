"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useDisclosure } from "@mantine/hooks";
import { Grid } from "@mantine/core";
import { countries } from "@/data/countries";
import { DataTable } from "mantine-datatable";
import { submit } from "../../../lib/submit";
import { fetcher } from "../../../lib/fetch";
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
} from "@mantine/core";
import {
  formatDate,
  getDate,
  getTime,
  getStoragePath,
} from "../../../lib/helper";

const PAGE_SIZES = [5, 10, 15, 20];
const items = [
  { title: "Dashboard", href: "/" },
  { title: "Assign Shift" },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const accordionData = [
  {
    value: "Employee",
    dataInput: (
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            classNames={{
              root: "jiaurBD",
              label: "jiaurBD",
              wrapper: "jiaurBD",
            }}
            label="First Name"
            placeholder="First Name"
            mb="xs"
          />
          <TextInput label="Email" placeholder="example@gmail.com" mb="xs" />
          <Select
            classNames={{
              root: "jiaurBD",
              label: "jiaurBD",
              wrapper: "jiaurBD",
            }}
            label="Country"
            placeholder="Country"
            searchable
            data={countries}
            //  {...form.getInputProps("presentAddress.country")}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            classNames={{
              root: "jiaurBD",
              label: "jiaurBD",
              wrapper: "jiaurBD",
            }}
            label="Last Name"
            placeholder="Last Name"
            mb="xs"
          />
          <NumberInput
            classNames={{
              root: "jiaurBD",
              label: "jiaurBD",
              wrapper: "jiaurBD",
            }}
            rightSection={<></>}
            rightSectionWidth={0}
            label="Contact No."
            placeholder="Contact No"
            mb="xs"
          />
          <Select
            classNames={{
              root: "jiaurBD",
              label: "jiaurBD",
              wrapper: "jiaurBD",
            }}
            label="Gender"
            placeholder="Gender"
            data={["Male", "Female", "Other"]}
          />
        </Grid.Col>
      </Grid>
    ),
  },
  {
    value: "Work Info",
    dataInput: (
      <Grid>
        <Grid.Col span={6}>
          <TextInput label="Company" placeholder="Company" mb="xs" />

          <TextInput label="Department" placeholder="Department" mb="xs" />
          <Select
            label="Employee type"
            placeholder="Employee type"
            // searchable
            data={["Employee type-1", "Employee type-2"]}
            mb="xs"
          />
          <TextInput label="Grade" placeholder="Grade" mb="xs" />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="Branch"
            placeholder="Branch"
            // searchable
            data={["Dhaka", "Rangpur", "Dinajpur"]}
            mb="xs"
          />
          <TextInput label="Designation" placeholder="Designation" mb="xs" />

          <Select
            label="Group"
            placeholder="Group"
            // searchable
            data={["Group-1", "Group-2"]}
            mb="xs"
          />

          <Select
            label="Shift"
            placeholder="Shift"
            // searchable
            data={["Day", "Night"]}
            mb="xs"
          />
        </Grid.Col>
      </Grid>
    ),
  },
];

const Index = () => {
  // See groceries data above
  const itemsAccordion = accordionData.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.dataInput}</Accordion.Panel>
    </Accordion.Item>
  ));

  const [opened, { open, close }] = useDisclosure(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "username",
    direction: "asc", // desc
  });

  const {
    data: apiData,
    error,
    isValidating,
    isLoading,
    mutate,
  } = useSWR(
    `/employee/?page=${1}&page_size=${pageSize}&column_accessor=${
      sortStatus.columnAccessor
    }&direction=${sortStatus.direction}`,
    fetcher,
    {
      errorRetryCount: 2,
      keepPreviousData: true,
    }
  );
  const [selectedRecords, setSelectedRecords] = useState([]);
  return (
    <>
      <div className="pageTop mb-4">
        <h3>Assign Shift</h3>
        <Breadcrumbs>{items}</Breadcrumbs>
      </div>

      <div id="leavePolicy" className="itemCard">
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={3}>
            <Select
              label="Shift"
              placeholder="Pick value"
              data={["Day", "Night"]}
            />
            <Modal opened={opened} onClose={close} title="Filter" centered>
              <Accordion defaultValue="">{itemsAccordion}</Accordion>
              <div className="d-flex justify-content-end">
                <Button variant="filled" size="sm" mt="sm">
                  Search
                </Button>
              </div>
            </Modal>

            <div className="d-flex align-items-center mt-4">
              <p className="mb-0 me-3">Employee</p>
              <Button onClick={open}>Filter</Button>
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
                    title: "SL",
                    accessor: "na",
                    noWrap: true,
                    sortable: false,
                    render: (_, index) =>
                      (currentPage - 1) * pageSize + index + 1,
                  },
                  {
                    accessor: "employee",
                    title: "Employee",
                    sortable: false,
                    render: ({ image }) => (
                      <div className="text-center">
                        <img
                          src={getStoragePath(image)}
                          alt="img"
                          className="table_user_img"
                        />
                      </div>
                    ),
                  },

                  {
                    accessor: "designation",
                    title: "Designation",
                    sortable: true,
                    // visibleMediaQuery: aboveXs,
                  },
                  {
                    accessor: "department",
                    title: "Department",
                    noWrap: true,
                    sortable: true,
                  },
                  {
                    accessor: "employee_id",
                    title: "Contact No.",
                    noWrap: true,
                    sortable: true,
                  },
                  {
                    accessor: "shift",
                    title: "Shift",
                    noWrap: true,
                    sortable: true,
                  },
                ]}
                fetching={isLoading}
                records={apiData?.results || []}
                page={currentPage}
                onPageChange={setCurrentPage}
                totalRecords={apiData?.count}
                recordsPerPage={pageSize}
                sortStatus={sortStatus}
                // onSortStatusChange={handleSortStatusChange}
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
