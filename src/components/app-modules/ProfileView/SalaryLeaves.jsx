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
  MultiSelect,
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
        title="Edit Salary and Leaves"
        onClose={close}
        centered
      >
        <form>
          <Grid>
            <Grid.Col span={6}>
              <Select
                mb="sm"
                label="Payment In"
                placeholder="Payment In"
                data={["Cash", "Cheque", "Bank"]}
                // {...form.getInputProps("payment_in")}
              />
              <NumberInput
                rightSection={<></>}
                rightSectionWidth={0}
                mb="sm"
                label="Monthly Gross Salary"
                placeholder="Monthly Gross Salary"
                // {...form.getInputProps("gross_salary")}
              />
              <MultiSelect
                mb="sm"
                label="Leave Policy"
                placeholder="Leave Policy"
                data={[
                  { value: "1", label: "Leave Policy 1" },
                  { value: "2", label: "Leave Policy 2" },
                  { value: "3", label: "Leave Policy 3" },
                  { value: "4", label: "Leave Policy 4" },
                ]}
                searchable
                withAsterisk
                // {...form.getInputProps("leavepolicy")}
              />
              <MultiSelect
                mb="sm"
                label="Earning Policy"
                placeholder="Earning Policy"
                data={[
                  { value: "1", label: "Earning Policy 1" },
                  { value: "2", label: "Earning Policy 2" },
                  { value: "3", label: "Earning Policy 3" },
                  { value: "4", label: "Earning Policy 4" },
                ]}
                searchable
                withAsterisk
                // {...form.getInputProps("payrollpolicy.earningpolicy")}
              />

              <MultiSelect
                mb="sm"
                label="Deduction Policy"
                placeholder="Deduction Policy"
                data={[
                  { value: "1", label: "Deduction Policy 1" },
                  { value: "2", label: "Deduction Policy 2" },
                  { value: "3", label: "Deduction Policy 3" },
                  { value: "4", label: "Deduction Policy 4" },
                ]}
                searchable
                withAsterisk
                // {...form.getInputProps("payrollpolicy.deductionpolicy")}
              />

              <TextInput
                mb="sm"
                label="Bank Account Name"
                placeholder="Bank Account Name"
                // {...form.getInputProps("bank_account.bank_name")}
              />
              <TextInput
                mb="sm"
                label="Branch"
                placeholder="Branch"
                // {...form.getInputProps("bank_account.branch_name")}
              />
              <Select
                label="Bank Account Type"
                placeholder="Bank Account Type"
                data={[
                  { value: "1", label: "Current" },
                  { value: "2", label: "Savings" },
                  { value: "3", label: "Salary" },
                  { value: "4", label: "Chequing" },
                  { value: "5", label: "Business" },
                ]}
                // {...form.getInputProps("bank_account.account_type")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                mb="sm"
                label="Account No."
                placeholder="Account No."
                rightSection={<></>}
                rightSectionWidth={0}
                // {...form.getInputProps("bank_account.account_no")}
              />
              <NumberInput
                mb="sm"
                label="Routing No."
                rightSection={<></>}
                rightSectionWidth={0}
                placeholder="Routing No."
                // {...form.getInputProps("bank_account.routing_no")}
              />
              <TextInput
                mb="sm"
                label="SWIFT"
                placeholder="SWIFT"
                // {...form.getInputProps("bank_account.swift_bic")}
              />
              <TextInput
                mb="sm"
                label="Bank Address"
                placeholder="Bank Address"
                // {...form.getInputProps("bank_account.swift_bic")}
              />
              <TextInput
                mb="sm"
                label="City"
                placeholder="City"
                // {...form.getInputProps("bank_account.address.city")}
              />
              <TextInput
                mb="sm"
                label="Division"
                placeholder="Division"
                // {...form.getInputProps("bank_account.address.state_division")}
              />
              <TextInput
                mb="sm"
                label="ZIP / Postal Code"
                placeholder="ZIP / Postal Code"
                // {...form.getInputProps("bank_account.address.post_zip_code")}
              />
              <Select
                label="Country"
                placeholder="Country"
                searchable
                data={countries}
                // {...form.getInputProps("bank_account.address.country")}
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
