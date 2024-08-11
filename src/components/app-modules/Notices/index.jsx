"use client";

import React, { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Pagination,
  Grid,
  Modal,
  Button,
  Select,
  Menu,
  MultiSelect,
  Popover,
  Group,
} from "@mantine/core";
import { LuPlus } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import { BsPencilSquare } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import Breadcrumb from "@/components/utils/Breadcrumb";
import AddButton from "@/components/utils/AddButton";
import Add from "./Add";
import Edit from "./Edit";
import Delete from "./Delete";

const Index = () => {
  const [opened, { open, close }] = useDisclosure(false);

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

  return (
    <>
      <Add opened={addOpened} close={addClose} />

      <Edit
        opened={editOpened}
        close={editClose}
        item={selectedEditItem}
        setItem={setSelectedEditItem}
      />

      <Delete
        opened={deleteOpened}
        close={deleteClose}
        item={selectedDeleteItem}
      />

      <div className="mb-4 d-flex justify-content-between align-items-end">
        <Breadcrumb
          title="Notices"
          items={[
            { title: "Dashboard", href: "/dashboard" },
            { title: "Notices" },
          ]}
        />

        <AddButton
          label="Add Notice"
          fontSize="16px"
          icon={<LuPlus className="fs-5 me-0 mr-0" />}
          handleClick={addOpen}
        />
      </div>

      <Modal opened={opened} onClose={close} title="Notice" centered>
        <h4 className="mb-3 fs-5">Employee Summary</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
          laudantium ex veritatis amet consequatur magnam minus eos quas
          obcaecati maxime vel non impedit, labore odio atque quidem itaque
          quos? Molestias ullam cum, non maxime quis eveniet illum modi impedit
          distinctio consequuntur atque commodi natus id quod blanditiis,
          officia libero dolores cumque! Ipsam a aliquid enim reprehenderit
          nulla, veritatis totam asperiores. Consectetur porro numquam minus
          tempora consequuntur quibusdam accusantium dolorem facere aliquam vero
          natus tempore nobis distinctio officiis, vitae veniam ab amet. Ex
          nobis distinctio voluptate unde quo suscipit. Perspiciatis praesentium
          minus qui possimus eius fugit ex dolor temporibus deserunt corrupti?
        </p>
      </Modal>
      <Grid>
        <Grid.Col span={8} offset={2}>
          <div className="itemCard">
            <div className="mb-2">
              <h5 className="mb-0">Notice Board</h5>
            </div>

            <div className="position-relative">
              <Button
                onClick={open}
                className="mb-3"
                classNames={{
                  root: "rootBtn",
                  label: "labelBtn",
                  inner: "innerBtn",
                }}
              >
                <div className="buttonItem">
                  <CgFileDocument className="noticeIcon" />
                  <p className="noticTitle mb-0 text-start">
                    1. Lorem ipsum dolor sit amet, adipisicing elirdwe sit amet,
                    adipisicing elirdwe
                  </p>
                  <p className="noticDate mb-0 d-block text-start py-2">
                    02:10 PM | 21 Apr 2024
                  </p>
                </div>
              </Button>
              <div className="noticeAction p-1">
                <Button
                  onClick={() => {
                    // setSelectedEditItem(item);
                    editOpen();
                  }}
                  size="compact-sm"
                  variant="white"
                >
                  <BsPencilSquare />
                </Button>
                <Button
                  onClick={() => {
                    // setSelectedDeleteItem(item);
                    deleteOpen();
                  }}
                  size="compact-sm"
                  variant="white"
                >
                  <LuTrash2 />
                </Button>
              </div>
            </div>
            <div className="position-relative">
              <Button
                onClick={open}
                className="mb-3"
                classNames={{
                  root: "rootBtn",
                  label: "labelBtn",
                  inner: "innerBtn",
                }}
              >
                <div className="buttonItem">
                  <CgFileDocument className="noticeIcon" />
                  <p className="noticTitle mb-0 text-start">
                    2. Lorem ipsum dolor sit amet, adipisicing elirdwe sit amet,
                    adipisicing elirdwe
                  </p>
                  <p className="noticDate mb-0 d-block text-start py-2">
                    02:10 PM | 21 Apr 2024
                  </p>
                </div>
              </Button>
              <div className="noticeAction p-1">
                <Button
                  onClick={() => {
                    // setSelectedEditItem(item);
                    editOpen();
                  }}
                  size="compact-sm"
                  variant="white"
                >
                  <BsPencilSquare />
                </Button>
                <Button
                  onClick={() => {
                    // setSelectedDeleteItem(item);
                    deleteOpen();
                  }}
                  size="compact-sm"
                  variant="white"
                >
                  <LuTrash2 />
                </Button>
              </div>
            </div>
            <div className="position-relative">
              <Button
                onClick={open}
                className="mb-3"
                classNames={{
                  root: "rootBtn",
                  label: "labelBtn",
                  inner: "innerBtn",
                }}
              >
                <div className="buttonItem">
                  <CgFileDocument className="noticeIcon" />
                  <p className="noticTitle mb-0 text-start">
                    3. Lorem ipsum dolor sit amet, adipisicing elirdwe sit amet,
                    adipisicing elirdwe
                  </p>
                  <p className="noticDate mb-0 d-block text-start py-2">
                    02:10 PM | 21 Apr 2024
                  </p>
                </div>
              </Button>
              <div className="noticeAction p-1">
                <Button
                  onClick={() => {
                    // setSelectedEditItem(item);
                    editOpen();
                  }}
                  size="compact-sm"
                  variant="white"
                >
                  <BsPencilSquare />
                </Button>
                <Button
                  onClick={() => {
                    // setSelectedDeleteItem(item);
                    deleteOpen();
                  }}
                  size="compact-sm"
                  variant="white"
                >
                  <LuTrash2 />
                </Button>
              </div>
            </div>
            <div className="position-relative">
              <Button
                onClick={open}
                className="mb-3"
                classNames={{
                  root: "rootBtn",
                  label: "labelBtn",
                  inner: "innerBtn",
                }}
              >
                <div className="buttonItem">
                  <CgFileDocument className="noticeIcon" />
                  <p className="noticTitle mb-0 text-start">
                    4. Lorem ipsum dolor sit amet, adipisicing elirdwe sit amet,
                    adipisicing elirdwe
                  </p>
                  <p className="noticDate mb-0 d-block text-start py-2">
                    02:10 PM | 21 Apr 2024
                  </p>
                </div>
              </Button>
              <div className="noticeAction p-1">
                <Button
                  onClick={() => {
                    // setSelectedEditItem(item);
                    editOpen();
                  }}
                  size="compact-sm"
                  variant="white"
                >
                  <BsPencilSquare />
                </Button>
                <Button
                  onClick={() => {
                    // setSelectedDeleteItem(item);
                    deleteOpen();
                  }}
                  size="compact-sm"
                  variant="white"
                >
                  <LuTrash2 />
                </Button>
              </div>
            </div>
            <div className="position-relative">
              <Button
                onClick={open}
                className="mb-3"
                classNames={{
                  root: "rootBtn",
                  label: "labelBtn",
                  inner: "innerBtn",
                }}
              >
                <div className="buttonItem">
                  <CgFileDocument className="noticeIcon" />
                  <p className="noticTitle mb-0 text-start">
                    5. Lorem ipsum dolor sit amet, adipisicing elirdwe sit amet,
                    adipisicing elirdwe
                  </p>
                  <p className="noticDate mb-0 d-block text-start py-2">
                    02:10 PM | 21 Apr 2024
                  </p>
                </div>
              </Button>
              <div className="noticeAction p-1">
                <Button
                  onClick={() => {
                    // setSelectedEditItem(item);
                    editOpen();
                  }}
                  size="compact-sm"
                  variant="white"
                >
                  <BsPencilSquare />
                </Button>
                <Button
                  onClick={() => {
                    // setSelectedDeleteItem(item);
                    deleteOpen();
                  }}
                  size="compact-sm"
                  variant="white"
                >
                  <LuTrash2 />
                </Button>
              </div>
            </div>
            <div className="position-relative">
              <Button
                onClick={open}
                className="mb-3"
                classNames={{
                  root: "rootBtn",
                  label: "labelBtn",
                  inner: "innerBtn",
                }}
              >
                <div className="buttonItem">
                  <CgFileDocument className="noticeIcon" />
                  <p className="noticTitle mb-0 text-start">
                    6. Lorem ipsum dolor sit amet, adipisicing elirdwe sit amet,
                    adipisicing elirdwe
                  </p>
                  <p className="noticDate mb-0 d-block text-start py-2">
                    02:10 PM | 21 Apr 2024
                  </p>
                </div>
              </Button>
              <div className="noticeAction p-1">
                <Button
                  onClick={() => {
                    // setSelectedEditItem(item);
                    editOpen();
                  }}
                  size="compact-sm"
                  variant="white"
                >
                  <BsPencilSquare />
                </Button>
                <Button
                  onClick={() => {
                    // setSelectedDeleteItem(item);
                    deleteOpen();
                  }}
                  size="compact-sm"
                  variant="white"
                >
                  <LuTrash2 />
                </Button>
              </div>
            </div>

            <div className="mt-4 d-flex justify-content-end">
              <Pagination size="sm" total={10} />
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Index;
