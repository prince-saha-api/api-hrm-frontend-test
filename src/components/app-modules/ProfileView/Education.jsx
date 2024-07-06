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
        title="Edit Education"
        onClose={close}
        centered
      >
        <form>
          <TextInput
            mb="sm"
            label="Certification"
            placeholder="Certification"
            // disabled={isSubmitting}
            // {...form.getInputProps("name")}
          />
          <TextInput
            mb="sm"
            label="Institute"
            placeholder="Institute"
            // disabled={isSubmitting}
            // {...form.getInputProps("name")}
          />
          <TextInput
            mb="sm"
            label="Level"
            placeholder="Level"
            // disabled={isSubmitting}
            // {...form.getInputProps("name")}
          />
          <TextInput
            mb="sm"
            label="Grade"
            placeholder="Grade"
            // disabled={isSubmitting}
            // {...form.getInputProps("name")}
          />
          <NumberInput
            // mb="sm"
            label="Passing Year"
            placeholder="Passing Year"
            hideControls
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
