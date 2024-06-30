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
  Grid,
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
      user: [],
      leavepolicy: null,
      no_of_days: null,
      reason: "",
      attachment: null,
    },
    // validate: {
    //   user: (value) =>
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

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
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

      flattenObject(formValues);

      const response = await submit(
        `/api/leave/add-leaveallocationrequest/`,
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
        title="Leave Allocation Request"
        onClose={close}
        centered
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid>
            <Grid.Col span={12}>
              <MultiSelect
                mb="sm"
                label="Employee"
                placeholder="Employee"
                required={true}
                disabled={isSubmitting}
                data={users}
                searchable
                limit={10}
                nothingFoundMessage="Nothing found..."
                // withAsterisk
                {...form.getInputProps("user")}
              />

              <Select
                mb="sm"
                label="Leave Type"
                placeholder="Pick value"
                required={true}
                disabled={isSubmitting}
                data={["Casual", "Sick"]}
                {...form.getInputProps("leavepolicy")}
              />

              <TextInput
                mb="sm"
                label="Total Days"
                placeholder="0"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("no_of_days")}
              />

              <FileInput
                mb="sm"
                leftSection={<FiFile />}
                label="Attachment"
                placeholder="Attachment"
                leftSectionPointerEvents="none"
                // required={true}
                disabled={isSubmitting}
                {...form.getInputProps("attachment")}
              />

              <Textarea
                mb="sm"
                label="Details"
                placeholder="Details"
                // required={true}
                disabled={isSubmitting}
                {...form.getInputProps("reason")}
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
    </>
  );
};

export default Index;
