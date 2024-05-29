import React from "react";
import { DateInput } from "@mantine/dates";
import {
   Modal,
   TextInput,
   Textarea,
   Button,
   Select,
   Group,
   MultiSelect,
   FileInput,
   Grid,
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
            title="Edit Payroll"
            onClose={close}
            centered
         >
            <form>
               <Grid>
                  <Grid.Col span={6}>
                     <TextInput mb="sm" label="Title" placeholder="Title" />
                     <DateInput
                        mb="sm"
                        valueFormat="DD MMM YYYY"
                        label="Posting Date"
                        placeholder="DD MMM YYYY"
                     />
                     <DateInput
                        mb="sm"
                        valueFormat="DD MMM YYYY"
                        label="From Date"
                        placeholder="DD MMM YYYY"
                     />
                     <DateInput
                        mb="sm"
                        valueFormat="DD MMM YYYY"
                        label="To Date"
                        placeholder="DD MMM YYYY"
                     />
                     <Select
                        mb="sm"
                        label="Company"
                        placeholder="Pick value"
                        data={["company_id-A", "company_id-B"]}
                     />
                  </Grid.Col>
                  <Grid.Col span={6}>
                     <Select
                        mb="sm"
                        label="Branch"
                        placeholder="Pick value"
                        data={["branch_id-A", "branch_id-B"]}
                     />
                     <Select
                        mb="sm"
                        label="Department"
                        placeholder="Pick value"
                        data={["department_id-A", "department_id-B"]}
                     />
                     <Select
                        mb="sm"
                        label="Employee Grade"
                        placeholder="Pick value"
                        data={["Grade-A", "Grade-B"]}
                     />
                     <Select
                        mb="sm"
                        label="Designation"
                        placeholder="Pick value"
                        data={["Front-End Developer", "Back-End Developer"]}
                     />
                     <Select
                        mb="sm"
                        label="Effective Bank"
                        placeholder="Pick value"
                        data={["Bank-A", "Bank-B"]}
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
