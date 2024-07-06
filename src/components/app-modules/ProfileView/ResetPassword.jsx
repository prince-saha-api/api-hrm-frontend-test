import React, { useState } from "react";
import {
   Modal,
   Button,
   Group,
   PasswordInput,
   Grid,
   TextInput,
   Select,
   NumberInput,
   Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { toast } from "react-toastify";
import { deleteItem } from "@/lib/submit";

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
            title="Reset Password"
            onClose={close}
            centered
         >
            <form>
               <PasswordInput
                  mb="sm"
                  label="New Password"
                  placeholder="New Password"
                  required={true}
                  // disabled={isSubmitting}
                  // {...form.getInputProps("name")}
               />
               <PasswordInput
                  mb="sm"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  required={true}
                  // disabled={isSubmitting}
                  // {...form.getInputProps("name")}
               />

               <Group justify="flex-end" mt="md">
                  <Button variant="filled">Update</Button>
               </Group>
            </form>
         </Modal>
      </>
   );
};

export default Index;
