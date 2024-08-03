"use client";

import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Burger, Avatar, Indicator } from "@mantine/core";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Dropdown from "react-bootstrap/Dropdown";
import { logout } from "../../../lib/auth";
import { getLoggedInUser } from "../../../lib/getter";
import { getStoragePath } from "../../../lib/helper";
import { authTokenKey, authUserKey } from "../../../lib/config";
import Link from "next/link";
import Image from "next/image";
import Logo from "public/logo.png";
import profileImg from "public/profile01.jpg";

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

  const [opened, { toggle }] = useDisclosure();
  return (
    <div className="topbar d-flex">
      <div className="logoBox">
        <Link
          href="/dashboard"
          className="main_logo text-decoration-none d-flex justify-content-start align-items-center"
        >
          <Image src={Logo} className="logo" alt="logo" />
        </Link>
      </div>

      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="toggle ms-3">
          <Burger
            classNames={{
              burger: "toggleIcon",
            }}
            opened={opened}
            onClick={toggle}
            aria-label="Toggle navigation"
          />
        </div>
        <div className="profileBox">
          <Dropdown>
            <Dropdown.Toggle className="border-0 me-4 d-flex align-items-center">
              {/* <Image src={profileImg} alt="img" className="profile_img" /> */}
              <Indicator
                // inline
                withBorder
                size={12}
                // processing
                offset={5}
                position="bottom-end"
                color="green"
              >
                <Avatar
                  size="37"
                  radius="xl"
                  src="https://media.licdn.com/dms/image/D5603AQHVDYHwJOCMMg/profile-displayphoto-shrink_200_200/0/1689354777920?e=2147483647&v=beta&t=GcBRig8My5RTMDsCxXcE4YC1DSOEi35O9-17P3HZsiE"
                />
              </Indicator>
              <span className="ms-2">Admin</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="profile_item rounded-1">
              <Dropdown.Item href="/profile-view">Profile</Dropdown.Item>
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
