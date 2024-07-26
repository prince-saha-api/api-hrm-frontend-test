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
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";

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
          <div className="">
            <Button variant="outline" color="red" size="sm" mb="xs">
              <RiDeleteBin6Line className="me-2 ms-0" />
              Remove
            </Button>
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
          </div>
          <div className="mt-4">
            <Button variant="outline" color="red" size="sm" mb="xs">
              <RiDeleteBin6Line className="me-2 ms-0" />
              Remove
            </Button>
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
          </div>
          <Button variant="transparent" size="sm">
            <AiOutlinePlus className="me-1" /> Add More
          </Button>
          <Group justify="flex-end" mt="md">
            <Button variant="filled">Update</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Index;
