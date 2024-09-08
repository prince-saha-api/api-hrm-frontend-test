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
    validate: {
      user: (value) => (!value ? "Select an employee" : null),
      effective_from: (value) => {
        if (
          statusAdjustment.Promotion ||
          statusAdjustment.Increment ||
          statusAdjustment.Transfer ||
          statusAdjustment.StatusUpdate
        ) {
          if (!value) {
            return "Effective From date is required";
          }
          if (new Date(value) > new Date()) {
            return "The Effective From date cannot exceed the current date";
          }
        }
        return null;
      },
      status_adjustment: (value) => {
        const { Promotion, Increment, Transfer, StatusUpdate } = value;

        if (!(Promotion || Increment || Transfer || StatusUpdate)) {
          return "At least one status adjustment must be selected.";
        }
      },
      salary: (value) => {
        if (!value && statusAdjustment.Increment) {
          return "Salary is required";
        }
        return value && isNaN(Number(value)) ? "Salary must be a number" : null;
      },
      company: (value) => {
        if (statusAdjustment.Transfer && !value) {
          return "Select a company";
        }
        return null;
      },
      branch: (value) => {
        if (statusAdjustment.Transfer && !value) {
          return "Select a branch";
        }
        return null;
      },
      department: (value) => {
        if (statusAdjustment.Transfer && !value) {
          return "Select a department";
        }
        return null;
      },
      designation: (value) => {
        if (statusAdjustment.Promotion && !value) {
          return "Select a designation";
        }
        return null;
      },
      job_status: (value) => {
        if (statusAdjustment.StatusUpdate && !value) {
          return "Select a job status";
        }
        return null;
      },
      employee_type: (value) => {
        if (statusAdjustment.StatusUpdate && !value) {
          return "Select an employee type";
        }
        return null;
      },
      increment_on: (value) => {
        if (statusAdjustment.Increment && !value) {
          return "Select the salary type";
        }
        return null;
      },
      // increment_amount: (value) => {
      //   if (statusAdjustment.Increment && value === null) {
      //     return "Increment amount cannot be null";
      //   }
      //   return null;
      // },
      // percentage: (value) => {
      //   if (statusAdjustment.Increment && !value) {
      //     return "Percentage cannot be empty";
      //   }
      //   return value && isNaN(Number(value))
      //     ? "Percentage must be a number"
      //     : null;
      // },
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
    if (!value) {
      setPreviousSalary((prev) => ({
        ...prev,
        gross_salary: 0,
        basic_salary: 0,
      }));
      form.setFieldValue("previous_salary", 0);
      form.setFieldValue("increment_amount", 0);
      form.setFieldValue("percentage", 0);
      return;
    }
    const selectedUser = employees.find((employee) => employee.value === value);
    const incrementOn = form.getValues().increment_on;

    setPreviousSalary((prev) => ({
      ...prev,
      gross_salary: selectedUser?.gross_salary,
      basic_salary: selectedUser?.basic_salary,
    }));

    let prevSalary = 0;

    if (incrementOn === "Gross Salary") {
      prevSalary = selectedUser?.gross_salary || 0;
    } else if (incrementOn === "Basic Salary") {
      prevSalary = selectedUser?.basic_salary || 0;
    }

    let newSalary = form.getValues().salary;
    const increment = calculateSalaryIncrement(prevSalary, newSalary);

    form.setFieldValue("previous_salary", prevSalary);
    form.setFieldValue("increment_amount", increment?.amount);
    form.setFieldValue("percentage", increment?.percentage);
  });

  const calculateSalaryIncrement = (previousSalary, newSalary) => {
    // Calculate increment amount
    const amount = newSalary - previousSalary;

    // Handle case where previousSalary is 0 to avoid division by zero
    const percentage =
      previousSalary > 0
        ? ((amount / previousSalary) * 100).toFixed(2) // Round to 2 decimal places
        : 0; // Set percentage to 0 when previousSalary is 0

    return {
      amount: amount,
      percentage: parseFloat(percentage), // Ensure the result is a number, not a string
    };
  };

  form.watch("increment_on", ({ value }) => {
    if (!value) {
      form.setFieldValue("previous_salary", 0);
      form.setFieldValue("increment_amount", 0);
      form.setFieldValue("percentage", 0);
      return;
    }

    let prevSalary = 0;

    if (value === "Gross Salary") {
      prevSalary = previousSalary.gross_salary;
    } else if (value === "Basic Salary") {
      prevSalary = previousSalary.basic_salary;
    }
    let newSalary = form.getValues().salary;
    const increment = calculateSalaryIncrement(prevSalary, newSalary);

    form.setFieldValue("previous_salary", prevSalary);
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
        setStatusAdjustment({
          Promotion: false,
          Increment: false,
          Transfer: false,
          StatusUpdate: false,
        });
        setPreviousSalary({
          gross_salary: 0,
          basic_salary: 0,
        });
        setBranches([]);
        setDepartments([]);
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

  const handleError = (errors) => {
    if (!errors?.user && errors?.status_adjustment) {
      toast.error(errors?.status_adjustment);
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
        <form
          onSubmit={form.onSubmit(
            (values) => handleSubmit(values),
            handleError
          )}
        >
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
                    disabled
                    {...form.getInputProps("increment_amount")}
                    key={form.key("increment_amount")}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    label="Percentage"
                    placeholder="Percentage"
                    disabled
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
                  maxDate={new Date()}
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
