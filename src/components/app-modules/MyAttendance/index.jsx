"use client";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
import {
  Button,
  Select,
  Menu,
  MultiSelect,
  Popover,
  Group,
  Grid,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { DataTable } from "mantine-datatable";
import { AiOutlineFilePdf, AiOutlineDelete } from "react-icons/ai";
import { FaRegFileAlt } from "react-icons/fa";
import { RiFileExcel2Line } from "react-icons/ri";
import { LuPlus } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { fetcher, getData } from "@/lib/fetch";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { exportToPDF, exportToExcel, exportToCSV } from "@/lib/export";
import { constants } from "@/lib/config";
import { getDate } from "@/lib/helper";
import Breadcrumb from "@/components/utils/Breadcrumb";
import AddButton from "@/components/utils/AddButton";
import Add from "./Add";
import Edit from "./Edit";
import Delete from "./Delete";

const PAGE_SIZES = constants.PAGE_SIZES;

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "date",
    direction: "asc", // desc
  });

  let apiUrl = `/api/leave/get-holiday/?page=${currentPage}&page_size=${pageSize}&column_accessor=${
    sortStatus?.direction === "desc" ? "-" : ""
  }${sortStatus.columnAccessor}`;

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

  const [selectedRecords, setSelectedRecords] = useState([]);

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
  const [addOpened, { open: addOpen, close: addClose }] = useDisclosure(false);
  const [editOpened, { open: editOpen, close: editClose }] =
    useDisclosure(false);
  const [deleteOpened, { open: deleteOpen, close: deleteClose }] =
    useDisclosure(false);

  const [selectedEditItem, setSelectedEditItem] = useState(null);
  const [selectedDeleteItem, setSelectedDeleteItem] = useState(null);

  useEffect(() => {
    if (selectedEditItem) {
      editOpen();
    }
  }, [selectedEditItem]);

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
      accessor: "date",
      title: "Date",
      // visibleMediaQuery: aboveXs,
      sortable: true,
      render: ({ date }) => (date ? getDate(date) : "N/A"),
      // for export
      key: "date",
    },
    {
      // for table display
      accessor: "inTime",
      title: "In Time",
      // visibleMediaQuery: aboveXs,
      sortable: true,
      render: ({ inTime }) => (inTime ? "Yes" : "No"),
      // for export
      key: "inTime",
    },
    {
      // for table display
      accessor: "outTime",
      title: "Out Time",
      // visibleMediaQuery: aboveXs,
      sortable: true,
      render: ({ outTime }) => (outTime ? "Yes" : "No"),
      // for export
      key: "outTime",
    },
    {
      // for table display
      accessor: "shift",
      title: "Shift",
      // visibleMediaQuery: aboveXs,
      sortable: true,
      render: ({ shift }) => (shift ? "Yes" : "No"),
      // for export
      key: "shift",
    },
    {
      // for table display
      accessor: "adminNote",
      title: "Admin Note",
      // visibleMediaQuery: aboveXs,
      sortable: true,
      render: ({ adminNote }) => (adminNote ? "Yes" : "No"),
      // for export
      key: "adminNote",
    },
    {
      // for table display
      accessor: "status",
      title: "Status",
      // visibleMediaQuery: aboveXs,
      sortable: true,
      width: 250,
      render: ({}) => (
        <Group gap="xs">
          <Button size="compact-xs" variant="light" color="teal">
            Approved
          </Button>
          <Button size="compact-xs" variant="light" color="grape">
            Pending
          </Button>
          <Button size="compact-xs" variant="light" color="red">
            Rejected
          </Button>
        </Group>
      ),
      // for export
      key: "status",
    },
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
              onClick={() => {
                setSelectedEditItem(item);
              }}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              leftSection={<AiOutlineDelete className="fs-6" />}
              onClick={() => {
                setSelectedDeleteItem(item);
                deleteOpen();
              }}
            >
              Delete
            </Menu.Item>
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
      label: "Date",
      value: "date",
    },
    {
      label: "In Time",
      value: "inTime",
    },
    {
      label: "Out Time",
      value: "outTime",
    },
    {
      label: "Shift",
      value: "shift",
    },
    {
      label: "Admin Note",
      value: "adminNote",
    },
    {
      label: "Status",
      value: "status",
    },
    {
      label: "Actions",
      value: "actions",
    },
  ];

  const [selectedOptions, setSelectedOptions] = useState([
    "na",
    "date",
    "inTime",
    "outTime",
    "shift",
    "adminNote",
    "status",
    "actions",
  ]);

  const handleChange = (keys) => {
    const updatedKeys = [...new Set(["na", "title", "actions", ...keys])];

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
    let url = `/api/leave/get-leavepolicy/?column_accessor=${
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
        exportToPDF(headers, data, "Leave Policy", "leave-policy");
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
        exportToCSV(data, "leave-policy");
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
        exportToExcel(data, "leave-policy");
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

  const dateIcon = <MdOutlineCalendarMonth />;
  const [value, setValue] = useState(null);

  return (
    <>
      <Add
        opened={addOpened} //
        close={addClose}
        mutate={mutate}
      />

      <Edit
        opened={editOpened}
        close={editClose}
        item={selectedEditItem}
        setItem={setSelectedEditItem}
        mutate={mutate}
      />

      <Delete
        opened={deleteOpened}
        close={deleteClose}
        item={selectedDeleteItem}
        mutate={mutate}
      />

      <div className="mb-4 d-flex justify-content-between align-items-end">
        <Breadcrumb
          title="My Attendance"
          items={[
            { title: "Dashboard", href: "/dashboard" },
            { title: "My Attendance" },
          ]}
        />

        <AddButton
          label="Add Attendance Request"
          fontSize="16px"
          icon={<LuPlus className="fs-5 me-0 mr-0" />}
          handleClick={addOpen}
        />
      </div>

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
            defaultValue={PAGE_SIZES[0].toString()}
            value={pageSize.toString()}
            onChange={(_value, option) => handlePageSizeChange(_value)}
          />
          <p className="mb-0 ms-2 me-2">Entries</p>

          {/* <Popover
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
          </Popover> */}
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
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
          // recordsPerPageOptions={PAGE_SIZES}
          // onRecordsPerPageChange={setPageSize}
          // rowExpansion={rowExpansion}
          // onRowContextMenu={handleContextMenu}
          // onScroll={hideContextMenu}
        />
      </div>

      <div className="itemCard">
        <Grid>
          <Grid.Col span={6}>
            <h4 className="mb-0">Monthly Attendance</h4>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className="d-flex align-items-center justify-content-end">
              <p className="mb-0 me-3">Select Month</p>
              <MonthPickerInput
                rightSection={dateIcon}
                styles={{
                  root: { width: "200px" },
                }}
                // label="Pick date"
                placeholder="Pick date"
                value={value}
                onChange={setValue}
              />
            </div>
          </Grid.Col>
        </Grid>
        <div className="calenderBox">
          <div className="colorBox mb-4 mt-5">
            <div className="d-flex align-items-center">
              <span className="bg_Present"></span>
              <p>Present</p>
            </div>
            <div className="d-flex align-items-center ms-3">
              <span className="bg_Absent"></span>
              <p>Absent</p>
            </div>
            <div className="d-flex align-items-center ms-3">
              <span className="bg_Leave"></span>
              <p>Leave</p>
            </div>
            <div className="d-flex align-items-center ms-3">
              <span className="bg_HalfPresent"></span>
              <p>Half Present</p>
            </div>
            <div className="d-flex align-items-center ms-3">
              <span className="bg_LateAttendance"></span>
              <p>Late Attendance</p>
            </div>
            <div className="d-flex align-items-center ms-3">
              <span className="bg_EarlyLeave"></span>
              <p>Early Leave</p>
            </div>
            <div className="d-flex align-items-center ms-3">
              <span className="bg_Overtime"></span>
              <p>Overtime</p>
            </div>
            <div className="d-flex align-items-center ms-3">
              <span className="bg_HollyDay"></span>
              <p>Holly Day</p>
            </div>
            <div className="d-flex align-items-center ms-3">
              <span className="bg_Running"></span>
              <p>Incomplete</p>
            </div>
          </div>
          <div className="dayName">
            <div className="name">Sunday</div>
            <div className="name">Monday</div>
            <div className="name">Tuesday</div>
            <div className="name">Wednesday</div>
            <div className="name">Thursday</div>
            <div className="name">Friday</div>
            <div className="name">Saturday</div>
          </div>
          <div className="dateBox">
            <div className="day bg_Present">
              <p className="date">1</p>
              <b>P</b>
            </div>
            <div className="day bg_Absent">
              <p className="date">2</p>
              <b>A</b>
            </div>
            <div className="day">
              <p className="date">3</p>
              <b>P</b>
            </div>
            <div className="day bg_Leave">
              <p className="date">4</p>
              <b>L</b>
            </div>
            <div className="day">
              <p className="date">5</p>
              <b>P</b>
            </div>
            <div className="day bg_HollyDay">
              <p className="date">6</p>
              <b>H</b>
            </div>
            <div className="day">
              <p className="date">7</p>
              <b>P</b>
            </div>
            <div className="day">
              <p className="date">8</p>
              <b>P</b>
            </div>
            <div className="day">
              <p className="date">9</p>
              <b>P</b>
            </div>
            <div className="day bg_HalfPresent">
              <p className="date">10</p>
              <b>HP</b>
            </div>
            <div className="day">
              <p className="date">11</p>
              <b>P</b>
            </div>
            <div className="day">
              <p className="date">12</p>
              <b>P</b>
            </div>
            <div className="day bg_HollyDay">
              <p className="date">13</p>
              <b>H</b>
            </div>
            <div className="day bg_EarlyLeave">
              <p className="date">14</p>
              <b>EL</b>
            </div>
            <div className="day">
              <p className="date">15</p>
              <b>P</b>
            </div>
            <div className="day">
              <p className="date">16</p>
              <b>P</b>
            </div>
            <div className="day bg_Running">
              <p className="date">17</p>
              <b>!</b>
            </div>
            <div className="day">
              <p className="date">18</p>
              <b>P</b>
            </div>
            <div className="day">
              <p className="date">19</p>
              <b>P</b>
            </div>
            <div className="day bg_HollyDay">
              <p className="date">20</p>
              <b>H</b>
            </div>
            <div className="day">
              <p className="date">21</p>
              <b>P</b>
            </div>
            <div className="day">
              <p className="date">22</p>
              <b>P</b>
            </div>
            <div className="day bg_running">
              <p className="date">23</p>
              <b>P</b>
            </div>
            <div className="day">
              <p className="date">24</p>
              <b>P</b>
            </div>
            <div className="day bg_LateAttendance">
              <p className="date">25</p>
              <b>LA</b>
            </div>
            <div className="day bg_EarlyLeave">
              <p className="date">26</p>
              <b>EL</b>
            </div>
            <div className="day bg_HollyDay">
              <p className="date">27</p>
              <b>H</b>
            </div>
            <div className="day">
              <p className="date">28</p>
              <b>P</b>
            </div>
            <div className="day bg_HollyDay">
              <p className="date">29</p>
              <b>P</b>
            </div>
            <div className="day bg_Overtime">
              <p className="date">30</p>
              <b>OT</b>
            </div>
            <div className="day">
              <p className="date">31</p>
              <b>P</b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
