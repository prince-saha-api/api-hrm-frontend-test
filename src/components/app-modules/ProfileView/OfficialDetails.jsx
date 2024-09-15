import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useForm } from "@mantine/form";
import {
  Modal,
  Button,
  Group,
  Grid,
  TextInput,
  Select,
  MultiSelect,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";
import { fetcher, getData } from "@/lib/fetch";
import { getFullName } from "@/lib/helper";
import { employeeTypes } from "@/data";
import UserSelectItem from "@/components/utils/UserSelectItem";

const Index = ({ opened, close, item, setItem }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      official_email: item?.official_email || "",
      official_phone: item?.official_phone || "",
      // employee_type: item?.employee_type || null,
      // company: item?.departmenttwo?.[0]?.branch?.company?.id.toString() || null,
      // branch: item?.departmenttwo?.[0]?.branch?.id?.toString() || null,
      shift: String(item?.shift?.id) || null,
      grade: String(item?.grade?.id) || null,
      role_permission: [],
      official_note: item?.official_note || "",
      ethnic_group:
        item?.ethnicgroup_user?.map((item) => item?.id.toString()) || [],
      // joining_date: item?.joining_date ? new Date(item.joining_date) : null,
      expense_approver: item?.expense_approver?.id.toString() || null,
      leave_approver: item?.leave_approver?.id.toString() || null,
      shift_request_approver: String(item?.shift_request_approver?.id) || null,
    },
    validate: {},
  });

  // const {
  //   data: companyData,
  //   error: companyError,
  //   isLoading: isCompanyLoading,
  // } = useSWR(`/api/company/get-company/`, fetcher, {
  //   errorRetryCount: 2,
  //   keepPreviousData: true,
  // });

  // const companies = companyData?.data?.result?.map((item) => ({
  //   label: item?.basic_information?.name?.toString() || "",
  //   value: item?.id.toString() || "",
  // }));

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
  } = useSWR(`/api/user/get-ethnicgroup/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const groups = groupsData?.data?.result?.map((item) => ({
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
    label: [getFullName(item?.first_name, item?.last_name), item?.official_id]
      .filter(Boolean)
      .join(" - "),
    firstName: item?.first_name || "",
    lastName: item?.last_name || "",
    officialID: item?.official_id,
    image: item?.photo,
    value: item?.id.toString() || "",
  }));

  // const fetchBranches = async (companyId) => {
  //   try {
  //     const response = await getData(
  //       `/api/branch/get-branch/?company=${companyId}`
  //     );
  //     console.log(response);
  //     const branchData = response?.data?.data?.result.map((branch) => ({
  //       label: branch?.name?.toString() || "",
  //       value: branch?.id.toString() || "",
  //     }));
  //     setBranches(branchData);
  //   } catch (error) {
  //     console.error("Error fetching branches:", error);
  //     toast.error("Error fetching branches");
  //   }
  // };

  // form.watch("company", ({ previousValue, value, touched, dirty }) => {
  //   if (value) {
  //     fetchBranches(value);
  //   } else {
  //     form.setFieldValue("branch", null);
  //     setBranches([]);
  //   }
  // });

  // useEffect(() => {
  //   fetchBranches(item?.departmenttwo?.[0]?.branch?.company?.id.toString());
  // }, []);

  // const fetchDepartments = async (companyId, branchId) => {
  //   try {
  //     const response = await getData(
  //       `/api/department/get-department/?company=${companyId}&branch=${branchId}`
  //     );
  //     console.log(response);
  //     const departmentData = response?.data?.data?.result.map((department) => ({
  //       label: department?.name?.toString() || "",
  //       value: department?.id.toString() || "",
  //     }));
  //     setDepartments(departmentData);
  //   } catch (error) {
  //     console.error("Error fetching departments:", error);
  //     toast.error("Error fetching departments");
  //   }
  // };

  // form.watch("branch", ({ previousValue, value, touched, dirty }) => {
  //   if (value) {
  //     fetchDepartments(form.getValues().company, value);
  //     form.setFieldValue("department", null);
  //   } else {
  //     console.log(value);
  //     form.setFieldValue("department", "");
  //     setDepartments([]);
  //   }
  // });

  const handleSubmit = async (values) => {
    // return;

    // const formattedDate = values.joining_date
    //   ? values.joining_date.toISOString().split("T")[0]
    //   : null;

    const updatedValues = {
      ...values,
      // joining_date: formattedDate,
      // ethnic_group: values.ethnic_group.map((id) => Number(id)),
    };

    setIsSubmitting(true);

    try {
      const response = await update(
        `/api/user/update-official-details/${item.id}`,
        updatedValues
      );

      if (response?.status === "success") {
        setIsSubmitting(false);
        close();
        // mutate();
        setItem((prev) => ({
          ...prev,
          grade: response?.data?.grade,
          shift: response?.data?.shift,
          ethnicgroup_user: response?.data?.ethnicgroup_user,
          supervisor: response?.data?.supervisor,
          expense_approver: response?.data?.expense_approver,
          leave_approver: response?.data?.leave_approver,
          shift_request_approver: response?.data?.shift_request_approver,
          role_permission: response?.data?.role_permission,
          official_email: response?.data?.official_email,
          official_phone: response?.data?.official_phone,
          official_note: response?.data?.official_note,
        }));
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
        title="Edit Official Details"
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
            <Grid.Col span={6}>
              <TextInput
                mb="sm"
                label="Official Email"
                placeholder="Official Email"
                // disabled={isSubmitting}
                {...form.getInputProps("official_email")}
              />
              <TextInput
                mb="sm"
                label="Official Phone"
                placeholder="Official Phone"
                // hideControls
                {...form.getInputProps("official_phone")}
              />
              {/* <Select
                mb="sm"
                label="Employee Type"
                placeholder="Employee Type"
                // disabled={isSubmitting}
                data={employeeTypes}
                {...form.getInputProps("employee_type")}
              /> */}
              {/* <Select
                mb="sm"
                label="Company"
                placeholder="Company"
                // disabled={isSubmitting}
                data={companies}
                {...form.getInputProps("company")}
                key={form.key("company")}
              /> */}
              {/* <Select
                mb="sm"
                label="Branch"
                placeholder="Branch"
                // disabled={isSubmitting}
                data={branches}
                {...form.getInputProps("branch")}
                key={form.key("branch")}
              /> */}
              <Select
                mb="sm"
                label="Default Shift"
                placeholder="Default Shift"
                // disabled={isSubmitting}
                data={shifts}
                {...form.getInputProps("shift")}
                key={form.key("shift")}
              />
              <Select
                mb="sm"
                label="Grade"
                placeholder="Grade"
                // disabled={isSubmitting}
                data={grades}
                {...form.getInputProps("grade")}
                key={form.key("grade")}
              />
              <MultiSelect
                mb="sm"
                label="Group"
                placeholder="Group"
                // disabled={isSubmitting}
                data={groups}
                {...form.getInputProps("ethnic_group")}
                key={form.key("ethnic_group")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MultiSelect
                mb="sm"
                label="User Role"
                placeholder="User Role"
                // disabled={isSubmitting}
                data={roles}
                {...form.getInputProps("role_permission")}
                key={form.key("role_permission")}
              />
              <TextInput
                mb="sm"
                label="Official Note"
                placeholder="Official Note"
                // disabled={isSubmitting}
                {...form.getInputProps("official_note")}
              />

              {/* <DateInput
                mb="sm"
                label="Joining Date"
                placeholder="Pick date"
                {...form.getInputProps("joining_date")}
              /> */}
              <Select
                mb="sm"
                label="Expense Approver"
                placeholder="Expense Approver"
                searchable
                data={employees}
                {...form.getInputProps("expense_approver")}
                key={form.key("expense_approver")}
                renderOption={UserSelectItem}
              />
              <Select
                mb="sm"
                label="Leave Approver"
                placeholder="Leave Approver"
                searchable
                data={employees}
                {...form.getInputProps("leave_approver")}
                key={form.key("leave_approver")}
                renderOption={UserSelectItem}
              />
              <Select
                mb="sm"
                label="Shift Approver"
                placeholder="Shift Approver"
                searchable
                data={employees}
                {...form.getInputProps("shift_request_approver")}
                key={form.key("shift_request_approver")}
                renderOption={UserSelectItem}
              />
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
