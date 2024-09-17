import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { Modal, Button, Group, TextInput, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { FaTrashAlt } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { formatDateToYYYYMMDD } from "@/lib/helper";

const Index = ({ opened, close, item, setItem }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      previousExperience:
        item?.employee_experiencehistory &&
        item.employee_experiencehistory.length
          ? item.employee_experiencehistory.map((item) => ({
              ...item,
              from_date: item?.from_date ? new Date(item.from_date) : null,
              to_date: item?.to_date ? new Date(item.to_date) : null,
              key: randomId(),
            }))
          : [
              {
                key: randomId(),
                company_name: "",
                designation: "",
                address: "",
                from_date: null,
                to_date: null,
              },
            ],
    },
    validate: {
      previousExperience: {
        company_name: (value) =>
          value?.length < 2 ? "Name must have at least 2 letters" : null,
      },
    },
  });

  const addMorePreviousExperience = () => {
    const newPreviousExperience = {
      key: randomId(),
      company_name: "",
      designation: "",
      address: "",
      from_date: "",
      to_date: "",
    };

    form.insertListItem("previousExperience", newPreviousExperience);
  };

  const removePreviousExperience = (index) => {
    // if (form.values.previousExperience.length > 1) {
    //   form.removeListItem("previousExperience", index);
    // }
    form.removeListItem("previousExperience", index);
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    console.log(values);

    const originalContacts = item?.employee_experiencehistory || [];
    const updatedContacts = values.previousExperience;

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
        company_name: contact.company_name,
        designation: contact.designation,
        address: contact.address,
        from_date: formatDateToYYYYMMDD(contact.from_date),
        to_date: formatDateToYYYYMMDD(contact.to_date),
      }));

    // Identify new contacts in the updated data that aren't in the original data (to be added)
    const toAdd = updatedContacts
      .filter((updatedContact) => !updatedContact?.id)
      .map((contact) => ({
        company_name: contact.company_name,
        designation: contact.designation,
        address: contact.address,
        from_date: formatDateToYYYYMMDD(contact.from_date),
        to_date: formatDateToYYYYMMDD(contact.to_date),
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
        `/api/user/update-experience/${item.id}`,
        payload
      );

      if (response?.status === "success") {
        setIsSubmitting(false);
        close();
        // mutate();
        setItem((prev) => ({
          ...prev,
          employee_experiencehistory:
            response?.data?.employee_experiencehistory || [],
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
        title="Edit Experience"
        onClose={close}
        centered
      >
        <form
          onSubmit={form.onSubmit(
            (values) => handleSubmit(values),
            handleError
          )}
        >
          {form.getValues().previousExperience.map((contact, index) => (
            <div key={contact.key}>
              {form.getValues().previousExperience.length > 1 && (
                <div className="d-flex align-items-start w-100 cust_mt mb-3">
                  <Button
                    color="red"
                    variant="outline"
                    leftSection={<FaTrashAlt />}
                    onClick={() => removePreviousExperience(index)}
                  >
                    Remove
                  </Button>
                </div>
              )}
              <TextInput
                mb="sm"
                label="Company Name"
                placeholder="Company Name"
                // disabled={isSubmitting}
                {...form.getInputProps(
                  `previousExperience.${index}.company_name`
                )}
              />
              <TextInput
                mb="sm"
                label="Designation"
                placeholder="Designation"
                // disabled={isSubmitting}
                {...form.getInputProps(
                  `previousExperience.${index}.designation`
                )}
              />
              <Textarea
                mb="sm"
                label="Address"
                placeholder="Address"
                {...form.getInputProps(`previousExperience.${index}.address`)}
              />

              <DateInput
                mb="sm"
                label="From"
                placeholder="Pick date"
                {...form.getInputProps(`previousExperience.${index}.from_date`)}
              />
              <DateInput
                mb="sm"
                label="To"
                placeholder="Pick date"
                {...form.getInputProps(`previousExperience.${index}.to_date`)}
              />
            </div>
          ))}

          <Button
            className="ps-0"
            justify="center"
            leftSection={<LuPlus className="me-0 fs-5" />}
            variant="transparent"
            onClick={addMorePreviousExperience}
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
