"use client";

import React, { useState } from "react";
import { Breadcrumbs, Anchor, Stepper, Button, Group } from "@mantine/core";
import PersonalDetails from "./steps/PersonalDetails";
import OfficeDetails from "./steps/OfficeDetails";
import SalaryAndLeaves from "./steps/SalaryAndLeaves";
import EmergencyContact from "./steps/EmergencyContact";
import AcademicRecord from "./steps/AcademicRecord";
import PreviousExperience from "./steps/PreviousExperience";
import UploadDocuments from "./steps/UploadDocuments";
import SuccessCheckmarkAnimation from "./steps/SuccessCheckmarkAnimation";

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
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: null,
      bloodGroup: "",
      fathersName: "",
      mothersName: "",
      maritalStatus: "",
      spouseName: "",
      nationality: "",
      religion: "",
      email: "",
      contactNo: "",
      nidPassport: "",
      tinNo: "",

      presentAddress: {
        city: "",
        state: "",
        zipCode: "",
        country: "",
        address: "",
      },
      permanentAddress: {
        city: "",
        state: "",
        zipCode: "",
        country: "",
        address: "",
      },
    },
    officialDetails: {
      employeeId: "",
      officialEmail: "",
      officialPhone: "",
      password: "",
      employeeType: "",
      company: "",
      branch: "",
      department: "",
      designation: "",
      defaultShift: "",
      joiningDate: null,
      expenseApprover: "",
      leaveApprover: "",
      shiftApprover: "",
    },
    salaryAndLeaves: {
      paymentIn: "",
      bankAccount: {
        bankName: "",
        branch: "",
        accountType: "",
        accountingNo: "",
        routingNo: "",
        swiftBIC: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      monthlyGrossSalary: "",
      leavePolicyAssign: "",
      payrollPolicyAssign: "",
    },
    emergencyContact: {
      name: "",
      age: "",
      phoneNo: "",
      email: "",
      address: "",
      relation: "",
    },
    academicRecord: {
      certification: "",
      institute: "",
      level: "",
      grade: "",
      passingYear: "",
    },
    previousExperience: {
      companyName: "",
      designation: "",
      address: "",
      from: "",
      to: "",
    },
    uploadDocuments: {
      nidPassport: "",
      cv: "",
      appointmentLetter: "",
      photo: "",
    },
  });

  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 7 ? current + 1 : current));

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleFormDataChange = (step, data) => {
    setFormData((prev) => ({ ...prev, [step]: data }));
    nextStep();
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("Form submitted successfully:", result);
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
        <Stepper active={active} onStepClick={setActive}>
          <Stepper.Step label="Personal Details" description="step 1">
            <PersonalDetails
              data={formData.personalDetails}
              onChange={handleFormDataChange}
            />
          </Stepper.Step>

          <Stepper.Step label="Official Detail" description="step 2">
            <OfficeDetails
              data={formData.officialDetails}
              onChange={handleFormDataChange}
            />
          </Stepper.Step>

          <Stepper.Step label="Salary and Leaves" description="step 3">
            <SalaryAndLeaves
              data={formData.salaryAndLeaves}
              onChange={handleFormDataChange}
            />
          </Stepper.Step>

          <Stepper.Step label="Emergency Contact" description="step 4">
            <EmergencyContact
              data={formData.emergencyContact}
              onChange={handleFormDataChange}
            />
          </Stepper.Step>

          <Stepper.Step label="Academic Record" description="step 5">
            <AcademicRecord
              data={formData.academicRecord}
              onChange={handleFormDataChange}
            />
          </Stepper.Step>

          <Stepper.Step label="Previous Experience" description="step 6">
            <PreviousExperience
              data={formData.previousExperience}
              onChange={handleFormDataChange}
            />
          </Stepper.Step>

          <Stepper.Step label="Upload Documents" description="final">
            <UploadDocuments
              data={formData.uploadDocuments}
              onChange={handleFormDataChange}
            />
          </Stepper.Step>

          <Stepper.Completed>
            <SuccessCheckmarkAnimation />
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
