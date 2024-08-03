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
import { FaRegFileAlt } from "react-icons/fa";

const arrowIcon = <HiArrowLongRight />;

const index = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const autoplay = useRef(Autoplay({ delay: 4000 }));

  return (
    <>
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
        {/* <Grid.Col span={3}>
          <div className="itemCard h-100">
            <h5 className="mb-3 ">Notice Title Here</h5>
            <div className="cardBox">
              <h5 className="leaveTitle text-center">Total Employee</h5>
              <h1 className="mb-0 text-center d-block leaveLeft">35</h1>
            </div>
            <div className="cardBox">
              <h5 className="leaveTitle text-center">New Joined</h5>
              <h1 className="mb-0 text-center d-block leaveLeft">3</h1>
            </div>
            <div className="cardBox">
              <h5 className="leaveTitle text-center">Resigned/Terminated</h5>
              <h1 className="mb-0 text-center d-block leaveLeft">2</h1>
            </div>
          </div>
        </Grid.Col> */}
        {/* <Grid.Col span={6}>
          <div className="itemCard h-100">
            <h5 className="mb-3 text-center">Employee Attendance Summary</h5>
            <PieChart />
          </div>
        </Grid.Col> */}
        <Grid.Col span={3}>
          <div className="itemCard h-100">
            <div className="mb-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Notice Board</h5>
              <Button size="sm" variant="light" rightSection={arrowIcon}>
                View All
              </Button>
            </div>
            <Carousel
              // withIndicators
              height={300}
              slideSize="20%"
              slideGap="md"
              loop
              align="start"
              slidesToScroll={1}
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.play}
              orientation="vertical"
            >
              <Carousel.Slide>
                <Button
                  onClick={open}
                  className="noticeButton text-dark position-relative bg-light"
                >
                  <div className="buttonItem">
                    {/* <FaRegFileAlt className="noticeIcon" /> */}
                    <p className="noticTitle d-block w-100 mb-0">
                      Lorem ipsum dolor
                    </p>
                    {/* <p className="mb-0 d-block">02:10 PM | 21 Apr 2024</p> */}
                  </div>
                </Button>
              </Carousel.Slide>
            </Carousel>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default index;
