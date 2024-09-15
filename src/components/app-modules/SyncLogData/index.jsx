"use client";

import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Select, Grid } from "@mantine/core";
import { toast } from "react-toastify";
import Breadcrumb from "@/components/utils/Breadcrumb";
import { submit } from "@/lib/submit";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      type: null,
      value: "",
    },
    validate: {
      type: (value) => (!value ? "Select an option" : null),
      value: (value) => {
        if (!value) return "Value is required.";
        const numberValue = Number(value);
        if (isNaN(numberValue)) return "Value must be a valid number";
        if (numberValue <= 0) return "Value must be greater than zero";
        return null;
      },
    },
  });

  const handleSubmit = async (values) => {
    // console.log(values);
    const minutes =
      values?.type === "Days"
        ? Number(values?.value) * 24 * 60
        : Number(values?.value) * 60;

    setIsSubmitting(true);

    try {
      const response = await submit(`/api/attendance/sync-log-data/${minutes}`);

      if (response?.status === "success") {
        setIsSubmitting(false);
        form.reset();
        toast.success("Sync successful");
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

  return (
    <>
      <Breadcrumb
        classNames={{
          root: "mb-4",
        }}
        title="Sync Log Data"
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Sync Log Data" },
        ]}
      />

      <div className="itemCard">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: "xl" }}>
            <Grid.Col span={12}>
              <div className="d-flex align-items-start">
                <Select
                  label="Enter option"
                  placeholder="Select option"
                  data={["Hours", "Days"]}
                  disabled={isSubmitting}
                  {...form.getInputProps("type")}
                  key={form.key("type")}
                />
                <TextInput
                  ms="md"
                  label="Enter value"
                  placeholder="Enter value"
                  disabled={isSubmitting}
                  {...form.getInputProps("value")}
                  key={form.key("value")}
                />
                <div className="">
                  <p className="mb-0 opacity-0">Fake title</p>
                  <Button
                    type="submit"
                    ms="md"
                    size="sm"
                    loading={isSubmitting}
                    loaderProps={{ type: "dots" }}
                  >
                    Get log Data
                  </Button>
                </div>
              </div>
            </Grid.Col>
          </Grid>
        </form>
      </div>
    </>
  );
};

export default Page;
