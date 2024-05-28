"use client";
import React, { forwardRef, useImperativeHandle } from "react";
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
import { FcAcceptDatabase } from "react-icons/fc";
import Image from "next/image";
import compmanyLogo from "public/full_logo.png";
import uploadImg from "public/profile01.jpg";
import { FcAddImage } from "react-icons/fc";

const OfficeDetails = forwardRef(({ data, onNext, onBack }, ref) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      ...data,
      joining_date: data.joining_date ? new Date(data.joining_date) : null,
    },
    validate: {
      official_id: (value) =>
        value.length < 2 ? "Official Id must have at least 2 letters" : null,
    },
  });

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
                  data={[
                    { value: "1", label: "API Solutions Ltd." },
                    { value: "2", label: "Google" },
                    { value: "3", label: "Microsoft" },
                  ]}
                  {...form.getInputProps("company")}
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
                  data={[
                    { value: "1", label: "Banani" },
                    { value: "2", label: "Dhanmondi" },
                    { value: "3", label: "Chattogram" },
                    { value: "4", label: "Khulna" },
                  ]}
                  {...form.getInputProps("branch")}
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
                  data={[
                    { value: "1", label: "Development" },
                    { value: "2", label: "Marketing" },
                    { value: "3", label: "HR" },
                  ]}
                  {...form.getInputProps("department")}
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
                  data={[
                    { value: "1", label: "FrontEnd Developer" },
                    { value: "2", label: "BackEnd Developer" },
                    { value: "3", label: "QA" },
                  ]}
                  {...form.getInputProps("designation")}
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
                  data={[
                    { value: "1", label: "Morning" },
                    { value: "2", label: "Day" },
                    { value: "3", label: "Night" },
                  ]}
                  {...form.getInputProps("shift")}
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
                  data={[
                    { value: "1", label: "Grade 1" },
                    { value: "2", label: "Grade 2" },
                    { value: "3", label: "Grade 3" },
                  ]}
                  {...form.getInputProps("grade")}
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
                  data={[
                    { value: "1", label: "Role 1" },
                    { value: "2", label: "Role 2" },
                    { value: "3", label: "Role 3" },
                  ]}
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
                  data={[
                    { value: "1", label: "Group 1" },
                    { value: "2", label: "Group 2" },
                    { value: "3", label: "Group 3" },
                  ]}
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
                  data={[
                    { value: "API230747", label: "G. M. Nazmul Hussain" },
                    { value: "API230748", label: "Jiaur Rahman" },
                    { value: "API230749", label: "Nayeem Hossain" },
                  ]}
                  {...form.getInputProps("supervisor")}
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
                  data={[
                    { value: "API230747", label: "G. M. Nazmul Hussain" },
                    { value: "API230748", label: "Jiaur Rahman" },
                    { value: "API230749", label: "Nayeem Hossain" },
                  ]}
                  {...form.getInputProps("expense_approver")}
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
                  data={[
                    { value: "API230747", label: "G. M. Nazmul Hussain" },
                    { value: "API230748", label: "Jiaur Rahman" },
                    { value: "API230749", label: "Nayeem Hossain" },
                  ]}
                  {...form.getInputProps("leave_approver")}
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
                  data={[
                    { value: "API230747", label: "G. M. Nazmul Hussain" },
                    { value: "API230748", label: "Jiaur Rahman" },
                    { value: "API230749", label: "Nayeem Hossain" },
                  ]}
                  {...form.getInputProps("shift_request_approver")}
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
