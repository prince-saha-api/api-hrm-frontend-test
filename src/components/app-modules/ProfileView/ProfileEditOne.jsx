import React, { useCallback, useState, useRef } from "react";
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

  // const [isMarried, setIsMarried] = useState(
  //   item?.marital_status === "Married"
  // );

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

  // const {
  //   data: departmentData,
  //   error: departmentsError,
  //   isLoading: isDepartmentsLoading,
  // } = useSWR(
  //   `/api/department/get-department/?company=${item?.departmenttwo?.[0]?.branch?.company?.id}&branch=${item?.departmenttwo?.[0]?.branch?.id}`,
  //   fetcher,
  //   {
  //     errorRetryCount: 2,
  //     keepPreviousData: true,
  //   }
  // );

  // const departments = departmentData?.data?.result.map((department) => ({
  //   label: department?.name?.toString() || "",
  //   value: department?.id.toString() || "",
  // }));

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

  // const handleInputChange = (e, field) => {
  //   if (field === "spouse_name") {
  //     e.target.value !== "Married" && form.setFieldValue("spouse_name", "");
  //     setIsMarried(e.target.value === "Married");
  //   } else {
  //     form.setFieldValue(field, e.target.value);
  //   }
  //   form.clearFieldError(field);
  // };

  // const handleInputChange = (e, field) => {
  //   if (field === "spouse_name") {
  //     e.target.value !== "Married" &&
  //       setFormData((prev) => ({ ...prev, spouse_name: "" }));
  //     setIsMarried(e.target.value === "Married");
  //   } else {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [field]: e.target.value,
  //     }));
  //   }
  //   // form.clearFieldError(field);
  // };

  const handleInputChange = (e, field) => {
    // formRef.current[field] = e.target.value;
    // // form.clearFieldError(field);

    formRef.current.values[field] = e.target.value;
    formRef.current.errors[field] !== null
      ? (formRef.current.errors[field] = null && setErrors(false))
      : null;
  };

  const handleSelectChange = (value, field) => {
    // if (field === "marital_status") {
    //   value !== "Married" ? (formRef.current.spouse_name = "") : null;
    //   formRef.current[field] = value;
    //   // setIsMarried(value === "Married");
    // } else {
    //   formRef.current[field] = value;
    // }
    // // form.clearFieldError(field);

    if (field === "marital_status") {
      if (value !== "Married") {
        formRef.current.values.spouse_name = "";
        formRef.current.errors.spouse_name = null;
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

  const inputRef = useRef(null);
  function handleClick() {
    inputRef.current.focus();
  }

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
                // {...form.getInputProps("name")}
                // defaultValue={item?.first_name || ""}
                defaultValue={formRef.current.values.first_name}
                onChange={(value) => handleInputChange(value, "first_name")}
                error={formRef.current?.errors?.first_name}
                // error={errors.first_name ? errors.first_name : null}
                // styles={{ input: errors.first_name && { borderColor: "red" } }}
                className={
                  formRef.current?.errors?.first_name ? "error-border" : ""
                }
              />
              {formRef.current?.errors?.first_name && (
                <p className="c_error_msg">
                  {formRef.current?.errors?.first_name}
                </p>
              )}

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
                // {...form.getInputProps("name")}
                defaultValue={item?.official_id}
                onChange={(value) => handleInputChange(value, "official_id")}
              />

              {/* <Select
                mb="sm"
                label="Department"
                placeholder="Department"
                required={true}
                // disabled={isSubmitting}
                data={departments}
                // {...form.getInputProps("company")}
                defaultValue={String(item?.departmenttwo?.[0]?.id)}
              /> */}

              <DateInput
                mb="sm"
                label="Date of Join"
                placeholder="Pick date"
                // value={value}
                // onChange={setValue}
                defaultValue={
                  item?.joining_date ? new Date(item?.joining_date) : null
                }
                onChange={(value) => handleInputChange(value, "joining_date")}
              />
              <NumberInput
                mb="sm"
                label="Phone"
                placeholder="Phone"
                required={true}
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
                // {...form.getInputProps("company")}
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
                defaultValue={item?.last_name || ""}
                // disabled={isSubmitting}
                // {...form.getInputProps("name")}
                onChange={(value) => handleInputChange(value, "last_name")}
              />
              <TextInput
                mb="sm"
                label="Email"
                placeholder="Email"
                required={true}
                // disabled={isSubmitting}
                // {...form.getInputProps("name")}
                defaultValue={item?.personal_email}
                onChange={(value) => handleInputChange(value, "personal_email")}
              />
              <DateInput
                mb="sm"
                label="Date of Birth"
                placeholder="Pick date"
                required={true}
                defaultValue={item?.dob ? new Date(item?.dob) : null}
                onChange={(value) => handleInputChange(value, "dob")}
              />
              <Select
                mb="sm"
                label="Gender"
                placeholder="Gender"
                required={true}
                // disabled={isSubmitting}
                data={["Male", "Female", "Other"]}
                // {...form.getInputProps("company")}
                defaultValue={item?.gender}
                onChange={(value) => handleSelectChange(value, "gender")}
              />
              <Select
                mb="sm"
                label="Blood Group"
                placeholder="Blood Group"
                required={true}
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
                //  {...form.getInputProps("blood_group")}
                defaultValue={item?.blood_group}
                onChange={(value) => handleSelectChange(value, "blood_group")}
              />
              <Select
                mb="sm"
                label="Marital Status"
                placeholder="Marital Status"
                required={true}
                data={["Single", "Married", "Widowed", "Divorced", "Separated"]}
                //  {...form.getInputProps("marital_status")}
                defaultValue={item?.marital_status}
                // onChange={(value) => handleControlledChange(value)}
                onChange={(value) =>
                  handleSelectChange(value, "marital_status")
                }
              />

              {formRef.current.marital_status === "Married" && (
                <TextInput
                  mb="sm"
                  label="Spouse Name"
                  placeholder="Spouse Name"
                  required={true}
                  // disabled={isSubmitting}
                  // {...form.getInputProps("name")}
                  defaultValue={item?.spouse_name}
                  onChange={(value) => handleInputChange(value, "spouse_name")}
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
