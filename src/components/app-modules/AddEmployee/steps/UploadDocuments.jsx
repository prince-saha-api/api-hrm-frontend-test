"use client";

import React, { forwardRef, useImperativeHandle } from "react";
import { useForm } from "@mantine/form";
import { Box, FileInput, Button, Group } from "@mantine/core";
import { FaFile } from "react-icons/fa6";
import { TbPhotoFilled } from "react-icons/tb";
import { Grid } from "@mantine/core";

const UploadDocuments = forwardRef(({ data, onNext, onBack }, ref) => {
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

    console.log(file);

    return null;
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      // ...data,
      // nidPassport: null,
      // cv: null,
      // appointmentLetter: null,
      // photo: null,
      nidPassport: data[0]?.attachment || null,
      cv: data[1]?.attachment || null,
      appointmentLetter: data[2]?.attachment || null,
      photo: data[3]?.attachment || null,
    },
    validate: {
      nidPassport: (value) =>
        value
          ? validateFile(value, ["application/pdf"], 1)
          : "NID/Passport is required",
      cv: (value) =>
        value
          ? validateFile(value, ["application/pdf"], 1)
          : "Resume is required",
      appointmentLetter: (value) =>
        value ? validateFile(value, ["application/pdf"], 1) : null,
      photo: (value) =>
        value
          ? validateFile(value, ["image/jpeg", "image/png"], 1)
          : "Photo is required",
    },
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
    const uploadDocuments = [
      { title: "NID/Passport", attachment: values.nidPassport },
      { title: "Resume", attachment: values.cv },
      { title: "Appointment Letter", attachment: values.appointmentLetter },
      { title: "Photo", attachment: values.photo },
    ];

    onNext(uploadDocuments);

    // onNext(values);
  };

  return (
    <>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={6}>
            <Box className="stepBox">
              {/* <h4 className="text-dark mb-4 pb-2">Upload Documents</h4> */}
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">
                  <span className="requiredInput">NID/Passport</span>
                </div>
                <FileInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  leftSection={<FaFile className="fileIcon" />}
                  // label="NID/Passport"
                  placeholder="NID/Passport"
                  leftSectionPointerEvents="none"
                  {...form.getInputProps("nidPassport")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">
                  <span className="requiredInput">Resume</span>
                </div>
                <FileInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  leftSection={<FaFile className="fileIcon" />}
                  // label="Resume"
                  placeholder="Resume"
                  leftSectionPointerEvents="none"
                  {...form.getInputProps("cv")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">
                  <span className="requiredInput">Appointment Letter</span>
                </div>
                <FileInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  leftSection={<FaFile className="fileIcon" />}
                  // label="Appointment Letter"
                  placeholder="Appointment Letter"
                  leftSectionPointerEvents="none"
                  {...form.getInputProps("appointmentLetter")}
                />
              </div>
              <div className="d-flex align-items-start w-100 cust_mt">
                <div className="cust_iputLabel">
                  <span className="requiredInput">Photo</span>
                </div>
                <FileInput
                  classNames={{
                    root: "w-100",
                    wrapper: "cust_iputWrapper",
                  }}
                  // mt="sm"
                  leftSection={<TbPhotoFilled className="fileIcon" />}
                  // label="Photo"
                  placeholder="Photo"
                  leftSectionPointerEvents="none"
                  {...form.getInputProps("photo")}
                />
              </div>
            </Box>
          </Grid.Col>
          {/* <Grid.Col span={6}>
            <Box className="stepBox">
              <h4 className="text-dark mb-4 pb-2">Upload Other Documents</h4>

              <TextInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                label="Document Name"
                placeholder="Document Name"
                // {...form.getInputProps("name")}
              />
              <FileInput
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                leftSection={<FaFile className="fileIcon" />}
                label="Document File"
                placeholder="Document File"
                leftSectionPointerEvents="none"
              />
              <Textarea
                classNames={{
                  root: "cust_iputRoot",
                  label: "cust_iputLabel",
                  wrapper: "cust_iputWrapper",
                }}
                mt="sm"
                label="Description"
                placeholder="Description"
                // {...form.getInputProps("address")}
              />
            </Box>
          </Grid.Col> */}
        </Grid>

        <Group justify="left" mt="xl">
          <Button variant="default" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </>
  );
});

export default UploadDocuments;
