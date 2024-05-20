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

const AcademicRecord = ({ data, onChange }) => {
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
              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Certification"
                placeholder="Certification"
                data={["Brother", "Sister"]}
                {...form.getInputProps("certification")}
              />

              <TextInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Institute"
                placeholder="Institute"
                {...form.getInputProps("institute")}
              />

              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Level"
                placeholder="Level"
                data={["Brother", "Sister"]}
                {...form.getInputProps("level")}
              />

              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Grade"
                placeholder="Grade"
                data={["Brother", "Sister"]}
                {...form.getInputProps("grade")}
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
                label="Passing Year"
                placeholder="Passing Year"
                {...form.getInputProps("passingYear")}
              />
            </Box>
          </Grid.Col>
        </Grid>

        <Group justify="left" mt="xl">
          <Button variant="default">Back</Button>
          <Button type="submit">Next step</Button>
        </Group>
      </form>
    </>
  );
};

export default AcademicRecord;
