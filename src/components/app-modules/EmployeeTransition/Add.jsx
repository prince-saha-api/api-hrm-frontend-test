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
import { jobStatus, employeeTypes } from "@/data";

const Index = ({ opened, close, mutate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [statusAdjustment, setStatusAdjustment] = useState({
    Promotion: false,
    Increment: false,
    Transfer: false,
    StatusUpdate: false,
  });

  const [previousSalary, setPreviousSalary] = useState({
    gross_salary: 0,
    basic_salary: 0,
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      user: "",
      effective_from: null,
      increment_on: "",
      salary: "",
      employee_type: "",
      status_adjustment: {
        Promotion: false,
        Increment: false,
        Transfer: false,
        StatusUpdate: false,
      },
      company: "",
      branch: "",
      department: "",
      designation: "",
      job_status: "",
      previous_salary: "",
      increment_amount: null,
      percentage: "",
    },
    // validate: {
    //   name: (value) =>
    //     value.length < 5 ? "Name must have at least 5 letters" : null,
    //   // description: (value) =>
    //   //   value.length < 10
    //   //     ? "Description must have at least 10 characters"
    //   //     : null,
    //   company: (value) => (!value ? "Select a company" : null),
    //   phone: (value) => {
    //     const phonePattern = /^01[0-9]{9}$/;
    //     return !phonePattern.test(value) ? "Phone number is invalid" : null;
    //   },
    //   email: (value) => {
    //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return !emailPattern.test(value) ? "Email is invalid" : null;
    //   },
    //   // fax: (value) => {
    //   //   const faxPattern = /^[0-9]+$/;
    //   //   return !faxPattern.test(value) ? "Fax number is invalid" : null;
    //   // },
    //   address: {
    //     // city: (value) =>
    //     //   value.length < 2 ? "City must have at least 2 letters" : null,
    //     // state_division: (value) =>
    //     //   value.length < 2
    //     //     ? "State/Division must have at least 2 letters"
    //     //     : null,
    //     // post_zip_code: (value) => {
    //     //   const zipCodePattern = /^[0-9]{5}(-[0-9]{4})?$/;
    //     //   return !zipCodePattern.test(value)
    //     //     ? "Postal/Zip code is invalid"
    //     //     : null;
    //     // },
    //     country: (value) => (!value ? "Select a country" : null),
    //     address: (value) =>
    //       value.length < 5 ? "Address must have at least 5 characters" : null,
    //   },
    // },
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
    gross_salary: Number(item?.gross_salary) || 0,
    basic_salary: Number(item?.basic_salary) || 0,
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

  form.watch(
    "status_adjustment.Promotion",
    ({ previousValue, value, touched, dirty }) => {
      if (!value) {
        form.setFieldValue("designation", "");
      }
      setStatusAdjustment((prev) => ({
        ...prev,
        Promotion: value,
      }));
    }
  );

  form.watch(
    "status_adjustment.Increment",
    ({ previousValue, value, touched, dirty }) => {
      if (!value) {
        form.setFieldValue("increment_on", "");
        form.setFieldValue("salary", "");
        form.setFieldValue("increment_amount", "");
        form.setFieldValue("percentage", "");
      }
      setStatusAdjustment((prev) => ({
        ...prev,
        Increment: value,
      }));
    }
  );

  form.watch(
    "status_adjustment.Transfer",
    ({ previousValue, value, touched, dirty }) => {
      if (!value) {
        form.setFieldValue("company", "");
        form.setFieldValue("branch", "");
        form.setFieldValue("department", "");
      }
      setStatusAdjustment((prev) => ({
        ...prev,
        Transfer: value,
      }));
    }
  );

  form.watch(
    "status_adjustment.StatusUpdate",
    ({ previousValue, value, touched, dirty }) => {
      if (!value) {
        form.setFieldValue("job_status", "");
        form.setFieldValue("employee_type", "");
      }
      setStatusAdjustment((prev) => ({
        ...prev,
        StatusUpdate: value,
      }));
    }
  );

  form.watch("salary", ({ previousValue, value, touched, dirty }) => {
    let prevSalary = 0;
    const incrementOn = form.getValues().increment_on;
    if (incrementOn && incrementOn === "Gross Salary") {
      prevSalary = previousSalary.gross_salary;
    } else if (incrementOn && incrementOn === "Basic Salary") {
      prevSalary = previousSalary.basic_salary;
    }
    let newSalary = value;
    const increment = calculateSalaryIncrement(prevSalary, newSalary);
    form.setFieldValue("increment_amount", increment?.amount);
    form.setFieldValue("percentage", increment?.percentage);
  });

  form.watch("user", ({ value }) => {
    const selectedUser = employees.find((employee) => employee.value === value);
    setPreviousSalary((prev) => ({
      ...prev,
      gross_salary: selectedUser.gross_salary,
      basic_salary: selectedUser.basic_salary,
    }));
    form.setFieldValue("previous_salary", selectedUser.gross_salary);
  });

  const calculateSalaryIncrement = (previousSalary, newSalary) => {
    return {
      amount: newSalary - previousSalary,
      percentage: ((newSalary - previousSalary) / previousSalary) * 100,
    };
  };

  form.watch("increment_on", ({ value }) => {
    let prevSalary = 0;

    if (value === "Gross Salary") {
      prevSalary = previousSalary.gross_salary;
    } else {
      prevSalary = previousSalary.basic_salary;
    }
    let newSalary = form.getValues().salary;
    const increment = calculateSalaryIncrement(prevSalary, newSalary);
    form.setFieldValue("increment_amount", increment?.amount);
    form.setFieldValue("percentage", increment?.percentage);
  });

  const handleSubmit = async (values) => {
    // e.preventDefault();

    const statusArray = Object.entries(values.status_adjustment)
      .filter(([key, value]) => value)
      .map(([key]) => (key === "StatusUpdate" ? "Status Update" : key));

    const formattedDate = formatDateToYYYYMMDD(values.effective_from);

    const updatedValues = {
      ...values,
      status_adjustment: statusArray,
      effective_from: formattedDate,
    };

    // console.log(updatedValues);

    setIsSubmitting(true);

    try {
      const response = await submit(
        "/api/jobrecord/add-jobhistory/",
        updatedValues
      );

      if (response?.status === "success") {
        // console.log(response);
        setIsSubmitting(false);
        form.reset();
        close();
        mutate();
        toast.success("Employee transition created successfully");
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
          <Grid grow gutter="sm">
            <Grid.Col span={12}>
              <Select
                mb="sm"
                label="Employee"
                placeholder="Employee"
                disabled={isSubmitting}
                data={employees}
                {...form.getInputProps("user")}
                key={form.key("user")}
              />
              <p className="mb-1">Status Adjustment</p>
              <div className="d-flex flex-wrap">
                <Checkbox
                  mb="sm"
                  className="me-2"
                  label="Promotion"
                  disabled={isSubmitting}
                  {...form.getInputProps(`status_adjustment.Promotion`, {
                    type: "checkbox",
                  })}
                  key={form.key("status_adjustment.Promotion")}
                />
                <Checkbox
                  mb="sm"
                  className="me-2"
                  label="Increment Salary"
                  disabled={isSubmitting}
                  {...form.getInputProps(`status_adjustment.Increment`, {
                    type: "checkbox",
                  })}
                  key={form.key("status_adjustment.Increment")}
                />
                <Checkbox
                  mb="sm"
                  className="me-2"
                  label="Transfer"
                  disabled={isSubmitting}
                  {...form.getInputProps(`status_adjustment.Transfer`, {
                    type: "checkbox",
                  })}
                  key={form.key("status_adjustment.Transfer")}
                />
                <Checkbox
                  mb="sm"
                  className="me-2"
                  label="Status Update"
                  disabled={isSubmitting}
                  {...form.getInputProps(`status_adjustment.StatusUpdate`, {
                    type: "checkbox",
                  })}
                  key={form.key("status_adjustment.StatusUpdate")}
                />
              </div>
            </Grid.Col>
          </Grid>

          {(statusAdjustment?.Promotion ||
            statusAdjustment?.Increment ||
            statusAdjustment?.Transfer ||
            statusAdjustment?.StatusUpdate) && <hr className="border" />}

          <Grid grow gutter="sm">
            {statusAdjustment?.Transfer && (
              <>
                <Grid.Col span={6}>
                  <Select
                    label="New Company"
                    placeholder="New Company"
                    disabled={isSubmitting}
                    data={companies}
                    {...form.getInputProps("company")}
                    key={form.key("company")}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Select
                    label="New Branch"
                    placeholder="New Branch"
                    disabled={isSubmitting}
                    data={branches}
                    {...form.getInputProps("branch")}
                    key={form.key("branch")}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Select
                    label="New Department"
                    placeholder="New Department"
                    disabled={isSubmitting}
                    data={departments}
                    {...form.getInputProps("department")}
                    key={form.key("department")}
                  />
                </Grid.Col>
              </>
            )}
            {statusAdjustment?.Promotion && (
              <Grid.Col span={6}>
                <Select
                  label="New Designation"
                  placeholder="New Designation"
                  disabled={isSubmitting}
                  data={designations}
                  {...form.getInputProps("designation")}
                  key={form.key("designation")}
                />
              </Grid.Col>
            )}

            {statusAdjustment?.StatusUpdate && (
              <>
                <Grid.Col span={6}>
                  <Select
                    label="Job Status Update"
                    placeholder="Job Status Update"
                    disabled={isSubmitting}
                    data={jobStatus}
                    {...form.getInputProps("job_status")}
                    key={form.key("job_status")}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Select
                    label="Employee Type"
                    placeholder="Employee Type"
                    disabled={isSubmitting}
                    data={employeeTypes}
                    {...form.getInputProps("employee_type")}
                    key={form.key("employee_type")}
                  />
                </Grid.Col>
              </>
            )}

            {statusAdjustment?.Increment && (
              <>
                <Grid.Col span={6}>
                  <Select
                    label="Increment On"
                    placeholder="Increment On"
                    disabled={isSubmitting}
                    data={["Gross Salary", "Basic Salary"]}
                    {...form.getInputProps("increment_on")}
                    key={form.key("increment_on")}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <NumberInput
                    label="Previous Salary"
                    placeholder="0"
                    disabled
                    hideControls
                    {...form.getInputProps("previous_salary")}
                    key={form.key("previous_salary")}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <NumberInput
                    label="New Salary"
                    placeholder="0"
                    hideControls
                    disabled={isSubmitting}
                    {...form.getInputProps("salary")}
                    key={form.key("salary")}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    label="Incremented Amount"
                    placeholder="Incremented Amount"
                    disabled={isSubmitting}
                    {...form.getInputProps("increment_amount")}
                    key={form.key("increment_amount")}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    label="Percentage"
                    placeholder="Percentage"
                    disabled={isSubmitting}
                    {...form.getInputProps("percentage")}
                    key={form.key("percentage")}
                  />
                </Grid.Col>
              </>
            )}

            {(statusAdjustment?.Promotion ||
              statusAdjustment?.Increment ||
              statusAdjustment?.Transfer ||
              statusAdjustment?.StatusUpdate) && (
              <Grid.Col span={6}>
                <DateInput
                  label="Effective From"
                  placeholder="Effective From"
                  disabled={isSubmitting}
                  {...form.getInputProps("effective_from")}
                  key={form.key("effective_from")}
                />
              </Grid.Col>
            )}
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
