import React, { useState } from "react";
import useSWR from "swr";
import { useForm } from "@mantine/form";
import { Modal, Button, Group, Grid, TextInput, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { toast } from "react-toastify";
import { useUser } from "@/components/contexts/UserContext";
import { update } from "@/lib/submit";
import { fetcher } from "@/lib/fetch";
import { formatDateToYYYYMMDD, getFullName } from "@/lib/helper";
import { validateEmail, validatePhoneNumber } from "@/lib/validate";
import { bloodGroups, genders, maritalStatus } from "@/data";

const Index = ({ opened, close, item, setItem }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, setUser } = useUser();
  const userId = user?.id;

  const [isMarried, setIsMarried] = useState(
    item?.marital_status === "Married"
  );

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      first_name: item?.first_name || "",
      last_name: item?.last_name || "",
      // designation: item?.designation?.id.toString() || "",
      // official_id: item?.official_id || "",
      // department: item?.departmenttwo?.[0]?.id || "",
      // joining_date: item?.joining_date ? new Date(item?.joining_date) : null,
      personal_phone: item?.personal_phone || "",
      personal_email: item?.personal_email || "",
      dob: item?.dob ? new Date(item?.dob) : null,
      gender: item?.gender || "",
      blood_group: item?.blood_group || "",
      marital_status: item?.marital_status || "",
      spouse_name: item?.spouse_name || "",
      supervisor: String(item?.supervisor?.id) || "",
    },
    validate: {
      first_name: (value) =>
        value.length < 2 ? "First Name must be at least 2 characters" : null,
      last_name: (value) => (!value ? "Last Name is required" : null),
      // designation: (value) => (!value ? "Designation is required" : null),
      // official_id: (value) => (!value ? "Employee ID is required" : null),
      // department: (value) => (!value ? "Department is required" : null),
      // joining_date: (value) => (!value ? "Joining Date is required" : null),
      personal_phone: (value) =>
        !value
          ? "Phone is required"
          : !validatePhoneNumber(value)
          ? "Invalid phone number"
          : null,
      personal_email: (value) => {
        if (!value) return "Email is required";
        return !validateEmail(value) ? "Invalid Email" : null;
      },
      dob: (value) => (!value ? "Date of Birth is required" : null),
      gender: (value) => (!value ? "Gender is required" : null),
      blood_group: (value) => (!value ? "Blood Group is required" : null),
      marital_status: (value) => (!value ? "Marital Status is required" : null),
      spouse_name: (value, values) =>
        values.marital_status === "Married" && !value
          ? "Spouse Name is required"
          : null,
      // supervisor: (value) => (!value ? "Supervisor is required" : null),
    },
  });

  form.watch("marital_status", ({ previousValue, value, touched, dirty }) => {
    console.log({ previousValue, value, touched, dirty });
    dirty && value !== "Married" && form.setFieldValue("spouse_name", "");
    setIsMarried(value === "Married");
  });

  // const {
  //   data: designationsData,
  //   error: designationsError,
  //   isLoading: isDesignationsLoading,
  // } = useSWR(`/api/user/get-dsignation/`, fetcher, {
  //   errorRetryCount: 2,
  //   keepPreviousData: true,
  // });

  // const designations = designationsData?.data?.result?.map((item) => ({
  //   label: item?.name?.toString() || "",
  //   value: item?.id.toString() || "",
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
    label: getFullName(item?.first_name, item?.last_name),
    value: item?.id.toString() || "",
  }));

  const handleSubmit = async (values) => {
    const formattedDOB = formatDateToYYYYMMDD(values.dob);

    // const formattedJoiningDate = values.joining_date
    //   ? values.joining_date.toISOString().split("T")[0]
    //   : null;

    const updatedValues = {
      ...values,
      dob: formattedDOB,
      // joining_date: formattedJoiningDate,
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
        // mutate();
        setItem((prev) => ({
          ...prev,
          first_name: response?.data?.first_name,
          last_name: response?.data?.last_name,
          // designation: response?.data?.designation,
          // official_id: response?.data?.official_id,
          // department: response?.data?.departmenttwo?.[0]?.id,
          // joining_date: response?.data?.joining_date,
          personal_phone: response?.data?.personal_phone,
          personal_email: response?.data?.personal_email,
          dob: response?.data?.dob,
          gender: response?.data?.gender,
          blood_group: response?.data?.blood_group,
          marital_status: response?.data?.marital_status,
          spouse_name: response?.data?.spouse_name,
          supervisor: response?.data?.supervisor,
        }));

        if (item?.id == userId) {
          setUser((prev) => ({
            ...prev,
            first_name: response?.data?.first_name,
            last_name: response?.data?.last_name,
          }));
        }

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
        // mutate();
      }, 500);
    } catch (error) {
      console.error("Error submitting form:", error);
      setTimeout(() => {
        setIsSubmitting(false);
        // mutate();
      }, 500);
    }
  };

  const handleError = (errors) => {
    console.log(errors);
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
        <form
          onSubmit={form.onSubmit(
            (values) => handleSubmit(values),
            handleError
          )}
        >
          <Grid>
            {/* <Grid.Col span={12}>
              <TextInput
                mb="sm"
                label="Employee ID"
                placeholder="Employee ID"
                required={true}
                disabled={true}
                {...form.getInputProps("official_id")}
              />
            </Grid.Col> */}
            <Grid.Col span={6}>
              <TextInput
                mb="sm"
                label="First Name"
                placeholder="First Name"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("first_name")}
              />

              {/* <Select
                mb="sm"
                label="Designation"
                placeholder="Designation"
                required={true}
                disabled={isSubmitting}
                data={designations}
                {...form.getInputProps("designation")}
              /> */}

              {/* <DateInput
                mb="sm"
                label="Date of Join"
                placeholder="Pick date"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("joining_date")}
              /> */}
              <TextInput
                mb="sm"
                label="Phone"
                placeholder="Phone"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("personal_phone")}
              />
              <Select
                mb="sm"
                label="Supervisor"
                placeholder="Supervisor"
                required={true}
                disabled={isSubmitting}
                data={employees}
                {...form.getInputProps("supervisor")}
                key={form.key("supervisor")}
              />
              <Select
                mb="sm"
                label="Blood Group"
                placeholder="Blood Group"
                required={true}
                disabled={isSubmitting}
                data={bloodGroups}
                {...form.getInputProps("blood_group")}
              />

              <Select
                mb="sm"
                label="Marital Status"
                placeholder="Marital Status"
                required={true}
                disabled={isSubmitting}
                data={maritalStatus}
                {...form.getInputProps("marital_status")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                mb="sm"
                label="Last Name"
                placeholder="Last Name"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("last_name")}
              />
              <TextInput
                mb="sm"
                label="Email"
                placeholder="Email"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("personal_email")}
              />
              <DateInput
                mb="sm"
                label="Date of Birth"
                placeholder="Date of Birth"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("dob")}
              />
              <Select
                mb="sm"
                label="Gender"
                placeholder="Gender"
                required={true}
                disabled={isSubmitting}
                data={genders}
                {...form.getInputProps("gender")}
              />

              {isMarried && (
                <TextInput
                  mb="sm"
                  label="Spouse Name"
                  placeholder="Spouse Name"
                  required={true}
                  disabled={isSubmitting}
                  {...form.getInputProps("spouse_name")}
                />
              )}
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="md">
            <Button
              type="submit"
              variant="filled"
              loading={isSubmitting}
              loaderProps={{ type: "dots" }}
            >
              Update
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Index;
