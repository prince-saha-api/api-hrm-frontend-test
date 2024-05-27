"use client";

import React, { useState, useRef } from "react";
import { Breadcrumbs, Anchor, Stepper, Button, Group } from "@mantine/core";
import PersonalDetails from "./steps/PersonalDetails";
import OfficeDetails from "./steps/OfficeDetails";
import SalaryAndLeaves from "./steps/SalaryAndLeaves";
import EmergencyContact from "./steps/EmergencyContact";
import AcademicRecord from "./steps/AcademicRecord";
import PreviousExperience from "./steps/PreviousExperience";
import EducationAndExperience from "./steps/EducationAndExperience";
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

  // const [formData, setFormData] = useState({
  //   personalDetails: {
  //     firstName: "",
  //     lastName: "",
  //     gender: "",
  //     dateOfBirth: null,
  //     bloodGroup: "",
  //     fathersName: "",
  //     mothersName: "",
  //     maritalStatus: "",
  //     spouseName: "",
  //     nationality: "",
  //     religion: "",
  //     email: "",
  //     contactNo: "",
  //     nidPassport: "",
  //     tinNo: "",

  //     presentAddress: {
  //       city: "",
  //       state: "",
  //       zipCode: "",
  //       country: "",
  //       address: "",
  //     },
  //     permanentAddress: {
  //       city: "",
  //       state: "",
  //       zipCode: "",
  //       country: "",
  //       address: "",
  //     },
  //   },
  //   officialDetails: {
  //     employeeId: "",
  //     officialEmail: "",
  //     officialPhone: "",
  //     password: "",
  //     employeeType: "",
  //     company: "",
  //     branch: "",
  //     department: "",
  //     designation: "",
  //     defaultShift: "",
  //     joiningDate: null,
  //     expenseApprover: "",
  //     leaveApprover: "",
  //     shiftApprover: "",
  //   },
  //   salaryAndLeaves: {
  //     paymentIn: "",
  //     bankAccount: {
  //       bankName: "",
  //       branch: "",
  //       accountType: "",
  //       accountingNo: "",
  //       routingNo: "",
  //       swiftBIC: "",
  //       address: "",
  //       city: "",
  //       state: "",
  //       zipCode: "",
  //       country: "",
  //     },
  //     monthlyGrossSalary: "",
  //     leavePolicyAssign: "",
  //     payrollPolicyAssign: "",
  //   },
  //   emergencyContact: {
  //     name: "",
  //     age: "",
  //     phoneNo: "",
  //     email: "",
  //     address: "",
  //     relation: "",
  //   },
  //   academicRecord: {
  //     certification: "",
  //     institute: "",
  //     level: "",
  //     grade: "",
  //     passingYear: "",
  //   },
  //   previousExperience: {
  //     companyName: "",
  //     designation: "",
  //     address: "",
  //     from: "",
  //     to: "",
  //   },
  //   uploadDocuments: {
  //     nidPassport: "",
  //     cv: "",
  //     appointmentLetter: "",
  //     photo: "",
  //   },
  // });

  //   {
  //     "personalDetails":{
  //       "first_name":"Rakib",
  //       "last_name":"Hossain",
  //       "gender":"Male",
  //       "dob":"1999-08-05",
  //       "blood_group":"B+",
  //       "fathers_name":"Joynal Hossain",
  //       "mothers_name":"Jahanara Begum",
  //       "marital_status":"Single",
  //       "spouse_name":"",
  //       "nationality":"Bangladeshi",
  //       "religion":1,
  //       "personal_email":"rakib@rakib.com",
  //       "personal_phone":"01784625533",
  //       "nid_passport_no":"66745126",
  //       "tin_no":"54135478512654411254554",
  //       "photo":"profile pic",
  //       "present_address":{
  //          "city":"Dhaka",
  //          "state_division":"Dhaka",
  //          "post_zip_code":"1100",
  //          "country":"Bangladesh",
  //          "address":"Soroni Lane, 23/A"
  //       },
  //       "permanent_address":{
  //          "city":"Faridpur",
  //          "state_division":"Dhaka",
  //          "post_zip_code":"5607",
  //          "country":"Bangladesh",
  //          "address":"Kalamridha, Sardar Bari"
  //       }
  //    },
  //    "officialDetails":{
  //       "official_id":"API1234567",
  //       "official_email":"rakib.api@official.com",
  //       "official_phone":"01784526633",
  //       "password":"rakib",
  //       "employee_type":"Intern",
  //       "company":1,
  //       "branch":3,
  //       "department":1,
  //       "designation":1,
  //       "shift":1,
  //       "grade": 3,
  //       "role_permission": [1],
  //       "official_note": "",
  //       "ethnic_group": [1],
  //       "joining_date":"2020-08-01",
  //       "supervisor": 1,
  //       "expense_approver": 1,
  //       "leave_approver": 1,
  //       "shift_request_approver": 1
  //    },
  //    "salaryAndLeaves":{
  //       "payment_in":"Cash",
  //       "bank_account":{
  //          "bank_name":"Prime Bank",
  //          "branch_name":"Banani",
  //          "account_type":1,
  //          "account_no":"126521460000525",
  //          "routing_no":"98541222220540",
  //          "swift_bic":"AAAA-BB-CC-123",
  //          "address":{
  //             "city":"Dhaka",
  //             "state_division":"Dhaka",
  //             "post_zip_code":"1213",
  //             "country":"Bangladesh",
  //             "address":"62 Block - E, Kemal Ataturk Avenue, Banani, Dhaka 1213"
  //          }
  //       },
  //       "gross_salary":10000,
  //       "leavepolicy": [1, 2]
  //    },
  //    "emergencyContact":[
  //         {
  //             "name":"Joynal Hossain",
  //             "age":50,
  //             "phone_no":"01745625578",
  //             "email":"",
  //             "address":{
  //                 "city":"Faridpur",
  //                 "state_division":"Dhaka",
  //                 "post_zip_code":"5607",
  //                 "country":"Bangladesh",
  //                 "address":"Kalamridha, Sardar Bari"
  //             },
  //             "relation":"Father"
  //         },
  //         {
  //             "name":"Jakir Hossain",
  //             "age":20,
  //             "phone_no":"01745625588",
  //             "email":"jakir@jakir.com",
  //             "address":{
  //                 "city":"Faridpur",
  //                 "state_division":"Dhaka",
  //                 "post_zip_code":"5607",
  //                 "country":"Bangladesh",
  //                 "address":"Kalamridha, Sardar Bari"
  //             },
  //             "relation":"Brother"
  //         }
  //    ],
  //    "academicRecord":[
  //         {
  //             "certification":"Secondary School Certificate",
  //             "board_institute_name":"Faridpur Zila High School",
  //             "level":"SSC",
  //             "score_grade":"5.00",
  //             "year_of_passing":2014
  //         },
  //         {
  //             "certification":"Higher Secondary Certificate",
  //             "board_institute_name":"KM College",
  //             "level":"HSC",
  //             "score_grade":"4.60",
  //             "year_of_passing":2016
  //         },
  //         {
  //             "certification":"Bachelor of Science in Computer Science and Engineering",
  //             "board_institute_name":"Green University",
  //             "level":"B.Sc",
  //             "score_grade":"3.14",
  //             "year_of_passing":2020
  //         }
  //    ],
  //    "previousExperience":[
  //         {
  //             "company_name":"5 minutes solutions ltd",
  //             "designation":"Intern Frontend Develover",
  //             "address":"Jatrabari, Hujur Bari Gate",
  //             "from_date":"2020-02-01",
  //             "to_date":"2020-05-01"
  //         }
  //    ],
  //    "uploadDocuments": [
  //         {
  //             "title": "nid",
  //             "attachment": "nid File"
  //         },
  //         {
  //             "title": "cv",
  //             "attachment": "cv File"
  //         },
  //         {
  //             "title": "appointmentLetter",
  //             "attachment": "appointmentLetter File"
  //         },
  //         {
  //             "title": "photo",
  //             "attachment": "photo File"
  //         }
  //    ]
  // }

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
      photo: "",
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
      // group: "",
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
      leavepolicy: [],
      payrollpolicy: {
        earningpolicy: [],
        deductionpolicy: [],
      },
    },
    emergencyContact: [
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
    academicRecord: [
      {
        certification: "",
        board_institute_name: "",
        level: "",
        score_grade: "",
        year_of_passing: null,
      },
    ],
    previousExperience: [
      {
        company_name: "",
        designation: "",
        address: "",
        from_date: null,
        to_date: null,
      },
    ],
    uploadDocuments: [
      {
        title: "",
        attachment: null,
      },
      {
        title: "",
        attachment: null,
      },
      {
        title: "",
        attachment: null,
      },
      {
        title: "",
        attachment: null,
      },
    ],
  });

  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  const nextStep = () =>
    setActive((current) => (current < 7 ? current + 1 : current));

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleFormDataChange = (step, data) => {
    setFormData((prev) => ({ ...prev, [step]: data }));
  };

  const handleNextStep = (currentStepData) => {
    handleFormDataChange(stepKeys[active], currentStepData);
    nextStep();
    console.log(formData);
  };

  const handleStepClick = (index) => {
    if (index <= active - 1 || index === active + 1) {
      // Allow clicking only on the immediate previous or next step
      if (index === active + 1) {
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

  const stepKeys = [
    "personalDetails",
    "officialDetails",
    "salaryAndLeaves",
    "emergencyContact",
    "academicRecord",
    "previousExperience",
    "uploadDocuments",
  ];

  const handleSubmit = async (currentStepData) => {
    handleFormDataChange(stepKeys[active], currentStepData);
    console.log(formData);
    // return;

    try {
      const initialValues = {
        employee_id: "",
        is_superuser: false,
        is_staff: true,
        is_active: true,
        // date_joined: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        phone_number: "",
        shift_id: "",
        image: "",
        group_id: "",
        department: "",
        designation: "",
      };

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

      const response = await fetch(
        "http://10.10.23.64:8000/api/user/add-employee/",
        {
          method: "POST",
          body: formValues,
        }
      );

      const result = await response.json();
      console.log(result);

      return;
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    // try {
    //   const formValues = new FormData();

    //   const flattenObject = (obj, prefix = "") => {
    //     Object.keys(obj).forEach((key) => {
    //       const value = obj[key];
    //       const formKey = prefix ? `${prefix}[${key}]` : key;

    //       if (value && typeof value === "object" && !(value instanceof File)) {
    //         flattenObject(value, formKey);
    //       } else {
    //         formValues.append(formKey, value);
    //       }
    //     });
    //   };

    //   // Flatten and append form values
    //   flattenObject(formData);

    //   // Example of how to append a specific file (e.g., the "photo" field)
    //   // formData.append('photo', formValues.personalDetails.photo);

    //   // Append uploadDocuments separately if they contain files
    //   formData.uploadDocuments.forEach((doc, index) => {
    //     if (doc.attachment) {
    //       formValues.append(`uploadDocuments[${index}][title]`, doc.title);
    //       formValues.append(
    //         `uploadDocuments[${index}][attachment]`,
    //         doc.attachment
    //       );
    //     }
    //   });

    //   console.log(formValues);

    //   // const response = await submit("/employee/", formData, true);

    //   const response = await fetch(
    //     "http://10.10.23.64:8000/api/user/add-employee/",
    //     {
    //       method: "POST",
    //       // headers: {
    //       //   // "Authorization": "Bearer token",
    //       //   // "Content-Type": "multipart/form-data",
    //       // },
    //       body: formValues,
    //     }
    //   );

    //   console.log(response);

    //   return;

    // } catch (error) {
    //   console.error("Error submitting form:", error);
    // }
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

          <Stepper.Step label="Academic Record" description="Step 5">
            <AcademicRecord
              ref={(el) => (stepRefs.current[4] = el)}
              data={formData.academicRecord}
              onNext={handleNextStep}
              onBack={prevStep}
            />
          </Stepper.Step>

          <Stepper.Step label="Education & Experience" description="Step 6">
            <EducationAndExperience
              ref={(el) => (stepRefs.current[5] = el)}
              data={formData.previousExperience}
              onNext={handleNextStep}
              onBack={prevStep}
            />
          </Stepper.Step>

          <Stepper.Step label="Upload Documents" description="Final">
            <UploadDocuments
              ref={(el) => (stepRefs.current[6] = el)}
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
