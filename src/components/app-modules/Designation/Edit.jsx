import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useForm } from "@mantine/form";
import { Modal, TextInput, Button, Select, Group, Grid } from "@mantine/core";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";
import { fetcher } from "@/lib/fetch";

const Index = ({ opened, close, item, setItem, mutate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    // mode: "uncontrolled",
    initialValues: {
      name: "",
      grade: "",
    },
    validate: {
      name: (value) =>
        value.length < 5 ? "Name must have at least 5 letters" : null,
      grade: (value) => (!value ? "Select a grade" : null),
    },
  });

  useEffect(() => {
    console.log(item);
    if (item) {
      form.setValues({
        name: item.name || "",
        grade: item.grade?.id || "",
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
    // e.preventDefault();
    // console.log(values);

    setIsSubmitting(true);

    try {
      const response = await update(
        `/api/user/update-designation/${item.id}`,
        values
      );
      // const response = res.json();
      console.log(response);

      if (response?.status === "success") {
        // console.log(response);
        setIsSubmitting(false);
        close();
        mutate();
        toast.success("Designation updated successfully");
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
        title="Edit Designation"
        onClose={() => {
          setItem(null);
          close();
        }}
        centered
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                mb="sm"
                label="Name"
                placeholder="Name"
                disabled={isSubmitting}
                {...form.getInputProps("name")}
              />
              <Select
                // mb="sm"
                label="Grade"
                placeholder="Grade"
                disabled={isSubmitting}
                data={grades}
                {...form.getInputProps("grade")}
              />
            </Grid.Col>
          </Grid>
          <Group justify="flex-end" mt="md">
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
