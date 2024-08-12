"use client";
import { useState } from "react";
import {
  Grid,
  Accordion,
  Table,
  Checkbox,
  Switch,
  Avatar,
  Group,
  Button,
} from "@mantine/core";
import Breadcrumb from "@/components/utils/Breadcrumb";
import CreateUserRole from "../CreateUserRole";
import { GoPlusCircle } from "react-icons/go";
import { GoEye } from "react-icons/go";
import { RiEditBoxLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";

// Accordion data
const groceries = [
  {
    value: "Employee",
    description: (
      <Table withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Actions</Table.Th>
            <Table.Th>
              <GoPlusCircle className="me-2" />
              Add
            </Table.Th>
            <Table.Th>
              <GoEye className="me-2" />
              View
            </Table.Th>
            <Table.Th>
              <RiEditBoxLine className="me-2" />
              Edit
            </Table.Th>
            <Table.Th>
              <RiDeleteBin6Line className="me-2" />
              Delete
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="blue" size="md" radius="xl" className="me-2">
                BI
              </Avatar>
              Basic Info
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="green" size="md" radius="xl" className="me-2">
                BR
              </Avatar>
              Branch
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="yellow" size="md" radius="xl" className="me-2">
                DE
              </Avatar>
              Departments
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="red" size="md" radius="xl" className="me-2">
                EG
              </Avatar>
              Employee Grades & Group
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    ),
  },
  {
    value: "Company",
    description: (
      <Table withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Actions</Table.Th>
            <Table.Th>
              <GoPlusCircle className="me-1" />
              Add
            </Table.Th>
            <Table.Th>
              <GoEye className="me-1" />
              View
            </Table.Th>
            <Table.Th>
              <RiEditBoxLine className="me-1" />
              Edit
            </Table.Th>
            <Table.Th>
              <RiDeleteBin6Line className="me-1" />
              Delete
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="blue" size="md" radius="xl" className="me-2">
                BI
              </Avatar>
              Basic Info
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="green" size="md" radius="xl" className="me-2">
                BR
              </Avatar>
              Branch
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="yellow" size="md" radius="xl" className="me-2">
                DE
              </Avatar>
              Departments
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="red" size="md" radius="xl" className="me-2">
                EG
              </Avatar>
              Employee Grades & Group
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    ),
  },
  {
    value: "Shifts",
    description: (
      <Table withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Actions</Table.Th>
            <Table.Th>
              <GoPlusCircle className="me-2" />
              Add
            </Table.Th>
            <Table.Th>
              <GoEye className="me-2" />
              View
            </Table.Th>
            <Table.Th>
              <RiEditBoxLine className="me-2" />
              Edit
            </Table.Th>
            <Table.Th>
              <RiDeleteBin6Line className="me-2" />
              Delete
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="blue" size="md" radius="xl" className="me-2">
                BI
              </Avatar>
              Basic Info
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="green" size="md" radius="xl" className="me-2">
                BR
              </Avatar>
              Branch
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="yellow" size="md" radius="xl" className="me-2">
                DE
              </Avatar>
              Departments
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="red" size="md" radius="xl" className="me-2">
                EG
              </Avatar>
              Employee Grades & Group
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    ),
  },
  {
    value: "Leave",
    description: (
      <Table withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Actions</Table.Th>
            <Table.Th>
              <GoPlusCircle className="me-2" />
              Add
            </Table.Th>
            <Table.Th>
              <GoEye className="me-2" />
              View
            </Table.Th>
            <Table.Th>
              <RiEditBoxLine className="me-2" />
              Edit
            </Table.Th>
            <Table.Th>
              <RiDeleteBin6Line className="me-2" />
              Delete
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="blue" size="md" radius="xl" className="me-2">
                BI
              </Avatar>
              Basic Info
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="green" size="md" radius="xl" className="me-2">
                BR
              </Avatar>
              Branch
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="yellow" size="md" radius="xl" className="me-2">
                DE
              </Avatar>
              Departments
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="red" size="md" radius="xl" className="me-2">
                EG
              </Avatar>
              Employee Grades & Group
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    ),
  },
  {
    value: "Payroll",
    description: (
      <Table withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Actions</Table.Th>
            <Table.Th>
              <GoPlusCircle className="me-2" />
              Add
            </Table.Th>
            <Table.Th>
              <GoEye className="me-2" />
              View
            </Table.Th>
            <Table.Th>
              <RiEditBoxLine className="me-2" />
              Edit
            </Table.Th>
            <Table.Th>
              <RiDeleteBin6Line className="me-2" />
              Delete
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="blue" size="md" radius="xl" className="me-2">
                BI
              </Avatar>
              Basic Info
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="green" size="md" radius="xl" className="me-2">
                BR
              </Avatar>
              Branch
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="yellow" size="md" radius="xl" className="me-2">
                DE
              </Avatar>
              Departments
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="red" size="md" radius="xl" className="me-2">
                EG
              </Avatar>
              Employee Grades & Group
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    ),
  },

  {
    value: "Attendance",
    description: (
      <Table withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Actions</Table.Th>
            <Table.Th>
              <GoPlusCircle className="me-2" />
              Add
            </Table.Th>
            <Table.Th>
              <GoEye className="me-2" />
              View
            </Table.Th>
            <Table.Th>
              <RiEditBoxLine className="me-2" />
              Edit
            </Table.Th>
            <Table.Th>
              <RiDeleteBin6Line className="me-2" />
              Delete
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="blue" size="md" radius="xl" className="me-2">
                BI
              </Avatar>
              Basic Info
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="green" size="md" radius="xl" className="me-2">
                BR
              </Avatar>
              Branch
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="yellow" size="md" radius="xl" className="me-2">
                DE
              </Avatar>
              Departments
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="red" size="md" radius="xl" className="me-2">
                EG
              </Avatar>
              Employee Grades & Group
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    ),
  },

  {
    value: "Settings",
    description: (
      <Table withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th></Table.Th>
            <Table.Th>Actions</Table.Th>
            <Table.Th>
              <GoPlusCircle className="me-2" />
              Add
            </Table.Th>
            <Table.Th>
              <GoEye className="me-2" />
              View
            </Table.Th>
            <Table.Th>
              <RiEditBoxLine className="me-2" />
              Edit
            </Table.Th>
            <Table.Th>
              <RiDeleteBin6Line className="me-2" />
              Delete
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="blue" size="md" radius="xl" className="me-2">
                BI
              </Avatar>
              Basic Info
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="green" size="md" radius="xl" className="me-2">
                BR
              </Avatar>
              Branch
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="yellow" size="md" radius="xl" className="me-2">
                DE
              </Avatar>
              Departments
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>
              <Checkbox />
            </Table.Td>
            <Table.Td className="d-flex align-items-center">
              <Avatar color="red" size="md" radius="xl" className="me-2">
                EG
              </Avatar>
              Employee Grades & Group
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
            <Table.Td>
              <Switch size="sm" onLabel="ON" offLabel="OFF" />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    ),
  },
];

const index = () => {
  // See Accordion data above
  const items = groceries.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control>{item.value}</Accordion.Control>
      <Accordion.Panel>{item.description}</Accordion.Panel>
    </Accordion.Item>
  ));

  const [isDivVisible, setIsDivVisible] = useState(false);
  const toggleDiv = () => {
    setIsDivVisible(!isDivVisible);
  };

  return (
    <>
      <div className="mb-4">
        <Breadcrumb
          title="User Role"
          items={[
            { title: "Dashboard", href: "/dashboard" },
            { title: "User Role" },
          ]}
        />
      </div>

      <Grid gutter="xl">
        <Grid.Col span={6}>
          <div className="itemCard">
            <CreateUserRole />
          </div>
        </Grid.Col>

        <Grid.Col span={6}>
          <div className="itemCard">
            <Accordion
              defaultValue="Employee"
              classNames={{
                root: "accordionRoot",
                item: "accordionActive",
                chevron: "accordionIcon",
              }}
            >
              {items}
            </Accordion>
            <div className="mt-3">
              <Button variant="filled">Assign</Button>
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default index;
