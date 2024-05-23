import React from "react";
import { DateInput } from "@mantine/dates";
import { Checkbox } from "@mantine/core";
import {
   Modal,
   TextInput,
   Textarea,
   Button,
   Select,
   Group,
} from "@mantine/core";

const Index = ({ opened, close }) => {
   return (
      <>
         <Modal
            classNames={{
               title: "modalTitle",
            }}
            opened={opened}
            title="Edit Leave Policy"
            onClose={close}
            centered
         >
            <form>
               <TextInput label="Name" placeholder="Name" />
               <Textarea
                  mt="md"
                  label="Description"
                  placeholder="Description"
               />
               <TextInput
                  mt="md"
                  label="Allocation Days"
                  placeholder="Allocation Days"
               />
               <Select
                  mt="md"
                  label="Leave Type"
                  placeholder="Pick value"
                  data={["Paid", "Unpaid"]}
               />

               <Checkbox mt="md" label="Is Optional?" variant="outline" />
               <Checkbox mt="md" label="Is Calendar Day?" variant="outline" />
               <Checkbox
                  mt="md"
                  label="Require Attachment?"
                  variant="outline"
               />

               <Group justify="flex-end" mt="md">
                  <Button type="submit">Save</Button>
               </Group>
            </form>
         </Modal>
      </>
   );
};

export default Index;
