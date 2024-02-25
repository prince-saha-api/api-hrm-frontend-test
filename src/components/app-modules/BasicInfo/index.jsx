"use client";
import React, { useState } from "react";
import { Breadcrumbs, Anchor } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
   NumberInput,
   TextInput,
   Textarea,
   Button,
   Box,
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

const items = [
   { title: "Dashboard", href: "/" },
   { title: "Basic Setup", href: "#" },
].map((item, index) => (
   <Anchor href={item.href} key={index}>
      {item.title}
   </Anchor>
));

const BasicInfo = () => {
   const form = useForm({
      initialValues: {
         name: "",
         registration: "",
         phone: "",
         fax: "",
         email: "",
         website: "",
         address: "",
      },

      // functions will be used to validate values at corresponding key
      validate: {
         name: (value) =>
            value.length < 2 ? "Name must have at least 2 letters" : null,
         registration: (value) =>
            value < 18 ? "You must be at least 18 to register" : null,
         phone: (value) =>
            value < 12 ? "You must be at least 12 number" : null,
         fax: (value) => (value < 8 ? "You must be at least 8 number" : null),
         email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
         website: (value) =>
            /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/.test(value)
               ? null
               : "Must have at a website",
         address: (value) =>
            value.length < 1 ? "Must have at an address" : null,
      },
   });

   const [file, setFile] = useState(null);

   return (
      <>
         <div className="pageTop mb-4">
            <h3>Basic info</h3>
            <Breadcrumbs>{items}</Breadcrumbs>
         </div>

         <div className="itemCard">
            <div className="dataBox">
               <p className="dataBoxIcon">
                  <FcAcceptDatabase />
               </p>
               <Button variant="filled" size="md">
                  Add Company Information
               </Button>
            </div>
         </div>

         <div className="itemCard">
            <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
               <Grid.Col span={6}>
                  <div className="compmanyLogo">
                     <Image src={compmanyLogo} alt="img" />
                  </div>
               </Grid.Col>
               <Grid.Col span={6}>
                  <Flex
                     gap="md"
                     justify="flex-end"
                     align="flex-start"
                     direction="row"
                     wrap="wrap"
                  >
                     <Button variant="filled" size="md">
                        Edit
                     </Button>
                  </Flex>
               </Grid.Col>
               <Grid.Col span={3}>
                  <div className="infoText">
                     <p className="color-light font_14 mb-1">Company Name</p>
                     <p className="font_18">API Solutions Ltd.</p>
                  </div>
                  <div className="infoText">
                     <p className="color-light font_14 mb-1">Registration No</p>
                     <p className="font_18">3875387658</p>
                  </div>
                  <div className="infoText">
                     <p className="color-light font_14 mb-1">Phone</p>
                     <p className="font_18">+880 1686449007</p>
                  </div>
                  <div className="infoText">
                     <p className="color-light font_14 mb-1">Fax</p>
                     <p className="font_18">+88-02 55035911</p>
                  </div>
               </Grid.Col>
               <Grid.Col span={3}>
                  <div className="infoText">
                     <p className="color-light font_14 mb-1">Email</p>
                     <p className="font_18">hello@apisolutionsltd.com</p>
                  </div>
                  <div className="infoText">
                     <p className="color-light font_14 mb-1">Website</p>
                     <p className="font_18">apisolutionsltd.com</p>
                  </div>
                  <div className="infoText">
                     <p className="color-light font_14 mb-1">Address</p>
                     <p className="font_18">
                        House -4, Road 23/A, Block B, Banani Dhaka 1213,
                        Bangladesh
                     </p>
                  </div>
               </Grid.Col>
            </Grid>
         </div>

         <div className="itemCard">
            <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
               <Grid.Col span={6}>
                  <Box>
                     <form onSubmit={form.onSubmit(console.log)}>
                        <TextInput
                           label="Company Name"
                           placeholder="Name"
                           {...form.getInputProps("name")}
                        />
                        <NumberInput
                           mt="sm"
                           label="Registration No"
                           placeholder="Registration No"
                           min={0}
                           max={99}
                           {...form.getInputProps("registration")}
                        />
                        <NumberInput
                           mt="sm"
                           label="Phone"
                           placeholder="Phone"
                           {...form.getInputProps("phone")}
                        />
                        <NumberInput
                           mt="sm"
                           label="Fax"
                           placeholder="Fax"
                           min={0}
                           max={99}
                           {...form.getInputProps("fax")}
                        />
                        <TextInput
                           mt="sm"
                           label="Email"
                           placeholder="Email"
                           {...form.getInputProps("email")}
                        />
                        <TextInput
                           mt="sm"
                           label="Website"
                           placeholder="Website"
                           {...form.getInputProps("website")}
                        />
                        <Textarea
                           mt="sm"
                           label="Address"
                           placeholder="Address"
                           {...form.getInputProps("address")}
                        />

                        <Button type="submit" mt="lg" size="md">
                           Submit
                        </Button>
                     </form>
                  </Box>
               </Grid.Col>
               <Grid.Col span={6}>
                  <div className="uploadBox">
                     <p className="uploadIcon">
                        <FcAddImage />
                     </p>
                     <h6 className="mb-4 color-light">NOTE : Supported formats are JPG, JPEG, PNG</h6>

                     <Group justify="center">
                        <FileButton
                           onChange={setFile}
                           accept="image/png,image/jpeg"
                        >
                           {(props) => <Button {...props}>Upload Logo</Button>}
                        </FileButton>
                     </Group>
                  </div>

                  {/* <div className="updatedImage text-center">
                        <Image src={compmanyLogo} alt="img" />
                  </div> */}

                  {/* {file && (
                     <Text size="sm" ta="center" mt="sm">
                        Picked file: {file.name}
                      {  console.log(file)}
                     </Text>
                  )} */}
               </Grid.Col>
            </Grid>
         </div>
      </>
   );
};

export default BasicInfo;
