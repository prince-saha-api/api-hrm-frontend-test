"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Dropdown from "react-bootstrap/Dropdown";
import { logout } from "../../../lib/auth";
import { getLoggedInUser } from "../../../lib/getter";
import { getStoragePath } from "../../../lib/helper";
import { authTokenKey, authUserKey } from "../../../lib/config";
import { HiMenuAlt2 } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/logo.png";
import profileImg from "../../../../public/profile01.jpg";
import { RiMenu4Fill } from "react-icons/ri";


const Navbar = () => {
   // const { logout } = useAuth();
   const router = useRouter();

   const [userImagePath, setUserImagePath] = useState("");

   useEffect(() => {
      const userData = getLoggedInUser();
      const imagePath =
         userData?.image && userData?.image !== ""
            ? getStoragePath(userData?.image)
            : "/images.png";
      setUserImagePath(imagePath);
   }, []);

   const handleLogout = async (e) => {
      e.preventDefault();

      try {
         const res = await logout();

         if (res) {
            // localStorage.setItem("user", JSON.stringify({}));
            localStorage.removeItem("user");
            Cookies.remove(authUserKey);
            Cookies.remove(authTokenKey);
         }

         // Redirect to the login page or any other desired page
         router.push("/auth/login");
      } catch (error) {
         console.error("Logout failed", error);
      }
   };

   return (
      <div className="topbar d-flex">
         <div className="logoBox">
            <Link
               href="/dashboard"
               className="main_logo text-decoration-none d-flex justify-content-start align-items-center"
            >
               <Image src={Logo} className="logo" />
            </Link>
         </div>

         <div className="d-flex justify-content-between align-items-center w-100">
            <div className="toggle">
               <HiMenuAlt2 className="toggleIcon" />
            </div>
            <div className="profileBox">
               <Dropdown>
                  <Dropdown.Toggle className="border-0 me-4 pro_img_bg">
                     <Image src={profileImg} alt="img" className="profile_img" />
                     <span className="ms-1">Admin</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="profile_item rounded-1">
                     <Dropdown.Item href="#" onClick={(e) => handleLogout(e)}>
                        Logout
                     </Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
