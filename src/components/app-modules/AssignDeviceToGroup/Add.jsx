import React, { useState } from "react";
import useSWR from "swr";
import { useForm } from "@mantine/form";
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Select,
  Group,
  Grid,
  PasswordInput,
  Checkbox,
} from "@mantine/core";
import { toast } from "react-toastify";
import { submit } from "@/lib/submit";
import { fetcher } from "@/lib/fetch";
import { countries } from "@/data/countries";

const Index = ({ mutate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      deviceid: "",
      groupid: "",
    },
    validate: {
      deviceid: (value) => (value ? null : "Device is required"),
      groupid: (value) => (value ? null : "Group is required"),
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
    // e.preventDefault();
    // console.log(values);
    // return;

    const formattedValues = {
      ...values,
      deviceid: values.deviceid ? Number(values.deviceid) : null,
      groupid: values.groupid ? Number(values.groupid) : null,
    };

    setIsSubmitting(true);

    try {
      const response = await submit(
        "/api/device/add-devicegroup/",
        formattedValues
      );

      if (response?.status === "success") {
        // console.log(response);
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
    <>
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
            {...form.getInputProps("deviceid")}
          />
          {/* <div className="ms-3 me-2">Select Group</div> */}
          <Select
            // mt="sm"
            label="Group"
            placeholder="Select Group"
            required={true}
            disabled={isSubmitting}
            data={groups}
            {...form.getInputProps("groupid")}
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
    </>
  );
};

export default Index;
