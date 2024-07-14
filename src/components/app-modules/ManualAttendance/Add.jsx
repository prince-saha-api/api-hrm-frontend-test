import React from "react";
import { DateInput } from "@mantine/dates";
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Select,
  Group,
  Grid,
  NumberInput,
} from "@mantine/core";
import { FiFile } from "react-icons/fi";

const Index = ({ opened, close }) => {
  return (
    <>
      <Modal
        classNames={{
          title: "modalTitle",
        }}
        opened={opened}
        title="Add Attendance"
        onClose={close}
        centered
      >
        <form>
          <Select
            mb="sm"
            label="Employee"
            placeholder="Employee"
            data={["Jiaur Rahman", "Nazmul Hussain"]}
          />
          <DateInput
            mb="sm"
            valueFormat="DD MMM YYYY"
            label="Date"
            placeholder="DD MMM YYYY"
          />
          <NumberInput
            mb="sm"
            label="In Time"
            rightSection={<></>}
            rightSectionWidth={0}
            placeholder="In Time"
          />
          <NumberInput
            mb="sm"
            label="Out Time"
            rightSection={<></>}
            rightSectionWidth={0}
            placeholder="Out Time"
          />
          <Select
            mb="sm"
            label="Shift"
            placeholder="Shift"
            data={["Day", "Night"]}
          />
          <Textarea mb="sm" label="Admin Note" placeholder="Admin Note" />
          <Group justify="flex-end">
            <Button type="submit">Save</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Index;
