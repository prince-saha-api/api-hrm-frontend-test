import React, { useState } from "react";
import {
  Modal,
  Button,
  Group,
  FileInput,
  Grid,
  TextInput,
  Select,
  NumberInput,
  Textarea,
  DateInput,
  Checkbox,
} from "@mantine/core";
import { FaFile } from "react-icons/fa6";
import { TbPhotoFilled } from "react-icons/tb";
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
        title="Edit Documents"
        onClose={close}
        centered
      >
        <form>
          <FileInput
            mb="sm"
            leftSection={<FaFile className="fileIcon" />}
            label="NID/Passport"
            placeholder="NID/Passport"
            leftSectionPointerEvents="none"
            // {...form.getInputProps("nidPassport")}
          />
          <FileInput
            mb="sm"
            leftSection={<FaFile className="fileIcon" />}
            label="Resume"
            placeholder="Resume"
            leftSectionPointerEvents="none"
            // {...form.getInputProps("cv")}
          />

          <FileInput
            mb="sm"
            leftSection={<FaFile className="fileIcon" />}
            label="Appointment Letter"
            placeholder="Appointment Letter"
            leftSectionPointerEvents="none"
            // {...form.getInputProps("appointmentLetter")}
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
