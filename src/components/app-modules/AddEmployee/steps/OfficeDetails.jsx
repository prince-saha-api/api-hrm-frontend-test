"use client";
import React, { useState } from "react";
import { DateInput } from "@mantine/dates";
import { Breadcrumbs, Anchor } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
   NumberInput,
   TextInput,
   Textarea,
   Box,
   Select,
   Button,
   Flex,
   FileButton,
   Group,
   Text,
} from "@mantine/core";
import { Grid } from "@mantine/core";
import { FcAcceptDatabase } from "react-icons/fc";
import Image from "next/image";
import compmanyLogo from "public/full_logo.png";
import uploadImg from "public/profile01.jpg";
import { FcAddImage } from "react-icons/fc";

const OfficeDetails = () => {
   const [value, setValue] = useState(null);

   // const form = useForm({
   //    initialValues: {
   //       name: "",
   //       registration: "",
   //       phone: "",
   //       fax: "",
   //       email: "",
   //       website: "",
   //       address: "",
   //    },

   //    validate: {
   //       name: (value) =>
   //          value.length < 2 ? "Name must have at least 2 letters" : null,
   //       registration: (value) =>
   //          value < 18 ? "You must be at least 18 to register" : null,
   //       phone: (value) =>
   //          value < 12 ? "You must be at least 12 number" : null,
   //       fax: (value) => (value < 8 ? "You must be at least 8 number" : null),
   //       email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
   //       website: (value) =>
   //          /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/.test(value)
   //             ? null
   //             : "Must have at a website",
   //       address: (value) =>
   //          value.length < 1 ? "Must have at an address" : null,
   //    },
   // });

   return (
      <>
         <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
            <Grid.Col span={5}>
               <Box className="stepBox">
                  <form>
                     <TextInput
                        classNames={{
                           root: "cust_iputRoot",
                           label: "cust_iputLabel",
                           wrapper: "cust_iputWrapper",
                        }}
                        label="Employee ID"
                        placeholder="Employee ID"
                        // {...form.getInputProps("name")}
                     />
                     <TextInput
                        classNames={{
                           root: "cust_iputRoot",
                           label: "cust_iputLabel",
                           wrapper: "cust_iputWrapper",
                        }}
                        mt="sm"
                        label="Official Email"
                        placeholder="Official Email"
                        // {...form.getInputProps("email")}
                     />
                     <NumberInput
                        classNames={{
                           root: "cust_iputRoot",
                           label: "cust_iputLabel",
                           wrapper: "cust_iputWrapper",
                        }}
                        rightSection={<></>}
                        rightSectionWidth={0}
                        mt="sm"
                        label="Official Phone"
                        placeholder="Official Phone"
                        // {...form.getInputProps("address")}
                     />
                     <Select
                        classNames={{
                           root: "cust_iputRoot",
                           label: "cust_iputLabel",
                           wrapper: "cust_iputWrapper",
                        }}
                        mt="sm"
                        label="Employee Type"
                        placeholder="Employee Type"
                        data={["Full-time", "Part-time", "Contractual"]}
                     />
                     <Select
                        classNames={{
                           root: "cust_iputRoot",
                           label: "cust_iputLabel",
                           wrapper: "cust_iputWrapper",
                        }}
                        mt="sm"
                        label="Branch"
                        placeholder="Branch"
                        data={["Banani", "Mohammadpur", "Mirpur-10"]}
                     />
                     
                  </form>
               </Box>
            </Grid.Col>
            <Grid.Col span={6}>
               <Box className="stepBox">
                  <form>
                  <Select
                        classNames={{
                           root: "cust_iputRoot",
                           label: "cust_iputLabel",
                           wrapper: "cust_iputWrapper",
                        }}
                        mt="sm"
                        label="Department"
                        placeholder="Department"
                        data={["Development", "Marketing", "HR"]}
                     />
                     <Select
                        classNames={{
                           root: "cust_iputRoot",
                           label: "cust_iputLabel",
                           wrapper: "cust_iputWrapper",
                        }}
                        mt="sm"
                        label="Designation"
                        placeholder="Designation"
                        data={["FrontEnd Developer", "BackEnd Developer", "QA"]}
                     />
                     <Select
                        classNames={{
                           root: "cust_iputRoot",
                           label: "cust_iputLabel",
                           wrapper: "cust_iputWrapper",
                        }}
                        mt="sm"
                        label="Employment Status"
                        placeholder="Employment Status"
                        data={["Trainee", "Probation", "Permanent"]}
                     />
                     <Select
                        classNames={{
                           root: "cust_iputRoot",
                           label: "cust_iputLabel",
                           wrapper: "cust_iputWrapper",
                        }}
                        mt="sm"
                        label="Shift"
                        placeholder="Shift"
                        data={["Day", "Night"]}
                     />
                     <DateInput
                        classNames={{
                           root: "cust_iputRoot",
                           label: "cust_iputLabel",
                           wrapper: "cust_iputWrapper",
                        }}
                        mt="sm"
                        value={value}
                        onChange={setValue}
                        label="Joining Date"
                        placeholder="Date input"
                     />
                  </form>
               </Box>
            </Grid.Col>
         </Grid>
      </>
   );
};

export default OfficeDetails;
