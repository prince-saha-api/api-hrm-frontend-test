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
        title="Edit Education"
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
          </div>
          <div className="mt-4">
            <Button variant="outline" color="red" size="sm" mb="xs">
              <RiDeleteBin6Line className="me-2 ms-0" />
              Remove
            </Button>
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
          </div>
          <Button variant="transparent" size="sm" mt="xs">
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
