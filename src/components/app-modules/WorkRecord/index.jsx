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

const Index = () => {
  const dateIcon = <MdOutlineCalendarMonth />;
  const [value, setValue] = useState(null);

  return (
    <>
      <div className="mb-3">
        <Breadcrumb
          title="Work Record"
          items={[
            { title: "Dashboard", href: "/dashboard" },
            { title: "Work Record" },
          ]}
        />
      </div>

      <div className="itemCard">
        <div className="mb-3 d-flex align-items-center justify-content-end">
          <p className="mb-0 me-3">Select Month</p>
          <MonthPickerInput
            rightSection={dateIcon}
            rightSectionPointerEvents="none"
            styles={{
              root: { width: "200px" },
            }}
            // label="Pick date"
            placeholder="Pick date"
            value={value}
            onChange={setValue}
          />
        </div>

        <div className="workRecordBox">
          <div className="workRecord mb-1">
            <div className="dayItem employeeNames">
              <p className="dateItem text-start px-2">Employee Name</p>
            </div>
            <div className="dayItem">
              <b className="dateItem">1</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">2</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">3</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">4</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">5</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">6</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">7</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">8</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">9</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">10</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">11</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">12</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">13</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">14</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">15</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">16</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">17</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">18</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">19</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">20</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">21</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">22</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">23</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">24</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">25</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">26</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">27</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">28</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">29</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">30</b>
            </div>
            <div className="dayItem">
              <b className="dateItem">31</b>
            </div>
          </div>
          <div className="workRecord mb-1">
            <div className="dayItem employeeNames">
              <p className="dateItem text-start px-2">
                Jiaur Rahman-API2202016
              </p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Absent">
              <p className="dateItem">A</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem">
              <p className="dateItem"></p>
            </div>
            <div className="dayItem">
              <p className="dateItem"></p>
            </div>
            <div className="dayItem">
              <p className="dateItem"></p>
            </div>
            <div className="dayItem">
              <p className="dateItem"></p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Leave">
              <p className="dateItem">L</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_LateAttendance">
              <p className="dateItem">LA</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_HalfPresent">
              <p className="dateItem">HP</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_EarlyLeave">
              <p className="dateItem">EL</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Overtime">
              <p className="dateItem">OT</p>
            </div>
            <div className="dayItem bg_Running">
              <p className="dateItem">!</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_HollyDay">
              <p className="dateItem">H</p>
            </div>
            <div className="dayItem bg_HollyDay">
              <p className="dateItem">H</p>
            </div>
            <div className="dayItem">
              <p className="dateItem"></p>
            </div>
            <div className="dayItem">
              <p className="dateItem"></p>
            </div>
          </div>
          <div className="workRecord mb-1">
            <div className="dayItem employeeNames">
              <p className="dateItem text-start px-2">
                Nazmul Hussain-API2202047
              </p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Absent">
              <p className="dateItem">A</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem">
              <p className="dateItem"></p>
            </div>
            <div className="dayItem">
              <p className="dateItem"></p>
            </div>
            <div className="dayItem">
              <p className="dateItem"></p>
            </div>
            <div className="dayItem">
              <p className="dateItem"></p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Leave">
              <p className="dateItem">L</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_LateAttendance">
              <p className="dateItem">LA</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_HalfPresent">
              <p className="dateItem">HP</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_EarlyLeave">
              <p className="dateItem">EL</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Overtime">
              <p className="dateItem">OT</p>
            </div>
            <div className="dayItem bg_Running">
              <p className="dateItem">!</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_Present">
              <p className="dateItem">P</p>
            </div>
            <div className="dayItem bg_HollyDay">
              <p className="dateItem">H</p>
            </div>
            <div className="dayItem bg_HollyDay">
              <p className="dateItem">H</p>
            </div>
            <div className="dayItem">
              <p className="dateItem"></p>
            </div>
            <div className="dayItem">
              <p className="dateItem"></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
