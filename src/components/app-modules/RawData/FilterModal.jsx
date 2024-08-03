"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useDisclosure } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import { Grid } from "@mantine/core";
import { countries } from "@/data/countries";
import { DataTable } from "mantine-datatable";
import { submit } from "@/lib/submit";
import { fetcher } from "@/lib/fetch";
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
  RangeSlider,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { formatDate, getDate, getTime, getStoragePath } from "@/lib/helper";

const accordionData = [
  {
    value: "Personal Info",
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
            mb="xs"
            classNames={{
              root: "jiaurBD",
              label: "jiaurBD",
              wrapper: "jiaurBD",
            }}
            label="Gender"
            placeholder="Gender"
            searchable
            data={countries}
            //  {...form.getInputProps("presentAddress.country")}
          />
          <Select
            classNames={{
              root: "jiaurBD",
              label: "jiaurBD",
              wrapper: "jiaurBD",
            }}
            label="Marital Status"
            placeholder="Marital Status"
            data={["Male", "Female", "Other"]}
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
            mb="xs"
            classNames={{
              root: "jiaurBD",
              label: "jiaurBD",
              wrapper: "jiaurBD",
            }}
            label="Religion"
            placeholder="Religion"
            data={["Male", "Female", "Other"]}
          />
          <Select
            classNames={{
              root: "jiaurBD",
              label: "jiaurBD",
              wrapper: "jiaurBD",
            }}
            label="Blood Group"
            placeholder="Blood Group"
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
          <TextInput //
            label="Employee ID"
            placeholder="Employee ID"
            mb="xs"
          />

          <Select
            label="Branch"
            placeholder="Branch"
            // searchable
            data={["Dhaka", "Rangpur", "Dinajpur"]}
            mb="xs"
          />

          <Select
            label="Designation"
            placeholder="Designation"
            // searchable
            data={["Dhaka", "Rangpur", "Dinajpur"]}
            mb="xs"
          />

          <Select
            label="Shift"
            placeholder="Shift"
            // searchable
            data={["Dhaka", "Rangpur", "Dinajpur"]}
            mb="xs"
          />

          <Select
            label="Job Status"
            placeholder="Job Status"
            // searchable
            data={["Dhaka", "Rangpur", "Dinajpur"]}
            mb="xs"
          />

          <Select
            label="Group"
            placeholder="Group"
            // searchable
            data={["Group-1", "Group-2"]}
            mb="xs"
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="Company"
            placeholder="Company"
            // searchable
            data={["Dhaka", "Rangpur", "Dinajpur"]}
            mb="xs"
          />
          <Select
            label="Department"
            placeholder="Department"
            // searchable
            data={["Dhaka", "Rangpur", "Dinajpur"]}
            mb="xs"
          />
          <Select
            label="Supervisor"
            placeholder="Supervisor"
            // searchable
            data={["Dhaka", "Rangpur", "Dinajpur"]}
            mb="xs"
          />

          <Select
            label="Employee type"
            placeholder="Employee type"
            // searchable
            data={["Employee type-1", "Employee type-2"]}
            mb="xs"
          />

          <Select
            label="Grade"
            placeholder="Grade"
            // searchable
            data={["Grade-1", "Grade-2"]}
            mb="xs"
          />
          <DatePickerInput
            type="range"
            label="Joining Date"
            placeholder="Joining Date (From, To)"
            // value={value}
            // onChange={setValue}
          />
        </Grid.Col>

        <Grid.Col span={12}>
          <div className="w-100">
            <div className="cust_iputLabel">Gross Salary</div>

            <RangeSlider
              classNames={{
                root: "w-100",
                wrapper: "cust_iputWrapper",
              }}
              // minRange={5000}
              min={0}
              max={300000}
              step={500}
              defaultValue={[10000, 30000]}
            />
          </div>
        </Grid.Col>
      </Grid>
    ),
  },
];

const FilterModal = ({ opened, close }) => {
  const itemsAccordion = accordionData.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control className="ms-0 ps-0 filterItem">
        {item.value}
      </Accordion.Control>
      <Accordion.Panel>{item.dataInput}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Modal opened={opened} onClose={close} title="Filter" centered>
      <Accordion defaultValue="">{itemsAccordion}</Accordion>
      <div className="d-flex mt-3 mb-2">
        <DateInput
          className="w-100"
          valueFormat="DD MMM YYYY"
          label="From Date"
          placeholder="DD MMM YYYY"
          // {...form.getInputProps("from_date")}
        />
        <DateInput
          className="w-100"
          ms="sm"
          valueFormat="DD MMM YYYY"
          label="To Date"
          placeholder="DD MMM YYYY"
          // {...form.getInputProps("to_date")}
        />
      </div>
      <div className="d-flex justify-content-end">
        <Button variant="filled" size="sm" mt="sm">
          Search
        </Button>
      </div>
    </Modal>
  );
};

export default FilterModal;
