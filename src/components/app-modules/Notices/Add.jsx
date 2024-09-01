import React, { useState } from "react";
import useSWR from "swr";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  // Select,
  Group,
  Grid,
  FileInput,
  MultiSelect,
} from "@mantine/core";
import { toast } from "react-toastify";
import { FaFileLines } from "react-icons/fa6";
import { FaRegCalendarDays } from "react-icons/fa6";
import { submit } from "@/lib/submit";
import { fetcher } from "@/lib/fetch";
import { getFullName, formatDateToYYYYMMDD } from "@/lib/helper";

const Index = ({ opened, close, mutate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      description: "",
      attachment: null,
      publish_date: null,
      expiry_date: null,
      company: [],
      branch: [],
      department: [],
      user: [],
    },
    validate: {
      title: (value) => (!value ? "Title is required" : null),
    },
  });

  const {
    data: companyData,
    error: companyError,
    isLoading: isCompanyLoading,
  } = useSWR(`/api/company/get-company/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const companies = companyData?.data?.result?.map((item) => ({
    label: item?.basic_information?.name?.toString() || "",
    value: item?.id.toString() || "",
  }));

  const {
    data: branchesData,
    error: branchesError,
    isLoading: isBranchesLoading,
  } = useSWR(`/api/branch/get-branch/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const branches = branchesData?.data?.result?.map((item) => ({
    label: item?.name?.toString() || "",
    value: item?.id.toString() || "",
  }));

  const {
    data: departmentsData,
    error: departmentsError,
    isLoading: isDepartmentsLoading,
  } = useSWR(`/api/department/get-department/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const departments = departmentsData?.data?.result?.map((item) => ({
    label: item?.name?.toString() || "",
    value: item?.id.toString() || "",
  }));

  const {
    data: employeeData,
    error: employeeError,
    isLoading: employeeIsFetchLoading,
  } = useSWR(`/api/user/get-employee/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
    revalidateOnFocus: false,
  });

  const employees = employeeData?.data.result.map((item) => ({
    label: getFullName(item?.first_name, item?.last_name),
    value: item?.id.toString() || "",
  }));

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const formattedExpiryDate = formatDateToYYYYMMDD(values.expiry_date);
      const formattedPublishDate = formatDateToYYYYMMDD(new Date());

      const formattedValues = {
        ...values,
        expiry_date: formattedExpiryDate,
        publish_date: formattedPublishDate,
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
        `/api/notice/add-noticeboard/`,
        formValues,
        true
      );

      if (response?.status === "success") {
        setIsSubmitting(false);
        form.reset();
        close();
        mutate();
        toast.success("Notice created successfully");
      } else {
        setIsSubmitting(false);
        if (response?.status === "error" && Array.isArray(response.message)) {
          response.message.forEach((msg) => {
            toast.error(msg);
          });
        } else {
          toast.error("Error submitting form");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 500);
    }
  };

  const handleError = (errors) => {
    console.log(errors);
  };

  return (
    <Modal
      classNames={{
        title: "modalTitle",
      }}
      opened={opened}
      title="Add Notice"
      onClose={close}
      centered
    >
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values), handleError)}
      >
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              mb="sm"
              label="Title"
              placeholder="Title"
              required={true}
              disabled={isSubmitting}
              {...form.getInputProps("title")}
            />
            <Textarea
              mb="sm"
              label="Description"
              placeholder="Description"
              required={true}
              disabled={isSubmitting}
              {...form.getInputProps("description")}
            />
            <FileInput
              mb="sm"
              rightSection={<FaFileLines />}
              label="Attachment"
              placeholder="Attachment"
              rightSectionPointerEvents="none"
              leftSectionPointerEvents="none"
              required={true}
              disabled={isSubmitting}
              {...form.getInputProps("attachment")}
              key={form.key("attachment")}
            />
            <DateInput
              mb="sm"
              rightSection={<FaRegCalendarDays />}
              label="Expire Date"
              placeholder="MMM/DDD/YYY"
              rightSectionPointerEvents="none"
              required={true}
              disabled={isSubmitting}
              {...form.getInputProps("expiry_date")}
              key={form.key("expiry_date")}
            />
            <MultiSelect
              mb="sm"
              label="Company"
              placeholder="Company"
              hidePickedOptions
              disabled={isSubmitting}
              data={companies}
              {...form.getInputProps("company")}
              key={form.key("company")}
            />
            <MultiSelect
              mb="sm"
              label="Branches"
              placeholder="Branches"
              hidePickedOptions
              disabled={isSubmitting}
              data={branches}
              {...form.getInputProps("branch")}
              key={form.key("branch")}
            />
            <MultiSelect
              mb="sm"
              label="Department"
              placeholder="Department"
              hidePickedOptions
              disabled={isSubmitting}
              data={departments}
              {...form.getInputProps("department")}
              key={form.key("department")}
            />
            <MultiSelect
              mb="sm"
              label="Employee"
              placeholder="Employee"
              hidePickedOptions
              data={employees}
              {...form.getInputProps("user")}
              key={form.key("user")}
            />
          </Grid.Col>
        </Grid>

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
  );
};

export default Index;
