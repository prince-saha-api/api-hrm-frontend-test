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
    // validate: {
    //   title: (value) =>
    //     value.length < 5 ? "Name must have at least 5 letters" : null,
    // },
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
      deviceid: Number(values.deviceid),
      groupid: Number(values.groupid),
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
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <div className="d-flex align-items-center ms-4">
          <div className="me-2">Select Device</div>
          <Select
            // mt="sm"
            // label="Gender"
            placeholder="Select Device"
            data={devices}
            {...form.getInputProps("deviceid")}
          />
          <div className="ms-3 me-2">Select Group</div>
          <Select
            // mt="sm"
            // label="Gender"
            placeholder="Select Group"
            data={groups}
            {...form.getInputProps("groupid")}
          />

          <Button
            type="submit"
            className="ms-3"
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
