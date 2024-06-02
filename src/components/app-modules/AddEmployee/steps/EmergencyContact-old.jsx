"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";
import { useForm } from "@mantine/form";
import {
  NumberInput,
  TextInput,
  Textarea,
  Box,
  Select,
  Button,
  Group,
  Grid,
} from "@mantine/core";
import { LuPlus } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import { countries } from "@/data/countries";

const EmergencyContact = forwardRef(({ data, onNext, onBack }, ref) => {
  const [emergencyContacts, setEmergencyContacts] = useState(data);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { emergencyContacts: data },
    validate: {
      emergencyContacts: {
        name: (value) =>
          value.length < 2 ? "Name must have at least 2 letters" : null,
        age: (value) => (value < 1 ? "Age must be a positive number" : null),
        phone_no: (value) =>
          value.length < 10
            ? "Phone number must have at least 10 digits"
            : null,
        email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
        relation: (value) =>
          value.length < 2 ? "Relation must have at least 2 letters" : null,
        address: {
          city: (value) =>
            value.length < 2 ? "City must have at least 2 letters" : null,
          state_division: (value) =>
            value.length < 2 ? "State must have at least 2 letters" : null,
          post_zip_code: (value) =>
            value.length < 4 ? "ZIP Code must have at least 4 digits" : null,
          country: (value) => (value ? null : "Country is required"),
          address: (value) =>
            value.length < 5 ? "Address must have at least 5 letters" : null,
        },
      },
    },
    // validate: (values) => {
    //   const errors = {};
    //   values.emergencyContacts.forEach((contact, index) => {
    //     const contactErrors = {};
    //     if (!contact.name || contact.name.length < 2) {
    //       contactErrors.name = "Name must have at least 2 letters";
    //     }
    //     if (!contact.age || contact.age < 1) {
    //       contactErrors.age = "Age must be a positive number";
    //     }
    //     if (!contact.phone_no || contact.phone_no.length < 10) {
    //       contactErrors.phone_no = "Phone number must have at least 10 digits";
    //     }
    //     if (!contact.email || !/^\S+@\S+$/.test(contact.email)) {
    //       contactErrors.email = "Invalid email";
    //     }
    //     if (!contact.relation || contact.relation.length < 2) {
    //       contactErrors.relation = "Relation must have at least 2 letters";
    //     }
    //     const addressErrors = {};
    //     if (!contact.address.city || contact.address.city.length < 2) {
    //       addressErrors.city = "City must have at least 2 letters";
    //     }
    //     if (
    //       !contact.address.state_division ||
    //       contact.address.state_division.length < 2
    //     ) {
    //       addressErrors.state_division = "State must have at least 2 letters";
    //     }
    //     if (
    //       !contact.address.post_zip_code ||
    //       contact.address.post_zip_code.length < 4
    //     ) {
    //       addressErrors.post_zip_code = "ZIP Code must have at least 4 digits";
    //     }
    //     if (!contact.address.country) {
    //       addressErrors.country = "Country is required";
    //     }
    //     if (!contact.address.address || contact.address.address.length < 5) {
    //       addressErrors.address = "Address must have at least 5 letters";
    //     }
    //     if (
    //       Object.keys(contactErrors).length > 0 ||
    //       Object.keys(addressErrors).length > 0
    //     ) {
    //       errors.emergencyContacts = errors.emergencyContacts || [];
    //       errors.emergencyContacts[index] = {
    //         ...contactErrors,
    //         address: addressErrors,
    //       };
    //     }
    //   });
    //   return errors;
    // },
  });

  useImperativeHandle(ref, () => ({
    validateStep: (updateFormData, key) => {
      const values = form.values.emergencyContacts;
      updateFormData(key, values);
      return form.isValid();
    },
    showValidationErrors: () => {
      form.validate();
    },
  }));

  const addMoreEmergencyContact = () => {
    const newContact = {
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

    setEmergencyContacts([...emergencyContacts, newContact]);

    form.setValues({
      emergencyContacts: [...form.values.emergencyContacts, newContact],
    });
  };

  const removeEmergencyContact = (index) => {
    if (emergencyContacts.length > 1) {
      const updatedContacts = emergencyContacts.filter((_, i) => i !== index);
      setEmergencyContacts(updatedContacts);
      form.setValues({ emergencyContacts: updatedContacts });
    }
  };

  const handleSubmit = (values) => {
    onNext(values.emergencyContacts);
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {/* {form.values.emergencyContacts.map((contact, index) => ( */}
        {emergencyContacts.map((contact, index) => (
          <>
            {emergencyContacts.length > 1 && (
              <div className="d-flex align-items-start w-100 cust_mt">
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

            <Grid key={index} gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
              <Grid.Col span={6}>
                <Box className="stepBox">
                  <div className="d-flex align-items-start w-100 cust_mt">
                    <div className="cust_iputLabel">Name</div>
                    <TextInput
                      classNames={{
                        root: "w-100",
                        wrapper: "cust_iputWrapper",
                      }}
                      placeholder="Name"
                      {...form.getInputProps(`emergencyContacts.${index}.name`)}
                    />
                  </div>
                  <div className="d-flex align-items-start w-100 cust_mt">
                    <div className="cust_iputLabel">Age</div>
                    <NumberInput
                      classNames={{
                        root: "w-100",
                        wrapper: "cust_iputWrapper",
                      }}
                      rightSection={<></>}
                      rightSectionWidth={0}
                      placeholder="Age"
                      {...form.getInputProps(`emergencyContacts.${index}.age`)}
                    />
                  </div>
                  <div className="d-flex align-items-start w-100 cust_mt">
                    <div className="cust_iputLabel">Phone No</div>
                    <TextInput
                      classNames={{
                        root: "w-100",
                        wrapper: "cust_iputWrapper",
                      }}
                      placeholder="Phone No"
                      {...form.getInputProps(
                        `emergencyContacts.${index}.phone_no`
                      )}
                    />
                  </div>
                  <div className="d-flex align-items-start w-100 cust_mt">
                    <div className="cust_iputLabel">Email</div>
                    <TextInput
                      classNames={{
                        root: "w-100",
                        wrapper: "cust_iputWrapper",
                      }}
                      placeholder="Email"
                      {...form.getInputProps(
                        `emergencyContacts.${index}.email`
                      )}
                    />
                  </div>
                  <div className="d-flex align-items-start w-100 cust_mt">
                    <div className="cust_iputLabel">Relation</div>
                    <TextInput
                      classNames={{
                        root: "w-100",
                        wrapper: "cust_iputWrapper",
                      }}
                      placeholder="Relation"
                      {...form.getInputProps(
                        `emergencyContacts.${index}.relation`
                      )}
                    />
                  </div>
                </Box>
              </Grid.Col>

              <Grid.Col span={6}>
                <Box className="stepBox">
                  <div className="d-flex align-items-start w-100 cust_mt">
                    <div className="cust_iputLabel">City</div>
                    <TextInput
                      classNames={{
                        root: "w-100",
                        wrapper: "cust_iputWrapper",
                      }}
                      placeholder="City"
                      {...form.getInputProps(
                        `emergencyContacts.${index}.address.city`
                      )}
                    />
                  </div>
                  <div className="d-flex align-items-start w-100 cust_mt">
                    <div className="cust_iputLabel">State</div>
                    <TextInput
                      classNames={{
                        root: "w-100",
                        wrapper: "cust_iputWrapper",
                      }}
                      placeholder="State"
                      {...form.getInputProps(
                        `emergencyContacts.${index}.address.state_division`
                      )}
                    />
                  </div>
                  <div className="d-flex align-items-start w-100 cust_mt">
                    <div className="cust_iputLabel">ZIP Code</div>
                    <TextInput
                      classNames={{
                        root: "w-100",
                        wrapper: "cust_iputWrapper",
                      }}
                      placeholder="ZIP Code"
                      {...form.getInputProps(
                        `emergencyContacts.${index}.address.post_zip_code`
                      )}
                    />
                  </div>
                  <div className="d-flex align-items-start w-100 cust_mt">
                    <div className="cust_iputLabel">Country</div>
                    <Select
                      classNames={{
                        root: "w-100",
                        wrapper: "cust_iputWrapper",
                      }}
                      placeholder="Country"
                      searchable
                      data={countries}
                      {...form.getInputProps(
                        `emergencyContacts.${index}.address.country`
                      )}
                    />
                  </div>
                  <div className="d-flex align-items-start w-100 cust_mt">
                    <div className="cust_iputLabel">Address</div>
                    <Textarea
                      classNames={{
                        root: "w-100",
                        wrapper: "cust_iputWrapper",
                      }}
                      placeholder="Address"
                      {...form.getInputProps(
                        `emergencyContacts.${index}.address.address`
                      )}
                    />
                  </div>
                </Box>
              </Grid.Col>
            </Grid>
          </>
        ))}

        <Button
          justify="center"
          leftSection={<LuPlus className="me-0 fs-5" />}
          variant="transparent"
          // mt="md"
          onClick={addMoreEmergencyContact}
        >
          Add More
        </Button>

        <Group justify="left" mt="xl">
          <Button variant="default" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Next step</Button>
        </Group>
      </form>
    </>
  );
});

export default EmergencyContact;
