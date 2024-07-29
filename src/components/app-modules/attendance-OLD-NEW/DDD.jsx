"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
// import Button from "react-bootstrap/Button";
import EditEmployee from "./EditEmployee";
import Spinner from "react-bootstrap/Spinner";
import { Row, Col } from "react-bootstrap";
import classEase from "classease";
import { toast } from "react-toastify";
import { DataTable } from "mantine-datatable";
import { submit } from "../../../lib/submit";
import { fetcher } from "../../../lib/fetch";
import { AiOutlineFilePdf } from "react-icons/ai";
import { FaRegFileAlt } from "react-icons/fa";
import { RiFileExcel2Line } from "react-icons/ri";
import { LuPlus } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
   formatDate,
   getDate,
   getTime,
   getStoragePath,
   convertMinutesToHoursAndMinutes
} from "../../../lib/helper";

import {
   Popover,
   Button,
   Select,
   Input,
   Menu,
   Breadcrumbs,
   Anchor,
   Badge,
   NavLink,
   MultiSelect
} from "@mantine/core";

import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

import { exportToPDF, exportToExcel, exportToCSV } from "../../../lib/export";
import { constants } from "@/lib/config";

const { PAGE_SIZES } = constants;



const Employees = () => {
   const [currentPage, setCurrentPage] = useState(1);
   const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
   const [sortStatus, setSortStatus] = useState({
      columnAccessor: "date",
      direction: "asc", // desc
   });

   const [formValues, setFormValues] = useState({
    group_id: "",
    department_id: "",
    designation_id: "",
    year: "",
    month: "",
    employee_id: "",
  });

   const [formData, setFormData] = useState({
    group_id: "",
    department_id: "",
    designation_id: "",
    year: "2024",
    month: "",
    employee_id: "",
  });

  const [selectFormValues, setSelectFormValues] = useState({
    group_id: "",
    department_id: "",
    designation_id: "",
    year: "",
    month: "",
  });

  const [errors, setErrors] = useState({});

   let apiUrl = `/attendance_log/?permanent=${true}&employee_id=${
    formData.employee_id
  }&group_id=${formData.group_id}&department_id=${
    formData.department_id
  }&designation_id=${
    formData.designation_id
  }&page=${currentPage}&page_size=${pageSize}&column_accessor=${
    sortStatus.columnAccessor
  }&direction=${sortStatus.direction}`;

  if (formData.year || formData.month) {
    apiUrl += `&date=${formData.year}-${formData.month}`;
  }

   const {
      data: apiData,
      error,
      isValidating,
      isLoading,
      mutate,
   } = useSWR(
    apiUrl,
      fetcher,
      {
         errorRetryCount: 2,
         keepPreviousData: true,
      }
   );



   const handleSortStatusChange = (status) => {
      console.log(status);
      setCurrentPage(1);
      setSortStatus(status);
      console.log(sortStatus);
   };

   const {
    data: groupsData,
    error: groupsFetchError,
    isLoading: groupsFetchIsLoading,
  } = useSWR(`/empgrp/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const groups = groupsData?.map((item) => ({
    name: "group_id",
    label: item.group_name,
    value: item.group_id,
  }));

  const {
    data: departmentData,
    error: departmentFetchError,
    isLoading: departmentFetchIsLoading,
  } = useSWR(`/department/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const departments = departmentData?.map((item) => ({
    name: "department_id",
    label: item.department,
    value: item.id,
  }));

  const {
    data: designationsData,
    error: designationsFetchError,
    isLoading: designationsFetchIsLoading,
  } = useSWR(`/designation/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const designations = designationsData?.map((item) => ({
    name: "designation_id",
    label: item.designation,
    value: item.id,
  }));

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2015;
    const years = [];

    for (let year = currentYear; year >= startYear; year--) {
      years.push({
        name: "year",
        label: year.toString(),
        value: year,
      });
    }

    return years;
  };

  const years = generateYears();

  const months = [
    { name: "month", label: "Select Month", value: null },
    { name: "month", label: "January", value: "01" },
    { name: "month", label: "February", value: "02" },
    { name: "month", label: "March", value: "03" },
    { name: "month", label: "April", value: "04" },
    { name: "month", label: "May", value: "05" },
    { name: "month", label: "June", value: "06" },
    { name: "month", label: "July", value: "07" },
    { name: "month", label: "August", value: "08" },
    { name: "month", label: "September", value: "09" },
    { name: "month", label: "October", value: "10" },
    { name: "month", label: "November", value: "11" },
    { name: "month", label: "December", value: "12" },
  ];

  const handleSelectChange = async (selectedOption, key) => {
    setSuccess("");

    // when cleared
    if (!selectedOption || !selectedOption.value) {
      setErrors({
        ...errors,
        [key]: "",
      });

      setFormValues((prev) => ({
        ...prev,
        [key]: "",
      }));

      setSelectFormValues((prev) => ({
        ...prev,
        [key]: "",
      }));
      return;
    }

    const { name, value } = selectedOption;

    console.log(name, value);

    setErrors({
      ...errors,
      [name]: "",
    });

    setFormValues((prev) => ({
      ...prev,
      [name]: String(value),
    }));

    setSelectFormValues((prev) => ({
      ...prev,
      [name]: selectedOption,
    }));

    console.log(formValues);
    return;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const isFormEmpty = Object.values(formValues).every(
      (value) => value === ""
    );
    // if (isFormEmpty) return;
    if (isFormEmpty) {
      setSortStatus({
        columnAccessor: "InTime",
        direction: "desc",
      });
    }

    setCurrentPage(1);

    setSuccess("");
    console.log(formValues);
    setFormData(formValues);
    setIsSubmitLoading(true);
    setFormSubmitted(true);
  };

  //  const handlePageChange = (newPage) => {
  //     if (newPage >= 1) {
  //        setCurrentPage(newPage);
  //     }
  //  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    mutate();
  };






   const [selectedRecords, setSelectedRecords] = useState([]);









  const columns = [
    {
      // for table
      title: "#",
      accessor: "na",
      noWrap: true,
      sortable: false,
      render: (_, index) => (currentPage - 1) * pageSize + index + 1,
      // for export
      key: "title",
      modifier: (_, index) => index + 1,
    },
    {
      // for table
      accessor: "employee_id",
      title: "Employee ID",
      sortable: true,
      // for export
      key: "employee_id",
    },
    {
      // for table
      accessor: "username",
      title: "Employee Name",
      noWrap: true,
      sortable: true,
      // for export
      key: "username",
    },
    {
      // for table
      accessor: "group_id",
      title: "Group",
      render: ({ group_name }) => group_name,
      // for export
      key: "group_name",
    },
    {
      // for table
      accessor: "department_name",
      title: "Department",
      // for export
      key: "department_name",
    },
    {
      // for table
      accessor: "designation_name",
      title: "Designation",
      // for export
      key: "designation_name",
    },
    {
      // for table
      accessor: "InTime",
      title: "In Time",
      noWrap: true,
      render: ({ InTime, late_minutes }) => (
        <span className={late_minutes > 0 && "text-danger"}>
          {getTime(InTime)}
        </span>
      ),
      // for export
      key: "InTime",
      modifier: ({ InTime, late_minutes }) => getTime(InTime),
      pdfModifier: ({ InTime, late_minutes }) =>
        late_minutes > 0
          ? "is_text_danger_" + getTime(InTime)
          : getTime(InTime),
    },
    {
      // for table
      accessor: "OutTime",
      title: "Out Time",
      render: ({ InTime, OutTime }) =>
        !OutTime || InTime === OutTime ? "N/A" : getTime(OutTime),
      // for export
      key: "OutTime",
      modifier: ({ InTime, OutTime }) =>
        !OutTime || InTime === OutTime ? "N/A" : getTime(OutTime),
    },
    {
      // for table
      accessor: "total_work_minutes",
      title: "Working Time (hh:mm)",
      render: ({ total_work_minutes }) =>
        !total_work_minutes
          ? "N/A"
          : convertMinutesToHoursAndMinutes(total_work_minutes),
      // for export
      key: "total_work_minutes",
      modifier: ({ total_work_minutes }) =>
        !total_work_minutes
          ? "N/A"
          : convertMinutesToHoursAndMinutes(total_work_minutes),
    },
    {
      // for table
      accessor: "date",
      title: "Date",
      sortable: true,
      render: ({ date }) => getDate(date),
      // for export
      key: "date",
      modifier: ({ date }) => getDate(date),
    },
    {
      // for table
      accessor: "device_id",
      title: "Device ID",
      // for export
      key: "device_id",
    },
    {
      // for table
      accessor: "shift_name",
      title: "Shift",
      // for export
      key: "shift_name",
    },
    {
      // for table
      accessor: "shift_tardiness_minutes",
      title: "Shift Tardiness Minutes",
      // for export
      key: "shift_tardiness_minutes",
    },
  ];

  const visibleColumns = [
    {
      label: "Serial",
      value: "title",
    },
    {
      label: "Employee ID",
      value: "employee_id",
    },
    {
      label: "Employee Name",
      value: "username",
    },
    {
      label: "Group",
      value: "group_name",
    },
    {
      label: "Department",
      value: "department_name",
    },
    {
      label: "Designation",
      value: "designation_name",
    },
    {
      label: "In Time",
      value: "InTime",
    },
    {
      label: "Out Time",
      value: "OutTime",
    },
    {
      label: "Working Time",
      value: "total_work_minutes",
    },
    {
      label: "Date",
      value: "date",
    },
    {
      label: "Device ID",
      value: "device_id",
    },
    {
      label: "Shift",
      value: "shift_name",
    },
    {
      label: "Shift Tardiness Minutes",
      value: "shift_tardiness_minutes",
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState([
    "title",
    "employee_id",
    "username",
    "InTime",
    "OutTime",
    "date",
  ]);

  const handleChange = (keys) => {
    const updatedKeys = [
      ...new Set(["title", "employee_id", "username", ...keys]),
    ]; // Ensure "title", "employee_id", and "username" are always included

    // Preserve the order of selectedOptions as per visibleColumns
    const reorderedOptions = visibleColumns.filter((column) =>
      updatedKeys.includes(column.value)
    );

    setSelectedOptions(reorderedOptions.map((column) => column.value));
    // setSelectedOptions(updatedKeys);
  };

  // file export
  const [isExportDataFetching, setIsExportDataFetching] = useState({
    pdf: false,
    csv: false,
    excel: false,
  });

  const [dataToExport, setDataToExport] = useState(null);

  const getExportDataUrl = () => {
    let url = `/attendance_log/?permanent=${true}&employee_id=${
      formData.employee_id
    }&group_id=${formData.group_id}&department_id=${
      formData.department_id
    }&designation_id=${formData.designation_id}&column_accessor=${
      sortStatus.columnAccessor
    }&direction=${sortStatus.direction}`;

    if (formData.year || formData.month) {
      url += `&date=${formData.year}-${formData.month}`;
    }

    return url;
  };

  const handleExportToPDF = async (e) => {
    e.preventDefault();
    setIsExportDataFetching((prev) => ({
      ...prev,
      pdf: true,
    }));

    try {
      // let exportedData = dataToExport; // Use cached data if available
      let exportedData = null;

      if (!exportedData) {
        const url = getExportDataUrl();
        const response = await getData(url);
        // console.log(response?.data?.results);
        // return;
        exportedData = response?.data?.results;
        // Cache the data
        setDataToExport(exportedData);
      }

      // const headers = [
      //   "Employee ID",
      //   "Employee Name",
      //   "In Time",
      //   "Out Time",
      //   "Date",
      // ];

      // const data = exportedData.map((item) => ({
      //   ID: item.employee_id,
      //   username: item.username,
      //   InTime: getTime(item.InTime),
      //   OutTime: getTime(item.OutTime),
      //   Date: getDate(item.InTime),
      // }));

      const headers = selectedOptions.map((columnKey) => {
        const selectedColumn = columns.find(
          (column) => column.key === columnKey
        );
        return selectedColumn ? selectedColumn.title : "";
      });

      const data = exportedData.map((item, index) => {
        const rowData = {};
        selectedOptions.forEach((columnKey) => {
          const selectedColumn = columns.find(
            (column) => column.key === columnKey
          );
          const pdfModifier = selectedColumn?.pdfModifier;
          const columnModifier = selectedColumn?.modifier;
          rowData[columnKey] = pdfModifier
            ? pdfModifier(item, index)
            : columnModifier
            ? columnModifier(item, index)
            : item[columnKey] ?? "";
        });
        return rowData;
      });

      setTimeout(() => {
        exportToPDF(headers, data, "Attendance Report", "attendance-report");
        setIsExportDataFetching((prev) => ({
          ...prev,
          pdf: false,
        }));
      }, 1000);
    } catch (error) {
      console.error("Error exporting data to PDF:", error);
      // Handle error
      setTimeout(() => {
        setIsExportDataFetching((prev) => ({
          ...prev,
          pdf: false,
        }));
        toast.error("Failed to export!");
      }, 1000);
    }
  };

  const handleExportToCSV = async (e) => {
    e.preventDefault();
    setIsExportDataFetching((prev) => ({
      ...prev,
      csv: true,
    }));

    try {
      // let exportedData = dataToExport; // Use cached data if available
      let exportedData = null;

      if (!exportedData) {
        const url = getExportDataUrl();
        const response = await getData(url);
        exportedData = response?.data?.results;
        // Cache the data
        setDataToExport(exportedData);
      }

      // const data = exportedData.map((item) => ({
      //   "Employee ID": item.employee_id,
      //   "Employee Name": item.username,
      //   "In Time": getTime(item.InTime),
      //   "Out Time": getTime(item.OutTime),
      //   Date: getDate(item.date),
      // }));

      const data = exportedData.map((item, index) => {
        const rowData = {};
        selectedOptions.forEach((columnKey) => {
          const selectedColumn = columns.find(
            (column) => column.key === columnKey
          );
          const columnModifier = selectedColumn?.modifier;
          rowData[selectedColumn.title] = columnModifier
            ? columnModifier(item, index)
            : item[columnKey] ?? "";
        });
        return rowData;
      });

      setTimeout(() => {
        exportToCSV(data, "attendance-report");
        setIsExportDataFetching((prev) => ({
          ...prev,
          csv: false,
        }));
      }, 1000);
    } catch (error) {
      console.error("Error exporting data to CSV:", error);
      setTimeout(() => {
        setIsExportDataFetching((prev) => ({
          ...prev,
          csv: false,
        }));
        toast.error("Failed to export!");
      }, 1000);
    }
  };

  const handleExportToExcel = async (e) => {
    e.preventDefault();
    setIsExportDataFetching((prev) => ({
      ...prev,
      excel: true,
    }));

    try {
      // let exportedData = dataToExport; // Use cached data if available
      let exportedData = null;

      if (!exportedData) {
        const url = getExportDataUrl();
        const response = await getData(url);
        exportedData = response?.data?.results;
        // Cache the data
        setDataToExport(exportedData);
      }

      // const data = exportedData.map((item) => ({
      //   "Employee ID": item.employee_id,
      //   "Employee Name": item.username,
      //   "In Time": getTime(item.InTime),
      //   "Out Time": getTime(item.OutTime),
      //   Date: getDate(item.InTime),
      // }));

      const data = exportedData.map((item, index) => {
        const rowData = {};
        selectedOptions.forEach((columnKey) => {
          const selectedColumn = columns.find(
            (column) => column.key === columnKey
          );
          const columnModifier = selectedColumn?.modifier;
          rowData[selectedColumn.title] = columnModifier
            ? columnModifier(item, index)
            : item[columnKey] ?? "";
        });
        return rowData;
      });

      setTimeout(() => {
        exportToExcel(data, "attendance-report");
        setIsExportDataFetching((prev) => ({
          ...prev,
          excel: false,
        }));
      }, 1000);
    } catch (error) {
      console.error("Error exporting data to Excel:", error);
      setTimeout(() => {
        setIsExportDataFetching((prev) => ({
          ...prev,
          excel: false,
        }));
        toast.error("Failed to export!");
      }, 1000);
    }
  };




   const items = [
      { title: "Dashboard", href: "/" },
      { title: "Attendance Report", href: "#" },
   ].map((item, index) => (
      <Anchor href={item.href} key={index}>
         {item.title}
      </Anchor>
   ));

   const [open1, setOpen1] = useState(false);
   const [item1, setItem1] = useState("Designation");

   const [item2, setItem2] = useState("Group");
   const [item3, setItem3] = useState("Department");
   const [item4, setItem4] = useState("Shift");
   const icon = <CiSearch />;

   return (
      <>
         <div className="mb-4 d-flex justify-content-between align-items-end">
            <div className="pageTop">
               <h3>Attendance Report</h3>
               <Breadcrumbs>{items}</Breadcrumbs>
            </div>


         </div>



         <div className="d-flex justify-content-between mb-3">




         </div>

         <div className="filterBox mb-4 d-flex align-items-center">
            <Popover
               classNames={{
                  dropdown: "filterDropdown",
               }}
               width={400}
               position="bottom-start"
               offset={5}
               shadow="md"
               opened={open1}
            >
               <Popover.Target onClick={() => setOpen1((prev) => !prev)}>
                  <Button
                     classNames={{
                        root: "filterNav",
                     }}
                  >
                     {item1} <IoIosArrowDown className="ms-1" />
                  </Button>
               </Popover.Target>
               <Popover.Dropdown>
                  <p className="p-2 mb-0">Designation</p>
                  <Select
                     leftSectionPointerEvents="none"
                     leftSection={icon}
                     nothingFoundMessage="Nothing found..."
                     classNames={{
                        dropdown: "selectFilter",
                     }}
                     onChange={(value, option) => {
                        console.log(value);
                        setItem1(value);
                        setOpen1(false);
                     }}
                     clearable={true}
                     dropdownOpened={open}
                     withScrollArea={true}
                     searchable
                     placeholder="Search"
                     data={[
                        "Front-end developer",
                        "Back-end developer",
                        "Vue",
                        "Svelte",
                        "Other-2",
                        "Other-3",
                        "Some text here",
                     ]}
                     comboboxProps={{
                        withinPortal: false,
                     }}
                  />
               </Popover.Dropdown>
            </Popover>

            <Menu width={200} shadow="md" position="bottom-start" offset={5}>
               <Menu.Target>
                  <Button
                     classNames={{
                        root: "filterNav",
                     }}
                  >
                     {item2} <IoIosArrowDown className="ms-1" />
                  </Button>
               </Menu.Target>

               <Menu.Dropdown className="p-2">
                  <p className="p-2 mb-0 border-bottom mb-1">Group</p>
                  <Menu.Item
                     onClick={(e) => {
                        e.preventDefault();
                        setItem2("Group_01");
                     }}
                  >
                     Group_01
                  </Menu.Item>
                  <Menu.Item
                     onClick={(e) => {
                        e.preventDefault();
                        setItem2("Group_02");
                     }}
                  >
                     Group_02
                  </Menu.Item>
                  <Menu.Item
                     onClick={(e) => {
                        e.preventDefault();
                        setItem2("Group_03");
                     }}
                  >
                     Group_03
                  </Menu.Item>
                  <Menu.Item
                     onClick={(e) => {
                        e.preventDefault();
                        setItem2("Group_04");
                     }}
                  >
                     Group_04
                  </Menu.Item>
               </Menu.Dropdown>
            </Menu>
            <Menu width={200} shadow="md" position="bottom-start" offset={5}>
               <Menu.Target>
                  <Button
                     classNames={{
                        root: "filterNav",
                     }}
                  >
                     {item3} <IoIosArrowDown className="ms-1" />
                  </Button>
               </Menu.Target>

               <Menu.Dropdown className="p-2">
                  <p className="p-2 mb-0 border-bottom mb-1">Department</p>
                  <Menu.Item
                     onClick={(e) => {
                        e.preventDefault();
                        setItem3("Department_01");
                     }}
                  >
                     Department_01
                  </Menu.Item>
                  <Menu.Item
                     onClick={(e) => {
                        e.preventDefault();
                        setItem3("Department_02");
                     }}
                  >
                     Department_02
                  </Menu.Item>
                  <Menu.Item
                     onClick={(e) => {
                        e.preventDefault();
                        setItem3("Department_03");
                     }}
                  >
                     Department_03
                  </Menu.Item>
               </Menu.Dropdown>
            </Menu>
            <Menu width={200} shadow="md" position="bottom-start" offset={5}>
               <Menu.Target>
                  <Button
                     classNames={{
                        root: "filterNav",
                     }}
                  >
                     {item4} <IoIosArrowDown className="ms-1" />
                  </Button>
               </Menu.Target>

               <Menu.Dropdown className="p-2">
                  <p className="p-2 mb-0 border-bottom mb-1">Shift</p>
                  <Menu.Item
                     onClick={(e) => {
                        e.preventDefault();
                        setItem4("Shift_01");
                     }}
                  >
                     Shift_01
                  </Menu.Item>
                  <Menu.Item
                     onClick={(e) => {
                        e.preventDefault();
                        setItem4("Shift_02");
                     }}
                  >
                     Shift_02
                  </Menu.Item>
                  <Menu.Item
                     onClick={(e) => {
                        e.preventDefault();
                        setItem4("Shift_03");
                     }}
                  >
                     Shift_03
                  </Menu.Item>
                  <Menu.Item
                     onClick={(e) => {
                        e.preventDefault();
                        setItem4("Shift_04");
                     }}
                  >
                     Shift_04
                  </Menu.Item>
               </Menu.Dropdown>
            </Menu>
            <Input
               classNames={{
                  input: "searchBtn",
               }}
               size="sm"
               placeholder="Employee name or ID"
            />

            <Button className="ms-3" variant="filled" size="sm">
               Filter
            </Button>
         </div>

         <div className="d-flex justify-content-between mb-3">
            <div className="showItem d-flex align-items-center justify-content-start">
            <p className="mb-0 me-2">Show</p>
            <Select
            withCheckIcon={false}
            classNames={{
               input: 'showInput',
             }}
               placeholder="Pick value"
               data={["10", "20", "30", "50"]}
               defaultValue="10"
            />
            <p className="mb-0 ms-2 me-2">Entries</p>

            <Popover
                classNames={{
                  dropdown: "column_visibility_dropdown",
                }}
                width={0}
                shadow="md"
                position="bottom-start"
                offset={0}
              >
                <Popover.Target>
                  <Button
                    variant="default"
                    rightSection={<MdKeyboardArrowDown size={20} />}
                    classNames={{
                      root: "column_visibility_btn",
                      section: "column_visibility_btn_section",
                    }}
                  >
                    Visible Columns
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <MultiSelect
                    classNames={{
                      root: "column_visibility_root",
                      label: "column_visibility_label",
                      input: "column_visibility_input",
                    }}
                    label=""
                    placeholder="Pick values"
                    rightSection={<></>}
                    data={visibleColumns}
                    value={selectedOptions}
                    onChange={handleChange}
                    dropdownOpened={true}
                    comboboxProps={{ withinPortal: false }}
                  />
                </Popover.Dropdown>
              </Popover>


            </div>




            <div className="downItem d-flex">
               <div className="me-2">
                  <Button
                     type="submit"
                     className="rounded-1 px-3 btn btn-success border-0"
                     onClick={(e) => handleExportToPDF(e)}
                  >
                     <AiOutlineFilePdf className="me-1" />
                     PDF
                  </Button>
               </div>
               <div className="me-2">
                  <Button
                     type="submit"
                     className="rounded-1 px-3 btn btn-success border-0"
                     onClick={(e) => handleExportToCSV(e)}
                  >
                     <FaRegFileAlt className="me-1" />
                     CSV
                  </Button>
               </div>
               <div>
                  <Button
                     variant="filled"
                     size="sm"
                     className="px-3"
                     onClick={(e) => handleExportToExcel(e)}
                  >
                     <RiFileExcel2Line className="me-1" />
                     Excel
                  </Button>
               </div>
            </div>
         </div>

         <div className="itemCard p-0 datatable-wrapper">
            <DataTable
               style={{
                  height: apiData?.results?.length === 0 ? "300px" : "auto",
               }}
               classNames={{
                  root: "datatable",
                  table: "datatable_table",
                  header: "datatable_header",
                  pagination: "datatable_pagination",
               }}
               // borderColor="#e0e6ed66"
               // rowBorderColor="#e0e6ed66"
               // c={{ dark: "#ffffff", light: "#0E1726" }}
               // highlightOnHover
               horizontalSpacing="sm"
               verticalSpacing="sm"
               fz="sm"
               verticalAlign="center"
               idAccessor="ID"
               striped
              //  columns={[
              //     {
              //        title: "SL",
              //        accessor: "na",
              //        noWrap: true,
              //        sortable: false,
              //        render: (_, index) =>
              //           (currentPage - 1) * pageSize + index + 1,
              //     },
              //     {
              //        accessor: "image",
              //        title: "Image",
              //        sortable: false,
              //        render: ({ image }) => (
              //           <div className="text-center">
              //              <img
              //                 src={getStoragePath(image)}
              //                 alt="img"
              //                 className="table_user_img"
              //              />
              //           </div>
              //        ),
              //     },
              //     {
              //        accessor: "employee_id",
              //        title: "Employee ID",
              //        noWrap: true,
              //        sortable: true,
              //     },
              //     {
              //        accessor: "username",
              //        title: "Employee Name",
              //        sortable: true,
              //        // visibleMediaQuery: aboveXs,
              //     },
              //     {
              //        accessor: "designation_name",
              //        title: "Designation",
              //        noWrap: true,
              //        // visibleMediaQuery: aboveXs,
              //        render: ({ designation_name }) =>
              //           designation_name || "N/A",
              //     },
              //     {
              //        accessor: "group_name",
              //        title: "Group",
              //        // visibleMediaQuery: aboveXs,
              //        render: ({ group_name }) => group_name || "N/A",
              //     },
              //     {
              //        accessor: "department_name",
              //        title: "Department",
              //        // visibleMediaQuery: aboveXs,
              //        render: ({ department_name }) => department_name || "N/A",
              //     },
              //     {
              //        accessor: "shift_name",
              //        title: "Shift",
              //        // visibleMediaQuery: aboveXs,
              //        render: ({ shift_name }) => shift_name || "N/A",
              //     },
              //     {
              //        accessor: "is_active",
              //        title: "Status",
              //        // visibleMediaQuery: aboveXs,
              //        render: ({ is_active }) =>
              //           is_active ? "Active" : "Inactive",
              //     },
              //     {
              //        accessor: "actions",
              //        title: "Actions",
              //        // width: "0%",
              //        render: (item) => (
              //           <EditEmployee
              //              employee={item}
              //              setData={setDisplayedData}
              //           />
              //        ),
              //     },
              //  ]}
              columns={columns.filter((column) =>
                selectedOptions.includes(column.key)
              )}
               fetching={isLoading}
               records={apiData?.results || []}
               page={currentPage}
               onPageChange={setCurrentPage}
               totalRecords={apiData?.count}
               recordsPerPage={pageSize}
               sortStatus={sortStatus}
               onSortStatusChange={handleSortStatusChange}
               selectedRecords={selectedRecords}
               onSelectedRecordsChange={setSelectedRecords}
               // recordsPerPageOptions={PAGE_SIZES}
               // onRecordsPerPageChange={setPageSize}
               // rowExpansion={rowExpansion}
               // onRowContextMenu={handleContextMenu}
               // onScroll={hideContextMenu}
            />
         </div>
      </>
   );
};

export default Employees;
