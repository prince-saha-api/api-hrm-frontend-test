"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Breadcrumbs, Anchor } from "@mantine/core";
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
} from "@mantine/core";
import { Grid } from "@mantine/core";
import { FcAcceptDatabase } from "react-icons/fc";
import Image from "next/image";
import compmanyLogo from "public/full_logo.png";
import uploadImg from "public/profile01.jpg";
import { FcAddImage } from "react-icons/fc";
import { countries } from "@/data/countries";

const items = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Basic Setup" },
].map((item, index) =>
  item.hasOwnProperty("href") ? (
    <Link key={index} href={item.href}>
      {item.title}
    </Link>
  ) : (
    <span key={index}>{item.title}</span>
  )
);

const BasicInfo = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      // id: 1,
      // created_at: "2024-06-02T09:10:22.140828Z",
      // updated_at: "2024-06-02T09:10:22.140828Z",
      // code: "202406021510221408",
      // is_active: false,
      name: "",
      // legal_name: "fgf",
      establishment_date: null,
      business_registration_number: "",
      tax_id_number: null,
      bin_no: null,
      description: "",
      website_url: null,
      primary_email: null,
      primary_phone_number: null,
      fax: null,
      logo: "",
      industry_type: null,
      // address: null,
      // cupdated_by: null,
      // created_by: null,
      address: {
        city: "",
        state_division: "",
        post_zip_code: "",
        country: "",
        address: "",
      },
    },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      primary_phone_number: (value) =>
        value < 12 ? "You must be at least 12 number" : null,
      fax: (value) => (value < 8 ? "You must be at least 8 number" : null),
      primary_email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      website_url: (value) =>
        /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/.test(value)
          ? null
          : "Must have at a website",
    },
  });

  const [file, setFile] = useState(null);

  const handleSubmit = async (values) => {
    console.log("nazmul");
    return;
    const formattedDate = values.establishment_date
      ? values.establishment_date.toISOString().split("T")[0]
      : null;

    try {
      const formValues = new FormData();

      const flattenObject = (obj, prefix = "") => {
        Object.keys(obj).forEach((key) => {
          const value = obj[key];
          const formKey = prefix ? `${prefix}[${key}]` : key;

          if (value && typeof value === "object" && !(value instanceof File)) {
            flattenObject(value, formKey);
          } else {
            formValues.append(formKey, value);
          }
        });
      };

      flattenObject(form.values);

      // console.log(formValues, form.values);

      // const response = await fetch(
      //   "http://10.10.23.64:8000/api/user/add-employee/",
      //   {
      //     method: "POST",
      //     body: formValues,
      //   }
      // );

      // const result = await response.json();
      // console.log(result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    // onNext({ ...values, establishment_date: formattedDate });
  };

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
              <p className="color-light font_14 mb-1">
                Business Registration No
              </p>
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
                House -4, Road 23/A, Block B, Banani Dhaka 1213, Bangladesh
              </p>
            </div>
          </Grid.Col>
        </Grid>
      </div>

      <div className="itemCard">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
            <Grid.Col span={8}>
              <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: "xl" }}>
                <Grid.Col span={6}>
                  <Box>
                    <TextInput
                      label="Company Name"
                      placeholder="Name"
                      {...form.getInputProps("name")}
                    />

                    {/* <div className="d-flex align-items-start w-100 cust_mt">
                  <div className="cust_iputLabel">Establishment Date</div>

                </div> */}

                    <DateInput
                      classNames={{
                        root: "w-100",
                        // wrapper: "cust_iputWrapper",
                      }}
                      mt="sm"
                      // value={value}
                      // onChange={setValue}
                      label="Establishment Date"
                      placeholder="Establishment Date"
                      {...form.getInputProps("establishment_date")}
                    />

                    <TextInput
                      mt="sm"
                      label="Industry"
                      placeholder="Industry"
                      {...form.getInputProps("industry_type")}
                    />

                    <TextInput
                      mt="sm"
                      label="Business Registration No"
                      placeholder="Business Registration No"
                      {...form.getInputProps("business_registration_number")}
                    />

                    {/* <TextInput
                      mt="sm"
                      label="TAX ID"
                      placeholder="TAX ID"
                      {...form.getInputProps("tax_id_number")}
                    />

                    <TextInput
                      mt="sm"
                      label="BIN"
                      placeholder="BIN"
                      {...form.getInputProps("bin_no")}
                    /> */}

                    <TextInput
                      mt="sm"
                      label="Phone"
                      placeholder="Phone"
                      {...form.getInputProps("primary_phone_number")}
                    />
                    <TextInput
                      mt="sm"
                      label="Fax"
                      placeholder="Fax"
                      //  min={0}
                      //  max={99}
                      {...form.getInputProps("fax")}
                    />
                    <TextInput
                      mt="sm"
                      label="Email"
                      placeholder="Email"
                      {...form.getInputProps("primary_email")}
                    />
                    <TextInput
                      mt="sm"
                      label="Website"
                      placeholder="Website"
                      {...form.getInputProps("website_url")}
                    />
                  </Box>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Box>
                    <TextInput
                      // mt="sm"
                      label="TAX ID"
                      placeholder="TAX ID"
                      {...form.getInputProps("tax_id_number")}
                    />

                    <TextInput
                      mt="sm"
                      label="BIN"
                      placeholder="BIN"
                      {...form.getInputProps("bin_no")}
                    />

                    <TextInput
                      mt="sm"
                      label="Description"
                      placeholder="Description"
                      {...form.getInputProps("description")}
                    />

                    <TextInput
                      classNames={{
                        root: "w-100",
                        // wrapper: "cust_iputWrapper",
                      }}
                      mt="sm"
                      label="City"
                      placeholder="City"
                      {...form.getInputProps("address.city")}
                    />

                    <TextInput
                      classNames={{
                        root: "w-100",
                        // wrapper: "cust_iputWrapper",
                      }}
                      mt="sm"
                      label="State"
                      placeholder="State"
                      {...form.getInputProps(`address.state_division`)}
                    />

                    <TextInput
                      classNames={{
                        root: "w-100",
                        // wrapper: "cust_iputWrapper",
                      }}
                      mt="sm"
                      label="ZIP Code"
                      placeholder="ZIP Code"
                      {...form.getInputProps(`address.post_zip_code`)}
                    />

                    <Select
                      classNames={{
                        root: "w-100",
                        // wrapper: "cust_iputWrapper",
                      }}
                      mt="sm"
                      label="Country"
                      placeholder="Country"
                      searchable
                      data={countries}
                      {...form.getInputProps("address.country")}
                    />

                    <Textarea
                      classNames={{
                        root: "w-100",
                        // wrapper: "cust_iputWrapper",
                      }}
                      mt="sm"
                      label="Address"
                      placeholder="Address"
                      {...form.getInputProps("address.address")}
                    />

                    {/* <Textarea
                      mt="sm"
                      label="Address"
                      placeholder="Address"
                      {...form.getInputProps("address")}
                    /> */}
                  </Box>
                </Grid.Col>
              </Grid>
              <Button type="submit" mt="lg" size="md">
                Submit
              </Button>
            </Grid.Col>
            <Grid.Col span={4}>
              <div className="uploadBox">
                <p className="uploadIcon">
                  <FcAddImage />
                </p>
                <h6 className="mb-4 color-light">
                  NOTE : Supported formats are JPG, JPEG, PNG
                </h6>

                <Group justify="center">
                  <FileButton onChange={setFile} accept="image/png,image/jpeg">
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
        </form>
      </div>
    </>
  );
};

export default BasicInfo;
