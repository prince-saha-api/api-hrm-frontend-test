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
        title="Edit Official Details"
        onClose={close}
        centered
      >
        <form>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                mb="sm"
                label="Official Email"
                placeholder="Official Email"
                // disabled={isSubmitting}
                // {...form.getInputProps("name")}
              />
              <NumberInput
                mb="sm"
                label="Official Phone"
                placeholder="Official Phone"
                hideControls
              />
              <Select
                mb="sm"
                label="Employee Type"
                placeholder="Employee Type"
                // disabled={isSubmitting}
                data={["Full-time", "Part-time"]}
                // {...form.getInputProps("company")}
              />
              <TextInput
                mb="sm"
                label="Company"
                placeholder="Company"
                // disabled={isSubmitting}
                // {...form.getInputProps("name")}
              />
              <Select
                mb="sm"
                label="Branch"
                placeholder="Branch"
                // disabled={isSubmitting}
                data={["Dhaka", "Rangpur"]}
                // {...form.getInputProps("company")}
              />
              <Select
                mb="sm"
                label="Default Shift"
                placeholder="Default Shift"
                // disabled={isSubmitting}
                data={["Day", "Night"]}
                // {...form.getInputProps("company")}
              />
              <Select
                mb="sm"
                label="Grade"
                placeholder="Grade"
                // disabled={isSubmitting}
                data={["Grade-1", "Grade-2"]}
                // {...form.getInputProps("company")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                mb="sm"
                label="User Role"
                placeholder="User Role"
                // disabled={isSubmitting}
                data={["User-Role-1", "User-Role-2"]}
                // {...form.getInputProps("company")}
              />
              <TextInput
                mb="sm"
                label="Official Note"
                placeholder="Official Note"
                // disabled={isSubmitting}
                // {...form.getInputProps("name")}
              />
              <Select
                mb="sm"
                label="Group"
                placeholder="Group"
                // disabled={isSubmitting}
                data={["Group-A", "Group-B"]}
                // {...form.getInputProps("company")}
              />
              <DatePickerInput
                mb="sm"
                label="Joining Date"
                placeholder="Pick date"
                value={value}
                onChange={setValue}
              />
              <Select
                mb="sm"
                label="Expense Approver"
                placeholder="Expense Approver"
                searchable
                data={[
                  { value: "API230747", label: "G. M. Nazmul Hussain" },
                  { value: "API230748", label: "Jiaur Rahman" },
                  { value: "API230749", label: "Nayeem Hossain" },
                ]}
                // {...form.getInputProps("expense_approver")}
              />
              <Select
                mb="sm"
                label="Leave Approver"
                placeholder="Leave Approver"
                searchable
                data={[
                  { value: "API230747", label: "G. M. Nazmul Hussain" },
                  { value: "API230748", label: "Jiaur Rahman" },
                  { value: "API230749", label: "Nayeem Hossain" },
                ]}
                // {...form.getInputProps("leave_approver")}
              />
              <Select
                mb="sm"
                label="Shift Approver"
                placeholder="Shift Approver"
                searchable
                data={[
                  { value: "API230747", label: "G. M. Nazmul Hussain" },
                  { value: "API230748", label: "Jiaur Rahman" },
                  { value: "API230749", label: "Nayeem Hossain" },
                ]}
                // {...form.getInputProps("shift_request_approver")}
              />
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="md">
            <Button variant="filled">Update</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Index;
