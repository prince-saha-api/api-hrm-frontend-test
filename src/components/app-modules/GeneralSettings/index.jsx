"use client";
import React, { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Input,
  Button,
  Group,
  Select,
  Grid,
  NumberInput,
  ActionIcon,
  Checkbox,
  Loader,
  Alert,
} from "@mantine/core";
import Breadcrumb from "@/components/utils/Breadcrumb";
import { TimeInput } from "@mantine/dates";
import { IoTimeOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";
import { fetcher } from "@/lib/fetch";
import { formatTime } from "@/lib/helper";

const fiscalYearMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weeklyHolidays = [
  { id: 1, name: "Saturday" },
  { id: 2, name: "Sunday" },
  { id: 3, name: "Monday" },
  { id: 4, name: "Tuesday" },
  { id: 5, name: "Wednesday" },
  { id: 6, name: "Thursday" },
  { id: 7, name: "Friday" },
];

const attendanceOptions = ["Disabled", "Overtime"];

const GeneralSettings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    initialValues: {
      weekly_holiday: [],
      fiscalyear_month: "",
      workingday_starts_at: "",
      holiday_as_workingday: false,
      consecutive_days_late_attendance_to_fine: "",
      consecutive_late_attendance_to_fine: "",
      fraction_of_daily_salary_for_halfday: "",
      max_working_hours_against_timesheet: "",
      consider_attendance_on_holidays: "",
      allow_overtime: false,
    },
  });

  const { data, error, isLoading, mutate } = useSWR(
    `/api/hrm_settings/get-generalsettings/`,
    fetcher,
    {
      errorRetryCount: 2,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (data) {
      form.setValues({
        weekly_holiday: data?.weekly_holiday?.day?.map((item) => item.id) || [],
        fiscalyear_month: data.fiscalyear_month || "",
        workingday_starts_at: data.workingday_starts_at || "",
        holiday_as_workingday: data.holiday_as_workingday || false,
        consecutive_days_late_attendance_to_fine:
          data.consecutive_days_late_attendance_to_fine || "",
        consecutive_late_attendance_to_fine:
          data.consecutive_late_attendance_to_fine || "",
        fraction_of_daily_salary_for_halfday:
          data.fraction_of_daily_salary_for_halfday || "",
        max_working_hours_against_timesheet:
          data.max_working_hours_against_timesheet || "",
        consider_attendance_on_holidays:
          data.consider_attendance_on_holidays || "",
        allow_overtime: data.allow_overtime || false,
      });
    }
  }, [data]);

  console.log(form.values);

  const handleCheckboxChange = (dayId) => {
    const currentWeeklyHoliday = form.values.weekly_holiday;
    const newWeeklyHoliday = currentWeeklyHoliday.includes(dayId)
      ? currentWeeklyHoliday.filter((id) => id !== dayId)
      : [...currentWeeklyHoliday, dayId];

    form.setValues({ weekly_holiday: newWeeklyHoliday });
  };

  const handleSubmit = async (values) => {
    const formattedValues = {
      ...values,
      workingday_starts_at: formatTime(values.workingday_starts_at),
    };

    setIsSubmitting(true);

    try {
      const response = await update(
        "/api/hrm_settings/update-generalsettings/3",
        formattedValues
      );

      if (response?.status === "success") {
        // console.log(response);
        setIsSubmitting(false);
        close();
        mutate();
        toast.success("Settings updated successfully!");
      } else {
        toast.error(
          response?.status === "error"
            ? response?.message[0]
            : "Error submitting form"
        );
      }
      setTimeout(() => {
        setIsSubmitting(false);
        mutate();
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setTimeout(() => {
        setIsSubmitting(false);
        mutate();
      }, 5000);
      toast.error("Failed to update settings.");
    }
  };

  const refTimeIn = useRef(null);
  const timeIn = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refTimeIn.current?.showPicker()}
    >
      <IoTimeOutline />
    </ActionIcon>
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Alert color="red">Failed to load settings</Alert>;
  }

  return (
    <>
      <Breadcrumb
        classNames={{
          root: "mb-4",
        }}
        title="General Settings"
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "General Settings" },
        ]}
      />

      <div className="itemCard">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Grid>
            <Grid.Col span={3}>
              <Select
                mb="sm"
                label="Fiscal Year Start from Month"
                placeholder="Pick value"
                required={true}
                disabled={isSubmitting}
                data={fiscalYearMonths}
                {...form.getInputProps("fiscalyear_month")}
              />
              <TimeInput
                mb="sm"
                label="Working Day Starts At"
                ref={refTimeIn}
                rightSection={timeIn}
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("workingday_starts_at")}
              />
              <NumberInput
                mb="sm"
                label="Number of consecutive late attendance to fine"
                placeholder="default 3"
                hideControls
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps(
                  "consecutive_days_late_attendance_to_fine"
                )}
              />
              <NumberInput
                mb="sm"
                label="Consecutive late attendance fine amount against the fraction of daily salary"
                placeholder="default 100%"
                hideControls
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("consecutive_late_attendance_to_fine")}
              />
              <div className="holidayBox mb-3">
                <p className="mb-1">Weekly Holidays</p>
                <div className="d-flex flex-wrap">
                  {weeklyHolidays.map((day) => (
                    <Checkbox
                      key={day.id}
                      me="lg"
                      mb="sm"
                      label={day.name}
                      disabled={isSubmitting}
                      checked={form.values.weekly_holiday.includes(day.id)}
                      onChange={() => handleCheckboxChange(day.id)}
                      // {...form.getInputProps('weekly_holiday', {
                      //   type: 'checkbox',
                      //   value: day.id,
                      // })}
                    />
                  ))}
                </div>
              </div>
            </Grid.Col>
            <Grid.Col span={3}>
              <NumberInput
                mb="sm"
                label="Fraction of Daily Salary for Half Day"
                placeholder="default 50%"
                hideControls
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("fraction_of_daily_salary_for_halfday")}
              />
              <NumberInput
                mb="sm"
                label="Max working hours against Timesheet"
                placeholder="default 8 hours"
                hideControls
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("max_working_hours_against_timesheet")}
              />
              <Select
                mb="sm"
                label="Consider Attendance on Holidays"
                placeholder="Pick value"
                required={true}
                disabled={isSubmitting}
                data={attendanceOptions}
                {...form.getInputProps("consider_attendance_on_holidays")}
              />
              <Checkbox
                mb="sm"
                label="Include Holidays as Working Days"
                disabled={isSubmitting}
                {...form.getInputProps("holiday_as_workingday", {
                  type: "checkbox",
                })}
              />
              <Checkbox
                mb="sm"
                label="Allow Overtime"
                disabled={isSubmitting}
                {...form.getInputProps("allow_overtime", { type: "checkbox" })}
              />
            </Grid.Col>
          </Grid>

          <Group>
            <Button
              mt="sm"
              type="submit"
              loading={isSubmitting}
              loaderProps={{ type: "dots" }}
            >
              Save
            </Button>
          </Group>
        </form>
      </div>
    </>
  );
};

export default GeneralSettings;
