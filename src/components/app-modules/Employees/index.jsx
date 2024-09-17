"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
import { Button, Select, Menu, MultiSelect, Popover } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import classEase from "classease";
import { AiOutlineFilePdf, AiOutlineDelete } from "react-icons/ai";
import { FaRegFileAlt } from "react-icons/fa";
import { RiFileExcel2Line } from "react-icons/ri";
import { LuPlus } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { fetcher, getData } from "@/lib/fetch";
import { exportToPDF, exportToExcel, exportToCSV } from "@/lib/export";
import { constants } from "@/lib/config";
import { getStoragePath, generateGroupString, getFullName } from "@/lib/helper";
import Breadcrumb from "@/components/utils/Breadcrumb";
import FilterModal from "@/components/utils/EmployeeFilterModal";

const PAGE_SIZES = constants.PAGE_SIZES;

const Employees = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "username",
    direction: "asc", // desc
  });

  const [filterData, setFilterData] = useState(null);

  let apiUrl = `/api/user/get-employee/?page=${currentPage}&page_size=${pageSize}&column_accessor=${
    sortStatus?.direction === "desc" ? "-" : ""
  }${sortStatus.columnAccessor}`;

  if (filterData) {
    Object.keys(filterData).forEach((key) => {
      const value = filterData[key];

      if (Array.isArray(value)) {
        if (value[0] !== null && value[1] !== null) {
          apiUrl += `&${key}_from=${encodeURIComponent(
            value[0]
          )}&${key}_to=${encodeURIComponent(value[1])}`;
        }
      } else if (value) {
        apiUrl += `&${key}=${encodeURIComponent(value)}`;
      }
    });
  }

  const {
    data: apiData,
    error,
    isValidating,
    isLoading,
    mutate,
  } = useSWR(apiUrl, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
    revalidateOnFocus: false,
  });

  // const [selectedRecords, setSelectedRecords] = useState([]);

  const handleSortStatusChange = (status) => {
    console.log(status);
    setSortStatus(status);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    // mutate();
  };

  // for Modal
  // const [addOpened, { open: addOpen, close: addClose }] = useDisclosure(false);
  // const [editOpened, { open: editOpen, close: editClose }] =
  //   useDisclosure(false);
  // const [deleteOpened, { open: deleteOpen, close: deleteClose }] =
  //   useDisclosure(false);

  // const [selectedEditItem, setSelectedEditItem] = useState(null);
  // const [selectedDeleteItem, setSelectedDeleteItem] = useState(null);

  // useEffect(() => {
  //   if (selectedEditItem) {
  //     editOpen();
  //   }
  // }, [selectedEditItem]);

  const columns = [
    {
      // for table display
      accessor: "na",
      title: "#",
      noWrap: true,
      sortable: false,
      width: 90,
      render: (_, index) => (currentPage - 1) * pageSize + index + 1,
      // for export
      key: "na",
      modifier: (_, index) => index + 1,
      // pdfModifier: ({ na }) =>
      //   na > 0 ? "is_text_danger_" + getTime(InTime) : getTime(InTime),
    },
    {
      // for table display
      accessor: "photo",
      title: "Employee",
      sortable: false,
      render: ({ id, photo, first_name, last_name, official_id }) => (
        <Link
          href={`/profile/${id}`}
          className="d-flex justify-content-start align-items-center text-decoration-none color-inherit"
        >
          <span className="table_user_img">
            <img
              src={photo ? getStoragePath(photo) : "/default-profile.png"}
              alt=""
              onError={(e) => {
                e.target.src = "/default-profile.png";
              }}
            />
          </span>
          <div className="d-flex flex-column justify-content-center ms-2 table_user">
            <h6 className="table_user_name">
              {getFullName(first_name, last_name)}
            </h6>
            {official_id && (
              <span className="table_user_id">{official_id}</span>
            )}
          </div>
        </Link>
      ),
      // for export
      key: "photo",
    },
    // {
    //   // for table display
    //   accessor: "official_id",
    //   title: "Employee ID",
    //   noWrap: true,
    //   sortable: true,
    //   // for export
    //   key: "official_id",
    // },
    {
      accessor: "designation",
      title: "Designation",
      // visibleMediaQuery: aboveXs,
      render: ({ designation }) => designation?.name || "N/A",
      key: "designation",
    },
    {
      accessor: "group_name",
      title: "Group",
      // visibleMediaQuery: aboveXs,
      render: ({ ethnicgroup_user }) =>
        generateGroupString(ethnicgroup_user || []),
      key: "group_name",
    },
    {
      accessor: "department_name",
      title: "Department",
      // visibleMediaQuery: aboveXs,
      render: ({ departmenttwo }) => departmenttwo?.[0]?.name || "N/A",
      key: "department_name",
    },
    {
      accessor: "shift_name",
      title: "Shift",
      // visibleMediaQuery: aboveXs,
      render: ({ shift }) => shift?.name || "N/A",
      key: "shift_name",
    },

    {
      // for table display
      accessor: "personal_phone",
      title: "Personal Phone",
      // visibleMediaQuery: aboveXs,
      render: ({ personal_phone }) => personal_phone || "N/A",
      // for export
      key: "personal_phone",
    },
    {
      // for table display
      accessor: "personal_email",
      title: "Personal Email",
      // visibleMediaQuery: aboveXs,
      render: ({ personal_email }) => personal_email || "N/A",
      // for export
      key: "personal_email",
    },
    // {
    //   // for table display
    //   accessor: "address",
    //   title: "Address",
    //   // visibleMediaQuery: aboveXs,
    //   render: ({ address }) =>
    //     `${address?.address ? address.address : ""}${
    //       address?.city ? ", " + address.city : ""
    //     }${address?.state_division ? ", " + address.state_division : ""}${
    //       address?.post_zip_code ? " - " + address.post_zip_code : ""
    //     }${address?.country ? ", " + address.country : ""}` || "N/A",

    //   modifier: ({ address }) =>
    //     `${address?.address ? address.address : ""}${
    //       address?.city ? ", " + address.city : ""
    //     }${address?.state_division ? ", " + address.state_division : ""}${
    //       address?.post_zip_code ? " - " + address.post_zip_code : ""
    //     }${address?.country ? ", " + address.country : ""}` || "N/A",

    //   // for export
    //   key: "address",
    // },
    {
      // for table display
      accessor: "actions",
      title: "Actions",
      width: 90,
      textAlign: "center",
      // width: "0%",
      render: (item) => (
        <Menu shadow="md" width={150} position="bottom-end">
          <Menu.Target>
            <button className="border-0 bg-transparent">
              <HiDotsVertical />
            </button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={<BiMessageSquareEdit className="fs-6" />}
              // onClick={() => {
              //   setSelectedEditItem(item);
              // }}
              href={`/profile/${item?.id}`}
              component={Link}
            >
              View
            </Menu.Item>
            {/* <Menu.Item
              leftSection={<AiOutlineDelete className="fs-6" />}
              onClick={() => {
                setSelectedDeleteItem(item);
                deleteOpen();
              }}
            >
              Delete
            </Menu.Item> */}
          </Menu.Dropdown>
        </Menu>
      ),
      // for export
      key: "actions",
    },
  ];

  const visibleColumns = [
    {
      label: "Serial",
      value: "na",
    },
    {
      label: "Employee",
      value: "photo",
    },
    // {
    //   label: "Employee ID",
    //   value: "official_id",
    // },
    {
      label: "Designation",
      value: "designation",
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
      label: "Shift",
      value: "shift_name",
    },
    {
      label: "Personal Phone",
      value: "personal_phone",
    },
    {
      label: "Personal Email",
      value: "personal_email",
    },
    // {
    //   label: "Operating Hour",
    //   value: "operating_hour",
    // },
    {
      label: "Actions",
      value: "actions",
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState([
    "na",
    "photo",
    // "official_id",
    "designation",
    "group_name",
    "department_name",
    "shift_name",
    "personal_phone",
    "personal_email",
    "actions",
  ]);

  const handleChange = (keys) => {
    const updatedKeys = [...new Set(["na", "photo", "actions", ...keys])];

    const reorderedOptions = visibleColumns.filter((column) =>
      updatedKeys.includes(column.value)
    );

    setSelectedOptions(reorderedOptions.map((column) => column.value));
  };

  // file export
  const [isExportDataFetching, setIsExportDataFetching] = useState({
    pdf: false,
    csv: false,
    excel: false,
  });

  // const [dataToExport, setDataToExport] = useState(null);

  const getExportDataUrl = () => {
    let url = `/api/branch/get-branch/?column_accessor=${
      sortStatus?.direction === "desc" ? "-" : ""
    }${sortStatus.columnAccessor}`;

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
        exportedData = response?.data?.data?.result;
        // Cache the data
        // setDataToExport(exportedData);
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

      const headers = selectedOptions
        .filter((key) => key !== "actions")
        .map((columnKey) => {
          const selectedColumn = columns.find(
            (column) => column.key === columnKey
          );
          return selectedColumn ? selectedColumn.title : "";
        });

      const data = exportedData.map((item, index) => {
        const rowData = {};
        selectedOptions
          .filter((key) => key !== "actions")
          .forEach((columnKey) => {
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
        exportToPDF(headers, data, "Branches", "branches");
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
        exportedData = response?.data?.data?.result;
        // Cache the data
        // setDataToExport(exportedData);
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
        selectedOptions
          .filter((key) => key !== "actions")
          .forEach((columnKey) => {
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
        exportToCSV(data, "branches");
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
        exportedData = response?.data?.data?.result;
        // Cache the data
        // setDataToExport(exportedData);
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
        selectedOptions
          .filter((key) => key !== "actions")
          .forEach((columnKey) => {
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
        exportToExcel(data, "branches");
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

  const [filterOpened, { open: filterOpen, close: filterClose }] =
    useDisclosure(false);

  return (
    <>
      <FilterModal
        opened={filterOpened}
        close={filterClose}
        data={filterData}
        setData={setFilterData}
      />
      <div className="mb-4 d-flex justify-content-between align-items-end">
        <Breadcrumb
          title="Employees"
          items={[
            { title: "Dashboard", href: "/dashboard" },
            { title: "Employees" },
          ]}
        />

        <Link className="cusNav" href="/add-employee">
          <LuPlus className="me-1" />
          Add Employee
        </Link>

        {/* <AddButton
          label="Add Branch"
          fontSize="16px"
          icon={<LuPlus className="fs-5 me-0 mr-0" />}
          handleClick={addOpen}
        /> */}
      </div>

      {/* <div className="mb-4 d-flex justify-content-between align-items-end">
        <div className="pageTop">
          <h3>Employees</h3>
          <Breadcrumbs>{items}</Breadcrumbs>
        </div>
      </div> */}

      <div className="d-flex justify-content-between mb-3">
        <div className="showItem d-flex align-items-center justify-content-center">
          <p className="mb-0 me-2">Show</p>
          <Select
            classNames={{
              input: "showInput",
            }}
            withCheckIcon={false}
            // placeholder=""
            data={PAGE_SIZES.map((size) => size.toString())}
            // defaultValue={PAGE_SIZES[0].toString()}
            value={String(pageSize)}
            onChange={(_value, option) => handlePageSizeChange(_value)}
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

          <Button onClick={filterOpen} ms="sm">
            Filter
          </Button>
        </div>
        <div className="downItem d-flex">
          <div className="me-2">
            <Button
              variant="filled"
              size="sm"
              className="px-3"
              onClick={(e) => handleExportToPDF(e)}
              loading={isExportDataFetching?.pdf}
              loaderProps={{ type: "dots" }}
            >
              <AiOutlineFilePdf className="me-1" />
              PDF
            </Button>
          </div>
          <div className="me-2">
            <Button
              variant="filled"
              size="sm"
              className="px-3"
              onClick={(e) => handleExportToCSV(e)}
              loading={isExportDataFetching?.csv}
              loaderProps={{ type: "dots" }}
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
              loading={isExportDataFetching?.excel}
              loaderProps={{ type: "dots" }}
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
            height:
              !apiData?.data.result || apiData.data.result.length === 0
                ? "300px"
                : "auto",
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
          striped
          idAccessor="id"
          columns={columns.filter((column) =>
            selectedOptions.includes(column.key)
          )}
          fetching={isLoading}
          records={apiData?.data.result || []}
          page={currentPage}
          onPageChange={setCurrentPage}
          totalRecords={apiData?.data.count}
          recordsPerPage={pageSize}
          sortStatus={sortStatus}
          onSortStatusChange={handleSortStatusChange}
          // selectedRecords={selectedRecords}
          // onSelectedRecordsChange={setSelectedRecords}
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
