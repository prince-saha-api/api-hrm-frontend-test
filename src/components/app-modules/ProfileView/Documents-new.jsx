import React, { useState } from "react";
import { Modal, Button, Group, FileInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FaFile } from "react-icons/fa6";
import { TbPhotoFilled } from "react-icons/tb";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";

const EditDocuments = ({ opened, close, item, setItem }) => {
  const validateFile = (file, allowedTypes, maxSizeMb) => {
    if (!file) return null;
    const fileType = file.type;
    const fileSizeMb = file.size / 1024 / 1024;

    if (!allowedTypes.includes(fileType)) {
      return `File type must be one of ${allowedTypes.join(", ")}`;
    }

    if (fileSizeMb > maxSizeMb) {
      return `File size must be no more than ${maxSizeMb} MB`;
    }

    return null;
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      docs:
        item?.employee_docs?.map((doc) => ({
          id: doc.id,
          title: doc.title,
          attachment: doc.attachment || null,
        })) || [],
    },

    // validate: item?.employee_docs.reduce((acc, doc) => {
    //   acc[doc.id] = (value) =>
    //     value
    //       ? validateFile(value, ["application/pdf"], 1)
    //       : `${doc.title} is required`;
    //   return acc;
    // }, {}),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    const updatedDocuments = values.docs.map((doc) => ({
      id: doc.id,
      title: doc.title,
      attachment: doc.attachment,
    }));

    console.log(updatedDocuments);

    return;

    try {
      const formValues = new FormData();

      updatedDocuments.forEach((doc) => {
        formValues.append(`documents[${doc.id}][title]`, doc.title);
        formValues.append(`documents[${doc.id}][attachment]`, doc.attachment);
      });

      const response = await update(
        `/api/user/update-documents/${item.id}`,
        updatedDocuments,
        true
      );

      if (response?.status === "success") {
        close();
        setItem((prev) => ({
          ...prev,
          employee_docs: response?.data?.employee_docs || [],
        }));
        toast.success("Profile updated successfully");
      } else {
        toast.error(
          response?.status === "error"
            ? response?.message[0]
            : "Error submitting form"
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleError = (errors) => {
    console.log(errors);
  };

  return (
    <Modal
      classNames={{
        title: "modalTitle",
      }}
      opened={opened}
      title="Edit Documents"
      onClose={close}
      centered
    >
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values), handleError)}
      >
        {form.getValues().docs.map((doc, index) => (
          <div key={doc.id}>
            <FileInput
              mb="sm"
              leftSection={
                doc.title === "Photo" ? (
                  <TbPhotoFilled className="fileIcon" />
                ) : (
                  <FaFile className="fileIcon" />
                )
              }
              placeholder={doc.title}
              label={doc.title}
              leftSectionPointerEvents="none"
              // {...form.getInputProps(`docs.${index}.attachment`)}
              // key={form.key(`docs.${index}.attachment`)}
            />
          </div>
        ))}

        <Group justify="flex-end" mt="md">
          <Button variant="filled" type="submit">
            Update
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default EditDocuments;
