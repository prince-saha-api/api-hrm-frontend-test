import { useRef } from "react";
import { DateInput, TimeInput } from "@mantine/dates";
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Select,
  Group,
  Grid,
  NumberInput,
  ActionIcon,
} from "@mantine/core";
import { FiFile } from "react-icons/fi";
import { IoTimeOutline } from "react-icons/io5";

const Index = ({ opened, close }) => {
  // Time picker
  const refInTime = useRef(null);
  const inTime = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refInTime.current?.showPicker()}
    >
      <IoTimeOutline />
    </ActionIcon>
  );
  const refOutTime = useRef(null);
  const outTime = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refOutTime.current?.showPicker()}
    >
      <IoTimeOutline />
    </ActionIcon>
  );
  // Time picker

  return (
    <>
      <Modal
        classNames={{
          title: "modalTitle",
        }}
        opened={opened}
        title="Add Attendance Request"
        onClose={close}
        centered
      >
        <form>
          {/* <Select
            mb="sm"
            label="Employee"
            placeholder="Employee"
            data={["Jiaur Rahman", "Nazmul Hussain"]}
          /> */}
          <DateInput
            mb="sm"
            valueFormat="DD MMM YYYY"
            label="Date"
            placeholder="DD MMM YYYY"
          />
          <TimeInput
            mb="sm"
            label="In Time"
            ref={refInTime}
            rightSection={inTime}
          />
          <TimeInput
            mb="sm"
            label="Out Time"
            ref={refOutTime}
            rightSection={outTime}
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
