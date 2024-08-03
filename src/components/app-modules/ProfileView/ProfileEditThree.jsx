import React, { useState, useRef, useEffect } from "react";
import useSWR from "swr";
import {
  Group,
  Modal,
  Button,
  Grid,
  TextInput,
  Select,
  NumberInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { update } from "@/lib/submit";
import { fetcher } from "@/lib/fetch";
import TestInput from "./TestInput";

// Define validation schema using Yup
const schema = yup.object({
  first_name: yup
    .string()
    .required("First Name is required")
    .min(10, "First Name must be at least 10 characters"),
  last_name: yup.string().required("Last Name is required"),
  designation: yup.string().required("Designation is required"),
  official_id: yup.string().required("Employee ID is required"),
  department: yup.string().required("Department is required"),
  joining_date: yup.date().required("Joining Date is required"),
  personal_phone: yup.string().required("Phone is required"),
  personal_email: yup
    .string()
    .required("Email is required")
    .email("Email is invalid"),
  dob: yup.date().required("Date of Birth is required"),
  gender: yup.string().required("Gender is required"),
  blood_group: yup.string().required("Blood Group is required"),
  marital_status: yup.string().required("Marital Status is required"),
  spouse_name: yup.string().when("marital_status", {
    is: "Married",
    then: () => yup.string().required("Spouse Name is required"),
  }),
  supervisor: yup.string().required("Supervisor is required"),
});

const Index = ({ opened, close, item, setItem }) => {
  console.log("Nazmul");
  const { data: designationsData } = useSWR(
    `/api/user/get-dsignation/`,
    fetcher
  );
  const { data: employeesData } = useSWR(`/api/user/get-employee/`, fetcher);

  const designations = designationsData?.data?.result?.map((item) => ({
    label: item?.name?.toString() || "",
    value: item?.id.toString() || "",
  }));

  const employees = employeesData?.data?.result?.map((item) => ({
    label:
      item?.first_name?.toString() + " " + item?.last_name?.toString() || "",
    value: item?.username.toString() || "",
  }));

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      first_name: item?.first_name || "",
      last_name: item?.last_name || "",
      designation: item?.designation?.id || "",
      official_id: item?.official_id || "",
      department: item?.departmenttwo?.[0]?.id || "",
      joining_date: item?.joining_date ? new Date(item?.joining_date) : null,
      personal_phone: item?.personal_phone || "",
      personal_email: item?.personal_email || "",
      dob: item?.dob ? new Date(item?.dob) : null,
      gender: item?.gender || "",
      blood_group: item?.blood_group || "",
      marital_status: item?.marital_status || "",
      spouse_name: item?.spouse_name || "",
      supervisor: item?.supervisor?.id || "",
    },
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const isMarried = watch("marital_status") === "Married";

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      dob: data.dob ? data.dob.toISOString().split("T")[0] : null,
      joining_date: data.joining_date
        ? data.joining_date.toISOString().split("T")[0]
        : null,
    };

    try {
      const response = await update(
        `/api/user/update-profile/${item.id}`,
        formattedData
      );
      if (response?.status === "success") {
        close();
        toast.success("Profile updated successfully");
      } else {
        toast.error(response?.message[0] || "Error submitting form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };

  return (
    <Modal opened={opened} title="Edit Profile" onClose={close} centered>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Grid.Col span={6}>
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <TextInput
                  mb="sm"
                  {...field}
                  label="First Name"
                  placeholder="First Name"
                  error={errors.first_name?.message}
                />
              )}
            />

            <Controller
              name="designation"
              control={control}
              render={({ field }) => (
                <Select
                  mb="sm"
                  {...field}
                  label="Designation"
                  placeholder="Designation"
                  data={designations}
                  error={errors.designation?.message}
                />
              )}
            />

            <Controller
              name="official_id"
              control={control}
              render={({ field }) => (
                <TextInput
                  mb="sm"
                  {...field}
                  label="Employee ID"
                  placeholder="Employee ID"
                  error={errors.official_id?.message}
                />
              )}
            />

            <Controller
              name="joining_date"
              control={control}
              render={({ field }) => (
                <DateInput
                  mb="sm"
                  {...field}
                  label="Date of Join"
                  placeholder="Pick date"
                  error={errors.joining_date?.message}
                />
              )}
            />

            <Controller
              name="personal_phone"
              control={control}
              render={({ field }) => (
                <NumberInput
                  mb="sm"
                  {...field}
                  label="Phone"
                  placeholder="Phone"
                  hideControls
                  error={errors.personal_phone?.message}
                />
              )}
            />

            <Controller
              name="supervisor"
              control={control}
              render={({ field }) => (
                <Select
                  mb="sm"
                  {...field}
                  label="Supervisor"
                  placeholder="Supervisor"
                  data={employees}
                  error={errors.supervisor?.message}
                />
              )}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => (
                <TextInput
                  mb="sm"
                  {...field}
                  label="Last Name"
                  placeholder="Last Name"
                  error={errors.last_name?.message}
                />
              )}
            />

            <Controller
              name="personal_email"
              control={control}
              render={({ field }) => (
                <TextInput
                  mb="sm"
                  {...field}
                  label="Email"
                  placeholder="Email"
                  error={errors.personal_email?.message}
                />
              )}
            />

            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <DateInput
                  mb="sm"
                  {...field}
                  label="Date of Birth"
                  placeholder="Pick date"
                  error={errors.dob?.message}
                />
              )}
            />

            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  mb="sm"
                  {...field}
                  label="Gender"
                  placeholder="Gender"
                  data={["Male", "Female", "Other"]}
                  error={errors.gender?.message}
                />
              )}
            />

            <Controller
              name="blood_group"
              control={control}
              render={({ field }) => (
                <Select
                  mb="sm"
                  {...field}
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
                  error={errors.blood_group?.message}
                />
              )}
            />

            <Controller
              name="marital_status"
              control={control}
              render={({ field }) => (
                <Select
                  mb="sm"
                  {...field}
                  label="Marital Status"
                  placeholder="Marital Status"
                  data={[
                    "Single",
                    "Married",
                    "Widowed",
                    "Divorced",
                    "Separated",
                  ]}
                  error={errors.marital_status?.message}
                />
              )}
            />

            {isMarried && (
              <Controller
                name="spouse_name"
                control={control}
                render={({ field }) => (
                  <TextInput
                    mb="sm"
                    {...field}
                    label="Spouse Name"
                    placeholder="Spouse Name"
                    error={errors.spouse_name?.message}
                  />
                )}
              />
            )}
          </Grid.Col>
        </Grid>

        <Group justify="flex-end" mt="md">
          <Button type="submit" variant="filled" disabled={isSubmitting}>
            Update
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default Index;
