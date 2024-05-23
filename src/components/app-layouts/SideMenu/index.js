"use client";

import React from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { BiTargetLock } from "react-icons/bi";
import { MdDeviceHub } from "react-icons/md";
import { LuNewspaper } from "react-icons/lu";
import { FiSettings } from "react-icons/fi";
import { VscSettings } from "react-icons/vsc";
import { RiUserSettingsLine } from "react-icons/ri";
import { BiDevices } from "react-icons/bi";
import { LuListChecks } from "react-icons/lu";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { PiBuildings } from "react-icons/pi";
import Accordion from "react-bootstrap/Accordion";
import Image from "next/image";
import Logo from "../../../../public/logo.png";

const Page = () => {
   return (
      <div id="navigation_part" className="side_nav">
         <div className="p-3">
            <div className="accordion_part">
               <div className="pb-2">
                  <Accordion>
                     {/* manu item 0 */}
                     <Accordion.Item eventKey="0" className="pt-0">
                        <p className="menuTitle mb-0">Menu</p>
                        <Accordion.Header className="p-0 m-0 text-capitalize">
                           <PiBuildings className="sideMenu menu_icon" />
                           <span className="text-capitalize sideMenu">
                              Company
                           </span>
                        </Accordion.Header>
                        <Accordion.Body>
                           <ul className="text-decoration-none mb-0 sidenav_submenu">
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/basic-info"
                                    className="text-decoration-none subMenu"
                                 >
                                    Basic info
                                 </Link>
                              </li>
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/branch"
                                    className="text-decoration-none subMenu"
                                 >
                                    Branch
                                 </Link>
                              </li>
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/departments"
                                    className="text-decoration-none subMenu"
                                 >
                                    Departments
                                 </Link>
                              </li>
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/designation"
                                    className="text-decoration-none subMenu"
                                 >
                                    Designation
                                 </Link>
                              </li>
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/#"
                                    className="text-decoration-none subMenu"
                                 >
                                    Shift
                                 </Link>
                              </li>
                           </ul>
                        </Accordion.Body>
                     </Accordion.Item>

                     {/* manu item 1 */}
                     <Accordion.Item eventKey="1" className="pt-0">
                        <Accordion.Header className="p-0 m-0 text-capitalize">
                           <LuUser2 className="sideMenu menu_icon" />
                           <span className="text-capitalize sideMenu">
                              Employee
                           </span>
                        </Accordion.Header>
                        <Accordion.Body>
                           <ul className="text-decoration-none mb-0 sidenav_submenu">
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/employees"
                                    className="text-decoration-none subMenu"
                                 >
                                    All employee
                                 </Link>
                              </li>
                           </ul>
                        </Accordion.Body>
                     </Accordion.Item>

                     {/* manu item 2 */}
                     <Accordion.Item eventKey="2" className="pt-0">
                        <Accordion.Header className="p-0 m-0 text-capitalize">
                           <LuNewspaper className="sideMenu menu_icon" />
                           <span className="text-capitalize sideMenu">
                              Leave
                           </span>
                        </Accordion.Header>
                        <Accordion.Body>
                           <ul className="text-decoration-none mb-0 sidenav_submenu">
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/holiday-list"
                                    className="text-decoration-none subMenu"
                                 >
                                    Holiday list
                                 </Link>
                              </li>
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/leave-policy"
                                    className="text-decoration-none subMenu"
                                 >
                                    Leave policy List
                                 </Link>
                              </li>
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/leave-policy-assign"
                                    className="text-decoration-none subMenu"
                                 >
                                    Leave Policy Assign
                                 </Link>
                              </li>
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/leave-allocation-request"
                                    className="text-decoration-none subMenu"
                                 >
                                    Leave Allocation Request
                                 </Link>
                              </li>
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/leave-request"
                                    className="text-decoration-none subMenu"
                                 >
                                    Leave Request
                                 </Link>
                              </li>
                           </ul>
                        </Accordion.Body>
                     </Accordion.Item>

                     {/* manu item 3 */}
                     <Accordion.Item eventKey="3" className="pt-0">
                        <Accordion.Header className="p-0 m-0 text-capitalize">
                           <FaRegMoneyBillAlt className="sideMenu menu_icon" />
                           <span className="text-capitalize sideMenu">
                              Payroll
                           </span>
                        </Accordion.Header>
                        <Accordion.Body>
                           <ul className="text-decoration-none mb-0 sidenav_submenu">
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/payslip"
                                    className="text-decoration-none subMenu"
                                 >
                                    payslip
                                 </Link>
                              </li>
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/add-employee"
                                    className="text-decoration-none subMenu"
                                 >
                                    Deducation type
                                 </Link>
                              </li>
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/add-employee"
                                    className="text-decoration-none subMenu"
                                 >
                                    Tradiness rules
                                 </Link>
                              </li>
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/add-employee"
                                    className="text-decoration-none subMenu"
                                 >
                                    Incentives and Bonuses
                                 </Link>
                              </li>
                           </ul>
                        </Accordion.Body>
                     </Accordion.Item>

                     {/* manu item 4 */}
                     <Accordion.Item eventKey="4" className="pt-0">
                        <Accordion.Header className="p-0 m-0 text-capitalize">
                           <LuListChecks className="sideMenu menu_icon" />
                           <span className="text-capitalize sideMenu">
                              Attendance
                           </span>
                        </Accordion.Header>
                        <Accordion.Body>
                           <ul className="text-decoration-none mb-0 sidenav_submenu">
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/add-employee"
                                    className="text-decoration-none subMenu"
                                 >
                                    Raw Data
                                 </Link>
                              </li>
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/add-employee"
                                    className="text-decoration-none subMenu"
                                 >
                                    Attendance Report
                                 </Link>
                              </li>
                           </ul>
                        </Accordion.Body>
                     </Accordion.Item>

                     {/* manu item 5 */}
                     <Accordion.Item eventKey="5" className="pt-0">
                        <Accordion.Header className="p-0 m-0 text-capitalize">
                           <BiDevices className="sideMenu menu_icon" />
                           <span className="text-capitalize sideMenu">
                              Device
                           </span>
                        </Accordion.Header>
                        <Accordion.Body>
                           <ul className="text-decoration-none mb-0 sidenav_submenu">
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/add-employee"
                                    className="text-decoration-none subMenu"
                                 >
                                    Add Device
                                 </Link>
                              </li>
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/add-employee"
                                    className="text-decoration-none subMenu"
                                 >
                                    Add Group
                                 </Link>
                              </li>
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/add-employee"
                                    className="text-decoration-none subMenu"
                                 >
                                    Assign to Group
                                 </Link>
                              </li>
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/add-employee"
                                    className="text-decoration-none subMenu"
                                 >
                                    Sync Log Data
                                 </Link>
                              </li>
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/add-employee"
                                    className="text-decoration-none subMenu"
                                 >
                                    Clear Raw Data
                                 </Link>
                              </li>
                           </ul>
                        </Accordion.Body>
                     </Accordion.Item>

                     {/* manu item 6 */}
                     <Accordion.Item eventKey="6" className="pt-0">
                        <Accordion.Header className="p-0 m-0 text-capitalize">
                           <RiUserSettingsLine className="sideMenu menu_icon" />
                           <span className="text-capitalize sideMenu">
                              User
                           </span>
                        </Accordion.Header>
                        <Accordion.Body>
                           <ul className="text-decoration-none mb-0 sidenav_submenu">
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/add-employee"
                                    className="text-decoration-none subMenu"
                                 >
                                    Create user
                                 </Link>
                              </li>
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/add-employee"
                                    className="text-decoration-none subMenu"
                                 >
                                    Create role
                                 </Link>
                              </li>
                              <li className="text-capitalize text-decoration-none sidenav_sub_item">
                                 <Link
                                    href="/add-employee"
                                    className="text-decoration-none subMenu"
                                 >
                                    User view
                                 </Link>
                              </li>
                           </ul>
                        </Accordion.Body>
                     </Accordion.Item>
                  </Accordion>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Page;
