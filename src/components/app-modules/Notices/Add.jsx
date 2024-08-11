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
  FileInput,
  MultiSelect,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IoTimeOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { submit } from "@/lib/submit";
import { formatTime } from "@/lib/helper";
import { FaFileLines } from "react-icons/fa6";
import { FaRegCalendarDays } from "react-icons/fa6";

const fileIcon = <FaFileLines />;
const dateIcon = <FaRegCalendarDays />;

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
  const [value, setValue] = useState(null);
  return (
    <>
      <Modal
        classNames={{
          title: "modalTitle",
        }}
        opened={opened}
        title="Add Notice"
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
              Save
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Index;
