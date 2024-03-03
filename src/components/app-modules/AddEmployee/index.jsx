"use client";

import React, { useState } from "react";
import { Breadcrumbs, Anchor, Stepper, Button, Group } from "@mantine/core";
import PersonalDetails from "./steps/PersonalDetails";
import OfficeDetails from "./steps/OfficeDetails";
import SalaryAndLeaves from "./steps/SalaryAndLeaves";
import EmergencyContact from "./steps/EmergencyContact";
import UploadDocuments from "./steps/UploadDocuments";

const AddEmployee = () => {
   const items = [
      { title: "Employees", href: "/" },
      { title: "Add Employee", href: "#" },
   ].map((item, index) => (
      <Anchor href={item.href} key={index}>
         {item.title}
      </Anchor>
   ));

   const [active, setActive] = useState(0);
   const nextStep = () =>
      setActive((current) => (current < 5 ? current + 1 : current));
   const prevStep = () =>
      setActive((current) => (current > 0 ? current - 1 : current));

   return (
      <>
         <div className="pageTop mb-4">
            <h3>Add Employee</h3>
            <Breadcrumbs>{items}</Breadcrumbs>
         </div>

         <div className="itemCard">
            <Stepper active={active} onStepClick={setActive}>
               <Stepper.Step label="Personal Details" description="step 1">
                  <PersonalDetails/>
               </Stepper.Step>

               <Stepper.Step label="Official Detail" description="step 2">
                  <OfficeDetails/>
               </Stepper.Step>

               <Stepper.Step label="Salary and Leaves" description="step 3">
                  <SalaryAndLeaves/>
               </Stepper.Step>

               <Stepper.Step label="Emergency Contact" description="step 4">
                  <EmergencyContact/>
               </Stepper.Step>

               <Stepper.Step label="Upload Documents" description="final">
                  <UploadDocuments/>
               </Stepper.Step>

               <Stepper.Completed>Successfully done!</Stepper.Completed>
            </Stepper>

            <Group justify="left" mt="xl">
               <Button variant="default" onClick={prevStep}>
                  Back
               </Button>
               <Button onClick={nextStep}>Next step</Button>
            </Group>
         </div>
      </>
   );
};

export default AddEmployee;
