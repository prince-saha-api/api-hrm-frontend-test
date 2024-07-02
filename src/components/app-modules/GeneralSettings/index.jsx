"use client";
import React, { useRef } from "react";
import {
   TextInput,
   Input,
   Button,
   Group,
   Select,
   Grid,
   NumberInput,
   ActionIcon,
   Checkbox,
} from "@mantine/core";
import Breadcrumb from "@/components/utils/Breadcrumb";
import { TimeInput } from "@mantine/dates";
import { IoTimeOutline } from "react-icons/io5";

const GeneralSettings = () => {
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

   return (
      <>
         <Breadcrumb
            classNames={{
               root: "mb-4",
            }}
            title="General Settings"
            items={[
               { title: "Dashboard", href: "/dashboard" },
               { title: "General Settings" },
            ]}
         />

         <div className="itemCard">
            <form>
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
                        label="Number of consecutive late attendance to fine"
                        placeholder="default 3"
                        hideControls
                     />
                     <NumberInput
                        mb="sm"
                        label="Consecutive late attendance fine amount against the fraction of daily salary"
                        placeholder="default 100%"
                        hideControls
                     />
                     <div className="holidayBox mb-3">
                        <p className="mb-1">Weekly Holidays</p>
                        <div className="d-flex flex-wrap">
                           <Checkbox
                              me="lg"
                              mb="sm"
                              defaultChecked
                              label="Friday "
                           />
                           <Checkbox me="lg" mb="sm" label="Saturday" />
                           <Checkbox me="lg" mb="sm" label="Sunday" />
                           <Checkbox me="lg" mb="sm" label="Monday" />
                           <Checkbox me="lg" mb="sm" label="Tuesday" />
                           <Checkbox me="lg" mb="sm" label="Wednesday" />
                           <Checkbox me="lg" mb="sm" label="Thursday" />
                        </div>
                     </div>
                  </Grid.Col>
                  <Grid.Col span={3}>
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
            </form>
         </div>
      </>
   );
};

export default GeneralSettings;
