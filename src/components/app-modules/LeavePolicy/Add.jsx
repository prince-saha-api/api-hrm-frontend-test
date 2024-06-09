import React, { useState } from "react";
import { DateInput } from "@mantine/dates";
import { Checkbox } from "@mantine/core";
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Select,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import { submit } from "@/lib/submit";

const Index = ({ opened, close }) => {
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      allocation_days: 15,
      leave_type: null,
      max_consecutive_days: 3,
      require_attachment: false,
      is_optional: false,
      is_calendar_day: false,
      applicable_for: 1,
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
    },
  });

  const handleSubmit = async (values) => {
    console.log(values);
    // e.preventDefault();
    setSuccess("");

    try {
      setIsLoading(true);
      const response = await submit("/api/leave/add-leavepolicy/", values);
      // const response = res.json();
      if (response?.status === "success") {
        console.log(response);
        // setSuccess("Leave Policy created successfully");
        setIsLoading(false);
        // setErrors({});
        // form.reset();
        // close();
        // setSuccess("Leave Policy created successfully");
        toast.success("Leave Policy created successfully");
      } else {
        toast.error(
          response?.status === "error"
            ? response?.message[0]
            : "Error submitting form"
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Modal
        classNames={{
          title: "modalTitle",
        }}
        opened={opened}
        title="Add Leave Policy"
        onClose={close}
        centered
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            label="Name"
            placeholder="Name"
            {...form.getInputProps("name")}
          />
          <Textarea
            mt="md"
            label="Description"
            placeholder="Description"
            {...form.getInputProps("description")}
          />
          <TextInput
            mt="md"
            label="Allocation Days"
            placeholder="Allocation Days"
            {...form.getInputProps("allocation_days")}
          />
          <Select
            mt="md"
            label="Leave Type"
            placeholder="Pick value"
            data={["Paid", "Unpaid"]}
            {...form.getInputProps("leave_type")}
          />

          <Checkbox
            mt="md"
            label="Is Optional?"
            variant="outline"
            {...form.getInputProps("is_optional")}
          />
          <Checkbox
            mt="md"
            label="Is Calendar Day?"
            variant="outline"
            {...form.getInputProps("is_calendar_day")}
          />
          <Checkbox
            mt="md"
            label="Require Attachment?"
            variant="outline"
            {...form.getInputProps("require_attachment")}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Save</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Index;
