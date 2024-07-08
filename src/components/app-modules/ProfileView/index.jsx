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
} from "@mantine/core";
import Breadcrumb from "@/components/utils/Breadcrumb";
import { TbEyeClosed } from "react-icons/tb";
import { CiCreditCard2 } from "react-icons/ci";
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
import ProfileEdit from "./ProfileEdit";
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
  const [profileOpened, { open: ProfileOpen, close: profileClose }] =
    useDisclosure(false);
  const [passwordOpened, { open: PasswordOpen, close: passwordClose }] =
    useDisclosure(false);
  const [nidOpened, { open: NIDOpen, close: nidClose }] = useDisclosure(false);
  const [resumeOpened, { open: ResumeOpen, close: resumeClose }] =
    useDisclosure(false);
  const [
    appointmentOpened,
    { open: AppointmentOpen, close: appointmentClose },
  ] = useDisclosure(false);
  const [
    personalDetailsOpened,
    { open: PersonalDetailsOpen, close: personalDetailsClose },
  ] = useDisclosure(false);
  const [
    officialDetailsOpened,
    { open: OfficialDetailsOpen, close: officialDetailsClose },
  ] = useDisclosure(false);
  const [
    salaryLeavesOpened,
    { open: SalaryLeavesOpen, close: salaryLeavesClose },
  ] = useDisclosure(false);
  const [
    emergencyContactOpened,
    { open: EmergencyContactOpen, close: emergencyContactClose },
  ] = useDisclosure(false);
  const [educationOpened, { open: EducationOpen, close: educationClose }] =
    useDisclosure(false);
  const [experienceOpened, { open: ExperienceOpen, close: experienceClose }] =
    useDisclosure(false);

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
  // Table Job History
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.transition}</Table.Td>
      <Table.Td>{element.date}</Table.Td>
      <Table.Td>{element.jobStatus}</Table.Td>
      <Table.Td>{element.designation}</Table.Td>
      <Table.Td>{element.department}</Table.Td>
      <Table.Td>{element.joiningSalary}</Table.Td>
      <Table.Td>{element.newSalary}</Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      {/* <Add opened={addOpened} close={addClose} /> */}

      <ProfileEdit
        opened={profileOpened}
        close={profileClose}
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
            ProfileOpen();
          }}
          // handleClick={addOpen}
        >
          <RxPencil2 className="iconBtn" />
        </button>

        <Grid>
          <Grid.Col span={6}>
            <div className="profileBox borderRight h-100 d-flex">
              <div className="profile">
                <Image
                  src="/profile03.jpg"
                  width={200}
                  height={200}
                  alt="profile_img"
                />
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
                    className="border-0 ms-2 text-dark"
                    onClick={() => {
                      // setSelectedDeleteItem(item);
                      PasswordOpen();
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
                  PersonalDetailsOpen();
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
                      OfficialDetailsOpen();
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
                  SalaryLeavesOpen();
                }}
                // handleClick={addOpen}
              >
                <RxPencil2 className="iconBtn" />
              </button>
              <h4 className="mb-3">
                <TbSquareRoundedFilled className="roundIcon" />
                Salary and Leaves
              </h4>
              <div className="employeeInfo">
                <p>
                  <span>Payment In:</span>12000
                </p>
                <p>
                  <span>Monthly Gross Salary:</span>55000
                </p>
                <p>
                  <span>Leave Policy:</span>Leave-Policy-1
                </p>
                <p>
                  <span>Earning Policy:</span>Earning-Policy-1
                </p>
                <p>
                  <span>Deduction Policy:</span>Deduction-Policy-1
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
                  <span>Bank Address:</span>Banani Dhaka
                </p>
              </div>
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="4" pt="xs">
            <div className="position-relative">
              <button
                className="profileEditBtn top-0 end-0"
                onClick={() => {
                  // setSelectedDeleteItem(item);
                  EmergencyContactOpen();
                }}
                // handleClick={addOpen}
              >
                <RxPencil2 className="iconBtn" />
              </button>
              <h4 className="mb-3">
                <TbSquareRoundedFilled className="roundIcon" />
                Emergency Contact
              </h4>
              <div className="employeeInfo">
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
                  <span>City:</span>Mohammadpur
                </p>
                <p>
                  <span>State:</span>Dhaka
                </p>
                <p>
                  <span>ZIP Code:</span>1207
                </p>
                <p>
                  <span>Country:</span>Bangladesh
                </p>
                <p>
                  <span>Address:</span>Mohammadpur, Dhaka 1207 Bangladesh
                </p>
              </div>
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
                      EducationOpen();
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
                      ExperienceOpen();
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
              <h4 className="mb-3">
                <TbSquareRoundedFilled className="roundIcon" />
                Documents
              </h4>
              <div className="d-flex">
                <button
                  className="docItem me-4"
                  onClick={() => {
                    NIDOpen();
                  }}
                >
                  <CiCreditCard2 className="docBtn" />
                  <h6>NID/Passport</h6>
                </button>
                <button
                  className="docItem me-4"
                  onClick={() => {
                    ResumeOpen();
                  }}
                >
                  <PiIdentificationCardLight className="docBtn" />
                  <h6>Resume</h6>
                </button>
                <button
                  className="docItem me-4"
                  onClick={() => {
                    AppointmentOpen();
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
