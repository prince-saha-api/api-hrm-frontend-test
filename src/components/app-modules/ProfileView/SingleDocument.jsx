import React from "react";
import { Modal, Button } from "@mantine/core";
import Image from "next/image";
import nid from "public/nid.jpg";
import { FiDownload } from "react-icons/fi";
import { getStoragePath } from "@/lib/helper";

const Index = ({ opened, close, document }) => {
  return (
    <Modal
      classNames={{
        title: "modalTitle",
      }}
      opened={opened}
      title="NID/Passport"
      onClose={close}
      centered
    >
      <Image className="documentsImage" src={nid} alt="img" />
      <div className="mt-3">
        <Button rightSection={<FiDownload size={16} />}>Download</Button>
      </div>
      file: {getStoragePath(document?.attachment)}
      <a href={getStoragePath(document?.attachment)}>View</a>
    </Modal>
  );
};

export default Index;
