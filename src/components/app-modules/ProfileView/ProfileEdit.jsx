import React, { useState } from "react";
import useSWR from "swr";
import { useForm } from "@mantine/form";
import {
  Modal,
  Button,
  Group,
  Grid,
  TextInput,
  Select,
  NumberInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";
import { fetcher, getData } from "@/lib/fetch";

const Index = ({ opened, close, item, setItem }) => {
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      first_name: null,
      last_name: null,
    },
    // validate: {},
  });

  const {
    data: designationsData,
    error: designationsError,
    isLoading: isDesignationsLoading,
  } = useSWR(`/api/user/get-dsignation/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const designations = designationsData?.data?.result?.map((item) => ({
    label: item?.name?.toString() || "",
    value: item?.id.toString() || "",
  }));

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
                defaultValue={item?.first_name || ""}
              />

              <Select
                mb="sm"
                label="Designation"
                placeholder="Designation"
                required={true}
                // disabled={isSubmitting}
                data={designations}
                defaultValue={String(item?.designation?.id)}
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
              <NumberInput
                mb="sm"
                label="Phone"
                placeholder="Phone"
                required={true}
                hideControls
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
            <Grid.Col span={6}>
              <TextInput
                mb="sm"
                label="Last Name"
                placeholder="Last Name"
                required={true}
                defaultValue={item?.last_name || ""}
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
              <TextInput
                mb="sm"
                label="Spouse Name"
                placeholder="Spouse Name"
                required={true}
                // disabled={isSubmitting}
                // {...form.getInputProps("name")}
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
