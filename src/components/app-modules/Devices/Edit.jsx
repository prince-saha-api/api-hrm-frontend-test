import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Grid,
  PasswordInput,
  Checkbox,
} from "@mantine/core";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";
import { validateDeviceIP, validateMACAddress } from "@/lib/validate";

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
      is_active: true,
    },
    validate: {
      title: (value) => (!value ? "Title is required" : null),
      username: (value) => (!value ? "Username is required" : null),
      password: (value) => (!value ? "Password is required" : null),
      deviceip: (value) =>
        !value
          ? "Device IP is required"
          : !validateDeviceIP(value)
          ? "Invalid IP address"
          : null,
      macaddress: (value) =>
        !value
          ? "MAC Address is required"
          : !validateMACAddress(value)
          ? "Invalid MAC address format"
          : null,
    },
  });

  useEffect(() => {
    if (item) {
      form.setValues({
        title: item.title || "",
        username: item.username || "",
        password: item.password || "",
        location: item.location || "",
        macaddress: item.macaddress || "",
        deviceip: item.deviceip || "",
        is_active: item.is_active || false,
      });
    }
  }, [item]);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const response = await update(
        `/api/device/update-device/${item.id}`,
        values
      );

      if (response?.status === "success") {
        setIsSubmitting(false);
        close();
        mutate();
        toast.success("Device updated successfully");
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
    <Modal
      classNames={{
        title: "modalTitle",
      }}
      opened={opened}
      title="Edit Device"
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
              disabled={isSubmitting}
              {...form.getInputProps("is_active", { type: "checkbox" })}
              key={form.key("is_active")}
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
  );
};

export default Index;
