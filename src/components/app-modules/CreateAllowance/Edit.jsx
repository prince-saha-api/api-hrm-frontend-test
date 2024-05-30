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
   NumberInput,
   Checkbox,
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
            title="Edit Allowance"
            onClose={close}
            centered
         >
            <form>
               <TextInput mb="sm" label="Title" placeholder="Title" />
               <Textarea
                  mb="sm"
                  label="Description"
                  placeholder="Description"
               />
               <Select
                  mb="sm"
                  label="Amount Type"
                  placeholder="Pick value"
                  data={["Fixed", "Percentage"]}
               />
               <NumberInput
                  mb="md"
                  label="Amount"
                  rightSection={<></>}
                  rightSectionWidth={0}
                  placeholder="Amount"
               />
               <Checkbox mb="sm" label="Is Taxable" />
               <Checkbox label="Depends on Attendance" />
               <Group justify="flex-end">
                  <Button type="submit">Save</Button>
               </Group>
            </form>
         </Modal>
      </>
   );
};

export default Index;
