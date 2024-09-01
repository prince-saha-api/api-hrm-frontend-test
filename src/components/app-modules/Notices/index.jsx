"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useDisclosure } from "@mantine/hooks";
import { Pagination, Grid, Button } from "@mantine/core";
import { LuPlus } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import { BsPencilSquare } from "react-icons/bs";
import { CgFileDocument } from "react-icons/cg";
import { fetcher } from "@/lib/fetch";
import Breadcrumb from "@/components/utils/Breadcrumb";
import AddButton from "@/components/utils/AddButton";
import { constants } from "@/lib/config";
import { getDate, getTime } from "@/lib/helper";
import Add from "./Add";
import Edit from "./Edit";
import Delete from "./Delete";
import ViewModal from "./View";

const PAGE_SIZES = constants.PAGE_SIZES;

const Index = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  let apiUrl = `/api/notice/get-noticeboard/?page=${currentPage}&page_size=${pageSize}`;

  const {
    data: notices,
    error,
    isValidating,
    isLoading,
    mutate,
  } = useSWR(apiUrl, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
    revalidateOnFocus: false,
  });

  const totalPages = notices ? Math.ceil(notices.data.count / pageSize) : 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // for Modal
  const [opened, { open, close }] = useDisclosure(false);
  const [addOpened, { open: addOpen, close: addClose }] = useDisclosure(false);
  const [editOpened, { open: editOpen, close: editClose }] =
    useDisclosure(false);
  const [deleteOpened, { open: deleteOpen, close: deleteClose }] =
    useDisclosure(false);

  const [selectedViewItem, setSelectedViewItem] = useState(null);
  const [selectedEditItem, setSelectedEditItem] = useState(null);
  const [selectedDeleteItem, setSelectedDeleteItem] = useState(null);

  useEffect(() => {
    if (selectedEditItem) {
      editOpen();
    }
  }, [selectedEditItem]);

  return (
    <>
      <Add
        opened={addOpened} //
        close={addClose}
        mutate={mutate}
      />

      <Edit
        opened={editOpened}
        close={editClose}
        item={selectedEditItem}
        setItem={setSelectedEditItem}
        mutate={mutate}
      />

      <Delete
        opened={deleteOpened}
        close={deleteClose}
        item={selectedDeleteItem}
        mutate={mutate}
      />

      <ViewModal opened={opened} close={close} item={selectedViewItem} />

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

      <Grid>
        <Grid.Col span={8} offset={2}>
          <div className="itemCard">
            <div className="mb-2">
              <h5 className="mb-0">Notice Board</h5>
            </div>

            {notices && notices?.data?.result?.length ? (
              notices?.data?.result.map((item, index) => (
                <div className="position-relative" key={index}>
                  <Button
                    onClick={() => {
                      setSelectedViewItem(item);
                      open();
                    }}
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
                        {index + 1 + (currentPage - 1) * pageSize}.{" "}
                        {item?.title}
                      </p>
                      <p className="noticDate mb-0 d-block text-start py-2">
                        {getTime(item?.updated_at)} |{" "}
                        {getDate(item?.publish_date)}
                      </p>
                    </div>
                  </Button>
                  <div className="noticeAction p-1">
                    <Button
                      onClick={() => {
                        setSelectedEditItem(item);
                      }}
                      size="compact-sm"
                      variant="white"
                    >
                      <BsPencilSquare />
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedDeleteItem(item);
                        deleteOpen();
                      }}
                      size="compact-sm"
                      variant="white"
                    >
                      <LuTrash2 />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <h5 className="d-flex justify-content-center mt-3">
                No data found!
              </h5>
            )}

            <div className="mt-4 d-flex justify-content-end">
              <Pagination
                size="sm"
                total={totalPages}
                page={currentPage}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Index;
