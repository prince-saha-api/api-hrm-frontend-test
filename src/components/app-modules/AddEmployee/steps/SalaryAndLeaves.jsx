"use client";
import React, { useState } from "react";
import { MultiSelect } from "@mantine/core";
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

const SalaryAndLeaves = () => {
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
                        label="Bank Account Detail"
                        placeholder="Bank Account Detail"
                        // {...form.getInputProps("name")}
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
                        label="Salary"
                        placeholder="Salary"
                        // {...form.getInputProps("address")}
                     />
                     <MultiSelect
                        classNames={{
                           root: "cust_iputRoot",
                           label: "cust_iputLabel",
                           wrapper: "cust_iputWrapper",
                        }}
                        mt="sm"
                        label="Leave Policy Assign"
                        placeholder="Leave Policy Assign"
                        data={["Roll-1", "Roll-2", "Roll-3", "Roll-4", "Roll-5" , "Roll-6"]}
                        searchable
                        withAsterisk
                     />
                     <MultiSelect
                        classNames={{
                           root: "cust_iputRoot",
                           label: "cust_iputLabel",
                           wrapper: "cust_iputWrapper",
                        }}
                        mt="sm"
                        label="Payroll Policy Assign"
                        placeholder="Payroll Policy Assign"
                        data={["Roll-10", "Roll-11", "Roll-12", "Roll-13"]}
                        searchable
                        withAsterisk
                     />
                  </form>
               </Box>
            </Grid.Col>
         </Grid>
      </>
   );
};

export default SalaryAndLeaves;
