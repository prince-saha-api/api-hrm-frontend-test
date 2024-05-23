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
   MultiSelect,
   FileInput,
   rem,
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
            title="Leave Request"
            onClose={close}
            centered
         >
            <form>
               <Select
                  mb="sm"
                  label="Leave Type"
                  placeholder="Pick value"
                  data={["Casual", "Sick"]}
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
               <TextInput disabled mb="sm" label="Total Days" placeholder="0" />
               <FileInput
                  mb="sm"
                  leftSection={<FiFile />}
                  label="Attachment"
                  placeholder="Attachment"
                  leftSectionPointerEvents="none"
               />
               <Textarea mb="sm" label="Details" placeholder="Details" />
               <Group justify="flex-end">
                  <Button type="submit">Save</Button>
               </Group>
            </form>
         </Modal>
      </>
   );
};

export default Index;
