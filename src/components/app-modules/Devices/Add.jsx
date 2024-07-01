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

const Index = ({ opened, close, mutate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      username: "",
      password: "",
      location: "",
      macaddress: "",
      deviceip: "",
    },
    validate: {
      title: (value) =>
        value.length < 5 ? "Name must have at least 5 letters" : null,
    },
  });

  const {
    data,
    error,
    isLoading: isFetchLoading,
  } = useSWR(`/api/company/get-company/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
    revalidateOnFocus: false,
  });

  const companies = data?.data?.map((item) => ({
    label: item?.basic_information?.name?.toString() || "",
    value: item?.basic_information?.id.toString() || "",
  }));

  const handleSubmit = async (values) => {
    // e.preventDefault();
    // console.log(values);
    // return;

    setIsSubmitting(true);

    try {
      const response = await submit("/api/device/add-device/", values);

      if (response?.status === "success") {
        // console.log(response);
        setIsSubmitting(false);
        form.reset();
        close();
        mutate();
        toast.success("Device created successfully");
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
        title="Add Device"
        onClose={close}
        centered
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                mb="sm"
                label="Device Title"
                placeholder="Device Title"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("title")}
              />
              <TextInput
                mb="sm"
                label="Username"
                placeholder="Username"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("username")}
              />
              <PasswordInput
                mb="sm"
                label="Password"
                placeholder="Enter password"
                withAsterisk
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("password")}
              />
              <TextInput
                mb="sm"
                label="device ip"
                placeholder="device ip"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("deviceip")}
              />
              <TextInput
                mb="sm"
                label="MAC Address"
                placeholder="MAC Address"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("macaddress")}
              />
              <TextInput
                mb="sm"
                label="Location"
                placeholder="Location"
                disabled={isSubmitting}
                {...form.getInputProps("location")}
              />
              <Checkbox
                label="Active"
                required={true}
                disabled={isSubmitting}
                //  {...form.getInputProps("password")}
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
