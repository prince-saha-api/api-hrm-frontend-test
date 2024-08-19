import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { Modal, Button, Group, PasswordInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { toast } from "react-toastify";
import { deleteItem } from "@/lib/submit";
import { update, submit } from "@/lib/submit";

const Index = ({ opened, close, item }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log(item);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      new_password: "",
      confirm_password: "",
    },
    validate: {
      new_password: (value) =>
        value.length < 5
          ? "Password must have at least 5 characters"
          : !/[!@#$%^&*(),.?":{}|<>]/.test(value)
          ? "Password must contain at least one special character"
          : null,
      confirm_password: (value, values) =>
        value !== values.new_password ? "Passwords did not match" : null,
    },
  });

  const handleSubmit = async (values) => {
    // e.preventDefault();
    // console.log(values);

    setIsSubmitting(true);
    const updatedValues = { ...values, user: item };

    try {
      const response = await update(`/auth/reset-password/`, updatedValues);
      // const response = res.json();
      console.log(response);

      if (response?.status === "success") {
        // console.log(response);
        setIsSubmitting(false);
        close();
        // mutate();
        toast.success("Password changed successfully");
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
      setTimeout(() => {
        setIsSubmitting(false);
        // mutate();
      }, 500);
    } catch (error) {
      console.error("Error submitting form:", error);
      setTimeout(() => {
        setIsSubmitting(false);
        mutate();
      }, 500);
    }
  };

  return (
    <>
      <Modal
        classNames={{
          title: "modalTitle",
        }}
        opened={opened}
        title="Reset Password"
        onClose={close}
        centered
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <PasswordInput
            mb="sm"
            label="New Password"
            placeholder="New Password"
            // required={true}
            disabled={isSubmitting}
            {...form.getInputProps("new_password")}
          />
          <PasswordInput
            mb="sm"
            label="Confirm Password"
            placeholder="Confirm Password"
            // required={true}
            disabled={isSubmitting}
            {...form.getInputProps("confirm_password")}
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
