import React, { useState } from "react";
import useSWR from "swr";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Select,
  Group,
  Checkbox,
  MultiSelect,
  FileInput,
  rem,
} from "@mantine/core";
import { FiFile } from "react-icons/fi";
import { toast } from "react-toastify";
import { submit } from "@/lib/submit";
import { fetcher } from "@/lib/fetch";

const Index = ({ opened, close, mutate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      user: "",
      leavepolicy: "",
      from_date: "",
      to_date: "",
      total_leave: "",
      valid_leave_dates: "",
      attachment: "",
      description: "",
      rejection_reason: "",
      approved_by: "",
    },
    // validate: {
    //   name: (value) =>
    //     value.length < 5 ? "Name must have at least 5 letters" : null,
    // },
  });

  const {
    data,
    error,
    isLoading: isFetchLoading,
  } = useSWR(`/api/user/get-employee/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
    revalidateOnFocus: false,
  });

  console.log(data);

  const users = data?.data.result.map((item) => ({
    label: (item?.first_name + " " + item?.last_name).toString() || "",
    value: item?.id.toString() || "",
  }));

  const {
    data: leavepolicyData,
    error: leavepolicyError,
    isLoading: leavepolicyIsFetchLoading,
  } = useSWR(`/api/leave/get-leavepolicy/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
    revalidateOnFocus: false,
  });

  console.log(data);

  const leavepolicies = leavepolicyData?.data.result.map((item) => ({
    label: item?.name.toString() || "",
    value: item?.id.toString() || "",
  }));

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const formattedFromDate = values.from_date
        ? values.from_date.toISOString().split("T")[0]
        : null;
      const formattedToDate = values.to_date
        ? values.from_date.toISOString().split("T")[0]
        : null;

      const formattedValues = {
        ...values,
        from_date: formattedFromDate,
        to_date: formattedToDate,
      };

      const formValues = new FormData();

      const flattenObject = (obj, prefix = "") => {
        Object.keys(obj).forEach((key) => {
          const value = obj[key];
          const formKey = prefix ? `${prefix}[${key}]` : key;

          if (value && typeof value === "object" && !(value instanceof File)) {
            flattenObject(value, formKey);
          } else {
            formValues.append(formKey, value);
          }
        });
      };

      flattenObject(formattedValues);

      const response = await submit(
        `/api/leave/add-leaverequest/`,
        formValues,
        true
      );

      if (response?.status === "success") {
        // console.log(response);
        setIsSubmitting(false);
        form.reset();
        close();
        mutate();
        toast.success("leave allocation request created successfully");
      } else {
        setIsSubmitting(false);
        toast.error(
          response?.status == "error"
            ? response.message
            : "Error submitting form"
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 5000);
    }
  };

  return (
    <>
      <Modal
        classNames={{
          title: "modalTitle",
        }}
        opened={opened}
        title="Leave Request"
        onClose={close}
        centered
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Select
            mb="sm"
            label="Employee"
            placeholder="Employee"
            required={true}
            disabled={isSubmitting}
            data={users}
            searchable
            limit={10}
            nothingFoundMessage="Nothing found..."
            {...form.getInputProps("user")}
          />
          <Select
            mb="sm"
            label="Leave Type"
            placeholder="Leave Type"
            required={true}
            disabled={isSubmitting}
            data={leavepolicies}
            searchable
            limit={10}
            nothingFoundMessage="Nothing found..."
            {...form.getInputProps("leavepolicy")}
          />
          <DateInput
            mb="sm"
            valueFormat="DD MMM YYYY"
            label="From Date"
            placeholder="DD MMM YYYY"
            {...form.getInputProps("from_date")}
          />
          <DateInput
            mb="sm"
            valueFormat="DD MMM YYYY"
            label="To Date"
            placeholder="DD MMM YYYY"
            {...form.getInputProps("to_date")}
          />
          <TextInput
            disabled
            mb="sm"
            label="Total Days"
            placeholder="0"
            {...form.getInputProps("total_leave")}
          />
          <FileInput
            mb="sm"
            leftSection={<FiFile />}
            label="Attachment"
            placeholder="Attachment"
            leftSectionPointerEvents="none"
            {...form.getInputProps("attachment")}
          />
          <Textarea
            mb="sm"
            label="Details"
            placeholder="Details"
            {...form.getInputProps("rejection_reason")}
          />
          <Group justify="flex-end" mt="sm">
            <Button
              type="submit"
              loading={isSubmitting}
              loaderProps={{ type: "dots" }}
            >
              Save
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Index;
