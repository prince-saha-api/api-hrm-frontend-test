import React from "react";
import { DateInput } from "@mantine/dates";
import {
   Modal,
   TextInput,
   Textarea,
   Button,
   Select,
   Group,
   Checkbox,
} from "@mantine/core";

const Index = ({ opened, close }) => {
   return (
      <>
         <Modal
            classNames={{
               title: "modalTitle",
            }}
            opened={opened}
            title="Add Holiday"
            onClose={close}
            centered
         >
            <form>
               <TextInput label="Title" placeholder="Title" />
               <Textarea
                  mt="md"
                  label="Description"
                  placeholder="Description"
               />
               <DateInput
                  mt="md"
                  valueFormat="DD MMM YYYY"
                  label="Date"
                  placeholder="DD MMM YYYY"
               />
               <Select
                  mt="md"
                  label="Employee Grade"
                  placeholder="Pick value"
                  data={["Grade-1", "Grade-2", "Grade-3", "Grade-4"]}
               />
               <Checkbox mt="md" label="Is Recurring?" />
               <Group justify="flex-end" mt="md">
                  <Button type="submit">Save</Button>
               </Group>
            </form>
         </Modal>
      </>
   );
};

export default Index;
