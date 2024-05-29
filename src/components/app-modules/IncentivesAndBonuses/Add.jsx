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
   MultiSelect,
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
               <Textarea
                  mb="sm"
                  label="Description"
                  placeholder="Description"
               />
               <MultiSelect
                  mb="sm"
                  label="Employees"
                  placeholder="Employees"
                  data={["Jiaur Rahman", "Nazmul Hussain", "Roki Islam"]}
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
               <DateInput
                  mb="sm"
                  valueFormat="DD MMM YYYY"
                  label="Issuing Date"
                  placeholder="DD MMM YYYY"
               />
               <DateInput
                  mb="sm"
                  valueFormat="DD MMM YYYY"
                  label="Disbursement Date"
                  placeholder="DD MMM YYYY"
               />
            </form>
         </Modal>
      </>
   );
};

export default Index;
