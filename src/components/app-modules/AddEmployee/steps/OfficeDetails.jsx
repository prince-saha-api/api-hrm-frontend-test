"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";
import useSWR from "swr";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Box,
  Select,
  Button,
  Group,
  PasswordInput,
  MultiSelect,
  Grid,
} from "@mantine/core";
import { toast } from "react-toastify";
import { fetcher, getData } from "@/lib/fetch";

const OfficeDetails = forwardRef(({ data, onNext, onBack }, ref) => {
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      ...data,
      joining_date: data.joining_date ? new Date(data.joining_date) : null,
    },
    // validate: {
    //   official_id: (value) =>
    //     value.length < 2 ? "Official Id must have at least 2 letters" : null,
    // },
  });

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
    data: shiftsData,
    error: shiftsError,
    isLoading: isShiftsLoading,
  } = useSWR(`/api/user/get-shift/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const shifts = shiftsData?.data?.result?.map((item) => ({
    label: item?.name?.toString() || "",
    value: item?.id.toString() || "",
  }));

  const {
    data: gradesData,
    error: gradesError,
    isLoading: isGradesLoading,
  } = useSWR(`/api/user/get-grade/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const grades = gradesData?.data?.result?.map((item) => ({
    label: item?.name?.toString() || "",
    value: item?.id.toString() || "",
  }));

  const {
    data: rolesData,
    error: rolesError,
    isLoading: isRolesLoading,
  } = useSWR(`/api/user/get-rolepermission/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const roles = rolesData?.data?.result?.map((item) => ({
    label: item?.name?.toString() || "",
    value: item?.id.toString() || "",
  }));

  const {
    data: groupsData,
    error: groupsError,
    isLoading: isGroupsLoading,
  } = useSWR(`/api/device/get-group/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const groups = groupsData?.data?.result?.map((item) => ({
    label: item?.title?.toString() || "",
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
      form.setFieldValue("branch", null);
      setBranches([]);
    }
  });

  // useEffect(() => {
  //   if (form.values.company) {
  //     fetchBranches(form.values.company);
  //   } else {
  //     form.setFieldValue("branch", null);
  //     setBranches([]);
  //   }
  // }, [form.values.company]);

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

  // useEffect(() => {
  //   if (form.values.branch) {
  //     fetchDepartments(form.values.company, form.values.branch);
  //     form.setFieldValue("department", null);
  //   } else {
  //     form.setFieldValue("department", null);
  //     setDepartments([]);
  //   }
  // }, [form.values.company, form.values.branch]);

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

  const handleSubmit = (values) => {
    const formattedDate = values.joining_date
      ? values.joining_date.toISOString().split("T")[0]
      : null;
    onNext({ ...values, joining_date: formattedDate });
  };

  return (
    <>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={6}>
            <Box className="stepBox">
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Employee ID</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // label="Employee ID"
                  placeholder="Ex: API2307047"
                  {...form.getInputProps("official_id")}
                />
              </div>

              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Official Email</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Official Email"
                  placeholder="Official Email"
                  {...form.getInputProps("official_email")}
                />
              </div>

              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Official Phone</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="Official Phone"
                  {...form.getInputProps("official_phone")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Password</div>
                <PasswordInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Password"
                  placeholder="Password"
                  {...form.getInputProps("password")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Employee Type</div>
                <Select
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Employee Type"
                  placeholder="Employee Type"
                  data={[
                    "Trainee",
                    "Apprentice",
                    "Intern",
                    "Probation",
                    "Permanent",
                    "Temporary",
                    "Contractual",
                    "Commission",
                    "Labour",
                  ]}
                  {...form.getInputProps("employee_type")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Company</div>
                <Select
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Company"
                  placeholder="Company"
                  // data={[
                  //   { value: "1", label: "API Solutions Ltd." },
                  //   { value: "2", label: "Google" },
                  //   { value: "3", label: "Microsoft" },
                  // ]}
                  data={companies}
                  {...form.getInputProps("company")}
                  key={form.key("company")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Branch</div>
                <Select
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Branch"
                  placeholder="Branch"
                  // data={[
                  //   { value: "1", label: "Banani" },
                  //   { value: "2", label: "Dhanmondi" },
                  //   { value: "3", label: "Chattogram" },
                  //   { value: "4", label: "Khulna" },
                  // ]}
                  data={branches}
                  {...form.getInputProps("branch")}
                  key={form.key("branch")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Department</div>
                <Select
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Department"
                  placeholder="Department"
                  // data={[
                  //   { value: "1", label: "Development" },
                  //   { value: "2", label: "Marketing" },
                  //   { value: "3", label: "HR" },
                  // ]}
                  data={departments}
                  {...form.getInputProps("department")}
                  key={form.key("department")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Designation</div>
                <Select
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Designation"
                  placeholder="Designation"
                  // data={[
                  //   { value: "1", label: "FrontEnd Developer" },
                  //   { value: "2", label: "BackEnd Developer" },
                  //   { value: "3", label: "QA" },
                  // ]}
                  data={designations}
                  {...form.getInputProps("designation")}
                  key={form.key("designation")}
                />
              </div>
            </Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box className="stepBox">
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Default Shift</div>
                <Select
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Default Shift"
                  placeholder="Default Shift"
                  // data={[
                  //   { value: "1", label: "Morning" },
                  //   { value: "2", label: "Day" },
                  //   { value: "3", label: "Night" },
                  // ]}
                  data={shifts}
                  {...form.getInputProps("shift")}
                  key={form.key("shift")}
                />
              </div>

              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Grade</div>
                <Select
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="Grade"
                  data={grades}
                  {...form.getInputProps("grade")}
                  key={form.key("grade")}
                />
              </div>

              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">User Role</div>
                <MultiSelect
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="User Role"
                  // data={[
                  //   { value: "1", label: "Role 1" },
                  //   { value: "2", label: "Role 2" },
                  //   { value: "3", label: "Role 3" },
                  // ]}
                  data={roles}
                  {...form.getInputProps("role_permission")}
                />
              </div>

              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Official Note</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="Official Note"
                  {...form.getInputProps("official_note")}
                />
              </div>

              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Group</div>
                <MultiSelect
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="Group"
                  data={groups}
                  {...form.getInputProps("ethnic_group")}
                />
              </div>

              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Joining Date</div>
                <DateInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // value={value}
                  // onChange={setValue}
                  // label="Joining Date"
                  placeholder="Date input"
                  {...form.getInputProps("joining_date")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Supervisor</div>
                <Select
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Supervisor"
                  placeholder="Supervisor"
                  searchable
                  data={employees}
                  {...form.getInputProps("supervisor")}
                  key={form.key("supervisor")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Expense Approver</div>
                <Select
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Expense Approver"
                  placeholder="Expense Approver"
                  searchable
                  data={employees}
                  {...form.getInputProps("expense_approver")}
                  key={form.key("expense_approver")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Leave Approver</div>
                <Select
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Leave Approver"
                  placeholder="Leave Approver"
                  searchable
                  data={employees}
                  {...form.getInputProps("leave_approver")}
                  key={form.key("leave_approver")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Shift Approver</div>
                <Select
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Shift Approver"
                  placeholder="Shift Approver"
                  searchable
                  data={employees}
                  {...form.getInputProps("shift_request_approver")}
                  key={form.key("shift_request_approver")}
                />
              </div>
            </Box>
          </Grid.Col>
        </Grid>

        <Group justify="left" mt="xl">
          <Button variant="default" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Next step</Button>
        </Group>
      </form>
    </>
  );
});

export default OfficeDetails;
