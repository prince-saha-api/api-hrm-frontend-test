import React, { useState, useEffect, useRef } from "react";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
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
  FileInput,
  MultiSelect,
} from "@mantine/core";
import { IoTimeOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";
import { formatTime } from "@/lib/helper";
import { FaFileLines } from "react-icons/fa6";
import { FaRegCalendarDays } from "react-icons/fa6";

const fileIcon = <FaFileLines />;
const dateIcon = <FaRegCalendarDays />;

const Index = ({ opened, close, item, setItem, mutate }) => {
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

  useEffect(() => {
    if (item) {
      form.setValues({
        name: item.name || "",
        in_time: item.in_time || "",
        out_time: item.out_time || "",
        late_tolerance_time: item.late_tolerance_time || 0,
      });
    }
  }, [item]);

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
    const formattedValues = {
      ...values,
      in_time: formatTime(values.in_time),
      out_time: formatTime(values.out_time),
    };

    setIsSubmitting(true);

    try {
      const response = await update(
        `/api/user/update-shift/${item.id}`,
        formattedValues
      );

      if (response?.status === "success") {
        // console.log(response);
        setIsSubmitting(false);
        close();
        mutate();
        toast.success("Shift updated successfully");
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
  const [value, setValue] = useState(null);
  return (
    <>
      <Modal
        classNames={{
          title: "modalTitle",
        }}
        opened={opened}
        title="Edit Notice"
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
                // {...form.getInputProps("name")}
              />
              <TextInput
                label="Description"
                placeholder="Description"
                mb="sm"
                required={true}
                disabled={isSubmitting}
                // {...form.getInputProps("name")}
              />

              <FileInput
                rightSection={fileIcon}
                label="Attachment"
                mb="sm"
                placeholder="Attachment"
                rightSectionPointerEvents="none"
              />

              <DateInput
                rightSection={dateIcon}
                value={value}
                required={true}
                onChange={setValue}
                mb="sm"
                label="Expire Date"
                placeholder="MMM/DDD/YYY"
                rightSectionPointerEvents="none"
              />
              <MultiSelect
                label="Branches"
                placeholder="Branches"
                mb="sm"
                data={["Banani", "Mohammadpur", "Dhaka"]}
              />
              <MultiSelect
                label="Department"
                placeholder="Department"
                mb="sm"
                data={["Development", "Marketing", "SEO"]}
              />
              <MultiSelect
                label="Employee"
                placeholder="Employee"
                mb="sm"
                data={["Jiaur", "Nazmul", "Kawsar"]}
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
