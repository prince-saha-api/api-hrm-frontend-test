"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import useSWR from "swr";
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
   NumberInput,
   ActionIcon,
   Checkbox,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FcAcceptDatabase, FcAddImage } from "react-icons/fc";
import Image from "next/image";
import Breadcrumb from "@/components/utils/Breadcrumb";
import compmanyLogo from "public/full_logo.png";
import { countries } from "@/data/countries";
import { getData } from "@/lib/fetch";
import { update, submit } from "@/lib/submit";
import { fetcher } from "@/lib/fetch";
import { formatDate, getStoragePath } from "@/lib/helper";
import { TimeInput } from "@mantine/dates";
import { IoTimeOutline } from "react-icons/io5";

const BasicInfo = () => {
   const refTimeIn = useRef(null);
   const timeIn = (
      <ActionIcon
         variant="subtle"
         color="gray"
         onClick={() => refTimeIn.current?.showPicker()}
      >
         <IoTimeOutline />
      </ActionIcon>
   );

   const [basicInfo, setBasicInfo] = useState(null);
   const [isEditing, setIsEditing] = useState(false);
   const [isSubmitting, setIsSubmitting] = useState(false);

   useEffect(() => {
      const fetchBasicInfo = async () => {
         try {
            const response = await getData(
               `/api/company/get-basicinformation/`
            );
            setBasicInfo(response?.data[0]);
         } catch (error) {
            console.error("Failed to fetch basic information:", error);
         }
      };

      fetchBasicInfo();
   }, []);

   const form = useForm({
      mode: "uncontrolled",
      initialValues: basicInfo || {
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
         industry_type: {
            id: "",
            name: "",
         },
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
            value?.length < 11
               ? "Phone number must be at least 11 digits"
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

   const {
      data,
      error,
      isLoading: isFetchLoading,
   } = useSWR(`/api/company/get-companytype/`, fetcher, {
      errorRetryCount: 2,
      keepPreviousData: true,
   });

   const company_types = data?.data?.map((item) => ({
      label: item?.name?.toString() || "",
      value: String(item?.id || ""),
   }));

   // const company_types = [
   //   {
   //     label: "IT",
   //     value: "1",
   //   },
   //   {
   //     label: "sdfg",
   //     value: "2",
   //   },
   // ];

   console.log(company_types);

   useEffect(() => {
      if (basicInfo) {
         form.setValues(basicInfo);
      }
   }, [basicInfo]);

   const [file, setFile] = useState(null);
   const fileInputRef = useRef(null);
   const [preview, setPreview] = useState(null);

   const handleSubmit = async (values) => {
      // const formattedDate = values.establishment_date
      //   ? values.establishment_date.toISOString().split("T")[0]
      //   : null;

      setIsSubmitting(true);

      // const transformedValues = {
      //   ...values,
      //   industry_type: values.industry_type.id,
      // };

      // Remove the industry_type field completely
      const { industry_type, ...transformedValues } = values; // temporary

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

         flattenObject(transformedValues);

         // return;

         const method = basicInfo ? "PUT" : "POST";
         const endpoint = basicInfo
            ? `/api/company/update-basicinformation/${basicInfo.id}`
            : `/api/company/add-basicinformation/`;

         const response = basicInfo
            ? update(endpoint, formValues, true)
            : submit(endpoint, formValues, true);

         setTimeout(() => {
            setIsSubmitting(false);
            notifications.show({
               id: "hello-there",
               withCloseButton: true,
               autoClose: 5000,
               title: "You've been compromised",
               message: "Leave the building immediately",
               color: "red",
               // icon: <></>,
               className: "my-notification-class",
               // style: { backgroundColor: "red" },
               loading: false,
            });
         }, 5000);
      } catch (error) {
         console.error("Error submitting form:", error);
         setTimeout(() => {
            setIsSubmitting(false);
         }, 5000);
      }
   };

   const handleCancel = async () => {
      form.setValues(basicInfo);
      setIsEditing(false);
   };

   const handleFileChange = (file) => {
      setFile(file);
      setPreview(URL.createObjectURL(file));
      form.setFieldValue("logo", file); // add this line
   };

   const handleClearLogo = () => {
      setFile(null);
      setPreview(null);
      form.setFieldValue("logo", null);
      if (fileInputRef.current) {
         fileInputRef.current.value = ""; // Reset the file input
      }
   };

   if (!basicInfo && !isEditing) {
      return (
         <>
            <Breadcrumb
               classNames={{
                  root: "mb-4",
               }}
               title="General Settings"
               items={[
                  { title: "Dashboard", href: "/dashboard" },
                  { title: "General Settings" },
               ]}
            />

            <div className="itemCard">
               <form>
                  <Grid>
                     <Grid.Col span={3}>
                        <Select
                           mb="sm"
                           label="Fiscal Year Start from Month"
                           placeholder="Pick value"
                           data={[
                              "January",
                              "February",
                              "March",
                              "April",
                              "May",
                              "June",
                              "July",
                              "August",
                              "September",
                              "October",
                              "November",
                              "December",
                           ]}
                        />
                        <TimeInput
                           mb="sm"
                           label="Working Day Starts At"
                           ref={refTimeIn}
                           rightSection={timeIn}
                        />
                        <NumberInput
                           mb="sm"
                           label="Fraction of Daily Salary for Half Day"
                           placeholder="default 50%"
                           hideControls
                        />
                        <NumberInput
                           mb="sm"
                           label="Max working hours against Timesheet"
                           placeholder="default 8 hours"
                           hideControls
                        />
                        <Select
                           mb="sm"
                           label="Consider Attendance on Holidays"
                           placeholder="Pick value"
                           data={["Disabled", "Overtime"]}
                        />
                        <Checkbox
                           mb="sm"
                           label="Include Holidays as Working Days"
                        />
                        <Checkbox mb="sm" label="Allow Overtime" />
                     </Grid.Col>
                  </Grid>

                  <Group>
                     <Button mt="sm" type="submit">Save</Button>
                  </Group>
               </form>
            </div>
         </>
      );
   }

   return (
      <>
         <Breadcrumb
            classNames={{
               root: "mb-4",
            }}
            title="Basic Info"
            items={[
               { title: "Dashboard", href: "/dashboard" },
               { title: "Basic Setup" },
            ]}
         />

         {!isEditing ? (
            <div className="itemCard">
               <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
                  <Grid.Col span={6}>
                     <div className="compmanyLogo">
                        <Image
                           src={
                              basicInfo?.logo
                                 ? getStoragePath(basicInfo?.logo)
                                 : compmanyLogo
                           }
                           alt="Company Logo"
                           width="80"
                           height="40"
                        />
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
                        <Button
                           variant="filled"
                           size="sm"
                           onClick={() => setIsEditing(true)}
                        >
                           Edit
                        </Button>
                     </Flex>
                  </Grid.Col>
                  <Grid.Col span={3}>
                     <div className="infoText">
                        <p className="color-light font_14 mb-1">Company Name</p>
                        <p className="font_18">
                           {basicInfo?.name}
                           {/* API Solutions Ltd. */}
                        </p>
                     </div>
                     <div className="infoText">
                        <p className="color-light font_14 mb-1">Legal Name</p>
                        <p className="font_18">
                           {basicInfo?.legal_name}
                           {/* API Solutions Ltd. */}
                        </p>
                     </div>
                     <div className="infoText">
                        <p className="color-light font_14 mb-1">Company Type</p>
                        <p className="font_18">
                           {basicInfo?.industry_type?.name}
                           {/* API Solutions Ltd. */}
                        </p>
                     </div>
                     <div className="infoText">
                        <p className="color-light font_14 mb-1">
                           Establishment Date
                        </p>
                        <p className="font_18">
                           {formatDate(basicInfo?.establishment_date)}
                        </p>
                     </div>
                     <div className="infoText">
                        <p className="color-light font_14 mb-1">
                           Business Registration No
                        </p>
                        <p className="font_18">
                           {basicInfo?.business_registration_number}
                           {/* 3875387658 */}
                        </p>
                     </div>
                     <div className="infoText">
                        <p className="color-light font_14 mb-1">Description</p>
                        <p className="font_18">
                           {basicInfo?.description || "NA"}
                           {/* 3875387658 */}
                        </p>
                     </div>
                     <div className="infoText">
                        <p className="color-light font_14 mb-1">bin_no</p>
                        <p className="font_18">
                           {basicInfo?.bin_no || "NA"}
                           {/* 3875387658 */}
                        </p>
                     </div>
                  </Grid.Col>
                  <Grid.Col span={3}>
                     <div className="infoText">
                        <p className="color-light font_14 mb-1">
                           Tax ID Number
                        </p>
                        <p className="font_18">{basicInfo?.tax_id_number}</p>
                     </div>
                     <div className="infoText">
                        <p className="color-light font_14 mb-1">Phone</p>
                        <p className="font_18">
                           {basicInfo?.primary_phone_number}
                           {/* +880 1686449007 */}
                        </p>
                     </div>
                     <div className="infoText">
                        <p className="color-light font_14 mb-1">Fax</p>
                        <p className="font_18">
                           {basicInfo?.fax}
                           {/* +88-02 55035911 */}
                        </p>
                     </div>

                     <div className="infoText">
                        <p className="color-light font_14 mb-1">Email</p>
                        <p className="font_18">
                           {basicInfo?.primary_email}
                           {/* hello@apisolutionsltd.com */}
                        </p>
                     </div>
                     <div className="infoText">
                        <p className="color-light font_14 mb-1">Website</p>
                        <p className="font_18">{basicInfo?.website_url}</p>
                     </div>
                     <div className="infoText">
                        <p className="color-light font_14 mb-1">Address</p>
                        <p className="font_18">
                           {basicInfo?.address?.address
                              ? `${basicInfo.address.address}`
                              : ""}
                           {basicInfo?.address?.city
                              ? `, ${basicInfo.address.city}`
                              : ""}
                           {basicInfo?.address?.state_division
                              ? `, ${basicInfo.address.state_division}`
                              : ""}
                           {basicInfo?.address?.post_zip_code
                              ? ` - ${basicInfo.address.post_zip_code}`
                              : ""}
                           {basicInfo?.address?.country
                              ? `, ${basicInfo.address.country}`
                              : ""}

                           {/* House -4, Road 23/A, Block B, Banani Dhaka 1213, Bangladesh */}
                        </p>
                     </div>
                  </Grid.Col>
               </Grid>
            </div>
         ) : (
            <div className="itemCard">
               <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                  <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
                     <Grid.Col span={8}>
                        <Grid
                           gutter={{ base: 5, xs: "md", md: "xl", xl: "xl" }}
                        >
                           <Grid.Col span={6}>
                              <Box>
                                 <TextInput
                                    label="Company Name"
                                    placeholder="Name"
                                    {...form.getInputProps("name")}
                                    disabled={isSubmitting}
                                 />
                                 {/* <DateInput
                        classNames={{
                          root: "w-100",
                        }}
                        mt="sm"
                        label="Establishment Date"
                        placeholder="Establishment Date"
                        {...form.getInputProps("establishment_date")}
                      /> */}

                                 <Select
                                    mt="sm"
                                    label="Industry Type"
                                    placeholder="Select industry type"
                                    data={company_types || []}
                                    value={form
                                       .getValues()
                                       .industry_type.id.toString()}
                                    onChange={(value, option) => {
                                       form.setFieldValue("industry_type", {
                                          id: option?.value || "",
                                          name: option?.label || "",
                                       });
                                    }}
                                    disabled={isSubmitting}
                                 />

                                 <TextInput
                                    mt="sm"
                                    label="Business Registration No"
                                    placeholder="Business Registration No"
                                    {...form.getInputProps(
                                       "business_registration_number"
                                    )}
                                    disabled={isSubmitting}
                                 />
                                 <TextInput
                                    mt="sm"
                                    label="Phone"
                                    placeholder="Phone"
                                    {...form.getInputProps(
                                       "primary_phone_number"
                                    )}
                                    disabled={isSubmitting}
                                 />
                                 <TextInput
                                    mt="sm"
                                    label="Fax"
                                    placeholder="Fax"
                                    {...form.getInputProps("fax")}
                                    disabled={isSubmitting}
                                 />
                                 <TextInput
                                    mt="sm"
                                    label="Email"
                                    placeholder="Email"
                                    {...form.getInputProps("primary_email")}
                                    disabled={isSubmitting}
                                 />
                                 <TextInput
                                    mt="sm"
                                    label="Website"
                                    placeholder="Website"
                                    {...form.getInputProps("website_url")}
                                    disabled={isSubmitting}
                                 />
                                 <TextInput
                                    mt="sm"
                                    label="TAX ID"
                                    placeholder="TAX ID"
                                    {...form.getInputProps("tax_id_number")}
                                    disabled={isSubmitting}
                                 />
                              </Box>
                           </Grid.Col>

                           <Grid.Col span={6}>
                              <Box>
                                 <TextInput
                                    // mt="sm"
                                    label="BIN"
                                    placeholder="BIN"
                                    {...form.getInputProps("bin_no")}
                                    disabled={isSubmitting}
                                 />

                                 <TextInput
                                    mt="sm"
                                    label="Description"
                                    placeholder="Description"
                                    {...form.getInputProps("description")}
                                    disabled={isSubmitting}
                                 />

                                 <TextInput
                                    classNames={{
                                       root: "w-100",
                                    }}
                                    mt="sm"
                                    label="City"
                                    placeholder="City"
                                    {...form.getInputProps("address.city")}
                                    disabled={isSubmitting}
                                 />

                                 <TextInput
                                    classNames={{
                                       root: "w-100",
                                    }}
                                    mt="sm"
                                    label="State"
                                    placeholder="State"
                                    {...form.getInputProps(
                                       `address.state_division`
                                    )}
                                    disabled={isSubmitting}
                                 />

                                 <TextInput
                                    classNames={{
                                       root: "w-100",
                                    }}
                                    mt="sm"
                                    label="ZIP Code"
                                    placeholder="ZIP Code"
                                    {...form.getInputProps(
                                       `address.post_zip_code`
                                    )}
                                    disabled={isSubmitting}
                                 />

                                 <Select
                                    classNames={{
                                       root: "w-100",
                                    }}
                                    mt="sm"
                                    label="Country"
                                    placeholder="Country"
                                    searchable
                                    data={countries}
                                    {...form.getInputProps("address.country")}
                                    disabled={isSubmitting}
                                 />

                                 <Textarea
                                    classNames={{
                                       root: "w-100",
                                    }}
                                    mt="sm"
                                    label="Address"
                                    placeholder="Address"
                                    {...form.getInputProps("address.address")}
                                    disabled={isSubmitting}
                                 />
                              </Box>
                           </Grid.Col>
                        </Grid>
                        <Button
                           type="button"
                           mt="lg"
                           me={"lg"}
                           size="sm"
                           variant="outline"
                           // ml="sm"
                           onClick={() => handleCancel()}
                           disabled={isSubmitting}
                        >
                           Cancel
                        </Button>
                        <Button
                           type="submit"
                           mt="lg"
                           size="sm"
                           loading={isSubmitting}
                           loaderProps={{ type: "dots" }}
                        >
                           Submit
                        </Button>
                     </Grid.Col>
                     <Grid.Col span={4}>
                        <div className="uploadBox">
                           {basicInfo?.logo || preview !== null ? (
                              <div
                                 className="updatedImage text-center"
                                 style={{
                                    position: "relative",
                                    display: "inline-block",
                                 }}
                              >
                                 <Image
                                    src={
                                       preview
                                          ? preview
                                          : getStoragePath(basicInfo?.logo)
                                    }
                                    alt="Preview"
                                    width={200}
                                    height={200}
                                 />
                                 {preview ? (
                                    <button
                                       type="button"
                                       onClick={handleClearLogo}
                                       style={{
                                          position: "absolute",
                                          top: 0,
                                          right: 0,
                                          background: "red",
                                          color: "white",
                                          border: "none",
                                          borderRadius: "50%",
                                          width: "24px",
                                          height: "24px",
                                          cursor: "pointer",
                                       }}
                                    >
                                       X
                                    </button>
                                 ) : (
                                    ""
                                 )}
                              </div>
                           ) : (
                              <p className="uploadIcon">
                                 <FcAddImage />
                              </p>
                           )}
                           <h6 className="mb-4 color-light">
                              NOTE : Supported formats are JPG, JPEG, PNG
                           </h6>

                           <Group justify="center">
                              <FileButton
                                 ref={fileInputRef}
                                 onChange={handleFileChange}
                                 accept="image/png,image/jpeg"
                                 disabled={isSubmitting}
                              >
                                 {(props) => (
                                    <Button {...props}>Upload Logo</Button>
                                 )}
                              </FileButton>
                           </Group>
                        </div>
                     </Grid.Col>
                  </Grid>
               </form>
            </div>
         )}
      </>
   );
};

export default BasicInfo;
