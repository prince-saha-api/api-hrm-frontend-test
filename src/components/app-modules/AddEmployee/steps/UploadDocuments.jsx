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
   FileInput,
   rem,
   Button,
   Flex,
   FileButton,
   Group,
   Text,
} from "@mantine/core";
import { FaFile } from "react-icons/fa6";
import { TbPhotoFilled } from "react-icons/tb";
import { Grid } from "@mantine/core";
import { FcAcceptDatabase } from "react-icons/fc";
import Image from "next/image";
import compmanyLogo from "public/full_logo.png";
import uploadImg from "public/profile01.jpg";
import { FcAddImage } from "react-icons/fc";

const UploadDocuments = () => {
   const [value, setValue] = useState(null);
   // const fileIcon1 = <FaFileAlt style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;
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
                  <h4 className="text-dark mb-4 pb-2">Upload Documents</h4>
                  <form>
                     <FileInput
                        classNames={{
                           root: "cust_iputRoot",
                           label: "cust_iputLabel",
                           wrapper: "cust_iputWrapper",
                        }}
                        leftSection={<FaFile className="fileIcon"/>}
                        label="NID/Passport"
                        placeholder="NID/Passport"
                        leftSectionPointerEvents="none"
                     />
                     <FileInput
                        classNames={{
                           root: "cust_iputRoot",
                           label: "cust_iputLabel",
                           wrapper: "cust_iputWrapper",
                        }}
                        mt="sm"
                        leftSection={<FaFile className="fileIcon"/>}
                        label="Resume"
                        placeholder="Resume"
                        leftSectionPointerEvents="none"
                     />
                     <FileInput
                        classNames={{
                           root: "cust_iputRoot",
                           label: "cust_iputLabel",
                           wrapper: "cust_iputWrapper",
                        }}
                        mt="sm"
                        leftSection={<FaFile className="fileIcon"/>}
                        label="Appointment Letter"
                        placeholder="Appointment Letter"
                        leftSectionPointerEvents="none"
                     />
                     <FileInput
                        classNames={{
                           root: "cust_iputRoot",
                           label: "cust_iputLabel",
                           wrapper: "cust_iputWrapper",
                        }}
                        mt="sm"
                        leftSection={<TbPhotoFilled className="fileIcon"/>}
                        label="Photo"
                        placeholder="Photo"
                        leftSectionPointerEvents="none"
                     />
                  </form>
               </Box>
            </Grid.Col>
            <Grid.Col span={5}>
               <Box className="stepBox">
                  <h4 className="text-dark mb-4 pb-2">Upload Other Documents</h4>
                  <form>
                     <TextInput
                        classNames={{
                           root: "cust_iputRoot",
                           label: "cust_iputLabel",
                           wrapper: "cust_iputWrapper",
                        }}
                        label="Document Name"
                        placeholder="Document Name"
                        // {...form.getInputProps("name")}
                     />
                     <FileInput
                        classNames={{
                           root: "cust_iputRoot",
                           label: "cust_iputLabel",
                           wrapper: "cust_iputWrapper",
                        }}
                        mt="sm"
                        leftSection={<FaFile className="fileIcon"/>}
                        label="Document File"
                        placeholder="Document File"
                        leftSectionPointerEvents="none"
                     />
                     <Textarea
                        classNames={{
                           root: "cust_iputRoot",
                           label: "cust_iputLabel",
                           wrapper: "cust_iputWrapper",
                        }}
                        mt="sm"
                        label="Description"
                        placeholder="Description"
                        // {...form.getInputProps("address")}
                     />
                  </form>
               </Box>
            </Grid.Col>
         </Grid>
      </>
   );
};

export default UploadDocuments;
