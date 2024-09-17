import React, { useState } from "react";
import useSWR from "swr";
import { useForm } from "@mantine/form";
import { Button, Select } from "@mantine/core";
import { toast } from "react-toastify";
import { submit } from "@/lib/submit";
import { fetcher } from "@/lib/fetch";

const Index = ({ mutate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      device: null,
      group: null,
    },
    validate: {
      device: (value) => (value ? null : "Device is required"),
      group: (value) => (value ? null : "Group is required"),
    },
  });

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
      device: values?.device ? Number(values.device) : null,
      group: values?.group ? Number(values.group) : null,
    };

    setIsSubmitting(true);

    try {
      const response = await submit(
        "/api/device/add-devicegroup/",
        formattedValues
      );

      if (response?.status === "success") {
        setIsSubmitting(false);
        form.reset();
        mutate();
        toast.success("Device assigned successfully");
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
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <div className="d-flex justify-content-start align-items-end mb-4">
        {/* <div className="me-2">Select Device</div> */}
        <Select
          me="sm"
          label="Device"
          placeholder="Select Device"
          required={true}
          disabled={isSubmitting}
          data={devices}
          {...form.getInputProps("device")}
          key={form.key("device")}
        />
        {/* <div className="ms-3 me-2">Select Group</div> */}
        <Select
          // mt="sm"
          label="Group"
          placeholder="Select Group"
          required={true}
          disabled={isSubmitting}
          data={groups}
          {...form.getInputProps("group")}
          key={form.key("group")}
        />

        <Button
          type="submit"
          ms="sm"
          variant="filled"
          loading={isSubmitting}
          loaderProps={{ type: "dots" }}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Index;
