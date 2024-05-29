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
            title="Create Allowance"
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
                  mb="sm"
                  label="Amount"
                  rightSection={<></>}
                  rightSectionWidth={0}
                  placeholder="Amount"
               />
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
