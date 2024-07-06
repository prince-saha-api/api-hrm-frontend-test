import React, { useState } from "react";
import {
  Modal,
  Button,
  Group,
  Grid,
  TextInput,
  Select,
  NumberInput,
  Textarea,
  DateInput,
  Checkbox,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { toast } from "react-toastify";
import { deleteItem } from "@/lib/submit";
import { countries } from "@/data/countries";

const Index = ({ opened, close, item }) => {
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);
  return (
    <>
      <Modal
        classNames={{
          title: "modalTitle",
        }}
        opened={opened}
        title="Edit Experience"
        onClose={close}
        centered
      >
        <form>
          <TextInput
            mb="sm"
            label="Company Name"
            placeholder="Company Name"
            // disabled={isSubmitting}
            // {...form.getInputProps("name")}
          />
          <TextInput
            mb="sm"
            label="Designation"
            placeholder="Designation"
            // disabled={isSubmitting}
            // {...form.getInputProps("name")}
          />
          <Textarea mb="sm" label="Address" placeholder="Address" />

          <DatePickerInput
            mb="sm"
            label="From"
            placeholder="Pick date"
            value={value}
            onChange={setValue}
          />
          <DatePickerInput
            mb="sm"
            label="To"
            placeholder="Pick date"
            value={value2}
            onChange={setValue2}
          />

          <Group justify="flex-end" mt="md">
            <Button variant="filled">Update</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Index;
