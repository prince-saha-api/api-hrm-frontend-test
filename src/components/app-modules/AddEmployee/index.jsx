"use client";

import React, { useState, useRef } from "react";
import { Breadcrumbs, Anchor, Stepper } from "@mantine/core";
import PersonalDetails from "./steps/PersonalDetails";
import OfficeDetails from "./steps/OfficeDetails";
import SalaryAndLeaves from "./steps/SalaryAndLeaves";
import EmergencyContact from "./steps/EmergencyContact";
import EducationAndExperience from "./steps/EducationAndExperience";
import UploadDocuments from "./steps/UploadDocuments";
import SuccessCheckmarkAnimation from "./steps/SuccessCheckmarkAnimation";
import { submit } from "@/lib/submit";

const AddEmployee = () => {
  const items = [
    { title: "Employees", href: "/" },
    { title: "Add Employee", href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const [formData, setFormData] = useState({
    personalDetails: {
      first_name: "",
      last_name: "",
      gender: "",
      dob: null,
      blood_group: "",
      fathers_name: "",
      mothers_name: "",
      marital_status: "",
      spouse_name: "",
      nationality: "",
      religion: null,
      personal_email: "",
      personal_phone: "",
      nid_passport_no: "",
      tin_no: null,
      // photo: "",
      present_address: {
        city: "",
        state_division: "",
        post_zip_code: "",
        country: "",
        address: "",
      },
      permanent_address: {
        city: "",
        state_division: "",
        post_zip_code: "",
        country: "",
        address: "",
      },
      permanentAddressSameAsPresent: false,
    },
    officialDetails: {
      official_id: "",
      official_email: "",
      official_phone: "",
      password: "",
      employee_type: "",
      company: null,
      branch: null,
      department: null,
      designation: null,
      shift: null,
      grade: null,
      role_permission: [],
      official_note: "",
      ethnic_group: [],
      joining_date: null,
      supervisor: "",
      expense_approver: null,
      leave_approver: null,
      shift_request_approver: null,
    },
    salaryAndLeaves: {
      payment_in: "",
      bank_account: {
        bank_name: "",
        branch_name: "",
        account_type: null,
        account_no: "",
        routing_no: "",
        swift_bic: "",
        address: {
          city: "",
          state_division: "",
          post_zip_code: "",
          country: "",
          address: "",
        },
      },
      gross_salary: null,
      basic_salary: null,
      leavepolicy: [],
      payrollpolicy: {
        earningpolicy: [],
        deductionpolicy: [],
      },
    },
    emergencyContact: [
      // {
      //   name: "",
      //   age: "",
      //   phone_no: "",
      //   email: "",
      //   address: {
      //     city: "",
      //     state_division: "",
      //     post_zip_code: "",
      //     country: "",
      //     address: "",
      //   },
      //   relation: "",
      // },
    ],
    academicRecord: [
      // {
      //   certification: "",
      //   board_institute_name: "",
      //   level: "",
      //   score_grade: "",
      //   year_of_passing: null,
      // },
    ],
    previousExperience: [
      // {
      //   company_name: "",
      //   designation: "",
      //   address: "",
      //   from_date: null,
      //   to_date: null,
      // },
    ],
    uploadDocuments: [
      // {
      //   title: "",
      //   attachment: null,
      // },
      // {
      //   title: "",
      //   attachment: null,
      // },
      // {
      //   title: "",
      //   attachment: null,
      // },
      // {
      //   title: "",
      //   attachment: null,
      // },
    ],
  });

  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  const stepKeys = [
    "personalDetails",
    "officialDetails",
    "salaryAndLeaves",
    "emergencyContact",
    "academicRecord",
    "previousExperience",
    "uploadDocuments",
  ];

  const nextStep = () =>
    setActive((current) => (current < 6 ? current + 1 : current));

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleFormDataChange = (step, data) => {
    setFormData((prev) => ({ ...prev, [step]: data }));
  };

  const handleFormDataChange2 = (data) => {
    setFormData((prev) => ({
      ...prev,
      academicRecord: data.academicRecord,
      previousExperience: data.previousExperience,
    }));
  };

  const handleNextStep = (currentStepData) => {
    handleFormDataChange(stepKeys[active], currentStepData);
    nextStep();
    console.log(formData);
  };

  const handleEducationAndExperienceNext = (currentStepData) => {
    handleFormDataChange("academicRecord", currentStepData.academicRecord);
    handleFormDataChange(
      "previousExperience",
      currentStepData.previousExperience
    );
    nextStep();
    console.log(formData);
  };

  const handleStepClick = (index) => {
    if (index <= active - 1 || index === active + 1) {
      if (index === active + 1 && active === 4) {
        const isValid = stepRefs.current[active].validateStep(
          handleFormDataChange2
        );
        if (isValid) {
          setActive(index);
        } else {
          stepRefs.current[active].showValidationErrors();
        }
      }
      // Allow clicking only on the immediate previous or next step
      else if (index === active + 1) {
        // const currentStepData = formData[stepKeys[active]];
        const isValid = stepRefs.current[active].validateStep(
          handleFormDataChange,
          stepKeys[active]
        );
        if (isValid) {
          setActive(index);
        } else {
          stepRefs.current[active].showValidationErrors();
        }
      } else {
        // Allow moving to the previous step without validation
        setActive(index);
      }
    }
  };

  const handleSubmit = async (currentStepData) => {
    handleFormDataChange(stepKeys[active + 1], currentStepData);
    console.log(formData);
    // return;

    try {
      const formValues = new FormData();

      const flattenObject = (obj, prefix = "") => {
        Object.keys(obj).forEach((key) => {
          const value = obj[key];
          const formKey = prefix ? `${prefix}[${key}]` : key;

          if (value && typeof value === "object" && !(value instanceof File)) {
            flattenObject(value, formKey);
          } else {
            formValues.append(formKey, value);
          }
        });
      };

      // Flatten and append form values
      flattenObject(formData);

      // Example of how to append a specific file (e.g., the "photo" field)
      // formData.append('photo', formValues.personalDetails.photo);

      // Append uploadDocuments separately if they contain files
      // formData.uploadDocuments.forEach((doc, index) => {
      //   if (doc.attachment) {
      //     formValues.append(`uploadDocuments[${index}][title]`, doc.title);
      //     formValues.append(
      //       `uploadDocuments[${index}][attachment]`,
      //       doc.attachment
      //     );
      //   }
      // });

      console.log(formValues);

      const response = await submit(
        "/api/user/add-employee/",
        formValues,
        true
      );

      const result = await response.json();
      console.log(result);

      return;
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="pageTop mb-4">
        <h3>Add Employee</h3>
        <Breadcrumbs>{items}</Breadcrumbs>
      </div>

      <div className="itemCard">
        <Stepper active={active} onStepClick={handleStepClick}>
          <Stepper.Step label="Personal Details" description="Step 1">
            <PersonalDetails
              ref={(el) => (stepRefs.current[0] = el)}
              data={formData.personalDetails}
              onNext={handleNextStep}
              // onBack={prevStep}
            />
          </Stepper.Step>

          <Stepper.Step label="Official Details" description="Step 2">
            <OfficeDetails
              ref={(el) => (stepRefs.current[1] = el)}
              data={formData.officialDetails}
              onNext={handleNextStep}
              onBack={prevStep}
            />
          </Stepper.Step>

          <Stepper.Step label="Salary and Leaves" description="Step 3">
            <SalaryAndLeaves
              ref={(el) => (stepRefs.current[2] = el)}
              data={formData.salaryAndLeaves}
              onNext={handleNextStep}
              onBack={prevStep}
            />
          </Stepper.Step>

          <Stepper.Step label="Emergency Contact" description="Step 4">
            <EmergencyContact
              ref={(el) => (stepRefs.current[3] = el)}
              data={formData.emergencyContact}
              onNext={handleNextStep}
              onBack={prevStep}
            />
          </Stepper.Step>

          {/* <Stepper.Step label="Academic Record" description="Step 5">
            <AcademicRecord
              ref={(el) => (stepRefs.current[4] = el)}
              data={formData.academicRecord}
              onNext={handleNextStep}
              onBack={prevStep}
            />
          </Stepper.Step> */}

          <Stepper.Step label="Education & Experience" description="Step 6">
            <EducationAndExperience
              ref={(el) => (stepRefs.current[4] = el)}
              data={{
                academicRecord: formData.academicRecord,
                previousExperience: formData.previousExperience,
              }}
              onNext={handleEducationAndExperienceNext}
              onBack={prevStep}
            />
          </Stepper.Step>

          <Stepper.Step label="Upload Documents" description="Final">
            <UploadDocuments
              ref={(el) => (stepRefs.current[5] = el)}
              data={formData.uploadDocuments}
              onNext={handleSubmit}
              onBack={prevStep}
            />
          </Stepper.Step>

          <Stepper.Completed>
            <SuccessCheckmarkAnimation />
            {/* <Button onClick={handleSubmit}>Submit</Button> */}
          </Stepper.Completed>
        </Stepper>

        {/* <Group justify="left" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep}>Next step</Button>
        </Group> */}
      </div>
    </>
  );
};

export default AddEmployee;
