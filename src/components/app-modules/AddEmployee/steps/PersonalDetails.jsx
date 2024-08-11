"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";
import useSWR from "swr";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
  // NumberInput,
  TextInput,
  // Textarea,
  Box,
  Select,
  Button,
  Group,
  Grid,
  Checkbox,
} from "@mantine/core";
import classEase from "classease";
import { fetcher } from "@/lib/fetch";
import { countries } from "@/data/countries";

const PersonalDetails = forwardRef(({ data, onNext }, ref) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      ...data,
      dob: data?.dob ? new Date(data.dob) : null,
      permanent_address: data?.permanentAddressSameAsPresent
        ? data?.present_address
        : data?.permanent_address,
    },
    // validate: {
    //   first_name: (value) => (!value ? "First Name is required" : null),
    //   // last_name: (value) => (!value ? "Last Name is required" : null),
    //   gender: (value) => (value ? null : "Gender is required"),
    //   dob: (value) => (value ? null : "Date of Birth is required"),
    //   blood_group: (value) => (value ? null : "Blood Group is required"),
    //   fathers_name: (value) => (!value ? "Father's Name is required" : null),
    //   mothers_name: (value) => (!value ? "Mother's Name is required" : null),
    //   marital_status: (value) => (value ? null : "Marital Status is required"),
    //   spouse_name: (value, values) =>
    //     values?.marital_status === "Married" && !value
    //       ? "Spouse name is required"
    //       : null,
    //   personal_email: (value) =>
    //     value && /^\S+@\S+$/.test(value) ? null : "Invalid email",
    //   personal_phone: (value) =>
    //     value && value.toString().length < 11
    //       ? "Contact No must have at least 11 digits"
    //       : null,
    //   // nid_passport_no: (value) =>
    //   //   value.toString().length < 10
    //   //     ? "NID / Passport must have at least 10 digits"
    //   //     : null,
    //   // tin_no: (value) => (value ? null : "TIN No is required"),
    //   "present_address.address": (value) =>
    //     !value ? "Address is required" : null,
    //   "present_address.city": (value) => (value ? null : "City is required"),
    //   "present_address.state_division": (value) =>
    //     value ? null : "State is required",
    //   "present_address.post_zip_code": (value) =>
    //     value ? null : "Zip code is required",
    //   "present_address.country": (value) =>
    //     value ? null : "Country is required",
    //   "permanent_address.address": (value, values) =>
    //     !values.permanentAddressSameAsPresent && !value
    //       ? "Address is required"
    //       : null,
    //   "permanent_address.city": (value, values) =>
    //     !values.permanentAddressSameAsPresent && !value
    //       ? "City is required"
    //       : null,
    //   "permanent_address.state_division": (value, values) =>
    //     !values.permanentAddressSameAsPresent && !value
    //       ? "State is required"
    //       : null,
    //   "permanent_address.post_zip_code": (value, values) =>
    //     !values.permanentAddressSameAsPresent && !value
    //       ? "ZIP Code is required"
    //       : null,
    //   "permanent_address.country": (value, values) =>
    //     !values.permanentAddressSameAsPresent && !value
    //       ? "Country is required"
    //       : null,
    // },
  });

  // console.log(form.values);

  const {
    data: religionsData,
    error: religionsError,
    isLoading: religionsIsFetchLoading,
  } = useSWR(`/api/user/get-religion/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  // console.log(religionsData);

  const religions = religionsData?.data?.result?.map((item) => ({
    value: item?.id.toString() || "",
    label: item?.name?.toString() || "",
  }));

  const [isMarried, setIsMarried] = useState(false);

  // const sameAsPresent = form.getValues().permanentAddressSameAsPresent;
  const [sameAsPresent, setSameAsPresent] = useState(
    data?.permanentAddressSameAsPresent
  );

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

  form.watch(
    "permanentAddressSameAsPresent",
    ({ previousValue, value, touched, dirty }) => {
      const { city, state_division, post_zip_code, country, address } =
        form.getValues().present_address;

      console.log(country);

      if (value) {
        form.setFieldValue("permanent_address.city", city);
        form.setFieldValue("permanent_address.state_division", state_division);
        form.setFieldValue("permanent_address.post_zip_code", post_zip_code);
        form.setFieldValue("permanent_address.country", country);
        form.setFieldValue("permanent_address.address", address);

        // form.setValues({
        //   permanent_address: {
        //     city,
        //     state_division,
        //     post_zip_code,
        //     country,
        //     address,
        //   },
        // });
        setSameAsPresent(true);
      } else {
        setSameAsPresent(false);
      }
    }
  );

  form.watch("marital_status", ({ previousValue, value, touched, dirty }) => {
    console.log({ previousValue, value, touched, dirty });
    dirty && value !== "Married" && form.setFieldValue("spouse_name", "");
    setIsMarried(value === "Married");
  });

  const handleSubmit = (values) => {
    const formattedDOB = values.dob
      ? values.dob.toISOString().split("T")[0]
      : null;

    onNext({
      ...values,
      dob: formattedDOB,
      ...(values.permanentAddressSameAsPresent && {
        permanent_address: values.present_address,
      }),
    });
  };

  return (
    <>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={6}>
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
                <div className="w-100">
                  <Select
                    classNames={{
                      root: classEase(
                        "w-100"
                        // form?.errors?.marital_status && "c_error_input"
                      ),
                      // root: "cust_iputRoot",
                      // label: "cust_iputLabel",
                      wrapper: "cust_iputWrapper",
                    }}
                    // mt="sm"
                    // label="Marital Status"
                    placeholder="Marital Status"
                    // value={form.getValues().marital_status}
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
              </div>
              {isMarried && (
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
              )}
            </Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box className="stepBox">
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Nationality</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Nationality"
                  placeholder="Nationality"
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
                  // data={[
                  //   { value: "1", label: "Islam" },
                  //   { value: "2", label: "Hinduism" },
                  //   { value: "3", label: "Christianity" },
                  //   { value: "4", label: "Buddhism" },
                  //   { value: "5", label: "Sikhism" },
                  //   { value: "6", label: "Judaism" },
                  //   { value: "7", label: "Jainism" },
                  //   { value: "8", label: "Others" },
                  // ]}
                  data={religions}
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
                <TextInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="Contact No"
                  {...form.getInputProps("personal_phone")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">NID / Passport</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="NID / Passport"
                  {...form.getInputProps("nid_passport_no")}
                />
                {/* <NumberInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  rightSection={<></>}
                  rightSectionWidth={0}
                  placeholder="NID / Passport"
                  {...form.getInputProps("nid_passport_no")}
                /> */}
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">TIN No</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="TIN No"
                  {...form.getInputProps("tin_no")}
                />
                {/* <NumberInput
                  classNames={{
                    root: "w-100",
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  rightSection={<></>}
                  rightSectionWidth={0}
                  placeholder="TIN No"
                  {...form.getInputProps("tin_no")}
                /> */}
              </div>
            </Box>
          </Grid.Col>
        </Grid>

        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={6}>
            <Box className="stepBox mt-0">
              <p className="fw-bold mb-3">Present Address</p>

              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Address</div>
                <TextInput
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
                  placeholder="ZIP / Postal Code"
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
            </Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box className="stepBox mt-0">
              <Group
                align="center" //
                justify="space-between"
                classNames={{ root: "mb-3" }}
              >
                <p className="fw-bold mb-0">Permanent Address</p>
                <Checkbox
                  label="Same as Present Address"
                  // checked={form.getValues().permanentAddressSameAsPresent}
                  {...form.getInputProps("permanentAddressSameAsPresent", {
                    type: "checkbox",
                  })}
                />
              </Group>

              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Address</div>
                {/* {console.log(sameAsPresent)} */}
                <TextInput
                  classNames={{
                    root: classEase(
                      "w-100"
                      // // sameAsPresent && "disable_input_overlay"
                    ),
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // // mt="sm"
                  // label="Address"
                  placeholder="Permanent Address"
                  {...form.getInputProps("permanent_address.address")}
                  disabled={sameAsPresent}
                  key={form.key("permanent_address.address")}
                />
              </div>

              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">City</div>
                <TextInput
                  classNames={{
                    root: classEase(
                      "w-100"
                      // sameAsPresent && "disable_input_overlay"
                    ),
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="City"
                  placeholder="City"
                  {...form.getInputProps("permanent_address.city")}
                  disabled={sameAsPresent}
                  key={form.key("permanent_address.city")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">State</div>
                <TextInput
                  classNames={{
                    root: classEase(
                      "w-100"
                      // sameAsPresent && "disable_input_overlay"
                    ),
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="State"
                  placeholder="State"
                  {...form.getInputProps("permanent_address.state_division")}
                  disabled={sameAsPresent}
                  key={form.key("permanent_address.state_division")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">ZIP Code</div>
                <TextInput
                  classNames={{
                    root: classEase(
                      "w-100"
                      // sameAsPresent && "disable_input_overlay"
                    ),
                    // root: "cust_iputRoot",
                    // label: "cust_iputLabel",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="ZIP Code"
                  placeholder="ZIP Code"
                  {...form.getInputProps("permanent_address.post_zip_code")}
                  disabled={sameAsPresent}
                  // value={form.getValues().permanent_address.post_zip_code}
                  key={form.key("permanent_address.post_zip_code")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Country</div>
                <Select
                  classNames={{
                    root: classEase(
                      "w-100"
                      // sameAsPresent && "disable_input_overlay"
                    ),
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
                  disabled={sameAsPresent}
                  // value={form.getValues().permanent_address.country}
                  key={form.key("permanent_address.country")}
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
