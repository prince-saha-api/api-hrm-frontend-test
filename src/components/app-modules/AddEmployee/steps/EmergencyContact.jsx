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
import { countries } from "@/data/countries";

const EmergencyContact = forwardRef(({ data, onNext, onBack }, ref) => {
  const [emergencyContacts, setEmergencyContacts] = useState(data);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { emergencyContacts: data },
    // validate: {
    //   firstName: (value) =>
    //     value.length < 2 ? "First Name must have at least 2 letters" : null,
    //   lastName: (value) =>
    //     value.length < 2 ? "Last Name must have at least 2 letters" : null,
    //   // email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    //   // // add other validations as needed
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
    setEmergencyContacts([
      ...emergencyContacts,
      {
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
    ]);
    form.setValues({
      emergencyContacts: [
        ...form.values.emergencyContacts,
        {
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
    });
  };

  const handleSubmit = (values) => {
    onNext(values.emergencyContacts);
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {form.values.emergencyContacts.map((contact, index) => (
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
                  <NumberInput
                    classNames={{
                      root: "w-100",
                      wrapper: "cust_iputWrapper",
                    }}
                    rightSection={<></>}
                    rightSectionWidth={0}
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
                    {...form.getInputProps(`emergencyContacts.${index}.email`)}
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
                    placeholder="Present Address"
                    {...form.getInputProps(
                      `emergencyContacts.${index}.address.address`
                    )}
                  />
                </div>
              </Box>
            </Grid.Col>
          </Grid>
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
