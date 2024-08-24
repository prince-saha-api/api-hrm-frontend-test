import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import {
  Modal,
  Button,
  Group,
  Grid,
  TextInput,
  Select,
  NumberInput,
  Textarea,
  DateInput,
  Checkbox,
} from "@mantine/core";
import { FaTrashAlt } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";

const Index = ({ opened, close, item, setItem }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      academicRecord:
        item?.employee_academichistory && item.employee_academichistory.length
          ? item.employee_academichistory.map((item) => ({
              ...item,
              key: randomId(),
            }))
          : [
              {
                key: randomId(),
                certification: "",
                board_institute_name: "",
                level: "",
                score_grade: "",
                year_of_passing: null,
              },
            ],
    },
    validate: {
      academicRecord: {
        certification: (value) =>
          value?.length < 2 ? "Name must have at least 2 letters" : null,
      },
    },
  });

  const addMoreAcademicRecord = () => {
    const newAcademicRecord = {
      key: randomId(),
      certification: "",
      board_institute_name: "",
      level: "",
      score_grade: "",
      year_of_passing: "",
    };

    form.insertListItem("academicRecord", newAcademicRecord);
  };

  const removeAcademicRecord = (index) => {
    // if (form.values.academicRecord.length > 1) {
    //   form.removeListItem("academicRecord", index);
    // }
    form.removeListItem("academicRecord", index);
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    console.log(values);

    const originalContacts = item?.employee_academichistory || [];
    const updatedContacts = values.academicRecord;

    // Identify contacts that are in the original data but not in the updated data (to be deleted)
    const toDelete = originalContacts
      .filter(
        (originalContact) =>
          !updatedContacts.some(
            (updatedContact) => updatedContact?.id === originalContact.id
          )
      )
      .map((contact) => contact.id);

    // Identify contacts that exist in both original and updated data (to be updated)
    const toUpdate = updatedContacts
      .filter((updatedContact) =>
        originalContacts.some(
          (originalContact) => originalContact.id === updatedContact?.id
        )
      )
      .map((contact) => ({
        id: contact.id,

        certification: contact.certification,
        board_institute_name: contact.board_institute_name,
        level: contact.level,
        score_grade: contact.score_grade,
        year_of_passing: contact.year_of_passing,
      }));

    // Identify new contacts in the updated data that aren't in the original data (to be added)
    const toAdd = updatedContacts
      .filter((updatedContact) => !updatedContact?.id)
      .map((contact) => ({
        certification: contact.certification,
        board_institute_name: contact.board_institute_name,
        level: contact.level,
        score_grade: contact.score_grade,
        year_of_passing: contact.year_of_passing,
      }));

    const payload = {
      delete: toDelete,
      update: toUpdate,
      add: toAdd,
    };

    // console.log(payload);
    // return;

    try {
      const response = await update(
        `/api/user/update-education/${item.id}`,
        payload
      );

      if (response?.status === "success") {
        setIsSubmitting(false);
        close();
        // mutate();
        setItem((prev) => ({
          ...prev,
          employee_academichistory:
            response?.data?.employee_academichistory || [],
        }));
        toast.success("Profile updated successfully");
      } else {
        toast.error(
          response?.status === "error"
            ? response?.message[0]
            : "Error submitting form"
        );
      }
      setTimeout(() => {
        setIsSubmitting(false);
        // mutate();
      }, 500);
    } catch (error) {
      console.error("Error submitting form:", error);
      setTimeout(() => {
        setIsSubmitting(false);
        // mutate();
      }, 500);
    }
  };

  const handleError = (errors) => {
    console.log(errors);
  };

  return (
    <>
      <Modal
        classNames={{
          title: "modalTitle",
        }}
        opened={opened}
        title="Edit Education"
        onClose={close}
        centered
      >
        <form
          onSubmit={form.onSubmit(
            (values) => handleSubmit(values),
            handleError
          )}
        >
          {form.getValues().academicRecord.map((contact, index) => (
            <div key={contact.key}>
              {form.getValues().academicRecord.length > 1 && (
                <div className="d-flex align-items-start w-100 cust_mt mb-3">
                  <Button
                    color="red"
                    variant="outline"
                    leftSection={<FaTrashAlt />}
                    onClick={() => removeAcademicRecord(index)}
                  >
                    Remove
                  </Button>
                </div>
              )}

              <TextInput
                mb="sm"
                label="Certification"
                placeholder="Certification"
                // disabled={isSubmitting}
                {...form.getInputProps(`academicRecord.${index}.certification`)}
              />
              <TextInput
                mb="sm"
                label="Institute"
                placeholder="Institute"
                // disabled={isSubmitting}
                {...form.getInputProps(
                  `academicRecord.${index}.board_institute_name`
                )}
              />
              <TextInput
                mb="sm"
                label="Level"
                placeholder="Level"
                // disabled={isSubmitting}
                {...form.getInputProps(`academicRecord.${index}.level`)}
              />
              <TextInput
                mb="sm"
                label="Grade"
                placeholder="Grade"
                // disabled={isSubmitting}
                {...form.getInputProps(`academicRecord.${index}.score_grade`)}
              />
              <NumberInput
                // mb="sm"
                label="Passing Year"
                placeholder="Passing Year"
                hideControls
                {...form.getInputProps(
                  `academicRecord.${index}.year_of_passing`
                )}
              />
            </div>
          ))}

          <Button
            className="ps-0"
            justify="center"
            leftSection={<LuPlus className="me-0 fs-5" />}
            variant="transparent"
            onClick={addMoreAcademicRecord}
          >
            Add More
          </Button>

          <Group justify="flex-end" mt="md">
            <Button
              type="submit"
              variant="filled"
              loading={isSubmitting}
              loaderProps={{ type: "dots" }}
            >
              Update
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Index;
