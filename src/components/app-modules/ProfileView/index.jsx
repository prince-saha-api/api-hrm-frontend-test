"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  Button,
  Group,
  Select,
  Grid,
  NumberInput,
  ActionIcon,
  Checkbox,
  Modal,
  Tabs,
  Table,
  Text,
  Popover,
} from "@mantine/core";
import Breadcrumb from "@/components/utils/Breadcrumb";
import { TbEyeClosed } from "react-icons/tb";
import { CiCreditCard2 } from "react-icons/ci";
import { FaInfoCircle } from "react-icons/fa";
import { TimeInput } from "@mantine/dates";
import { IoTimeOutline } from "react-icons/io5";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { TbSquareRoundedFilled } from "react-icons/tb";
import { TbSquareRounded } from "react-icons/tb";
import { RxPencil2 } from "react-icons/rx";
import { PiIdentificationCardLight } from "react-icons/pi";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { CiFileOn } from "react-icons/ci";
import { CiImageOn } from "react-icons/ci";
import { TbEdit } from "react-icons/tb";
import ProfileEdit from "./ProfileEdit";
import ProfileImage from "./ProfileImage";
import NID from "./NID";
import Resume from "./Resume";
import Appointment from "./Appointment";
import ResetPassword from "./ResetPassword";
import PersonalDetails from "./PersonalDetails";
import OfficialDetails from "./OfficialDetails";
import SalaryLeaves from "./SalaryLeaves";
import EmergencyContact from "./EmergencyContact";
import Education from "./Education";
import Experience from "./Experience";
import Documents from "./Documents";

