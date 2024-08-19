import React, { useState } from "react";
import useSWR from "swr";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import {
  Modal,
  TextInput,
  Button,
  Select,
  Group,
  Grid,
  Checkbox,
  NumberInput,
} from "@mantine/core";
import { toast } from "react-toastify";
import { submit } from "@/lib/submit";
import { fetcher, getData } from "@/lib/fetch";
import { getFullName, formatDateToYYYYMMDD } from "@/lib/helper";
import { jobStatus } from "@/data";

const Index = ({ opened, close, mutate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      user: "",
      company: "",
      branch: "",
      department: "",
      designation: "",
      effective_from: null,
      increment_on: "",
      new_salary: "",
      employee_type: "",
      status_adjustment: "",
    },
    validate: {
      name: (value) =>
        value.length < 5 ? "Name must have at least 5 letters" : null,
      // description: (value) =>
      //   value.length < 10
      //     ? "Description must have at least 10 characters"
      //     : null,
      company: (value) => (!value ? "Select a company" : null),
      phone: (value) => {
        const phonePattern = /^01[0-9]{9}$/;
        return !phonePattern.test(value) ? "Phone number is invalid" : null;
      },
      email: (value) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailPattern.test(value) ? "Email is invalid" : null;
      },
      // fax: (value) => {
      //   const faxPattern = /^[0-9]+$/;
      //   return !faxPattern.test(value) ? "Fax number is invalid" : null;
      // },
      address: {
        // city: (value) =>
        //   value.length < 2 ? "City must have at least 2 letters" : null,
        // state_division: (value) =>
        //   value.length < 2
        //     ? "State/Division must have at least 2 letters"
        //     : null,
        // post_zip_code: (value) => {
        //   const zipCodePattern = /^[0-9]{5}(-[0-9]{4})?$/;
        //   return !zipCodePattern.test(value)
        //     ? "Postal/Zip code is invalid"
        //     : null;
        // },
        country: (value) => (!value ? "Select a country" : null),
        address: (value) =>
          value.length < 5 ? "Address must have at least 5 characters" : null,
      },
    },
  });

  const {
    data: employeeData,
    error: employeeError,
    isLoading: employeeIsFetchLoading,
  } = useSWR(`/api/user/get-employee/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
    revalidateOnFocus: false,
  });

  const employees = employeeData?.data.result.map((item) => ({
    label: getFullName(item?.first_name, item?.last_name),
    value: item?.id.toString() || "",
  }));

  const {
    data: companyData,
    error: companyError,
    isLoading: isCompanyLoading,
  } = useSWR(`/api/company/get-company/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const companies = companyData?.data?.result?.map((item) => ({
    label: item?.basic_information?.name?.toString() || "",
    value: item?.id.toString() || "",
  }));

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

  const fetchBranches = async (companyId) => {
    try {
      const response = await getData(
        `/api/branch/get-branch/?company=${companyId}`
      );
      console.log(response);
      const branchData = response?.data?.data?.result.map((branch) => ({
        label: branch?.name?.toString() || "",
        value: branch?.id.toString() || "",
      }));
      setBranches(branchData);
    } catch (error) {
      console.error("Error fetching branches:", error);
      toast.error("Error fetching branches");
    }
  };

  form.watch("company", ({ previousValue, value, touched, dirty }) => {
    if (value) {
      fetchBranches(value);
    } else {
      form.setFieldValue("branch", "");
      setBranches([]);
    }
  });

  const fetchDepartments = async (companyId, branchId) => {
    try {
      const response = await getData(
        `/api/department/get-department/?company=${companyId}&branch=${branchId}`
      );
      console.log(response);
      const departmentData = response?.data?.data?.result.map((department) => ({
        label: department?.name?.toString() || "",
        value: department?.id.toString() || "",
      }));
      setDepartments(departmentData);
    } catch (error) {
      console.error("Error fetching departments:", error);
      toast.error("Error fetching departments");
    }
  };

  form.watch("branch", ({ previousValue, value, touched, dirty }) => {
    if (value) {
      fetchDepartments(form.getValues().company, value);
      form.setFieldValue("department", null);
    } else {
      console.log(value);
      form.setFieldValue("department", "");
      setDepartments([]);
    }
  });

  const handleSubmit = async (values) => {
    // e.preventDefault();
    // console.log(values);
    // return;

    setIsSubmitting(true);

    try {
      const response = await submit("/api/branch/add-branch/", values);

      if (response?.status === "success") {
        // console.log(response);
        setIsSubmitting(false);
        form.reset();
        close();
        mutate();
        toast.success("Branch created successfully");
      } else {
        setIsSubmitting(false);
        if (response?.status === "error" && Array.isArray(response.message)) {
          response.message.forEach((msg) => {
            toast.error(msg);
          });
        } else {
          toast.error("Error submitting form");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 500);
    }
  };

  const [value, setValue] = useState(null);

  return (
    <>
      <Modal
        classNames={{
          title: "modalTitle",
        }}
        opened={opened}
        title="Employee Transition"
        onClose={close}
        centered
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid>
            <Grid.Col span={6}>
              <Select
                mb="sm"
                label="Employee"
                placeholder="Employee"
                // disabled={isSubmitting}
                data={employees}
                {...form.getInputProps("user")}
              />
              <p className="mb-1">Status Adjustment</p>
              <div className="">
                <Checkbox mb="xs" label="Promotion" />
                <Checkbox mb="xs" label="Increment Salary" />
                <Checkbox mb="xs" label="Transfer" />
                <Checkbox mb="xs" label="Status Update" />
              </div>
              <Select
                mb="sm"
                label="New Company"
                placeholder="New Company"
                // disabled={isSubmitting}
                data={companies}
                {...form.getInputProps("company")}
              />
              <Select
                mb="sm"
                label="New Branch"
                placeholder="New Branch"
                // disabled={isSubmitting}
                data={branches}
                {...form.getInputProps("branch")}
              />
              <Select
                mb="sm"
                label="New Department"
                placeholder="New Department"
                // disabled={isSubmitting}
                data={departments}
                {...form.getInputProps("department")}
              />
              <Select
                mb="sm"
                label="New Designation"
                placeholder="New Designation"
                // disabled={isSubmitting}
                data={designations}
                {...form.getInputProps("designation")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                mb="sm"
                label="Job Status Update"
                placeholder="Job Status Update"
                // disabled={isSubmitting}
                data={jobStatus}
                {...form.getInputProps("job_status")}
              />
              <NumberInput
                mb="sm"
                label="Previous Salary"
                placeholder="0"
                disabled
                hideControls
                // required={true}
                // disabled={isSubmitting}
                // {...form.getInputProps("name")}
              />
              <NumberInput
                mb="sm"
                label="New Salary"
                placeholder="0"
                hideControls
                // required={true}
                // disabled={isSubmitting}
                {...form.getInputProps("name")}
              />
              <TextInput
                mb="sm"
                label="Incremented Amount"
                placeholder="Incremented Amount"
                // required={true}
                // disabled={isSubmitting}
                // {...form.getInputProps("name")}
              />
              <TextInput
                mb="sm"
                label="Percentage"
                placeholder="Percentage"
                // required={true}
                // disabled={isSubmitting}
                // {...form.getInputProps("name")}
              />
              <DateInput
                label="Effective From"
                placeholder="Pick date"
                mb="sm"
                value={value}
                onChange={setValue}
              />
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="sm">
            <Button
              type="submit"
              loading={isSubmitting}
              loaderProps={{ type: "dots" }}
            >
              Save
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Index;
