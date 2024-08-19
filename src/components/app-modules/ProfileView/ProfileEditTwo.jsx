import React, { useState, useRef } from "react";
import useSWR from "swr";
import {
  Modal,
  Button,
  Group,
  Grid,
  TextInput,
  Select,
  NumberInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";
import { fetcher } from "@/lib/fetch";

const Index = ({ opened, close, item, setItem }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMarried, setIsMarried] = useState(
    item?.marital_status === "Married"
  );

  const [errors, setErrors] = useState(false);

  const formRef = useRef({
    values: {
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
    errors: {},
  });

  const validate = (values) => {
    const errors = {};
    if (!values.first_name || values.first_name.length < 10) {
      errors.first_name = "First Name must be at least 10 characters";
    }
    // Add other validation rules as needed
    return errors;
  };

  const {
    data: designationsData,
    error: designationsError,
    isLoading: isDesignationsLoading,
  } = useSWR(`/api/user/get-dsignation/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const designations = designationsData?.data?.result?.map((item) => ({
    label: item?.name?.toString() || "",
    value: item?.id.toString() || "",
  }));

  const {
    data: employeesData,
    error: employeesError,
    isLoading: isEmployeesLoading,
  } = useSWR(`/api/user/get-employee/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const employees = employeesData?.data?.result?.map((item) => ({
    label:
      item?.first_name?.toString() + " " + item?.last_name?.toString() || "",
    value: item?.username.toString() || "",
  }));

  const handleInputChange = (e, field) => {
    errors ? setErrors(false) : null;
    formRef.current.values[field] = e.target.value;
    if (formRef.current.errors[field]) {
      formRef.current.errors[field] = null;
    }
  };

  const handleSelectChange = (value, field) => {
    if (field === "marital_status") {
      if (value !== "Married") {
        formRef.current.values.spouse_name = "";
        formRef.current.errors.spouse_name = null;
        setIsMarried(false);
      } else {
        setIsMarried(true);
      }
    }
    formRef.current.values[field] = value;
    formRef.current.errors[field] = null;
  };

  console.log("adsf");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const values = formRef.current.values;
    const errors = validate(values);

    if (Object.keys(errors).length > 0) {
      formRef.current.errors = errors;
      setErrors(true);
      toast.error("Please fix the errors in the form");
      return;
    }

    const formattedDOB = values.dob
      ? values.dob.toISOString().split("T")[0]
      : null;

    const formattedJoiningDate = values.joining_date
      ? values.joining_date.toISOString().split("T")[0]
      : null;

    const updatedValues = {
      ...values,
      dob: formattedDOB,
      joining_date: formattedJoiningDate,
    };

    setIsSubmitting(true);

    try {
      const response = await update(
        `/api/user/update-profile/${item.id}`,
        updatedValues
      );

      if (response?.status === "success") {
        setIsSubmitting(false);
        close();
        toast.success("Profile updated successfully");
      } else {
        toast.error(
          response?.status === "error"
            ? response?.message[0]
            : "Error submitting form"
        );
      }
      setTimeout(() => {
        setIsSubmitting(false);
      }, 500);
    } catch (error) {
      console.error("Error submitting form:", error);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 500);
    }
  };

  return (
    <>
      <Modal
        classNames={{
          title: "modalTitle",
        }}
        opened={opened}
        title="Edit Profile"
        onClose={close}
        centered
      >
        <form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                mb="sm"
                label="First Name"
                placeholder="First Name"
                required={true}
                // disabled={isSubmitting}
                defaultValue={formRef.current.values.first_name}
                onChange={(e) => handleInputChange(e, "first_name")}
                error={formRef.current.errors.first_name}
              />

              <Select
                mb="sm"
                label="Designation"
                placeholder="Designation"
                required={true}
                // disabled={isSubmitting}
                data={designations}
                defaultValue={String(item?.designation?.id)}
                onChange={(value) => handleSelectChange(value, "designation")}
              />

              <TextInput
                mb="sm"
                label="Employee ID"
                placeholder="Employee ID"
                required={true}
                // disabled={isSubmitting}
                defaultValue={item?.official_id}
                onChange={(e) => handleInputChange(e, "official_id")}
              />

              <DateInput
                mb="sm"
                label="Date of Join"
                placeholder="Pick date"
                defaultValue={
                  item?.joining_date ? new Date(item?.joining_date) : null
                }
                onChange={(value) => handleSelectChange(value, "joining_date")}
              />

              <NumberInput
                mb="sm"
                label="Phone"
                placeholder="Phone"
                required={true}
                // disabled={isSubmitting}
                hideControls
                defaultValue={item?.personal_phone}
                onChange={(value) => handleInputChange(value, "personal_phone")}
              />
              <Select
                mb="sm"
                label="Supervisor"
                placeholder="Supervisor"
                required={true}
                // disabled={isSubmitting}
                data={employees}
                defaultValue={String(item?.supervisor?.id)}
                onChange={(value) => handleSelectChange(value, "supervisor")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                mb="sm"
                label="Last Name"
                placeholder="Last Name"
                required={true}
                // disabled={isSubmitting}
                defaultValue={item?.last_name || ""}
                onChange={(e) => handleInputChange(e, "last_name")}
              />

              <TextInput
                mb="sm"
                label="Email"
                placeholder="Email"
                required
                defaultValue={item?.personal_email}
                onChange={(e) => handleInputChange(e, "personal_email")}
              />

              <DateInput
                mb="sm"
                label="Date of Birth"
                placeholder="Pick date"
                required
                defaultValue={item?.dob ? new Date(item?.dob) : null}
                onChange={(value) => handleSelectChange(value, "dob")}
              />

              <Select
                mb="sm"
                label="Gender"
                placeholder="Gender"
                required
                data={["Male", "Female", "Other"]}
                defaultValue={item?.gender}
                onChange={(value) => handleSelectChange(value, "gender")}
              />

              <Select
                mb="sm"
                label="Blood Group"
                placeholder="Blood Group"
                required
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
                defaultValue={item?.blood_group}
                onChange={(value) => handleSelectChange(value, "blood_group")}
              />

              <Select
                mb="sm"
                label="Marital Status"
                placeholder="Marital Status"
                required
                data={["Single", "Married", "Widowed", "Divorced", "Separated"]}
                defaultValue={item?.marital_status}
                onChange={(value) =>
                  handleSelectChange(value, "marital_status")
                }
              />

              {isMarried && (
                <TextInput
                  mb="sm"
                  label="Spouse Name"
                  placeholder="Spouse Name"
                  required={true}
                  // disabled={isSubmitting}
                  defaultValue={item?.spouse_name}
                  onChange={(e) => handleInputChange(e, "spouse_name")}
                />
              )}
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="md">
            <Button type="submit" variant="filled">
              Update
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Index;
