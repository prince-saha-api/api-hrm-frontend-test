"use client";
import React, { useState } from "react";
import { MultiSelect } from "@mantine/core";
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
} from "@mantine/core";
import { Grid } from "@mantine/core";
import { FcAcceptDatabase } from "react-icons/fc";
import Image from "next/image";
import compmanyLogo from "public/full_logo.png";
import uploadImg from "public/profile01.jpg";
import { FcAddImage } from "react-icons/fc";

const SalaryAndLeaves = ({ data, onChange }) => {
  const form = useForm({
    initialValues: data,
    validate: {
      firstName: (value) =>
        value.length < 2 ? "First Name must have at least 2 letters" : null,
      lastName: (value) =>
        value.length < 2 ? "Last Name must have at least 2 letters" : null,
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      // // add other validations as needed
    },
  });

  const handleSubmit = (values) => {
    if (form.validate().hasErrors) {
      console.log(values);
    } else {
      // form.setValues((prev) => ({ ...prev, ...values }));
      onChange("personalDetails", form.values);
      console.log(values);
    }
  };

  return (
    <>
      <form method="POST" onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={5}>
            <Box className="stepBox">
              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                // mt="sm"
                label="Payment In"
                placeholder="Payment In"
                data={["Cash", "Cheque", "Bank"]}
                {...form.getInputProps("paymentIn")}
              />

              <TextInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Bank Account Name"
                placeholder="Bank Account Name"
                {...form.getInputProps("bankAccount.bankName")}
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
                data={["Current", "Savings", "Salary", "Chequing", "Business"]}
                {...form.getInputProps("bankAccount.branch")}
              />

              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Bank Account Type"
                placeholder="Bank Account Type"
                data={["Current", "Savings", "Salary", "Chequing", "Business"]}
                {...form.getInputProps("bankAccount.accountType")}
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
                label="Accounting No"
                placeholder="Accounting No"
                {...form.getInputProps("bankAccount.accountingNo")}
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
                label="Routing No"
                placeholder="Routing No"
                {...form.getInputProps("bankAccount.routingNo")}
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
                label="SWIFT"
                placeholder="SWIFT"
                {...form.getInputProps("bankAccount.swiftBIC")}
              />

              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="City"
                placeholder="City"
                data={["Dhaka", "Khulna"]}
                {...form.getInputProps("bankAccount.city")}
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
                label="Division"
                placeholder="Division"
                data={["Dhaka", "Khulna"]}
                {...form.getInputProps("bankAccount.state")}
              />

              <TextInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="ZIP Code"
                placeholder="ZIP Code"
                {...form.getInputProps("bankAccount.zipCode")}
              />

              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Country"
                placeholder="Country"
                data={["Bangladesh"]}
                {...form.getInputProps("bankAccount.country")}
              />

              <Textarea
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Address"
                placeholder="Permanent Address"
                {...form.getInputProps("bankAccount.address")}
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
                label="Salary"
                placeholder="Salary"
                // {...form.getInputProps("monthlyGrossSalary")}
              />

              <MultiSelect
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Leave Policy Assign"
                placeholder="Leave Policy Assign"
                data={[
                  "Roll-1",
                  "Roll-2",
                  "Roll-3",
                  "Roll-4",
                  "Roll-5",
                  "Roll-6",
                ]}
                searchable
                withAsterisk
                // {...form.getInputProps("leavePolicyAssign")}
              />
              <MultiSelect
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Payroll Policy Assign"
                placeholder="Payroll Policy Assign"
                data={["Roll-10", "Roll-11", "Roll-12", "Roll-13"]}
                searchable
                withAsterisk
                // {...form.getInputProps("payrollPolicyAssign")}
              />
            </Box>
          </Grid.Col>
        </Grid>

        <Group justify="left" mt="xl">
          <Button variant="default">Back</Button>
          <Button type="submit">Next step</Button>
        </Group>
      </form>
    </>
  );
};

export default SalaryAndLeaves;
