import React, { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { Modal, TextInput, Button, Group, Grid } from "@mantine/core";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";

const Index = ({ opened, close, item, setItem, mutate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) =>
        value.length < 5 ? "Name must have at least 5 letters" : null,
    },
  });

  useEffect(() => {
    if (item) {
      form.setValues({
        name: item.name || "",
      });
    }
  }, [item]);

  const handleSubmit = async (values) => {
    // e.preventDefault();
    // console.log(values);

    setIsSubmitting(true);

    try {
      const response = await update(
        `/api/user/update-grade/${item.id}`,
        values
      );

      if (response?.status === "success") {
        // console.log(response);
        setIsSubmitting(false);
        close();
        mutate();
        toast.success("Grade updated successfully");
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
        title="Edit Employee Group"
        onClose={close}
        centered
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                mb="sm"
                label="Employee Group"
                placeholder="Employee Group"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("name")}
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
