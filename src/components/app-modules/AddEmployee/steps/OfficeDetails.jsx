"use client";
import React, { forwardRef, useImperativeHandle } from "react";
import { DateInput } from "@mantine/dates";
import { Breadcrumbs, Anchor } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  NumberInput,
  TextInput,
  Textarea,
  Box,
  Select,
  Button,
  Flex,
  FileButton,
  Group,
  Text,
  PasswordInput,
} from "@mantine/core";
import { Grid } from "@mantine/core";
import { FcAcceptDatabase } from "react-icons/fc";
import Image from "next/image";
import compmanyLogo from "public/full_logo.png";
import uploadImg from "public/profile01.jpg";
import { FcAddImage } from "react-icons/fc";

const OfficeDetails = forwardRef(({ data, onNext, onBack }, ref) => {
  const form = useForm({
    initialValues: data,
    // validate: {
    //   firstName: (value) =>
    //     value.length < 2 ? "First Name must have at least 2 letters" : null,
    //   lastName: (value) =>
    //     value.length < 2 ? "Last Name must have at least 2 letters" : null,
    //   // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    //   // // add other validations as needed
    // },
  });

  useImperativeHandle(ref, () => ({
    validateStep: (updateFormData, key) => {
      const values = form.getValues();
      updateFormData(key, values);
      return form.isValid();
    },
    showValidationErrors: () => {
      form.validate();
    },
  }));

  const handleSubmit = (values) => {
    onNext(values);
  };

  return (
    <>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={5}>
            <Box className="stepBox">
              <TextInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                label="Employee ID"
                placeholder="Employee ID"
                {...form.getInputProps("official_id")}
              />
              <TextInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Official Email"
                placeholder="Official Email"
                {...form.getInputProps("official_email")}
              />
              <NumberInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                rightSection={<></>}
                rightSectionWidth={0}
                mt="sm"
                label="Official Phone"
                placeholder="Official Phone"
                {...form.getInputProps("official_phone")}
              />

              <PasswordInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Password"
                placeholder="Password"
                {...form.getInputProps("password")}
              />

              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Employee Type"
                placeholder="Employee Type"
                data={[
                  "Trainee",
                  "Intern",
                  "Probation",
                  "Permanent",
                  "Temporary",
                  "Contractual",
                  "Commission",
                  "Labour",
                ]}
                {...form.getInputProps("employee_type")}
              />
              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Company"
                placeholder="Company"
                data={["Banani", "Mohammadpur", "Mirpur-10"]}
                {...form.getInputProps("company")}
              />
              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Branch"
                placeholder="Branch"
                data={["Banani", "Mohammadpur", "Mirpur-10"]}
                {...form.getInputProps("branch")}
              />
            </Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box className="stepBox">
              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Department"
                placeholder="Department"
                data={["Development", "Marketing", "HR"]}
                {...form.getInputProps("department")}
              />
              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Designation"
                placeholder="Designation"
                data={["FrontEnd Developer", "BackEnd Developer", "QA"]}
                {...form.getInputProps("designation")}
              />

              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Default Shift"
                placeholder="Default Shift"
                data={["Day", "Night"]}
                {...form.getInputProps("shift")}
              />

              {/* <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Employment Status"
                placeholder="Employment Status"
                data={["Trainee", "Probation", "Permanent"]}
              /> */}

              <DateInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                // value={value}
                // onChange={setValue}
                label="Joining Date"
                placeholder="Date input"
                {...form.getInputProps("joining_date")}
              />

              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Supervisor"
                placeholder="Supervisor"
                data={["Day", "Night"]}
                {...form.getInputProps("supervisor")}
              />
              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Expense Approver"
                placeholder="Expense Approver"
                data={["Day", "Night"]}
                {...form.getInputProps("expense_approver")}
              />
              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Leave Approver"
                placeholder="Leave Approver"
                data={["Day", "Night"]}
                {...form.getInputProps("leave_approver")}
              />

              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Shift Approver"
                placeholder="Shift Approver"
                data={["Day", "Night"]}
                {...form.getInputProps("shift_request_approver")}
              />
            </Box>
          </Grid.Col>
        </Grid>

        <Group justify="left" mt="xl">
          <Button variant="default" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Next step</Button>
        </Group>
      </form>
    </>
  );
});

export default OfficeDetails;
