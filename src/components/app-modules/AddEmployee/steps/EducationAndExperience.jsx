"use client";

import React, { forwardRef, useImperativeHandle } from "react";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { NumberInput, TextInput, Box, Button, Group } from "@mantine/core";
import { Grid } from "@mantine/core";
import { LuPlus } from "react-icons/lu";
import { FaTrashAlt } from "react-icons/fa";

const AcademicRecord = forwardRef(({ data, onNext, onBack }, ref) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      academicRecord:
        data.academicRecord && data.academicRecord.length
          ? data.academicRecord.map((item) => ({ ...item, key: randomId() }))
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
      previousExperience:
        data.previousExperience && data.previousExperience.length
          ? data.previousExperience.map((item) => ({
              ...item,
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
      academicRecord: {
        certification: (value) =>
          value?.length < 2 ? "Name must have at least 2 letters" : null,
      },
      previousExperience: {
        company_name: (value) =>
          value?.length < 2 ? "Name must have at least 2 letters" : null,
      },
    },
  });

  useImperativeHandle(ref, () => ({
    validateStep: (updateFormData) => {
      const values = form.getValues();
      // console.log(values);
      // return false;
      updateFormData(values);
      return form.isValid();
    },
    showValidationErrors: () => {
      form.validate();
    },
  }));

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

  const removeAcademicRecord = (index) => {
    // if (form.values.academicRecord.length > 1) {
    //   form.removeListItem("academicRecord", index);
    // }
    form.removeListItem("academicRecord", index);
  };

  const removePreviousExperience = (index) => {
    // if (form.values.previousExperience.length > 1) {
    //   form.removeListItem("previousExperience", index);
    // }
    form.removeListItem("previousExperience", index);
  };

  const handleSubmit = (values) => {
    console.log(values);
    onNext({
      academicRecord: values.academicRecord,
      previousExperience: values.previousExperience,
    });
  };

  return (
    <>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={6}>
            <Box className="stepBox">
              <h5 className="fw-bold mb-3">Educational Background</h5>

              {form.getValues().academicRecord.map((item, index) => (
                <div key={item.key}>
                  {form.getValues().academicRecord.length > 1 && (
                    <div className="d-flex align-items-start w-100 cust_mt">
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

                  <div className="d-flex align-items-start w-100 cust_mt">
                    <div className="cust_iputLabel">Certification</div>
                    <TextInput
                      classNames={{
                        root: "w-100",
                        wrapper: "cust_iputWrapper",
                      }}
                      placeholder="Certification"
                      {...form.getInputProps(
                        `academicRecord.${index}.certification`
                      )}
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
                      {...form.getInputProps(
                        `academicRecord.${index}.board_institute_name`
                      )}
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
                      {...form.getInputProps(`academicRecord.${index}.level`)}
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
                      {...form.getInputProps(
                        `academicRecord.${index}.score_grade`
                      )}
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
                      {...form.getInputProps(
                        `academicRecord.${index}.year_of_passing`
                      )}
                    />
                  </div>
                </div>
              ))}

              <Button
                className="ps-0"
                justify="center"
                leftSection={<LuPlus className="me-0 fs-5" />}
                variant="transparent"
                mt="sm"
                onClick={addMoreAcademicRecord}
              >
                Add More
              </Button>
            </Box>
          </Grid.Col>

          <Grid.Col span={6}>
            <Box className="stepBox">
              <h5 className="fw-bold mb-3">Experiences</h5>

              {form.getValues().previousExperience.map((item, index) => (
                <div key={item.key}>
                  {form.getValues().previousExperience.length > 1 && (
                    <div className="d-flex align-items-start w-100 cust_mt">
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

                  <div className="d-flex align-items-start w-100 cust_mt">
                    <div className="cust_iputLabel">Company Name</div>
                    <TextInput
                      classNames={{
                        root: "w-100",
                        wrapper: "cust_iputWrapper",
                      }}
                      // label="Company Name"
                      placeholder="Company Name"
                      {...form.getInputProps(
                        `previousExperience.${index}.company_name`
                      )}
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
                      {...form.getInputProps(
                        `previousExperience.${index}.designation`
                      )}
                    />
                  </div>
                  <div className="d-flex align-items-start w-100 cust_mt">
                    <div className="cust_iputLabel">Address</div>
                    <TextInput
                      classNames={{
                        root: "w-100",
                        wrapper: "cust_iputWrapper",
                      }}
                      // mt="sm"
                      // label="Address"
                      placeholder="Address"
                      {...form.getInputProps(
                        `previousExperience.${index}.address`
                      )}
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
                      {...form.getInputProps(
                        `previousExperience.${index}.from_date`
                      )}
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
                      {...form.getInputProps(
                        `previousExperience.${index}.to_date`
                      )}
                    />
                  </div>
                </div>
              ))}

              <Button
                className="ps-0"
                justify="center"
                leftSection={<LuPlus className="me-0 fs-5" />}
                variant="transparent"
                mt="sm"
                onClick={addMorePreviousExperience}
              >
                Add More
              </Button>
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
