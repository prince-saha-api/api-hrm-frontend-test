import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Select,
  Group,
  NumberInput,
  Checkbox,
} from "@mantine/core";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";

const Index = ({ opened, close, item, setItem, mutate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      description: "",
      amount_type: null,
      amount: 0,
      is_taxable: false,
      depends_on_attendance: false,
      is_recurring: false,
    },
    validate: {
      title: (value) => (!value ? "Title is required" : null),
    },
  });

  useEffect(() => {
    if (item) {
      form.setValues({
        title: item.title || "",
        description: item.description || "",
        amount_type: item.amount_type || null,
        amount: item.amount || 0,
        is_taxable: item.is_taxable || false,
        depends_on_attendance: item.depends_on_attendance || false,
        is_recurring: item.is_recurring || false,
      });
    }
  }, [item]);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const response = await update(
        `/api/payroll/update-payrollearning/${item.id}`,
        values
      );

      if (response?.status === "success") {
        setIsSubmitting(false);
        close();
        mutate();
        toast.success("Allowance updated successfully");
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
        title="Edit Allowance"
        onClose={() => {
          setItem(null);
          close();
        }}
        centered
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            mb="sm"
            label="Title"
            placeholder="Title"
            required={true}
            disabled={isSubmitting}
            {...form.getInputProps("title")}
          />
          <Textarea
            mb="sm"
            label="Description"
            placeholder="Description"
            // required={true}
            disabled={isSubmitting}
            {...form.getInputProps("description")}
          />
          <Select
            mb="sm"
            label="Amount Type"
            placeholder="Amount Type"
            data={["Fixed Amount", "Percentage"]}
            required={true}
            disabled={isSubmitting}
            {...form.getInputProps("amount_type")}
          />
          <NumberInput
            mb="md"
            label="Amount"
            rightSection={<></>}
            rightSectionWidth={0}
            placeholder="Amount"
            required={true}
            disabled={isSubmitting}
            {...form.getInputProps("amount")}
          />
          <Checkbox
            mb="sm"
            label="Is Taxable"
            disabled={isSubmitting}
            {...form.getInputProps("is_taxable", { type: "checkbox" })}
          />
          <Checkbox
            mb="sm"
            label="Depends on Attendance"
            disabled={isSubmitting}
            {...form.getInputProps("depends_on_attendance", {
              type: "checkbox",
            })}
          />
          <Checkbox
            label="Is Recurring?"
            disabled={isSubmitting}
            {...form.getInputProps("is_recurring", { type: "checkbox" })}
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
