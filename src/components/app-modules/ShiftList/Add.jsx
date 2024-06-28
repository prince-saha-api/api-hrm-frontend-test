// import React from "react";
import React, { useRef } from "react";
import {
   Modal,
   TextInput,
   Textarea,
   Button,
   Select,
   Group,
   Checkbox,
   NumberInput,
   ActionIcon,
   rem,
} from "@mantine/core";

import { TimeInput } from "@mantine/dates";
import { IoTimeOutline } from "react-icons/io5";

// import { IconClock } from "@tabler/icons-react";

const Index = ({ opened, close }) => {
   const refTimeIn = useRef(null);
   const refTimeOut = useRef(null);
   const timeIn = (
      <ActionIcon
         variant="subtle"
         color="gray"
         onClick={() => refTimeIn.current?.showPicker()}
      >
         <IoTimeOutline />
      </ActionIcon>
   );
   const timeOut = (
      <ActionIcon
         variant="subtle"
         color="gray"
         onClick={() => refTimeOut.current?.showPicker()}
      >
         <IoTimeOutline />
      </ActionIcon>
   );
   return (
      <>
         <Modal
            classNames={{
               title: "modalTitle",
            }}
            opened={opened}
            title="Add Shift"
            onClose={close}
            centered
         >
            <form>
               <TextInput label="Title" placeholder="Title" mb="sm" />

               <TimeInput
                  mb="sm"
                  label="Start Time"
                  ref={refTimeIn}
                  rightSection={timeIn}
               />
               <TimeInput
                  mb="sm"
                  label="End Time"
                  ref={refTimeOut}
                  rightSection={timeOut}
               />
               <NumberInput
                  label="Late Tolarence"
                  placeholder="Late Tolarence"
                  hideControls
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
