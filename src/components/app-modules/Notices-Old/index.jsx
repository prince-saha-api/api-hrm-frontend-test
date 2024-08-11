"use client";
import React, { useEffect } from "react";
import { Grid, Modal, Button } from "@mantine/core";
import PieChart from "../PieChart/index";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { HiArrowLongRight } from "react-icons/hi2";
import { CgFileDocument } from "react-icons/cg";
import { FcDocument } from "react-icons/fc";
import { Pagination } from "@mantine/core";
import Breadcrumb from "@/components/utils/Breadcrumb";

const index = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  return (
    <>
      <div className="mb-4">
        <Breadcrumb
          title="Notice"
          items={[
            { title: "Dashboard", href: "/dashboard" },
            { title: "Notice" },
          ]}
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
            <Button
              onClick={open}
              classNames={{
                root: "rootBtn",
                label: "labelBtn",
                inner: "innerBtn",
              }}
            >
              <div className="buttonItem">
                <CgFileDocument className="noticeIcon" />
                <p className="noticTitle mb-0 text-start">
                  7. Lorem ipsum dolor sit amet, adipisicing elirdwe sit amet,
                  adipisicing elirdwe
                </p>
                <p className="noticDate mb-0 d-block text-start py-2">
                  02:10 PM | 21 Apr 2024
                </p>
              </div>
            </Button>

            <div className="mt-4 d-flex justify-content-end">
              <Pagination size="sm" total={10} />
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default index;
