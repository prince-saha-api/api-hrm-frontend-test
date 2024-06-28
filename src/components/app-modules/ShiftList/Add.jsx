import React, { useState, useRef } from "react";
import { useForm } from "@mantine/form";
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Select,
  Group,
  Checkbox,
  NumberInput,
  ActionIcon,
  rem,
  Grid,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { IoTimeOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { submit } from "@/lib/submit";
import { formatTime } from "@/lib/helper";

const Index = ({ opened, close, mutate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      in_time: "",
      out_time: "",
      late_tolerance_time: 0,
    },
    validate: {
      name: (value) =>
        value.length < 3 ? "Name must have at least 3 letters" : null,
    },
  });

  const refTimeIn = useRef(null);
  const refTimeOut = useRef(null);

  const timeIn = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refTimeIn.current?.showPicker()}
    >
      <IoTimeOutline />
    </ActionIcon>
  );

  const timeOut = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refTimeOut.current?.showPicker()}
    >
      <IoTimeOutline />
    </ActionIcon>
  );

  const handleSubmit = async (values) => {
    // e.preventDefault();
    // console.log(values);
    // return;

    const formattedValues = {
      ...values,
      in_time: formatTime(values.in_time),
      out_time: formatTime(values.out_time),
    };

    setIsSubmitting(true);

    try {
      const response = await submit(`/api/user/add-shift/`, formattedValues);

      if (response?.status === "success") {
        setIsSubmitting(false);
        form.reset();
        close();
        mutate();
        toast.success("Shift created successfully");
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
        title="Add Shift"
        onClose={close}
        centered
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid>
            <Grid.Col span={12}>
              <TextInput
                label="Title"
                placeholder="Title"
                mb="sm"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("name")}
              />

              <TimeInput
                mb="sm"
                label="Start Time"
                required={true}
                disabled={isSubmitting}
                ref={refTimeIn}
                rightSection={timeIn}
                {...form.getInputProps("in_time")}
              />

              <TimeInput
                mb="sm"
                label="End Time"
                required={true}
                disabled={isSubmitting}
                ref={refTimeOut}
                rightSection={timeOut}
                {...form.getInputProps("out_time")}
              />

              <NumberInput
                label="Late Tolarence"
                placeholder="Late Tolarence"
                hideControls
                disabled={isSubmitting}
                {...form.getInputProps("late_tolerance_time")}
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
