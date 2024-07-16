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
        title="Edit Personal Details"
        onClose={close}
        centered
      >
        <form>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                mb="sm"
                label="Fathers Name"
                placeholder="Fathers Name"
                // // required={true}
                // disabled={isSubmitting}
                // {...form.getInputProps("name")}
              />
              <TextInput
                mb="sm"
                label="Mothers Name"
                placeholder="Mothers Name"
                // // required={true}
                // disabled={isSubmitting}
                // {...form.getInputProps("name")}
              />
              <TextInput
                //  mb="sm"
                label="Nationality"
                placeholder="Nationality"
                // // required={true}
                // disabled={isSubmitting}
                // {...form.getInputProps("name")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                mb="sm"
                label="Religion"
                placeholder="Religion"
                // required={true}
                // disabled={isSubmitting}
                // {...form.getInputProps("name")}
              />
              <NumberInput
                mb="sm"
                label="NID / Passport"
                placeholder="NID / Passport"
                // required={true}
                hideControls
              />
              <NumberInput
                //  mb="sm"
                label="TIN No"
                placeholder="TIN No"
                // required={true}
                hideControls
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <div className="mt-4">
                <p className="mb-0">Present Address</p>
                <TextInput
                  mb="sm"
                  // label="Address"
                  placeholder="Address"
                  // {...form.getInputProps("bank_account.address.city")}
                />
                <TextInput
                  mb="sm"
                  // label="City"
                  placeholder="City"
                  // {...form.getInputProps("bank_account.address.city")}
                />
                <TextInput
                  mb="sm"
                  // label="Division"
                  placeholder="Division"
                  // {...form.getInputProps("bank_account.address.state_division")}
                />
                <TextInput
                  mb="sm"
                  // label="ZIP / Postal Code"
                  placeholder="ZIP / Postal Code"
                  // {...form.getInputProps("bank_account.address.post_zip_code")}
                />
                <Select
                  // label="Country"
                  mb="sm"
                  placeholder="Country"
                  searchable
                  data={countries}
                  // {...form.getInputProps("bank_account.address.country")}
                />
              </div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className="mt-0">
                <Checkbox
                  styles={{
                    label: { fontSize: 12 },
                  }}
                  label="Same as Present Address"
                />
                <p className="mb-0 mt-1">Permanent Address</p>
                <TextInput
                  mb="sm"
                  // label="Address"
                  placeholder="Address"
                  // {...form.getInputProps("bank_account.address.city")}
                />
                <TextInput
                  mb="sm"
                  // label="City"
                  placeholder="City"
                  // {...form.getInputProps("bank_account.address.city")}
                />
                <TextInput
                  mb="sm"
                  // label="Division"
                  placeholder="Division"
                  // {...form.getInputProps("bank_account.address.state_division")}
                />
                <TextInput
                  mb="sm"
                  // label="ZIP / Postal Code"
                  placeholder="ZIP / Postal Code"
                  // {...form.getInputProps("bank_account.address.post_zip_code")}
                />
                <Select
                  // label="Country"
                  placeholder="Country"
                  searchable
                  data={countries}
                  // {...form.getInputProps("bank_account.address.country")}
                />
              </div>
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
