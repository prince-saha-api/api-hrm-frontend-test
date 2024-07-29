"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
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
import {
   formatDate,
   getDate,
   getTime,
   getStoragePath,
} from "../../../lib/helper";

import { Popover, Button, Select, Input, Menu, Breadcrumbs, Anchor } from "@mantine/core";

import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

import { exportToPDF, exportToExcel, exportToCSV } from "../../../lib/export";

const PAGE_SIZES = [10, 20, 30, 40];

const Employees = () => {
   const [currentPage, setCurrentPage] = useState(1);
   const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
   const [sortStatus, setSortStatus] = useState({
      columnAccessor: "username",
      direction: "asc", // desc
   });

   const {
      data: apiData,
      error,
      isValidating,
      isLoading,
      mutate,
   } = useSWR(
      `/employee/?page=${currentPage}&page_size=${pageSize}&column_accessor=${sortStatus.columnAccessor}&direction=${sortStatus.direction}`,
      fetcher,
      {
         errorRetryCount: 2,
         keepPreviousData: true,
      }
   );

   const [selectedRecords, setSelectedRecords] = useState([]);

   const handleSortStatusChange = (status) => {
      console.log(status);
      setCurrentPage(1);
      setSortStatus(status);
      console.log(sortStatus);
   };

   const handlePageChange = (newPage) => {
      if (newPage >= 1) {
         setCurrentPage(newPage);
      }
   };

   const handlePageSizeChange = (newPageSize) => {
      setPageSize(newPageSize);
      setCurrentPage(1);
      mutate();
   };

   const [displayedData, setDisplayedData] = useState([]);

   useEffect(() => {
      if (!isLoading && !error) {
         setDisplayedData(apiData?.results || []);
         console.log(apiData?.results);
      }
   }, [isLoading, isValidating]);

   const [uploadedFiles, setUploadedFiles] = useState([]);
   const [isUploading, setIsUploading] = useState(false);
   const [uploadingSuccess, setUploadingSuccess] = useState("");
   const [validationError, setValidationError] = useState(null);

   const handleFileChange = (event) => {
      setValidationError(null);
      const files = event.target.files;
      // Convert files to an array
      const filesArray = Array.from(files);
      setUploadedFiles(filesArray);
   };

   const validateFiles = () => {
      let valid = true;
      const newErrors = {};

      // Basic validation: Check if exactly two files are selected
      if (uploadedFiles.length !== 2) {
         setValidationError(
            "Please select exactly two files: 'zip_file.zip' and 'csv_file.csv'."
         );
         valid = false;
         return valid;
      }

      // Validate file names
      const fileNames = uploadedFiles.map((file) => file.name);
      const requiredFileNames = ["zip_file.zip", "csv_file.csv"];

      for (const requiredFileName of requiredFileNames) {
         if (!fileNames.includes(requiredFileName)) {
            setValidationError(`Missing required file: ${requiredFileName}`);
            valid = false;
            break;

            // return valid;
         }
      }

      return valid;
   };

   const handleFileSubmit = async (e) => {
      e.preventDefault();
      setUploadingSuccess("");

      const valid = validateFiles();

      if (!valid) {
         toast.error(validationError);
         return;
      }

      if (valid) {
         setIsUploading(true);

         const formData = new FormData();

         uploadedFiles.forEach((file) => {
            const key = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
            formData.append(key, file);
         });

         // console.log("Form data", formData);

         // return;

         const response = await submit("/employee_csv/", formData, true);

         console.log(response);
         setIsUploading(false);
         // return;

         if (response?.uploaded) {
            toast.success("CSV and ZIP uploaded successfully");
            // setSuccess("Employee created successfully");
            // setIsLoading(false);
            // setErrors({});
            // setFormValues(initialValues);
         } else {
            toast.error(response?.message || "Something went wrong!");
            // setSuccess("Something went wrong!");
            // setIsLoading(false);
            // setErrors({});
            // setFormValues(initialValues);
         }
      }
   };

   // file download
   const handleExportToPDF = async () => {
      // console.log(displayedData);
      // return;
      const headers = [
         "Employee ID",
         "Employee Name",
         "Designation",
         "Group",
         "Department",
         "Shift",
         "Status",
      ];

      const data = displayedData.map((item) => ({
         ID: item.employee_id,
         username: item.username,
         Designation: item?.designation_name || "N/A",
         Group: item?.group_name || "N/A",
         Department: item?.department_name || "N/A",
         Shift: item?.shift_name || "N/A",
         Status: item?.is_active ? "Active" : "Inactive",
      }));

      exportToPDF(headers, data, "employee");
   };

   const handleExportToCSV = () => {
      const data = displayedData.map((item) => ({
         "Employee ID": item.employee_id,
         "Employee Name": item.username,
         Designation: item?.designation_name || "N/A",
         Group: item?.group_name || "N/A",
         Department: item?.department_name || "N/A",
         Shift: item?.shift_name || "N/A",
         Status: item?.is_active ? "Active" : "Inactive",
      }));

      exportToCSV(data, "employee");
   };

   const handleExportToExcel = () => {
      const data = displayedData.map((item) => ({
         "Employee ID": item.employee_id,
         "Employee Name": item.username,
         Designation: item?.designation_name || "N/A",
         Group: item?.group_name || "N/A",
         Department: item?.department_name || "N/A",
         Shift: item?.shift_name || "N/A",
         Status: item?.is_active ? "Active" : "Inactive",
      }));

      exportToExcel(data, "employee");
   };

   const items = [
      { title: "Dashboard", href: "/" },
      { title: "Basic Setup", href: "#" },
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
      <div className="pageTop mb-4">
            <h3>Basic info</h3>
            <Breadcrumbs>{items}</Breadcrumbs>
         </div>
         <div className="filterBox mb-3">
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
                        "React",
                        "Angular",
                        "Vue",
                        "Svelte",
                        "Reactg",
                        "Ankgular",
                        "Vjue",
                        "Other-1",
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
            <Button variant="filled" size="md">
               Search
            </Button>
         </div>
         <div className="search_part mb-3">
            <div className="d-flex justify-content-between">
               <form className="" onSubmit={handleFileSubmit}>
                  <div className="d-flex align-items-center">
                     <Input leftSection={icon} size="md" placeholder="Search" />
                     {/* <div className="ms-2 d-flex align-items-center">
                           <a
                              className="me-2"
                              href="/csv_file.csv"
                              download="csv_file.csv"
                           >
                              Sample CSV
                           </a>
                           <a href="/zip_file.zip" download="zip_file.zip">
                              Sample ZIP
                           </a>
                        </div> */}
                  </div>
               </form>

               <div className="d-flex justify-content-between">
                  <div className="me-2">
                     <Button
                        type="submit"
                        className="rounded-1 px-3 btn btn-success border-0"
                        onClick={() => handleExportToPDF()}
                     >
                        <AiOutlineFilePdf className="me-1" />
                        PDF
                     </Button>
                  </div>
                  <div className="me-2">
                     <Button
                        type="submit"
                        className="rounded-1 px-3 btn btn-success border-0"
                        onClick={() => handleExportToCSV()}
                     >
                        <FaRegFileAlt className="me-1" />
                        CSV
                     </Button>
                  </div>
                  <div>
                     <Button
                        type="submit"
                        className="rounded-1 px-3 btn btn-success border-0"
                        onClick={() => handleExportToExcel()}
                     >
                        <RiFileExcel2Line className="me-1" />
                        Excel
                     </Button>
                  </div>
               </div>
            </div>
         </div>

         <div className="itemCard datatable-wrapper">
            <DataTable
               style={{
                  height: apiData?.results?.length === 0 ? "300px" : "auto",
               }}
               className="datatable"
               // withTableBorder
               // withColumnBorders
               // striped
               highlightOnHover
               horizontalSpacing="sm"
               verticalSpacing="sm"
               fz="sm"
               verticalAlign="center"
               columns={[
                  {
                     title: "SL",
                     accessor: "na",
                     noWrap: true,
                     sortable: false,
                     render: (_, index) =>
                        (currentPage - 1) * pageSize + index + 1,
                  },
                  {
                     accessor: "image",
                     title: "Image",
                     sortable: false,
                     render: ({ image }) => (
                        <div className="text-center">
                           <img
                              src={getStoragePath(image)}
                              alt=""
                              className="table_user_img"
                           />
                        </div>
                     ),
                  },
                  {
                     accessor: "employee_id",
                     title: "Employee ID",
                     noWrap: true,
                     sortable: true,
                  },
                  {
                     accessor: "username",
                     title: "Employee Name",
                     sortable: true,
                     // visibleMediaQuery: aboveXs,
                  },
                  {
                     accessor: "designation_name",
                     title: "Designation",
                     noWrap: true,
                     // visibleMediaQuery: aboveXs,
                     render: ({ designation_name }) =>
                        designation_name || "N/A",
                  },
                  {
                     accessor: "group_name",
                     title: "Group",
                     // visibleMediaQuery: aboveXs,
                     render: ({ group_name }) => group_name || "N/A",
                  },
                  {
                     accessor: "department_name",
                     title: "Department",
                     // visibleMediaQuery: aboveXs,
                     render: ({ department_name }) => department_name || "N/A",
                  },
                  {
                     accessor: "shift_name",
                     title: "Shift",
                     // visibleMediaQuery: aboveXs,
                     render: ({ shift_name }) => shift_name || "N/A",
                  },
                  {
                     accessor: "is_active",
                     title: "Status",
                     // visibleMediaQuery: aboveXs,
                     render: ({ is_active }) =>
                        is_active ? "Active" : "Inactive",
                  },
                  {
                     accessor: "actions",
                     title: "Actions",
                     // width: "0%",
                     render: (item) => (
                        <EditEmployee
                           employee={item}
                           setData={setDisplayedData}
                        />
                     ),
                  },
               ]}
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
               recordsPerPageOptions={PAGE_SIZES}
               onRecordsPerPageChange={setPageSize}
               // rowExpansion={rowExpansion}
               // onRowContextMenu={handleContextMenu}
               // onScroll={hideContextMenu}
            />
         </div>
      </>
   );
};

export default Employees;
