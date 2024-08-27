"use client";

import React, { useEffect } from "react";
import { useForm } from "@mantine/form";
import {
  Grid,
  Button,
  Select,
  TextInput,
  Modal,
  Checkbox,
} from "@mantine/core";

const FilterModal = ({ opened, close, data, setData }) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      // description: "",
      amount_type: null,
      // amount: 0,
      // is_taxable: false,
      depends_on_attendance: false,
      // is_recurring: false,
    },
    validate: {},
  });

  // useEffect(() => {
  //   if (data) {
  //     form.setValues({
  //       title: data?.title || "",
  //       amount_type: data?.amount_type || null,
  //       depends_on_attendance: data?.depends_on_attendance || false,
  //     });
  //   }
  // }, [data]);

  const handleSubmit = async (values) => {
    setData(values);
    close();
    form.reset();
    return;
  };

  const handleError = (errors) => {
    console.log(errors);
  };

  return (
    <Modal opened={opened} onClose={close} title="Filter" centered>
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values), handleError)}
      >
        <Grid gutter={{ base: 8, xl: "md" }}>
          <Grid.Col span={{ base: 12, lg: 12 }}>
            <TextInput
              mb="sm"
              label="Title"
              placeholder="Title"
              {...form.getInputProps("title")}
            />
            <Select
              mb="sm"
              label="Amount Type"
              placeholder="Amount Type"
              data={["Fixed Amount", "Percentage"]}
              {...form.getInputProps("amount_type")}
            />
            <Checkbox
              label="Depends on Attendance"
              {...form.getInputProps("depends_on_attendance", {
                type: "checkbox",
              })}
            />
          </Grid.Col>
        </Grid>

        <div className="d-flex justify-content-end">
          <Button variant="filled" size="sm" mt="sm" type="submit">
            Search
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default FilterModal;
