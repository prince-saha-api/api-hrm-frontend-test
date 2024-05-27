"use client";
import React, { forwardRef, useImperativeHandle } from "react";
import { DateInput } from "@mantine/dates";
import { Breadcrumbs, Anchor } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  NumberInput,
  TextInput,
  Textarea,
  Box,
  Select,
  Button,
  Flex,
  FileButton,
  Group,
  Text,
} from "@mantine/core";
import { Grid } from "@mantine/core";
import { FcAcceptDatabase } from "react-icons/fc";
import Image from "next/image";
import compmanyLogo from "public/full_logo.png";
import uploadImg from "public/profile01.jpg";
import { FcAddImage } from "react-icons/fc";

const AcademicRecord = forwardRef(({ data, onNext, onBack }, ref) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: data[0],
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
      const values = form.getValues();
      updateFormData(key, values);
      return form.isValid();
    },
    showValidationErrors: () => {
      form.validate();
    },
  }));

  const handleSubmit = (values) => {
    console.log(values);

    const records = [
      {
        certification: values.certification,
        board_institute_name: values.board_institute_name,
        level: values.level,
        score_grade: values.score_grade,
        year_of_passing: values.year_of_passing,
      },
    ];

    onNext(records);
  };

  return (
    <>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={6}>
            <Box className="stepBox">
              <h5 className="fw-bold mb-3">Educational Background</h5>

              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Certification</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="Certification"
                  {...form.getInputProps("certification")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Institute</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="Institute"
                  {...form.getInputProps("board_institute_name")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Level</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="Level"
                  {...form.getInputProps("level")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Grade</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  placeholder="Grade"
                  {...form.getInputProps("score_grade")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Passing Year</div>
                <NumberInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  rightSection={<></>}
                  rightSectionWidth={0}
                  // mt="sm"
                  // label="Passing Year"
                  placeholder="Passing Year"
                  {...form.getInputProps("year_of_passing")}
                />
              </div>
            </Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box className="stepBox">
              <h5 className="fw-bold mb-3">Experiences</h5>

              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Company Name</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // label="Company Name"
                  placeholder="Company Name"
                  {...form.getInputProps("company_name")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Designation</div>
                <TextInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Designation"
                  placeholder="Designation"
                  {...form.getInputProps("designation")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">Address</div>
                <Textarea
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // label="Address"
                  placeholder="Address"
                  {...form.getInputProps("address")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">From</div>
                <DateInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // value={value}
                  // onChange={setValue}
                  // label="From"
                  placeholder="From"
                  {...form.getInputProps("from_date")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">To</div>
                <DateInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  // value={value}
                  // onChange={setValue}
                  // label="To"
                  placeholder="To"
                  {...form.getInputProps("to_date")}
                />
              </div>
            </Box>
          </Grid.Col>
        </Grid>

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

export default AcademicRecord;
