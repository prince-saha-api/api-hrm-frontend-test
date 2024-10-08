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
            title="Create Income Tax"
            onClose={close}
            centered
         >
            <form>
               <TextInput mb="sm" label="Title" placeholder="Title" />
               <NumberInput
                  mb="sm"
                  label="Min. Income"
                  rightSection={<></>}
                  rightSectionWidth={0}
                  placeholder="Min. Income"
               />
               <NumberInput
                  mb="sm"
                  label="Max. Income"
                  rightSection={<></>}
                  rightSectionWidth={0}
                  placeholder="Max. Income"
               />
               <NumberInput
                  mb="sm"
                  label="Percentage"
                  rightSection={<></>}
                  rightSectionWidth={0}
                  placeholder="45%"
               />
               <Select
                  mb="sm"
                  label="Employee Group"
                  placeholder="Pick value"
                  data={["Group-A", "Group-B"]}
               />
            </form>
         </Modal>
      </>
   );
};

export default Index;
