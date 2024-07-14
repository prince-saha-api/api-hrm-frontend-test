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
import { countries } from "@/data/countries";

const SalaryAndLeaves = forwardRef(({ data, onNext, onBack }, ref) => {
  const form = useForm({
    mode: "uncontrolled",
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
          <Grid.Col span={6}>
            <Box className="stepBox">
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Payment In</div>
                <Select
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // // mt="sm"
                  // label="Payment In"
                  placeholder="Payment In"
                  data={["Cash", "Cheque", "Bank"]}
                  {...form.getInputProps("payment_in")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Monthly Gross Salary</div>
                <NumberInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  rightSection={<></>}
                  rightSectionWidth={0}
                  // mt="sm"
                  // label="Salary"
                  placeholder="Monthly Gross Salary"
                  {...form.getInputProps("gross_salary")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Leave Policy</div>
                <MultiSelect
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="Leave Policy"
                  data={[
                    { value: "1", label: "Leave Policy 1" },
                    { value: "2", label: "Leave Policy 2" },
                    { value: "3", label: "Leave Policy 3" },
                    { value: "4", label: "Leave Policy 4" },
                  ]}
                  searchable
                  withAsterisk
                  {...form.getInputProps("leavepolicy")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Earning Policy</div>
                <MultiSelect
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="Earning Policy"
                  data={[
                    { value: "1", label: "Earning Policy 1" },
                    { value: "2", label: "Earning Policy 2" },
                    { value: "3", label: "Earning Policy 3" },
                    { value: "4", label: "Earning Policy 4" },
                  ]}
                  searchable
                  withAsterisk
                  {...form.getInputProps("payrollpolicy.earningpolicy")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Deduction Policy</div>
                <MultiSelect
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="Deduction Policy"
                  data={[
                    { value: "1", label: "Deduction Policy 1" },
                    { value: "2", label: "Deduction Policy 2" },
                    { value: "3", label: "Deduction Policy 3" },
                    { value: "4", label: "Deduction Policy 4" },
                  ]}
                  searchable
                  withAsterisk
                  {...form.getInputProps("payrollpolicy.deductionpolicy")}
                />
              </div>

              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Bank Name</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Bank Account Name"
                  placeholder="Bank Account Name"
                  {...form.getInputProps("bank_account.bank_name")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Branch</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  placeholder="Branch"
                  {...form.getInputProps("bank_account.branch_name")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Bank Account Type</div>
                <Select
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Bank Account Type"
                  placeholder="Bank Account Type"
                  data={[
                    { value: "1", label: "Current" },
                    { value: "2", label: "Savings" },
                    { value: "3", label: "Salary" },
                    { value: "4", label: "Chequing" },
                    { value: "5", label: "Business" },
                  ]}
                  {...form.getInputProps("bank_account.account_type")}
                />
              </div>
            </Box>
          </Grid.Col>

          <Grid.Col span={6}>
            <Box className="stepBox">
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Account No.</div>
                <NumberInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  rightSection={<></>}
                  rightSectionWidth={0}
                  placeholder="Account No."
                  {...form.getInputProps("bank_account.account_no")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Routing No.</div>
                <NumberInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  rightSection={<></>}
                  rightSectionWidth={0}
                  // mt="sm"
                  // label="Routing No"
                  placeholder="Routing No."
                  {...form.getInputProps("bank_account.routing_no")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">SWIFT</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  placeholder="SWIFT"
                  {...form.getInputProps("bank_account.swift_bic")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Bank Address</div>
                <Textarea
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Address"
                  placeholder="Address"
                  {...form.getInputProps("bank_account.address.address")}
                />
              </div>

              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel"></div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="City"
                  {...form.getInputProps("bank_account.address.city")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel"></div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="Division"
                  {...form.getInputProps("bank_account.address.state_division")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel"></div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="ZIP Code"
                  placeholder="ZIP / Postal Code"
                  {...form.getInputProps("bank_account.address.post_zip_code")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel"></div>
                <Select
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Country"
                  placeholder="Country"
                  searchable
                  data={countries}
                  {...form.getInputProps("bank_account.address.country")}
                />
              </div>
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
