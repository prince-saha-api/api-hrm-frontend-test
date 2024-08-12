import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useForm } from "@mantine/form";
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Select,
  Group,
  Checkbox,
} from "@mantine/core";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";
import { fetcher } from "@/lib/fetch";

const Index = ({ opened, close, item, setItem, mutate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      deviceid: "",
      groupid: "",
    },
    // validate: {
    //   title: (value) =>
    //     value.length < 5 ? "Name must have at least 5 letters" : null,
    // },
  });

  useEffect(() => {
    if (item) {
      form.setValues({
        deviceid: item.deviceid || "",
        groupid: item.groupid || "",
      });
    }
  }, [item]);

  const {
    data: devicesData,
    error: devicesError,
    isLoading: devicesIsFetchLoading,
  } = useSWR(`/api/device/get-device/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const devices = devicesData?.data?.result?.map((item) => ({
    label: item?.title?.toString() || "",
    value: item?.id.toString() || "",
  }));

  const {
    data: groupsData,
    error: groupsError,
    isLoading: groupsIsFetchLoading,
  } = useSWR(`/api/device/get-group/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const groups = groupsData?.data?.result?.map((item) => ({
    label: item?.title?.toString() || "",
    value: item?.id.toString() || "",
  }));

  const handleSubmit = async (values) => {
    const formattedValues = {
      ...values,
      deviceid: Number(values.deviceid),
      groupid: Number(values.groupid),
    };

    setIsSubmitting(true);

    try {
      const response = await update(
        `/api/device/update-devicegroup/${item.id}`,
        formattedValues
      );

      if (response?.status === "success") {
        // console.log(response);
        setIsSubmitting(false);
        close();
        mutate();
        toast.success("Device group updated successfully");
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
        title="Edit Assign To Group"
        onClose={() => {
          setItem(null);
          close();
        }}
        centered
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Select
            // mt="sm"
            label="Select Device"
            placeholder="Select Device"
            data={devices}
            {...form.getInputProps("deviceid")}
          />

          <Select
            // mt="sm"
            label="Select Group"
            placeholder="Select Group"
            data={groups}
            {...form.getInputProps("groupid")}
          />

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
