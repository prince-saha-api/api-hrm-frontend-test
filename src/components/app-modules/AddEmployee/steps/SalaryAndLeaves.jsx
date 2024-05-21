"use client";
import React, { forwardRef, useImperativeHandle } from "react";
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

const SalaryAndLeaves = forwardRef(({ data, onNext, onBack }, ref) => {
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
                {...form.getInputProps("payment_in")}
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
                {...form.getInputProps("bank_account.bank_name")}
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
                {...form.getInputProps("bank_account.branch_name")}
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
                {...form.getInputProps("bank_account.account_type")}
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
                {...form.getInputProps("bank_account.account_no")}
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
                {...form.getInputProps("bank_account.routing_no")}
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
                {...form.getInputProps("bank_account.swift_bic")}
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
                {...form.getInputProps("bank_account.address.city")}
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
                {...form.getInputProps("bank_account.address.state_division")}
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
                {...form.getInputProps("bank_account.address.post_zip_code")}
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
                {...form.getInputProps("bank_account.address.country")}
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
                {...form.getInputProps("bank_account.address.address")}
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
                // {...form.getInputProps("gross_salary")}
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
                // {...form.getInputProps("leavepolicy")}
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
          <Button variant="default" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Next step</Button>
        </Group>
      </form>
    </>
  );
});

export default SalaryAndLeaves;
