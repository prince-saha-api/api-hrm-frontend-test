"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import {
   TextInput,
   Textarea,
   Button,
   Box,
   Flex,
   FileButton,
   Group,
   Select,
   Grid,
} from "@mantine/core";
import { FcAcceptDatabase, FcAddImage } from "react-icons/fc";
import Image from "next/image";
import Breadcrumb from "@/components/utils/Breadcrumb";
import compmanyLogo from "public/full_logo.png";
import { countries } from "@/data/countries";

const BasicInfo = () => {
   const form = useForm({
      mode: "uncontrolled",
      initialValues: {
         name: "",
         establishment_date: null,
         business_registration_number: "",
         tax_id_number: null,
         bin_no: null,
         description: "",
         website_url: null,
         primary_email: null,
         primary_phone_number: null,
         fax: null,
         logo: null,
         industry_type: null,
         address: {
            city: "",
            state_division: "",
            post_zip_code: "",
            country: "",
            address: "",
         },
      },
      validate: {
         name: (value) =>
            value.length < 2 ? "Name must have at least 2 letters" : null,
         primary_phone_number: (value) =>
            value?.length < 12
               ? "Phone number must be at least 12 digits"
               : null,
         fax: (value) =>
            value?.length < 8 ? "Fax must be at least 8 digits" : null,
         primary_email: (value) =>
            /^\S+@\S+$/.test(value) ? null : "Invalid email",
         website_url: (value) =>
            /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/.test(value)
               ? null
               : "Must be a valid website URL",
      },
   });

   const [file, setFile] = useState(null);
   const fileInputRef = useRef(null);
   const [preview, setPreview] = useState(null);

   const handleSubmit = async (values) => {
      console.log(values);
      const formattedDate = values.establishment_date
         ? values.establishment_date.toISOString().split("T")[0]
         : null;

      try {
         const formValues = new FormData();

         const flattenObject = (obj, prefix = "") => {
            Object.keys(obj).forEach((key) => {
               const value = obj[key];
               const formKey = prefix ? `${prefix}[${key}]` : key;

               if (
                  value &&
                  typeof value === "object" &&
                  !(value instanceof File)
               ) {
                  flattenObject(value, formKey);
               } else {
                  formValues.append(formKey, value);
               }
            });
         };

         flattenObject(form.values);
      } catch (error) {
         console.error("Error submitting form:", error);
      }
   };

   const handleFileChange = (file) => {
      setFile(file);
      setPreview(URL.createObjectURL(file));
      form.setFieldValue("logo", file); // add this line
      console.log(preview);
   };

   const handleClearLogo = () => {
      setFile(null);
      setPreview(null);
      form.setFieldValue("logo", null);
      if (fileInputRef.current) {
         fileInputRef.current.value = ""; // Reset the file input
      }
   };

   return (
      <>
         <Breadcrumb
            classNames={{
               root: "mb-4",
            }}
            title="Sync Log Data"
            items={[
               { title: "Dashboard", href: "/dashboard" },
               { title: "Sync Log Data" },
            ]}
         />

         <div className="itemCard">
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
               <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: "xl" }}>
                  <Grid.Col span={12}>
                     <div className="d-flex align-items-end">
                        <Select
                           label="Enter option"
                           placeholder="Pick value"
                           data={["Hours", "Days"]}
                        />
                        <TextInput
                           label="Enter value"
                           placeholder="Enter value"
                           ms="md"
                        />
                        <Button type="submit" ms="md" size="sm">
                           Get log Data
                        </Button>
                     </div>
                  </Grid.Col>
                  <Grid.Col span={12}>
                     <div className="d-flex align-items-end">
                        <Select
                           label="Enter option"
                           placeholder="Pick value"
                           data={["Hours", "Days"]}
                        />
                        <TextInput
                           label="Enter value"
                           placeholder="Enter value"
                           ms="md"
                        />
                        <Button type="submit" ms="md" size="sm">
                           Sync With MIS
                        </Button>
                     </div>
                  </Grid.Col>
               </Grid>
            </form>
         </div>
      </>
   );
};

export default BasicInfo;
