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
        title="Edit Emergency Contact"
        onClose={close}
        centered
      >
        <form>
          <div className="">
            <Button variant="outline" color="red" size="sm" mb="xs">
              <RiDeleteBin6Line className="me-2 ms-0" />
              Remove
            </Button>
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  mb="sm"
                  label="Name"
                  placeholder="Name"
                  // disabled={isSubmitting}
                  // {...form.getInputProps("name")}
                />
                <NumberInput
                  mb="sm"
                  label="Age"
                  placeholder="Age"
                  hideControls
                />
                <NumberInput
                  mb="sm"
                  label="Phone No"
                  placeholder="Phone No"
                  hideControls
                />
                <TextInput
                  mb="sm"
                  label="Email"
                  placeholder="Email"
                  // disabled={isSubmitting}
                  // {...form.getInputProps("name")}
                />
                <TextInput
                  // mb="sm"
                  label="Relation"
                  placeholder="Relation"
                  // disabled={isSubmitting}
                  // {...form.getInputProps("name")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  mb="sm"
                  label="Address"
                  placeholder="Address"
                  // disabled={isSubmitting}
                  // {...form.getInputProps("name")}
                />
                <TextInput
                  mb="sm"
                  label="City"
                  placeholder="City"
                  // disabled={isSubmitting}
                  // {...form.getInputProps("name")}
                />
                <TextInput
                  mb="sm"
                  label="State"
                  placeholder="State"
                  // disabled={isSubmitting}
                  // {...form.getInputProps("name")}
                />
                <TextInput
                  mb="sm"
                  label="ZIP Code"
                  placeholder="ZIP Code"
                  // disabled={isSubmitting}
                  // {...form.getInputProps("name")}
                />
                <Select
                  mb="sm"
                  label="Country"
                  placeholder="Country"
                  // disabled={isSubmitting}
                  data={["Bangladesh", "India"]}
                  // {...form.getInputProps("company")}
                />
              </Grid.Col>
            </Grid>
          </div>
          <div className="mt-3">
            <Button variant="outline" color="red" size="sm" mb="xs">
              <RiDeleteBin6Line className="me-2 ms-0" />
              Remove
            </Button>
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  mb="sm"
                  label="Name"
                  placeholder="Name"
                  // disabled={isSubmitting}
                  // {...form.getInputProps("name")}
                />
                <NumberInput
                  mb="sm"
                  label="Age"
                  placeholder="Age"
                  hideControls
                />
                <NumberInput
                  mb="sm"
                  label="Phone No"
                  placeholder="Phone No"
                  hideControls
                />
                <TextInput
                  mb="sm"
                  label="Email"
                  placeholder="Email"
                  // disabled={isSubmitting}
                  // {...form.getInputProps("name")}
                />
                <TextInput
                  // mb="sm"
                  label="Relation"
                  placeholder="Relation"
                  // disabled={isSubmitting}
                  // {...form.getInputProps("name")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  mb="sm"
                  label="Address"
                  placeholder="Address"
                  // disabled={isSubmitting}
                  // {...form.getInputProps("name")}
                />
                <TextInput
                  mb="sm"
                  label="City"
                  placeholder="City"
                  // disabled={isSubmitting}
                  // {...form.getInputProps("name")}
                />
                <TextInput
                  mb="sm"
                  label="State"
                  placeholder="State"
                  // disabled={isSubmitting}
                  // {...form.getInputProps("name")}
                />
                <TextInput
                  mb="sm"
                  label="ZIP Code"
                  placeholder="ZIP Code"
                  // disabled={isSubmitting}
                  // {...form.getInputProps("name")}
                />
                <Select
                  mb="sm"
                  label="Country"
                  placeholder="Country"
                  // disabled={isSubmitting}
                  data={["Bangladesh", "India"]}
                  // {...form.getInputProps("company")}
                />
              </Grid.Col>
            </Grid>
          </div>
          <Button variant="transparent" size="sm">
            <AiOutlinePlus className="me-1" /> Add More
          </Button>
          <Group justify="flex-end" mt="md">
            {/* <Button variant="transparent" size="sm"><AiOutlinePlus className="me-1"/> Add More</Button> */}
            <Button variant="filled">Update</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Index;