const ProfileView = () => {
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

  // for Modal
  const [profileOpened, { open: profileOpen, close: profileClose }] =
    useDisclosure(false);
  const [passwordOpened, { open: passwordOpen, close: passwordClose }] =
    useDisclosure(false);
  const [nidOpened, { open: nidOpen, close: nidClose }] = useDisclosure(false);
  const [resumeOpened, { open: resumeOpen, close: resumeClose }] =
    useDisclosure(false);
  const [
    appointmentOpened,
    { open: appointmentOpen, close: appointmentClose },
  ] = useDisclosure(false);
  const [
    personalDetailsOpened,
    { open: personalDetailsOpen, close: personalDetailsClose },
  ] = useDisclosure(false);
  const [
    officialDetailsOpened,
    { open: officialDetailsOpen, close: officialDetailsClose },
  ] = useDisclosure(false);
  const [
    salaryLeavesOpened,
    { open: salaryLeavesOpen, close: salaryLeavesClose },
  ] = useDisclosure(false);
  const [
    emergencyContactOpened,
    { open: emergencyContactOpen, close: emergencyContactClose },
  ] = useDisclosure(false);
  const [educationOpened, { open: educationOpen, close: educationClose }] =
    useDisclosure(false);
  const [experienceOpened, { open: experienceOpen, close: experienceClose }] =
    useDisclosure(false);
  const [
    profileImageOpened,
    { open: profileImageOpen, close: profileImageClose },
  ] = useDisclosure(false);
  const [documentsOpened, { open: documentsOpen, close: documentsClose }] =
    useDisclosure(false);

  // Data of Job History
  const elements = [
    {
      transition: "Joining",
      date: "01/04/2022",
      jobStatus: "Probation",
      designation: "Front-End Developer",
      department: "Software Development",
      joiningSalary: "40,000/-",
      newSalary: "55,000/-",
    },
    {
      transition: "Status Update",
      date: "01/04/2022",
      jobStatus: "Permanent",
      designation: "UI/UX Designer",
      department: "Software Development",
      joiningSalary: "30,000/-",
      newSalary: "35,000/-",
    },
    {
      transition: "Increment",
      date: "01/04/2022",
      jobStatus: "Probation",
      designation: "Front-End Developer",
      department: "Software Development",
      joiningSalary: "44,000/-",
      newSalary: "55,000/-",
    },
    {
      transition: "Joining",
      date: "01/04/2022",
      jobStatus: "Probation",
      designation: "Front-End Developer",
      department: "Software Development",
      joiningSalary: "40,000/-",
      newSalary: "55,000/-",
    },
    {
      transition: "Status Update",
      date: "01/04/2022",
      jobStatus: "Permanent",
      designation: "UI/UX Designer",
      department: "Software Development",
      joiningSalary: "30,000/-",
      newSalary: "35,000/-",
    },
    {
      transition: "Increment",
      date: "01/04/2022",
      jobStatus: "Probation",
      designation: "Front-End Developer",
      department: "Software Development",
      joiningSalary: "44,000/-",
      newSalary: "55,000/-",
    },
  ];

  // Table of Job History
  const rows = elements.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td>{element.transition}</Table.Td>
      <Table.Td>{element.date}</Table.Td>
      <Table.Td>{element.jobStatus}</Table.Td>
      <Table.Td>{element.designation}</Table.Td>
      <Table.Td>{element.department}</Table.Td>
      <Table.Td>{element.joiningSalary}</Table.Td>
      <Table.Td>{element.newSalary}</Table.Td>
    </Table.Tr>
  ));

  // Data of Leave Policy
  const elements2 = [
    {
      leaveType: "Sick",
      allocationDays: "16",
      consumedDays: "2",
      left: "10",
    },
    {
      leaveType: "Casual",
      allocationDays: "16",
      consumedDays: "3",
      left: "5",
    },
    {
      leaveType: "Sick",
      allocationDays: "16",
      consumedDays: "2",
      left: "10",
    },
    {
      leaveType: "Casual",
      allocationDays: "16",
      consumedDays: "5",
      left: "8",
    },
  ];

  // Table of Leave Policy
  const leavePolicyRows = elements2.map((element2, index) => (
    <Table.Tr key={index}>
      <Table.Td>{element2.leaveType}</Table.Td>
      <Table.Td>{element2.allocationDays}</Table.Td>
      <Table.Td>{element2.consumedDays}</Table.Td>
      <Table.Td>{element2.left}</Table.Td>
    </Table.Tr>
  ));

  // Data of Earning Policy
  const elements3 = [
    {
      earningComponent: "Basic",
      amount: "25000",
    },
    {
      earningComponent: "House Rent",
      amount: "12000",
    },
    {
      earningComponent: "Medical",
      amount: "5000",
    },
  ];

  // Table of Earning Policy
  const earningPolicyRows = elements3.map((element3, index) => (
    <Table.Tr key={index}>
      <Table.Td>{element3.earningComponent}</Table.Td>
      <Table.Td>{element3.amount}</Table.Td>
    </Table.Tr>
  ));

  // Data of Deduction Policy
  const elements4 = [
    {
      earningComponent: "Food",
      amount: "25000",
      consumedDays: "2",
      left: "10",
    },
    {
      earningComponent: "Absent",
      amount: "25000",
      consumedDays: "2",
      left: "10",
    },
  ];

  // Table of Deduction Policy
  const deductionPolicyRows = elements4.map((element4, index) => (
    <Table.Tr key={index}>
      <Table.Td>{element4.earningComponent}</Table.Td>
      <Table.Td>{element4.amount}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <ProfileEdit
        opened={profileOpened}
        close={profileClose}
        // item={selectedDeleteItem}
        // mutate={mutate}
      />
      <ProfileImage
        opened={profileImageOpened}
        close={profileImageClose}
        // item={selectedDeleteItem}
        // mutate={mutate}
      />
      <ResetPassword
        opened={passwordOpened}
        close={passwordClose}
        // item={selectedDeleteItem}
        // mutate={mutate}
      />
      <NID
        opened={nidOpened}
        close={nidClose}
        // item={selectedDeleteItem}
        // mutate={mutate}
      />
      <Resume
        opened={resumeOpened}
        close={resumeClose}
        // item={selectedDeleteItem}
        // mutate={mutate}
      />
      <Appointment
        opened={appointmentOpened}
        close={appointmentClose}
        // item={selectedDeleteItem}
        // mutate={mutate}
      />
      <PersonalDetails
        opened={personalDetailsOpened}
        close={personalDetailsClose}
        // item={selectedDeleteItem}
        // mutate={mutate}
      />
      <OfficialDetails
        opened={officialDetailsOpened}
        close={officialDetailsClose}
        // item={selectedDeleteItem}
        // mutate={mutate}
      />
      <SalaryLeaves
        opened={salaryLeavesOpened}
        close={salaryLeavesClose}
        // item={selectedDeleteItem}
        // mutate={mutate}
      />
      <EmergencyContact
        opened={emergencyContactOpened}
        close={emergencyContactClose}
        // item={selectedDeleteItem}
        // mutate={mutate}
      />
      <Education
        opened={educationOpened}
        close={educationClose}
        // item={selectedDeleteItem}
        // mutate={mutate}
      />
      <Experience
        opened={experienceOpened}
        close={experienceClose}
        // item={selectedDeleteItem}
        // mutate={mutate}
      />
      <Documents
        opened={documentsOpened}
        close={documentsClose}
        // item={selectedDeleteItem}
        // mutate={mutate}
      />

      <Breadcrumb
        classNames={{
          root: "mb-4",
        }}
        title="Profile"
        items={[
          { title: "Dashboard", href: "/dashboard" },
          { title: "Profile" },
        ]}
      />

      <div className="itemCard position-relative">
        <button
          className="profileEditBtn"
          onClick={() => {
            // setSelectedDeleteItem(item);
            profileOpen();
          }}
          // handleClick={addOpen}
        >
          <RxPencil2 className="iconBtn" />
        </button>

        <Grid>
          <Grid.Col span={6}>
            <div className="profileBox borderRight h-100 d-flex">
              <div className="profile position-relative">
                <Image
                  src="/profile03.jpg"
                  width={200}
                  height={200}
                  alt="profile_img"
                />
                <button
                  className="border-0 proOverly"
                  onClick={() => {
                    // setSelectedDeleteItem(item);
                    profileImageOpen();
                  }}
                  // handleClick={addOpen}
                >
                  <TbEdit className="iconBtn me-2 text-dark" />
                  Edit
                </button>
              </div>
              <div className="proInfo ms-4">
                <h3 className="employeeName mb-1">Jiaur Rahman</h3>
                <h6 className="employeeDesig mb-1">Software Engineer</h6>

                <p className="employeeJoin mb-1">
                  <b>Employee ID : API2202016</b>
                </p>
                <p className="employeeJoin mb-1">Department : Development</p>
                <p className="employeeJoin mb-1">Date of Join : 1st Jan 2021</p>
                <p className="employeeJoin mb-1">
                  Annual Leave : 16{" "}
                  <span className="text-warning">(Remaining Leave: 4)</span>
                </p>
                <p className="employeeJoin">
                  <span>Reset Password:</span>
                  <button
                    className="border-0 ms-2 px-2 py-1 text-dark rounded-1"
                    onClick={() => {
                      // setSelectedDeleteItem(item);
                      passwordOpen();
                    }}
                    // handleClick={addOpen}
                  >
                    <TbEyeClosed className="iconBtn me-2 text-dark" />
                    Reset
                  </button>
                </p>
              </div>
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div className="employeeInfo h-100 ps-3">
              <p>
                <span>Phone:</span>
                <Link className="phnNumber" href="tel:01686449007">
                  01686449007
                </Link>
              </p>
              <p>
                <span>Email:</span>
                <Link className="email" href="mailto:jiaur883@gmail.com">
                  jiaur883@gmail.com
                </Link>
              </p>
              <p>
                <span>Date of Birth:</span>24-July-1996
              </p>
              {/* <p>
                        <span>Address:</span>Bayonne Ave, Manchester Township,
                        Nkgkgke, Mancheste Real Likebto power tomaar Fcace door
                     </p> */}
              <p>
                <span>Gender:</span>Male
              </p>
              <p>
                <span>Blood Group:</span> A+
              </p>
              <p>
                <span>Marital Status:</span> Married
              </p>
              <p>
                <span>Supervisor:</span>
                <Image
                  className="reportsImg"
                  src="/profile01.jpg"
                  width={200}
                  height={200}
                  alt="profile_img"
                />
                Tanim Shahriar Abedin
              </p>
            </div>
          </Grid.Col>
        </Grid>
      </div>

      <div className="itemCard">
        <Tabs color="teal" defaultValue="1">
          <Tabs.List mb="md">
            <Tabs.Tab value="1" color="orange">
              Personal Details
            </Tabs.Tab>
            <Tabs.Tab value="2" color="orange">
              Official Details
            </Tabs.Tab>
            <Tabs.Tab value="3" color="orange">
              Salary and Leaves
            </Tabs.Tab>
            <Tabs.Tab value="4" color="orange">
              Emergency Contact
            </Tabs.Tab>
            <Tabs.Tab value="5" color="orange">
              Education & Experience
            </Tabs.Tab>
            <Tabs.Tab value="6" color="orange">
              Documents
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="1" pt="xs">
            <div className="position-relative">
              <button
                className="profileEditBtn top-0 end-0"
                onClick={() => {
                  // setSelectedDeleteItem(item);
                  personalDetailsOpen();
                }}
                // handleClick={addOpen}
              >
                <RxPencil2 className="iconBtn" />
              </button>
              <h4 className="mb-3">
                <TbSquareRoundedFilled className="roundIcon" />
                Personal Details
              </h4>
              <div className="employeeInfo">
                <p>
                  <span>Fathers Name:</span>Afiz Uddin
                </p>
                <p>
                  <span>Mothers Name:</span>Jamila Begum
                </p>
                <p>
                  <span>Spouse Name:</span>N/A
                </p>
                <p>
                  <span>Nationality:</span>Bangladeshi
                </p>
                <p>
                  <span>Religion:</span>Islam
                </p>
                <p>
                  <span>NID / Passport:</span>199523400099
                </p>
                <p>
                  <span>TIN No:</span>99622240
                </p>
                <p>
                  <span>Present Address:</span>Mohammadpur, Dhaka 1207
                  Bangladesh
                </p>
                <p>
                  <span>Permanent Address:</span>Mohammadpur, Dhaka 1207
                  Bangladesh
                </p>
              </div>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="2" pt="xs">
            <Grid>
              <Grid.Col span={5}>
                <div className="position-relative">
                  <button
                    className="profileEditBtn top-0 end-3"
                    onClick={() => {
                      // setSelectedDeleteItem(item);
                      officialDetailsOpen();
                    }}
                    // handleClick={addOpen}
                  >
                    <RxPencil2 className="iconBtn" />
                  </button>
                  <h4 className="mb-3">
                    <TbSquareRoundedFilled className="roundIcon" />
                    Official Details
                  </h4>
                  <div className="employeeInfo">
                    <p>
                      <span>Official Email:</span>example@gmail.com
                    </p>
                    <p>
                      <span>Official Phone:</span>01725235883
                    </p>
                    <p>
                      <span>Employee Type:</span>Full-time
                    </p>
                    <p>
                      <span>Company:</span>API Solution Ltd.
                    </p>
                    <p>
                      <span>Branch:</span>Banani
                    </p>
                    <p>
                      <span>Default Shift:</span>Day
                    </p>
                    <p>
                      <span>Grade:</span>A
                    </p>
                    <p>
                      <span>User Role:</span>User
                    </p>
                    <p>
                      <span>Official Note:</span>N/A
                    </p>
                    <p>
                      <span>Group:</span>B
                    </p>
                    <p>
                      <span>Joining Date:</span>01-Feb-2022
                    </p>
                    <p>
                      <span>Expense Approver:</span>G. M. Nazmul Hussain
                    </p>
                    <p>
                      <span>Leave Approver:</span>G. M. Nazmul Hussain
                    </p>
                    <p>
                      <span>Shift Approver:</span>G. M. Nazmul Hussain
                    </p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={7}>
                <div className="position-relative">
                  <h4 className="mb-3">
                    <TbSquareRoundedFilled className="roundIcon" />
                    Job History
                  </h4>
                  <div className="jobHistoryBox">
                    <Table striped withTableBorder withColumnBorders>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Transition Type</Table.Th>
                          <Table.Th>Date</Table.Th>
                          <Table.Th>Job Status</Table.Th>
                          <Table.Th>Designation</Table.Th>
                          <Table.Th>Department</Table.Th>
                          <Table.Th>Joining Salary</Table.Th>
                          <Table.Th>New Salary</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                  </div>
                </div>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>
          <Tabs.Panel value="3" pt="xs">
            <div className="position-relative">
              <button
                className="profileEditBtn top-0 end-0"
                onClick={() => {
                  // setSelectedDeleteItem(item);
                  salaryLeavesOpen();
                }}
                // handleClick={addOpen}
              >
                <RxPencil2 className="iconBtn" />
              </button>

              <Grid>
                <Grid.Col span={6}>
                  <h4 className="mb-3">
                    <TbSquareRoundedFilled className="roundIcon" />
                    Salary and Leaves
                  </h4>
                  <div className="employeeInfo">
                    <p>
                      <span>Payment In:</span>Cash
                    </p>
                    <p>
                      <span>Monthly Gross Salary:</span>55000
                    </p>
                    <p>
                      <span>Bank Name:</span>Dutch Bangla Bank
                    </p>
                    <p>
                      <span>Branch:</span>Mohammadpur
                    </p>
                    <p>
                      <span>Bank Account Type:</span>Business
                    </p>
                    <p>
                      <span>Account No:</span>996222400001
                    </p>
                    <p>
                      <span>Routing No:</span>33000
                    </p>
                    <p>
                      <span>SWIFT:</span>ABC
                    </p>
                    <p>
                      <span>Bank Address:</span>Banani Dhaka Bangladesh
                    </p>
                  </div>
                </Grid.Col>
                <Grid.Col span={6}>
                  <h4 className="mb-3">
                    <TbSquareRoundedFilled className="roundIcon" />
                    Leave Policy
                  </h4>
                  <div className="leavePolicyBox mb-3">
                    <b className="mb-2 d-block text-dark">Leave Policy 1</b>
                    <Table striped withTableBorder withColumnBorders>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Leave Type</Table.Th>
                          <Table.Th>Allocation Days</Table.Th>
                          <Table.Th>Consumed Days</Table.Th>
                          <Table.Th>Left</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>{leavePolicyRows}</Table.Tbody>
                    </Table>
                  </div>
                  <div className="leavePolicyBox mb-3">
                    <b className="mb-2 d-block text-dark">Earning Policy</b>
                    <Table striped withTableBorder withColumnBorders>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Earning Component</Table.Th>
                          <Table.Th>Amount</Table.Th>
                          {/* <Table.Th>Consumed Days</Table.Th>
                          <Table.Th>Left</Table.Th> */}
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>{earningPolicyRows}</Table.Tbody>
                    </Table>
                  </div>
                  <div className="leavePolicyBox mb-3">
                    <b className="mb-2 d-block text-dark">Deduction Policy</b>
                    <Table striped withTableBorder withColumnBorders>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Deduction Component</Table.Th>
                          <Table.Th>Amount</Table.Th>
                          {/* <Table.Th>Consumed Days</Table.Th>
                          <Table.Th>Left</Table.Th> */}
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>{deductionPolicyRows}</Table.Tbody>
                    </Table>
                  </div>
                </Grid.Col>
              </Grid>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="4" pt="xs">
            <div className="position-relative">
              <button
                className="profileEditBtn top-0 end-0"
                onClick={() => {
                  // setSelectedDeleteItem(item);
                  emergencyContactOpen();
                }}
                // handleClick={addOpen}
              >
                <RxPencil2 className="iconBtn" />
              </button>
              <h4 className="mb-3">
                <TbSquareRoundedFilled className="roundIcon" />
                Emergency Contact
              </h4>
              <Grid>
                <Grid.Col span={6}>
                  <div className="employeeInfo border p-3">
                    <p>
                      <span>Name:</span>Mr. Mijanur Rahman
                    </p>
                    <p>
                      <span>Age:</span>28
                    </p>
                    <p>
                      <span>Phone No:</span>01725357776
                    </p>
                    <p>
                      <span>Email:</span>example@gmail.com
                    </p>
                    <p>
                      <span>Relation:</span>Brother
                    </p>
                    <p>
                      <span>Address:</span>Mohammadpur, Dhaka 1207 Bangladesh
                    </p>
                  </div>
                </Grid.Col>
                <Grid.Col span={6}>
                  <div className="employeeInfo border p-3">
                    <p>
                      <span>Name:</span>Mr. Jamal Islam
                    </p>
                    <p>
                      <span>Age:</span>28
                    </p>
                    <p>
                      <span>Phone No:</span>0172535443
                    </p>
                    <p>
                      <span>Email:</span>example@gmail.com
                    </p>
                    <p>
                      <span>Relation:</span>Brother
                    </p>
                    <p>
                      <span>Address:</span>Mohammadpur, Dhaka 1207 Bangladesh
                    </p>
                  </div>
                </Grid.Col>
              </Grid>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="5" pt="xs">
            <Grid>
              <Grid.Col span={6}>
                <div className="position-relative">
                  <button
                    className="profileEditBtn top-0 end-3"
                    onClick={() => {
                      // setSelectedDeleteItem(item);
                      educationOpen();
                    }}
                    // handleClick={addOpen}
                  >
                    <RxPencil2 className="iconBtn" />
                  </button>
                  <h4 className="mb-3">
                    <TbSquareRoundedFilled className="roundIcon" />
                    Education
                  </h4>
                  <div className="employeeInfo borderLeft">
                    <p>
                      <span>Certification:</span>SSC
                    </p>
                    <p>
                      <span>Institute:</span>ML Heigh School
                    </p>
                    <p>
                      <span>Level:</span>2
                    </p>
                    <p>
                      <span>Grade:</span>A
                    </p>
                    <p>
                      <span>Passing Year:</span>2018
                    </p>
                  </div>
                  <div className="employeeInfo borderLeft">
                    <p>
                      <span>Certification:</span>SSC
                    </p>
                    <p>
                      <span>Institute:</span>ML Heigh School
                    </p>
                    <p>
                      <span>Level:</span>2
                    </p>
                    <p>
                      <span>Grade:</span>A
                    </p>
                    <p>
                      <span>Passing Year:</span>2018
                    </p>
                  </div>
                </div>
              </Grid.Col>
              <Grid.Col span={6}>
                <div className="position-relative">
                  <button
                    className="profileEditBtn top-0 end-0"
                    onClick={() => {
                      // setSelectedDeleteItem(item);
                      experienceOpen();
                    }}
                    // handleClick={addOpen}
                  >
                    <RxPencil2 className="iconBtn" />
                  </button>
                  <h4 className="mb-3">
                    <TbSquareRoundedFilled className="roundIcon" />
                    Experience
                  </h4>
                  <div className="employeeInfo borderLeft">
                    <p>
                      <span>Company Name:</span>Xyz Conpany
                    </p>
                    <p>
                      <span>Designation:</span>UI/UX Designer
                    </p>
                    <p>
                      <span>Address:</span>Mirpur
                    </p>
                    <p>
                      <span>From:</span>03-Jun-2022
                    </p>
                    <p>
                      <span>To:</span>05-Feb-2023
                    </p>
                  </div>
                  <div className="employeeInfo borderLeft">
                    <p>
                      <span>Company Name:</span>Xyz Conpany
                    </p>
                    <p>
                      <span>Designation:</span>UI/UX Designer
                    </p>
                    <p>
                      <span>Address:</span>Mirpur
                    </p>
                    <p>
                      <span>From:</span>03-Jun-2022
                    </p>
                    <p>
                      <span>To:</span>05-Feb-2023
                    </p>
                  </div>
                </div>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>
          <Tabs.Panel value="6" pt="xs">
            <div className="position-relative">
              <button
                className="profileEditBtn top-0 end-0"
                onClick={() => {
                  // setSelectedDeleteItem(item);
                  documentsOpen();
                }}
                // handleClick={addOpen}
              >
                <RxPencil2 className="iconBtn" />
              </button>
              <h4 className="mb-3">
                <TbSquareRoundedFilled className="roundIcon" />
                Documents
              </h4>
              <div className="d-flex">
                <button
                  className="docItem me-4"
                  onClick={() => {
                    nidOpen();
                  }}
                >
                  <CiCreditCard2 className="docBtn" />
                  <h6>NID/Passport</h6>
                </button>
                <button
                  className="docItem me-4"
                  onClick={() => {
                    resumeOpen();
                  }}
                >
                  <PiIdentificationCardLight className="docBtn" />
                  <h6>Resume</h6>
                </button>
                <button
                  className="docItem me-4"
                  onClick={() => {
                    appointmentOpen();
                  }}
                >
                  <CiFileOn className="docBtn fs-2" />
                  <h6>Appointment Letter</h6>
                </button>
              </div>
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </>
  );
};

export default ProfileView;
