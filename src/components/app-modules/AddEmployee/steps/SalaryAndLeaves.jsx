"use client";

import React, { forwardRef, useImperativeHandle } from "react";
import useSWR from "swr";
import { MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  NumberInput,
  TextInput,
  Box,
  Select,
  Button,
  Group,
} from "@mantine/core";
import { Grid } from "@mantine/core";
import { fetcher } from "@/lib/fetch";
import { countries } from "@/data/countries";

const SalaryAndLeaves = forwardRef(({ data, onNext, onBack }, ref) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: data,
    validate: {
      payment_in: (value) => (!value ? "Payment method is required" : null),
      gross_salary: (value) => (!value ? "Salary is required" : null),
      leavepolicy: (value) =>
        !value || !value.length ? "Leave policy is required" : null,
      "payrollpolicy.earningpolicy": (value) =>
        !value || !value.length ? "Earning policy is required" : null,
      "payrollpolicy.deductionpolicy": (value) =>
        !value || !value.length ? "Deduction policy is required" : null,
      "bank_account.bank_name": (value) =>
        !value ? "Bank account name is required" : null,
      "bank_account.branch_name": (value) =>
        !value ? "Bank account branch is required" : null,
      "bank_account.account_type": (value) =>
        !value ? "Bank account type is required" : null,
      "bank_account.account_no": (value) =>
        !value ? "Bank account number is required" : null,
    },
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

  const {
    data: bankAccountTypeData,
    error: bankAccountTypeError,
    isLoading: isBankAccountTypeLoading,
  } = useSWR(`/api/contribution/get-bankaccounttype/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const bankAccountTypes = bankAccountTypeData?.data?.result?.map((item) => ({
    label: item?.name?.toString() || "",
    value: item?.id.toString() || "",
  }));

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
                <div className="cust_iputLabel">
                  <span className="requiredInput">Payment In</span>
                </div>
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
                <div className="cust_iputLabel">
                  <span className="requiredInput">Monthly Gross Salary</span>
                </div>
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
              {/* <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Monthly Basic Salary</div>
                <NumberInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  rightSection={<></>}
                  rightSectionWidth={0}
                  // mt="sm"
                  // label="Salary"
                  placeholder="Monthly Basic Salary"
                  {...form.getInputProps("basic_salary")}
                />
              </div> */}
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">
                  <span className="requiredInput">Leave Policy</span>
                </div>
                <MultiSelect
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="Leave Policy"
                  data={leavepolicies}
                  searchable
                  withAsterisk
                  hidePickedOptions
                  {...form.getInputProps("leavepolicy")}
                  key={form.key("leavepolicy")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">
                  <span className="requiredInput">Earning Policy</span>
                </div>
                <MultiSelect
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="Earning Policy"
                  hidePickedOptions
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
                <div className="cust_iputLabel">
                  <span className="requiredInput">Deduction Policy</span>
                </div>
                <MultiSelect
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="Deduction Policy"
                  hidePickedOptions
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
                <div className="cust_iputLabel">
                  <span className="requiredInput">Bank Name</span>
                </div>
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
                <div className="cust_iputLabel">
                  <span className="requiredInput">Branch</span>
                </div>
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
                <div className="cust_iputLabel">
                  <span className="requiredInput">Bank Account Type</span>
                </div>
                <Select
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Bank Account Type"
                  placeholder="Bank Account Type"
                  data={bankAccountTypes}
                  {...form.getInputProps("bank_account.account_type")}
                />
              </div>
            </Box>
          </Grid.Col>

          <Grid.Col span={6}>
            <Box className="stepBox">
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">
                  <span className="requiredInput">Account No.</span>
                </div>
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
                <TextInput
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
                  key={form.key("bank_account.address.country")}
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
