import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Select,
  Group,
  Checkbox,
  Grid,
} from "@mantine/core";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";
import { fetcher } from "@/lib/fetch";

const Index = ({ opened, close, item, setItem, mutate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      description: "",
      date: "",
      is_recuring: true,
      employee_grade: "",
    },
    validate: {
      title: (value) =>
        value.length < 5 ? "Name must have at least 5 letters" : null,
    },
  });

  useEffect(() => {
    if (item) {
      form.setValues({
        title: item.title || "",
        description: item.description || "",
        date: item.date ? new Date(item.date) : null,
        employee_grade: item.employee_grade || "",
        is_recuring: item.is_recuring || true,
      });
    }
  }, [item]);

  const {
    data,
    error,
    isLoading: isFetchLoading,
  } = useSWR(`/api/user/get-grade/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
    revalidateOnFocus: false,
  });

  const grades = data?.data?.result?.map((item) => ({
    label: item?.name?.toString() || "",
    value: item?.id?.toString() || "",
  }));

  const handleSubmit = async (values) => {
    const formattedDate = values.date
      ? values.date.toISOString().split("T")[0]
      : null;

    const formattedValues = { ...values, date: formattedDate };

    setIsSubmitting(true);

    try {
      const response = await update(
        `/api/leave/update-holiday/${item.id}`,
        formattedValues
      );

      if (response?.status === "success") {
        // console.log(response);
        setIsSubmitting(false);
        close();
        mutate();
        toast.success("Holiday updated successfully");
      } else {
        toast.error(
          response?.status === "error"
            ? response?.message[0]
            : "Error submitting form"
        );
      }
      setTimeout(() => {
        setIsSubmitting(false);
        mutate();
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setTimeout(() => {
        setIsSubmitting(false);
        mutate();
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
        title="Edit Holiday"
        onClose={close}
        centered
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                label="Title"
                placeholder="Title"
                disabled={isSubmitting}
                {...form.getInputProps("title")}
              />

              <Textarea
                mt="md"
                label="Description"
                placeholder="Description"
                disabled={isSubmitting}
                {...form.getInputProps("description")}
              />

              <DateInput
                mt="md"
                valueFormat="DD MMM YYYY"
                label="Date"
                placeholder="DD MMM YYYY"
                disabled={isSubmitting}
                {...form.getInputProps("date")}
              />

              <Select
                mt="md"
                label="Employee Grade"
                placeholder="Employee Grade"
                data={grades}
                disabled={isSubmitting}
                {...form.getInputProps("employee_grade")}
              />

              <Checkbox
                mt="md"
                label="Is Recurring?"
                disabled={isSubmitting}
                {...form.getInputProps("is_recuring")}
              />
            </Grid.Col>
          </Grid>
          <Group justify="flex-end" mt="sm">
            <Button
              type="submit"
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
