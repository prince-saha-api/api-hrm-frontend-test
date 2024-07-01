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
  Grid,
  PasswordInput,
  Checkbox,
} from "@mantine/core";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";
import { fetcher } from "@/lib/fetch";
import { countries } from "@/data/countries";

const Index = ({ opened, close, item, setItem, mutate }) => {
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

  useEffect(() => {
    console.log(item);
    if (item) {
      form.setValues({
        title: item.title || "",
        username: item.username || "",
        password: item.password || "",
        location: item.location || "",
        macaddress: item.macaddress || "",
        deviceip: item.deviceip || "",
      });
    }
  }, [item]);

  const handleSubmit = async (values) => {
    // e.preventDefault();
    // console.log(values);

    setIsSubmitting(true);

    try {
      const response = await update(
        `/api/device/update-device/${item.id}`,
        values
      );
      // const response = res.json();
      console.log(response);

      if (response?.status === "success") {
        // console.log(response);
        setIsSubmitting(false);
        close();
        mutate();
        toast.success("Branch updated successfully");
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
        title="Edit Branch"
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
              Update
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Index;
