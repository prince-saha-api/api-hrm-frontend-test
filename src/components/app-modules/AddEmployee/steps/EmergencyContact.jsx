"use client";

import React, { forwardRef, useImperativeHandle } from "react";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import {
  NumberInput,
  TextInput,
  Box,
  Select,
  Button,
  Group,
  Grid,
} from "@mantine/core";
import { LuPlus } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";
import { countries } from "@/data/countries";
import { validateEmail, validatePhoneNumber } from "@/lib/validate";

const EmergencyContact = forwardRef(({ data, onNext, onBack }, ref) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      emergencyContacts:
        data && data.length
          ? data.map((contact) => ({ ...contact, key: randomId() }))
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
          state_division: (value) => (!value ? "State is required" : null),
          post_zip_code: (value) => (!value ? "ZIP Code is required" : null),
          country: (value) => (value ? null : "Country is required"),
          address: (value) => (!value ? "Address is required" : null),
        },
      },
    },
  });

  useImperativeHandle(ref, () => ({
    validateStep: (updateFormData, key) => {
      const values = form.getValues().emergencyContacts;
      updateFormData(key, values);
      return form.isValid();
    },
    showValidationErrors: () => {
      form.validate();
    },
  }));

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

  const handleSubmit = (values) => {
    console.log(values);
    onNext(values.emergencyContacts);
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {form.getValues().emergencyContacts.map((contact, index) => (
          <div key={contact.key}>
            {form.getValues().emergencyContacts.length > 1 && (
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
                    <div className="cust_iputLabel">
                      <span className="requiredInput">Name</span>
                    </div>
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
                    <div className="cust_iputLabel">
                      <span className="requiredInput">Phone No.</span>
                    </div>
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
                    <div className="cust_iputLabel">
                      <span className="requiredInput">Relation</span>
                    </div>
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
                    <div className="cust_iputLabel">
                      <span className="requiredInput">Address</span>
                    </div>
                    <TextInput
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
                  <div className="d-flex align-items-start w-100 cust_mt">
                    <div className="cust_iputLabel">
                      <span className="requiredInput">City</span>
                    </div>
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
                    <div className="cust_iputLabel">
                      <span className="requiredInput">State</span>
                    </div>
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
                    <div className="cust_iputLabel">
                      <span className="requiredInput">ZIP Code</span>
                    </div>
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
                    <div className="cust_iputLabel">
                      <span className="requiredInput">Country</span>
                    </div>
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
                </Box>
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
