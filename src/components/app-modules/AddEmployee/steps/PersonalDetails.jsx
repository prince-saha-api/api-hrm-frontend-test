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
import { countries } from "@/data/countries";

const PersonalDetails = ({ data, onChange }) => {
  const form = useForm({
    initialValues: data,
    validate: {
      firstName: (value) =>
        value.length < 2 ? "First Name must have at least 2 letters" : null,
      lastName: (value) =>
        value.length < 2 ? "Last Name must have at least 2 letters" : null,
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      // // add other validations as needed
    },
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
      <form
        // onSubmit={handleSubmit}
        method="POST"
        onSubmit={form.onSubmit(handleSubmit)}
      >
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={5}>
            <Box className="stepBox">
              <TextInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                label="First Name"
                placeholder="First Name"
                {...form.getInputProps("firstName")}
              />
              <TextInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Last Name"
                placeholder="Last Name"
                {...form.getInputProps("lastName")}
              />
              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Gender"
                placeholder="Gender"
                data={["Male", "Female", "Other"]}
                {...form.getInputProps("gender")}
              />
              <DateInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                // value={value}
                // onChange={setValue}
                label="Date of Birth"
                placeholder="Date of Birth"
                {...form.getInputProps("dateOfBirth")}
              />
              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                // rightSection={<></>}
                // rightSectionWidth={0}
                mt="sm"
                label="Blood Group"
                placeholder="Blood Group"
                data={[
                  "A+",
                  "A-",
                  "B+",
                  "B-",
                  "AB+",
                  "AB-",
                  "O+",
                  "O-",
                  "Golden Blood(Rh Null)",
                ]}
                {...form.getInputProps("bloodGroup")}
              />
              <TextInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Fathers Name"
                placeholder="Fathers Name"
                {...form.getInputProps("fathersName")}
              />
              <TextInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Mothers Name"
                placeholder="Mothers Name"
                {...form.getInputProps("mothersName")}
              />

              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Marital Status"
                placeholder="Marital Status"
                data={["Single", "Married", "Widowed", "Divorced", "Separated"]}
                {...form.getInputProps("maritalStatus")}
              />
            </Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box className="stepBox">
              <TextInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Spouse Name"
                placeholder="Spouse Name"
                {...form.getInputProps("spouseName")}
              />

              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Nationality"
                placeholder="Nationality"
                data={["Bangladeshi", "Others"]}
                {...form.getInputProps("nationality")}
              />

              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Religion"
                placeholder="Religion"
                data={[
                  "Islam",
                  "Hinduism",
                  "Christianity",
                  "Buddhism",
                  "Sikhism",
                  "Judaism",
                  "Jainism",
                  "Others",
                ]}
                {...form.getInputProps("religion")}
              />

              <TextInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Email"
                placeholder="Email"
                {...form.getInputProps("email")}
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
                label="Contact No."
                placeholder="Contact No"
                {...form.getInputProps("contactNo")}
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
                label="NID / Passport"
                placeholder="NID / Passport"
                {...form.getInputProps("nidPassport")}
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
                label="TIN No"
                placeholder="TIN No"
                {...form.getInputProps("tinNo")}
              />
            </Box>
          </Grid.Col>
        </Grid>

        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={5}>
            <Box className="stepBox mt-0">
              <p className="fw-bold mb-3">Present Address</p>

              <TextInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="City"
                placeholder="City"
                {...form.getInputProps("presentAddress.city")}
              />

              <TextInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="State"
                placeholder="State"
                {...form.getInputProps("presentAddress.state")}
              />

              <TextInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="ZIP Code"
                placeholder="ZIP Code"
                {...form.getInputProps("presentAddress.zipCode")}
              />

              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Country"
                placeholder="Country"
                searchable
                data={countries}
                {...form.getInputProps("presentAddress.country")}
              />

              <Textarea
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Address"
                placeholder="Present Address"
                {...form.getInputProps("presentAddress.address")}
              />
            </Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box className="stepBox mt-0">
              <p className="fw-bold mb-3">Permanent Address</p>

              <TextInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="City"
                placeholder="City"
                {...form.getInputProps("permanentAddress.city")}
              />

              <TextInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="State"
                placeholder="State"
                {...form.getInputProps("permanentAddress.state")}
              />

              <TextInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="ZIP Code"
                placeholder="ZIP Code"
                {...form.getInputProps("permanentAddress.zipCode")}
              />

              <Select
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Country"
                placeholder="Country"
                searchable
                data={countries}
                {...form.getInputProps("permanentAddress.country")}
              />

              <Textarea
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Address"
                placeholder="Permanent Address"
                {...form.getInputProps("permanentAddress.address")}
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

export default PersonalDetails;
