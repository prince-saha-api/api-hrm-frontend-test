"use client";
import React, { forwardRef, useImperativeHandle } from "react";
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

const PersonalDetails = forwardRef(({ data, onNext, onBack }, ref) => {
  const form = useForm({
    initialValues: data,
    // validate: {
    //   first_name: (value) =>
    //     value.length < 2 ? "First Name must have at least 2 letters" : null,
    //   last_name: (value) =>
    //     value.length < 2 ? "Last Name must have at least 2 letters" : null,
    //   gender: (value) => (value ? null : "Gender is required"),
    //   dob: (value) => (value ? null : "Date of Birth is required"),
    //   blood_group: (value) => (value ? null : "Blood Group is required"),
    //   fathers_name: (value) =>
    //     value.length < 2 ? "Father's Name must have at least 2 letters" : null,
    //   mothers_name: (value) =>
    //     value.length < 2 ? "Mother's Name must have at least 2 letters" : null,
    //   marital_status: (value) => (value ? null : "Marital Status is required"),
    //   personal_email: (value) =>
    //     /^\S+@\S+$/.test(value) ? null : "Invalid email",
    //   personal_phone: (value) =>
    //     value.toString().length < 10
    //       ? "Contact No must have at least 10 digits"
    //       : null,
    //   nid_passport_no: (value) =>
    //     value.toString().length < 10
    //       ? "NID / Passport must have at least 10 digits"
    //       : null,
    //   tin_no: (value) => (value ? null : "TIN No is required"),
    //   "present_address.city": (value) =>
    //     value.length < 2 ? "City must have at least 2 letters" : null,
    //   "present_address.state_division": (value) =>
    //     value.length < 2 ? "State must have at least 2 letters" : null,
    //   "present_address.post_zip_code": (value) =>
    //     value.length < 4 ? "ZIP Code must have at least 4 characters" : null,
    //   "present_address.country": (value) =>
    //     value ? null : "Country is required",
    //   "present_address.address": (value) =>
    //     value.length < 5 ? "Address must have at least 5 characters" : null,
    //   "permanent_address.city": (value) =>
    //     value.length < 2 ? "City must have at least 2 letters" : null,
    //   "permanent_address.state_division": (value) =>
    //     value.length < 2 ? "State must have at least 2 letters" : null,
    //   "permanent_address.post_zip_code": (value) =>
    //     value.length < 4 ? "ZIP Code must have at least 4 characters" : null,
    //   "permanent_address.country": (value) =>
    //     value ? null : "Country is required",
    //   "permanent_address.address": (value) =>
    //     value.length < 5 ? "Address must have at least 5 characters" : null,
    // },
  });

  useImperativeHandle(ref, () => ({
    validateStep: (updateFormData, key) => {
      const values = form.getValues();
      updateFormData(key, values);
      return form.isValid();
    },
    showValidationErrors: () => {
      form.validate();
    },
  }));

  const handleSubmit = (values) => {
    onNext(values);
  };

  return (
    <>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={5}>
            <Box className="stepBox">
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">First Name</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // label="First Name"
                  placeholder="First Name"
                  {...form.getInputProps("first_name")}
                />
              </div>

              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Last Name</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // // mt="sm"
                  // label="Last Name"
                  placeholder="Last Name"
                  {...form.getInputProps("last_name")}
                />
              </div>

              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Gender</div>
                <Select
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Gender"
                  placeholder="Gender"
                  data={["Male", "Female", "Other"]}
                  {...form.getInputProps("gender")}
                />
              </div>

              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Date of Birth</div>
                <DateInput
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // value={value}
                  // onChange={setValue}
                  // label="Date of Birth"
                  placeholder="Date of Birth"
                  {...form.getInputProps("dob")}
                />
              </div>

              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Blood Group</div>
                <Select
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // rightSection={<></>}
                  // rightSectionWidth={0}
                  // mt="sm"
                  // label="Blood Group"
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
                  {...form.getInputProps("blood_group")}
                />
              </div>

              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Fathers Name</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Fathers Name"
                  placeholder="Fathers Name"
                  {...form.getInputProps("fathers_name")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Mothers Name</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Mothers Name"
                  placeholder="Mothers Name"
                  {...form.getInputProps("mothers_name")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Marital Status</div>
                <Select
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Marital Status"
                  placeholder="Marital Status"
                  data={[
                    "Single",
                    "Married",
                    "Widowed",
                    "Divorced",
                    "Separated",
                  ]}
                  {...form.getInputProps("marital_status")}
                />
              </div>
            </Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box className="stepBox">
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Spouse Name</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Spouse Name"
                  placeholder="Spouse Name"
                  {...form.getInputProps("spouse_name")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Nationality</div>
                <Select
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Nationality"
                  placeholder="Nationality"
                  data={["Bangladeshi", "Others"]}
                  {...form.getInputProps("nationality")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Religion</div>
                <Select
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Religion"
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
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Email</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Email"
                  placeholder="Email"
                  {...form.getInputProps("personal_email")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Contact No.</div>
                <NumberInput
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  rightSection={<></>}
                  rightSectionWidth={0}
                  // mt="sm"
                  // label="Contact No."
                  placeholder="Contact No"
                  {...form.getInputProps("personal_phone")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">NID / Passport</div>
                <NumberInput
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  rightSection={<></>}
                  rightSectionWidth={0}
                  // mt="sm"
                  // label="NID / Passport"
                  placeholder="NID / Passport"
                  {...form.getInputProps("nid_passport_no")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">TIN No</div>
                <NumberInput
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  rightSection={<></>}
                  rightSectionWidth={0}
                  // mt="sm"
                  // label="TIN No"
                  placeholder="TIN No"
                  {...form.getInputProps("tin_no")}
                />
              </div>
            </Box>
          </Grid.Col>
        </Grid>

        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={5}>
            <Box className="stepBox mt-0">
              <p className="fw-bold mb-3">Present Address</p>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">City</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="City"
                  placeholder="City"
                  {...form.getInputProps("present_address.city")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">State</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="State"
                  placeholder="State"
                  {...form.getInputProps("present_address.state_division")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">ZIP Code</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="ZIP Code"
                  placeholder="ZIP Code"
                  {...form.getInputProps("present_address.post_zip_code")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Country</div>
                <Select
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Country"
                  placeholder="Country"
                  searchable
                  data={countries}
                  {...form.getInputProps("present_address.country")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Address</div>
                <Textarea
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Address"
                  placeholder="Present Address"
                  {...form.getInputProps("present_address.address")}
                />
              </div>
            </Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box className="stepBox mt-0">
              <p className="fw-bold mb-3">Permanent Address</p>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">City</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="City"
                  placeholder="City"
                  {...form.getInputProps("permanent_address.city")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">State</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="State"
                  placeholder="State"
                  {...form.getInputProps("permanent_address.state_division")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">ZIP Code</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="ZIP Code"
                  placeholder="ZIP Code"
                  {...form.getInputProps("permanent_address.post_zip_code")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Country</div>
                <Select
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Country"
                  placeholder="Country"
                  searchable
                  data={countries}
                  {...form.getInputProps("permanent_address.country")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Address</div>
                <Textarea
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // // mt="sm"
                  // label="Address"
                  placeholder="Permanent Address"
                  {...form.getInputProps("permanent_address.address")}
                />
              </div>
            </Box>
          </Grid.Col>
        </Grid>

        <Group justify="left" mt="xl">
          {/* <Button variant="default" onClick={onBack}>
            Back
          </Button> */}
          <Button type="submit">Next step</Button>
        </Group>
      </form>
    </>
  );
});

export default PersonalDetails;
