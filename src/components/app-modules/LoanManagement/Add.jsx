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
   Checkbox,
   Input,
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
            title="Create Advance Salary"
            onClose={close}
            centered
         >
            <form>
               <Grid>
                  <Grid.Col span={6}>
                     <TextInput mb="sm" label="Title" placeholder="Title" />
                     <Select
                        mb="sm"
                        label="Employee"
                        placeholder="Pick value"
                        data={["Jiaur Rahman", "Nazmul Hussain"]}
                     />
                     <TextInput mb="sm" label="Reason" placeholder="Reason" />
                     <Select
                        mb="sm"
                        label="Type"
                        placeholder="Pick value"
                        data={["Advance Salary", "Loan", "Fine"]}
                     />
                     <NumberInput
                        mb="sm"
                        label="Amount"
                        rightSection={<></>}
                        rightSectionWidth={0}
                        placeholder="Amount"
                     />
                     <Select
                        mb="sm"
                        label="Adjustment Type"
                        placeholder="Pick value"
                        data={["Salary", "Cash"]}
                     />
                  </Grid.Col>
                  <Grid.Col span={6}>
                     <NumberInput
                        mb="sm"
                        label="Total Installment"
                        rightSection={<></>}
                        rightSectionWidth={0}
                        placeholder="Total Installment"
                     />
                     <NumberInput
                        disabled
                        mb="sm"
                        label="Instalment Amount"
                        rightSection={<></>}
                        rightSectionWidth={0}
                        placeholder="0"
                     />
                     <DateInput
                        mb="sm"
                        valueFormat="DD MMM YYYY"
                        label="Disbursement Date"
                        placeholder="DD MMM YYYY"
                     />
                     <DateInput
                        mb="sm"
                        valueFormat="DD MMM YYYY"
                        label="Installment Starts From"
                        placeholder="DD MMM YYYY"
                     />
                     <Checkbox mb="sm" label="Repayment Completed" />
                     <DateInput
                        disabled
                        mb="md"
                        valueFormat="DD MMM YYYY"
                        label="Repayment Completion Date"
                        placeholder="DD MMM YYYY"
                     />
                  </Grid.Col>
               </Grid>

               <Group justify="flex-end">
                  <Button type="submit">Save</Button>
               </Group>
            </form>
         </Modal>
      </>
   );
};

export default Index;
