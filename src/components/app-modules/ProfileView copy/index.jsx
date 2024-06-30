"use client";
import React, { useRef } from "react";
import {
   Button,
   Group,
   Select,
   Grid,
   NumberInput,
   ActionIcon,
   Checkbox,
   Modal,
} from "@mantine/core";
import Breadcrumb from "@/components/utils/Breadcrumb";
import { TimeInput } from "@mantine/dates";
import { IoTimeOutline } from "react-icons/io5";
import { useDisclosure } from "@mantine/hooks";

const ProfileView = () => {
   const refTimeIn = useRef(null);
   const timeIn = (
      <ActionIcon
         variant="subtle"
         color="gray"
         onClick={() => refTimeIn.current?.showPicker()}
      >
         <IoTimeOutline />
      </ActionIcon>
   );

   const [opened, { open, close }] = useDisclosure(false);

   return (
      <>
         <Breadcrumb
            classNames={{
               root: "mb-4",
            }}
            title="Profile"
            items={[
               { title: "Dashboard", href: "/dashboard" },
               { title: "Profile" },
            ]}
         />

         <Modal opened={opened} onClose={close} title="Authentication" centered>
            <p>Modal content</p>
         </Modal>

         <Button onClick={open}>Open centered Modal</Button>

         <div className="itemCard">
            {/* <form>
               <Grid>
                  <Grid.Col span={3}>
                     <Select
                        mb="sm"
                        label="Fiscal Year Start from Month"
                        placeholder="Pick value"
                        data={[
                           "January",
                           "February",
                           "March",
                           "April",
                           "May",
                           "June",
                           "July",
                           "August",
                           "September",
                           "October",
                           "November",
                           "December",
                        ]}
                     />
                     <TimeInput
                        mb="sm"
                        label="Working Day Starts At"
                        ref={refTimeIn}
                        rightSection={timeIn}
                     />
                     <NumberInput
                        mb="sm"
                        label="Fraction of Daily Salary for Half Day"
                        placeholder="default 50%"
                        hideControls
                     />
                     <NumberInput
                        mb="sm"
                        label="Max working hours against Timesheet"
                        placeholder="default 8 hours"
                        hideControls
                     />
                     <Select
                        mb="sm"
                        label="Consider Attendance on Holidays"
                        placeholder="Pick value"
                        data={["Disabled", "Overtime"]}
                     />
                     <Checkbox
                        mb="sm"
                        label="Include Holidays as Working Days"
                     />
                     <Checkbox mb="sm" label="Allow Overtime" />
                  </Grid.Col>
               </Grid>

               <Group>
                  <Button mt="sm" type="submit">
                     Save
                  </Button>
               </Group>
            </form> */}
         </div>
      </>
   );
};

export default ProfileView;
