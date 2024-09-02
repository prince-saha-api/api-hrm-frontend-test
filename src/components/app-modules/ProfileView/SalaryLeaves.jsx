import React, { useState } from "react";
import useSWR from "swr";
import { useForm } from "@mantine/form";
import {
  Modal,
  Button,
  Group,
  Grid,
  TextInput,
  Select,
  NumberInput,
  MultiSelect,
} from "@mantine/core";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";
import { fetcher } from "@/lib/fetch";
import { countries } from "@/data/countries";

const Index = ({ opened, close, item, setItem }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      payment_in: item?.payment_in || "",
      // gross_salary: item?.gross_salary || "",
      leavepolicy:
        item?.leavesummary_user?.map((item) =>
          item?.leavepolicy?.id.toString()
        ) || [],
      earningpolicy: [],
      deductionpolicy: [],
      bankaccount: {
        bank_name: item?.bank_account?.bank_name || "",
        branch_name: item?.bank_account?.branch_name || "",
        account_type: item?.bank_account?.account_type?.id.toString() || "",
        account_no: item?.bank_account?.account_no || "",
        routing_no: item?.bank_account?.routing_no || "",
        swift_bic: item?.bank_account?.swift_bic || "",
        address: {
          address: item?.bank_account?.address?.address || "",
          city: item?.bank_account?.address?.city || "",
          state_division: item?.bank_account?.address?.state_division || "",
          post_zip_code: item?.bank_account?.address?.post_zip_code || "",
          country: item?.bank_account?.address?.country || "",
        },
      },
    },
    validate: {},
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
    data: earningData,
    error: earningError,
    isLoading: isEarningLoading,
  } = useSWR(`/api/payroll/get-payrollearning/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const earningPlicies = earningData?.data?.result?.map((item) => ({
    label: item?.title?.toString() || "",
    value: item?.id.toString() || "",
  }));

  const {
    data: deductionData,
    error: deductionError,
    isLoading: isDeductionLoading,
  } = useSWR(`/api/payroll/get-payrolldeduction/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const deductionPlicies = deductionData?.data?.result?.map((item) => ({
    label: item?.title?.toString() || "",
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

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const response = await update(
        `/api/user/update-salary-leaves/${item.id}`,
        values
      );

      if (response?.status === "success") {
        setIsSubmitting(false);
        close();
        // mutate();
        setItem((prev) => ({
          ...prev,
          payment_in: response?.data?.payment_in || "",
          bank_account: response?.data?.bank_account || null,
        }));
        toast.success("Profile updated successfully");
      } else {
        toast.error(
          response?.status === "error"
            ? response?.message[0]
            : "Error submitting form"
        );
      }
      setTimeout(() => {
        setIsSubmitting(false);
        // mutate();
      }, 500);
    } catch (error) {
      console.error("Error submitting form:", error);
      setTimeout(() => {
        setIsSubmitting(false);
        // mutate();
      }, 500);
    }
  };

  const handleError = (errors) => {
    console.log(errors);
  };

  return (
    <>
      <Modal
        classNames={{
          title: "modalTitle",
        }}
        opened={opened}
        title="Edit Salary and Leaves"
        onClose={close}
        centered
      >
        <form
          onSubmit={form.onSubmit(
            (values) => handleSubmit(values),
            handleError
          )}
        >
          <Grid>
            <Grid.Col span={6}>
              <Select
                mb="sm"
                label="Payment In"
                placeholder="Payment In"
                data={["Cash", "Cheque", "Bank"]}
                {...form.getInputProps("payment_in")}
              />
              {/* <NumberInput
                rightSection={<></>}
                rightSectionWidth={0}
                mb="sm"
                label="Monthly Gross Salary"
                placeholder="Monthly Gross Salary"
                {...form.getInputProps("gross_salary")}
              /> */}
              <MultiSelect
                mb="sm"
                label="Leave Policy"
                placeholder="Leave Policy"
                hidePickedOptions
                data={leavepolicies}
                searchable
                withAsterisk
                {...form.getInputProps("leavepolicy")}
              />
              <MultiSelect
                mb="sm"
                label="Earning Policy"
                placeholder="Earning Policy"
                hidePickedOptions
                data={earningPlicies}
                searchable
                withAsterisk
                {...form.getInputProps("earningpolicy")}
              />

              <MultiSelect
                mb="sm"
                label="Deduction Policy"
                placeholder="Deduction Policy"
                hidePickedOptions
                data={deductionPlicies}
                searchable
                withAsterisk
                {...form.getInputProps("deductionpolicy")}
              />

              <TextInput
                mb="sm"
                label="Bank Account Name"
                placeholder="Bank Account Name"
                {...form.getInputProps("bankaccount.bank_name")}
              />
              <TextInput
                mb="sm"
                label="Branch"
                placeholder="Branch"
                {...form.getInputProps("bankaccount.branch_name")}
              />
              <Select
                mb="sm"
                label="Bank Account Type"
                placeholder="Bank Account Type"
                data={bankAccountTypes}
                {...form.getInputProps("bankaccount.account_type")}
              />
              <NumberInput
                mb="sm"
                label="Account No."
                placeholder="Account No."
                rightSection={<></>}
                rightSectionWidth={0}
                {...form.getInputProps("bankaccount.account_no")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                mb="sm"
                label="Routing No."
                rightSection={<></>}
                rightSectionWidth={0}
                placeholder="Routing No."
                {...form.getInputProps("bankaccount.routing_no")}
              />
              <TextInput
                mb="sm"
                label="SWIFT"
                placeholder="SWIFT"
                {...form.getInputProps("bankaccount.swift_bic")}
              />
              <TextInput
                mb="sm"
                label="Bank Address"
                placeholder="Bank Address"
                {...form.getInputProps("bankaccount.address.address")}
              />
              <TextInput
                mb="sm"
                label="City"
                placeholder="City"
                {...form.getInputProps("bankaccount.address.city")}
              />
              <TextInput
                mb="sm"
                label="Division"
                placeholder="Division"
                {...form.getInputProps("bankaccount.address.state_division")}
              />
              <TextInput
                mb="sm"
                label="ZIP / Postal Code"
                placeholder="ZIP / Postal Code"
                {...form.getInputProps("bankaccount.address.post_zip_code")}
              />
              <Select
                label="Country"
                placeholder="Country"
                searchable
                data={countries}
                {...form.getInputProps("bankaccount.address.country")}
              />
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="md">
            <Button
              type="submit"
              variant="filled"
              loading={isSubmitting}
              loaderProps={{ type: "dots" }}
            >
              Update
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Index;
