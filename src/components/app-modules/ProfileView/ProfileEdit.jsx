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
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { toast } from "react-toastify";
import { deleteItem } from "@/lib/submit";

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
        title="Edit Profile"
        onClose={close}
        centered
      >
        <form>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                mb="sm"
                label="First Name"
                placeholder="First Name"
                required={true}
                // disabled={isSubmitting}
                // {...form.getInputProps("name")}
              />
              <TextInput
                mb="sm"
                label="Designation"
                placeholder="Designation"
                required={true}
                // disabled={isSubmitting}
                // {...form.getInputProps("name")}
              />
              <TextInput
                mb="sm"
                label="Employee ID"
                placeholder="Employee ID"
                required={true}
                // disabled={isSubmitting}
                // {...form.getInputProps("name")}
              />
              <Select
                mb="sm"
                label="Department"
                placeholder="Department"
                required={true}
                // disabled={isSubmitting}
                data={["Development", "Marketing"]}
                // {...form.getInputProps("company")}
              />
              <DatePickerInput
                mb="sm"
                label="Date of Join"
                placeholder="Pick date"
                value={value}
                onChange={setValue}
              />
              <Select
                mb="sm"
                label="Department"
                placeholder="Department"
                required={true}
                // disabled={isSubmitting}
                data={["Leave-Policy-1", "Leave-Policy-2"]}
                // {...form.getInputProps("company")}
              />
              <NumberInput
                // mb="sm"
                label="Phone"
                placeholder="Phone"
                required={true}
                hideControls
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                mb="sm"
                label="Last Name"
                placeholder="Last Name"
                required={true}
                // disabled={isSubmitting}
                // {...form.getInputProps("name")}
              />
              <TextInput
                mb="sm"
                label="Email"
                placeholder="Email"
                required={true}
                // disabled={isSubmitting}
                // {...form.getInputProps("name")}
              />
              <DatePickerInput
                mb="sm"
                label="Date of Birth"
                placeholder="Pick date"
                value={value2}
                onChange={setValue2}
                required={true}
              />
              <Select
                mb="sm"
                label="Gender"
                placeholder="Gender"
                required={true}
                // disabled={isSubmitting}
                data={["Male", "Female"]}
                // {...form.getInputProps("company")}
              />
              <Select
                mb="sm"
                label="Blood Group"
                placeholder="Blood Group"
                required={true}
                data={[
                  "A+",
                  "A-",
                  "B+",
                  "B-",
                  "AB+",
                  "AB-",
                  "O+",
                  "O-",
                  "Golden Blood(Rh Null)",
                ]}
                //  {...form.getInputProps("blood_group")}
              />
              <Select
                mb="sm"
                label="Marital Status"
                placeholder="Marital Status"
                required={true}
                data={["Single", "Married", "Widowed", "Divorced", "Separated"]}
                //  {...form.getInputProps("marital_status")}
              />
              <Select
                mb="sm"
                label="Supervisor"
                placeholder="Supervisor"
                required={true}
                // disabled={isSubmitting}
                data={["Tanim Shahriar Abedin", "Korim Hussain"]}
                // {...form.getInputProps("company")}
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
