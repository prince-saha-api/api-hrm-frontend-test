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

const UploadDocuments = ({ data, onChange }) => {
  const form = useForm({
    initialValues: data,
    // validate: {
    //   firstName: (value) =>
    //     value.length < 2 ? "First Name must have at least 2 letters" : null,
    //   lastName: (value) =>
    //     value.length < 2 ? "Last Name must have at least 2 letters" : null,
    //   // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    //   // // add other validations as needed
    // },
  });

  const handleSubmit = (values) => {
    if (form.validate().hasErrors) {
      console.log(values);
    } else {
      // form.setValues((prev) => ({ ...prev, ...values }));
      onChange("personalDetails", form.values);
      console.log(values);
    }
  };

  return (
    <>
      <form method="POST" onSubmit={form.onSubmit(handleSubmit)}>
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={5}>
            <Box className="stepBox">
              {/* <h4 className="text-dark mb-4 pb-2">Upload Documents</h4> */}

              <FileInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                leftSection={<FaFile className="fileIcon" />}
                label="NID/Passport"
                placeholder="NID/Passport"
                leftSectionPointerEvents="none"
                // {...form.getInputProps("nidPassport")}
              />
              <FileInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                leftSection={<FaFile className="fileIcon" />}
                label="Resume"
                placeholder="Resume"
                leftSectionPointerEvents="none"
                // {...form.getInputProps("cv")}
              />
              <FileInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                leftSection={<FaFile className="fileIcon" />}
                label="Appointment Letter"
                placeholder="Appointment Letter"
                leftSectionPointerEvents="none"
                {...form.getInputProps("appointmentLetter")}
              />
              <FileInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                leftSection={<TbPhotoFilled className="fileIcon" />}
                label="Photo"
                placeholder="Photo"
                leftSectionPointerEvents="none"
                {...form.getInputProps("photo")}
              />
            </Box>
          </Grid.Col>
          {/* <Grid.Col span={5}>
            <Box className="stepBox">
              <h4 className="text-dark mb-4 pb-2">Upload Other Documents</h4>

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
                leftSection={<FaFile className="fileIcon" />}
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
            </Box>
          </Grid.Col> */}
        </Grid>

        <Group justify="left" mt="xl">
          <Button variant="default">Back</Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </>
  );
};

export default UploadDocuments;
