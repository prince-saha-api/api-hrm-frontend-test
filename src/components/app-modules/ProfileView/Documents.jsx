import React, { useState } from "react";
import { Modal, Button, Group, FileInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { FaFile } from "react-icons/fa6";
import { TbPhotoFilled } from "react-icons/tb";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";

const EditDocuments = ({ opened, close, item, setItem }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      documents:
        item?.employee_docs?.map((doc) => ({
          id: doc.id,
          title: doc.title,
          attachment: null,
          key: randomId(),
        })) || [],
    },
    validate: {
      documents: {
        attachment: (value) =>
          value ? validateFile(value, ["application/pdf"], 1) : null,
      },
    },
  });

  const handleSubmit = async (values) => {
    const updatedDocuments = values.documents
      .map((doc) => ({
        id: doc.id,
        title: doc.title,
        attachment: doc.attachment,
      }))
      .filter((item) => item.attachment);

    if (!updatedDocuments?.length) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formValues = new FormData();

      const flattenObject = (arr, prefix = "") => {
        arr.forEach((item, index) => {
          const formKeyPrefix = `${prefix}[${index}]`;
          Object.keys(item).forEach((key) => {
            const value = item[key];
            const formKey = `${formKeyPrefix}[${key}]`;

            if (
              value &&
              typeof value === "object" &&
              !(value instanceof File)
            ) {
              flattenObject([value], formKey);
            } else {
              formValues.append(formKey, value);
            }
          });
        });
      };

      flattenObject(updatedDocuments, "documents");

      const response = await update(
        `/api/user/update-documents/${item.id}`,
        formValues,
        true
      );

      if (response?.status === "success") {
        setIsSubmitting(false);
        close();
        setItem((prev) => ({
          ...prev,
          employee_docs: response?.data?.employee_docs || [],
        }));
        toast.success("Profile updated successfully");
      } else {
        setIsSubmitting(false);
        if (response?.status === "error" && Array.isArray(response.message)) {
          response.message.forEach((msg) => {
            toast.error(msg);
          });
        } else {
          toast.error("Error submitting form");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
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
        {form.getValues().documents.map((doc, index) => (
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
              disabled={isSubmitting}
              leftSectionPointerEvents="none"
              {...form.getInputProps(`documents.${index}.attachment`)}
              key={form.key(`documents.${index}.attachment`)}
            />
          </div>
        ))}

        <Group justify="flex-end" mt="md">
          <Button
            variant="filled"
            type="submit"
            loading={isSubmitting}
            loaderProps={{ type: "dots" }}
          >
            Update
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default EditDocuments;
