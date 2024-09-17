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
} from "@mantine/core";
import { FaTrashAlt } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";
import { countries } from "@/data/countries";
import { validateEmail, validatePhoneNumber } from "@/lib/validate";

const Index = ({ opened, close, item, setItem }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      emergencyContacts:
        item?.employee_contact && item?.employee_contact.length
          ? item?.employee_contact.map((contact) => ({
              ...contact,
              address: contact?.address || {
                city: "",
                state_division: "",
                post_zip_code: "",
                country: "",
                address: "",
              },
              key: randomId(),
            }))
          : [
              {
                key: randomId(),
                name: "",
                age: "",
                phone_no: "",
                email: "",
                address: {
                  city: "",
                  state_division: "",
                  post_zip_code: "",
                  country: "",
                  address: "",
                },
                relation: "",
              },
            ],
    },
    validate: {
      emergencyContacts: {
        name: (value) => (!value ? "Name is required" : null),
        // age: (value) => (value < 1 ? "Age must be a positive number" : null),
        phone_no: (value) =>
          !value
            ? "Phone is required"
            : validatePhoneNumber(value)
            ? null
            : "Invalid phone number",
        email: (value) =>
          value && !validateEmail(value) ? "Invalid email" : null,
        relation: (value) => (!value ? "Relation is required" : null),
        address: {
          city: (value) => (!value ? "City is required" : null),
          state_division: (value) =>
            !value ? "Division / State is required" : null,
          post_zip_code: (value) =>
            !value ? "Postal / ZIP Code is required" : null,
          country: (value) => (value ? null : "Country is required"),
          address: (value) => (!value ? "Address is required" : null),
        },
      },
    },
  });

  const addMoreEmergencyContact = () => {
    const newContact = {
      key: randomId(),
      name: "",
      age: "",
      phone_no: "",
      email: "",
      address: {
        city: "",
        state_division: "",
        post_zip_code: "",
        country: "",
        address: "",
      },
      relation: "",
    };

    form.insertListItem("emergencyContacts", newContact);
  };

  const removeEmergencyContact = (index) => {
    // if (form.getValues().emergencyContacts.length > 1) {
    //   form.removeListItem("emergencyContacts", index);
    // }
    form.removeListItem("emergencyContacts", index);
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);

    console.log(values);

    const originalContacts = item?.employee_contact || [];
    const updatedContacts = values.emergencyContacts;

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
        name: contact.name,
        age: contact.age,
        phone_no: contact.phone_no,
        email: contact.email,
        relation: contact.relation,
        address: {
          city: contact.address.city,
          state_division: contact.address.state_division,
          post_zip_code: contact.address.post_zip_code,
          country: contact.address.country,
          address: contact.address.address,
        },
      }));

    // Identify new contacts in the updated data that aren't in the original data (to be added)
    const toAdd = updatedContacts
      .filter((updatedContact) => !updatedContact?.id)
      .map((contact) => ({
        name: contact.name,
        age: contact.age,
        phone_no: contact.phone_no,
        email: contact.email,
        relation: contact.relation,
        address: {
          city: contact.address.city,
          state_division: contact.address.state_division,
          post_zip_code: contact.address.post_zip_code,
          country: contact.address.country,
          address: contact.address.address,
        },
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
        `/api/user/update-emergency-contact/${item.id}`,
        payload
      );

      if (response?.status === "success") {
        setIsSubmitting(false);
        close();
        // mutate();
        setItem((prev) => ({
          ...prev,
          payment_in: response?.data?.payment_in || "",
          bank_account: response?.data?.bank_account || null,
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
        title="Edit Emergency Contact"
        onClose={close}
        centered
      >
        <form
          onSubmit={form.onSubmit(
            (values) => handleSubmit(values),
            handleError
          )}
        >
          {form.getValues().emergencyContacts.map((contact, index) => (
            <div key={contact.key}>
              {form.getValues().emergencyContacts.length > 1 && (
                <div className="d-flex align-items-start w-100 cust_mt mb-3">
                  <Button
                    color="red"
                    variant="outline"
                    leftSection={<FaTrashAlt />}
                    onClick={() => removeEmergencyContact(index)}
                  >
                    Remove
                  </Button>
                </div>
              )}
              <Grid>
                <Grid.Col span={6}>
                  <TextInput
                    mb="sm"
                    label="Name"
                    placeholder="Name"
                    // disabled={isSubmitting}
                    {...form.getInputProps(`emergencyContacts.${index}.name`)}
                  />
                  <NumberInput
                    mb="sm"
                    label="Age"
                    placeholder="Age"
                    hideControls
                    {...form.getInputProps(`emergencyContacts.${index}.age`)}
                  />
                  <TextInput
                    mb="sm"
                    label="Phone No"
                    placeholder="Phone No"
                    // hideControls
                    {...form.getInputProps(
                      `emergencyContacts.${index}.phone_no`
                    )}
                  />
                  <TextInput
                    mb="sm"
                    label="Email"
                    placeholder="Email"
                    // disabled={isSubmitting}
                    {...form.getInputProps(`emergencyContacts.${index}.email`)}
                  />
                  <TextInput
                    // mb="sm"
                    label="Relation"
                    placeholder="Relation"
                    // disabled={isSubmitting}
                    {...form.getInputProps(
                      `emergencyContacts.${index}.relation`
                    )}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    mb="sm"
                    label="Address"
                    placeholder="Address"
                    // disabled={isSubmitting}
                    {...form.getInputProps(
                      `emergencyContacts.${index}.address.address`
                    )}
                  />
                  <TextInput
                    mb="sm"
                    label="City"
                    placeholder="City"
                    // disabled={isSubmitting}
                    {...form.getInputProps(
                      `emergencyContacts.${index}.address.city`
                    )}
                  />
                  <TextInput
                    mb="sm"
                    label="Division / State"
                    placeholder="Division / State"
                    // disabled={isSubmitting}
                    {...form.getInputProps(
                      `emergencyContacts.${index}.address.state_division`
                    )}
                  />
                  <TextInput
                    mb="sm"
                    label="Postal / ZIP Code"
                    placeholder="Postal / ZIP Code"
                    // disabled={isSubmitting}
                    {...form.getInputProps(
                      `emergencyContacts.${index}.address.post_zip_code`
                    )}
                  />
                  <Select
                    mb="sm"
                    label="Country"
                    placeholder="Country"
                    // disabled={isSubmitting}
                    data={countries}
                    {...form.getInputProps(
                      `emergencyContacts.${index}.address.country`
                    )}
                  />
                </Grid.Col>
              </Grid>
            </div>
          ))}

          <Button
            className="ps-0"
            justify="center"
            leftSection={<LuPlus className="me-0 fs-5" />}
            variant="transparent"
            onClick={addMoreEmergencyContact}
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
