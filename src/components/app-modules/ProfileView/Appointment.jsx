import React, { useState } from "react";
import {
  Modal,
  Button,
  Group,
  Grid,
  TextInput,
  Select,
  NumberInput,
  Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { toast } from "react-toastify";
import { deleteItem } from "@/lib/submit";
import Image from "next/image";
import appointment from "public/appointment.jpg";
import { FiDownload } from "react-icons/fi";

const Index = ({ opened, close, item }) => {
  return (
    <Modal
      classNames={{
        title: "modalTitle",
      }}
      opened={opened}
      title="Appointment Letter"
      onClose={close}
      centered
    >
      <Image className="documentsImage" src={appointment} alt="img" />
      <div className="mt-3">
        <Button rightSection={<FiDownload size={16} />}>Download</Button>
      </div>
    </Modal>
  );
};

export default Index;
