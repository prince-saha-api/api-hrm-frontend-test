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
} from "@mantine/core";
import Breadcrumb from "@/components/utils/Breadcrumb";
import { TbEyeClosed } from "react-icons/tb";
import { TimeInput } from "@mantine/dates";
import { IoTimeOutline } from "react-icons/io5";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { TbSquareRoundedFilled } from "react-icons/tb";
import { TbSquareRounded } from "react-icons/tb";
import { RxPencil2 } from "react-icons/rx";
import Delete from "./Delete";
// import Add from "./Add";

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
   // const [addOpened, { open: addOpen, close: addClose }] = useDisclosure(false);
   // const [editOpened, { open: editOpen, close: editClose }] = useDisclosure(false);
   const [deleteOpened, { open: deleteOpen, close: deleteClose }] =
      useDisclosure(false);

   // const [selectedEditItem, setSelectedEditItem] = useState(null);
   const [selectedDeleteItem, setSelectedDeleteItem] = useState(null);

   return (
      <>
         {/* <Add opened={addOpened} close={addClose} /> */}

         <Delete
            opened={deleteOpened}
            close={deleteClose}
            item={selectedDeleteItem}
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
                  deleteOpen();
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
                        <h6 className="employeeDesig mb-1">
                           Software Engineer
                        </h6>

                        <p className="employeeJoin mb-1">
                           <b>Employee ID : API2202016</b>
                        </p>
                        <p className="employeeJoin mb-1">
                           Department : Development
                        </p>
                        <p className="employeeJoin mb-1">
                           Date of Join : 1st Jan 2021
                        </p>
                        <p className="employeeJoin mb-1">
                           Annual Leave : 16{" "}
                           <span className="text-warning">
                              (Remaining Leave: 4)
                           </span>
                        </p>
                        <p className="employeeJoin">
                        <span>Reset Password:</span>
                        <button
                           className="border-0 ms-2"
                           onClick={() => {
                              // setSelectedDeleteItem(item);
                              deleteOpen();
                           }}
                           // handleClick={addOpen}
                        >
                           <TbEyeClosed className="iconBtn me-2" />
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
                        <Link
                           className="email"
                           href="mailto:jiaur883@gmail.com"
                        >
                           jiaur883@gmail.com
                        </Link>
                     </p>
                     <p>
                        <span>Date of Birth:</span>24-July-1996
                     </p>
                     <p>
                        <span>Address:</span>Bayonne Ave, Manchester Township,
                        Nkgkgke, Mancheste Real Likebto power tomaar Fcace door
                     </p>
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

         <Grid>
            <Grid.Col span={6}>
               <div className="itemCard h-100 mb-0">
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
                        <span>Religion:</span> Islam
                     </p>
                     <p>
                        <span>NID / Passport:</span> 199523400099
                     </p>
                     <p>
                        <span>TIN No:</span> 99622240
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
            </Grid.Col>
            <Grid.Col span={6}>
               <div className="itemCard h-100 mb-0">
                  <h4 className="mb-3">
                     <TbSquareRoundedFilled className="roundIcon" />
                     Official Details
                  </h4>
                  <div className="employeeInfo">
                     <p>
                        <span>Official Email:</span>99622240
                     </p>
                     <p>
                        <span>Official Phone:</span>99622240
                     </p>
                     <p>
                        <span>Employee Type:</span>99622240
                     </p>
                     <p>
                        <span>Company:</span> 99622240
                     </p>
                     <p>
                        <span>Branch:</span> 99622240
                     </p>
                     <p>
                        <span>Default Shift:</span> 99622240
                     </p>
                     <p>
                        <span>Grade:</span> 99622240
                     </p>
                     <p>
                        <span>User Role:</span> 99622240
                     </p>
                     <p>
                        <span>Official Note:</span> 99622240
                     </p>
                     <p>
                        <span>Group:</span> 99622240
                     </p>
                     <p>
                        <span>Joining Date:</span> 99622240
                     </p>
                     <p>
                        <span>Expense Approver:</span> 99622240
                     </p>
                     <p>
                        <span>Leave Approver:</span> 99622240
                     </p>
                     <p>
                        <span>Shift Approver:</span> 99622240
                     </p>
                  </div>
               </div>
            </Grid.Col>
            <Grid.Col span={6}>
               <div className="itemCard h-100 mb-0">
                  <h4 className="mb-3">
                     <TbSquareRoundedFilled className="roundIcon" />
                     Salary and Leaves
                  </h4>
                  <div className="employeeInfo">
                     <p>
                        <span>Payment In:</span>99622240
                     </p>
                     <p>
                        <span>Monthly Gross Salary:</span>99622240
                     </p>
                     <p>
                        <span>Leave Policy:</span>99622240
                     </p>
                     <p>
                        <span>Earning Policy:</span>99622240
                     </p>
                     <p>
                        <span>Deduction Policy:</span>99622240
                     </p>
                     <p>
                        <span>Bank Name:</span>99622240
                     </p>
                     <p>
                        <span>Branch:</span>99622240
                     </p>
                     <p>
                        <span>Bank Account Type:</span>99622240
                     </p>
                     <p>
                        <span>Account No:</span>99622240
                     </p>
                     <p>
                        <span>Routing No:</span>99622240
                     </p>
                     <p>
                        <span>SWIFT:</span>99622240
                     </p>
                     <p>
                        <span>Bank Address:</span>99622240
                     </p>
                  </div>
               </div>
            </Grid.Col>
            <Grid.Col span={6}>
               <div className="itemCard h-100 mb-0">
                  <h4 className="mb-3">
                     <TbSquareRoundedFilled className="roundIcon" />
                     Emergency Contact
                  </h4>
                  <div className="employeeInfo">
                     <p>
                        <span>Name:</span>99622240
                     </p>
                     <p>
                        <span>Age:</span>99622240
                     </p>
                     <p>
                        <span>Phone No:</span>99622240
                     </p>
                     <p>
                        <span>Email:</span>99622240
                     </p>
                     <p>
                        <span>Address:</span>Mohammadpur, Dhaka 1207 Bangladesh
                     </p>
                  </div>
               </div>
            </Grid.Col>
            <Grid.Col span={6}>
               <div className="itemCard h-100 mb-0">
                  <h4 className="mb-3">
                     <TbSquareRoundedFilled className="roundIcon" />
                     Emergency Contact
                  </h4>
                  <div className="employeeInfo">
                     <h5 className="mt-3">Educational Background</h5>
                     <p>
                        <span>Certification:</span>99622240
                     </p>
                     <p>
                        <span>Institute:</span>99622240
                     </p>
                     <p>
                        <span>Level:</span>99622240
                     </p>
                     <p>
                        <span>Grade:</span>99622240
                     </p>
                     <p>
                        <span>Passing Year:</span>99622240
                     </p>
                     <h5 className="mt-3">Experiences</h5>
                     <p>
                        <span>Company Name:</span>99622240
                     </p>
                     <p>
                        <span>Designation:</span>99622240
                     </p>
                     <p>
                        <span>Address:</span>99622240
                     </p>
                     <p>
                        <span>From:</span>99622240
                     </p>
                     <p>
                        <span>To:</span>99622240
                     </p>
                  </div>
               </div>
            </Grid.Col>
            <Grid.Col span={6}>
               <div className="itemCard h-100 mb-0">
                  <h4 className="mb-3">
                     <TbSquareRoundedFilled className="roundIcon" />
                     Documents
                  </h4>
                  <div className="employeeInfo">
                     <p>
                        <span>NID/Passport:</span>99622240
                     </p>
                     <p>
                        <span>Resume:</span>99622240
                     </p>
                     <p>
                        <span>Appointment Letter:</span>99622240
                     </p>
                     <p>
                        <span>Photo:</span>99622240
                     </p>
                  </div>
               </div>
            </Grid.Col>
         </Grid>
      </>
   );
};

export default ProfileView;
