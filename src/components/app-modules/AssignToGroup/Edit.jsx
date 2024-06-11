import React, { useState, useEffect } from "react";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
   Modal,
   TextInput,
   Textarea,
   Button,
   Select,
   Group,
   Checkbox,
} from "@mantine/core";
import { toast } from "react-toastify";
import { submit } from "@/lib/submit";

const Index = ({ opened, close, item, setItem, mutate }) => {
   const [success, setSuccess] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const form = useForm({
      mode: "uncontrolled",
      initialValues: {
         name: "",
         description: "",
         allocation_days: "",
         leave_type: "",
         max_consecutive_days: "",
         require_attachment: false,
         is_optional: false,
         is_calendar_day: false,
         applicable_for: 1,
      },
      validate: {
         name: (value) =>
            value.length < 2 ? "Name must have at least 2 letters" : null,
      },
   });

   useEffect(() => {
      if (item) {
         form.setValues({
            name: item.name || "",
            description: item.description || "",
            allocation_days: item.allocation_days || "",
            leave_type: item.leave_type || "",
            max_consecutive_days: item.max_consecutive_days || "",
            require_attachment: item.require_attachment || false,
            is_optional: item.is_optional || false,
            is_calendar_day: item.is_calendar_day || false,
            applicable_for: item.applicable_for || 1,
         });
      }
   }, [item, form]);

   const handleSubmit = async (values) => {
      console.log(values);
      // // e.preventDefault();
      // setSuccess("");

      // try {
      //   setIsLoading(true);
      //   const response = await submit("/api/leave/add-leavepolicy/", values);
      //   // const response = res.json();
      //   if (response?.status === "success") {
      //     console.log(response);
      //     // setSuccess("Leave Policy created successfully");
      //     setIsLoading(false);
      //     // setErrors({});
      //     // form.reset();
      //     // close();
      //     // setSuccess("Leave Policy created successfully");
      //     toast.success("Leave Policy created successfully");
      //   } else {
      //     toast.error(
      //       response?.status === "error"
      //         ? response?.message[0]
      //         : "Error submitting form"
      //     );
      //   }
      // } catch (error) {
      //   console.error("Error submitting form:", error);
      // }
   };

   return (
      <>
         <Modal
            classNames={{
               title: "modalTitle",
            }}
            opened={opened}
            title="Edit Assign To Group"
            onClose={() => {
               setItem(null);
               close();
            }}
            centered
         >
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
               <Select
                  label="Select Device"
                  placeholder="Pick value"
                  data={["Device-1", "Device-2", "Device-3"]}
                  mb="sm"
               />
               <Select
                  label="Select Group"
                  placeholder="Pick value"
                  data={["Group-1", "Group-2", "Group-3"]}
               />

               <Group justify="flex-end" mt="md">
                  <Button type="submit">Save</Button>
               </Group>
            </form>
         </Modal>
      </>
   );
};

export default Index;
