import React, { useState } from "react";
import { DateInput } from "@mantine/dates";
import { Checkbox } from "@mantine/core";
import {
   Modal,
   TextInput,
   Textarea,
   Button,
   Select,
   Group,
   Grid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import { submit } from "@/lib/submit";

const Index = ({ opened, close }) => {
   const [success, setSuccess] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const form = useForm({
      mode: "uncontrolled",
      initialValues: {
         name: "",
         allocation_days: 15,
         leave_type: null,
         max_consecutive_days: 3,
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

   const handleSubmit = async (values) => {
      console.log(values);
      // e.preventDefault();
      setSuccess("");

      try {
         setIsLoading(true);
         const response = await submit("/api/leave/add-leavepolicy/", values);
         // const response = res.json();
         if (response?.status === "success") {
            console.log(response);
            // setSuccess("Leave Policy created successfully");
            setIsLoading(false);
            // setErrors({});
            // form.reset();
            // close();
            // setSuccess("Leave Policy created successfully");
            toast.success("Leave Policy created successfully");
         } else {
            toast.error(
               response?.status === "error"
                  ? response?.message[0]
                  : "Error submitting form"
            );
         }
      } catch (error) {
         console.error("Error submitting form:", error);
      }
   };

   return (
      <>
         <Modal
            classNames={{
               title: "modalTitle",
            }}
            opened={opened}
            title="Add Branch"
            onClose={close}
            centered
         >
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
               <Grid>
                  <Grid.Col span={6}>
                     <TextInput
                        mb="sm"
                        label="Branch Name"
                        placeholder="Branch Name"
                        {...form.getInputProps("name")}
                     />
                     <Select
                        mb="sm"
                        label="Company"
                        placeholder="Company"
                        data={[]}
                        {...form.getInputProps("company")}
                     />
                     <TextInput
                        mb="sm"
                        label="Email"
                        placeholder="Email"
                        {...form.getInputProps("email")}
                     />
                     <TextInput
                        mb="sm"
                        label="Phone"
                        placeholder="Phone"
                        {...form.getInputProps("phone")}
                     />
                     <TextInput
                        mb="sm"
                        label="Fax"
                        placeholder="Fax"
                        {...form.getInputProps("fax")}
                     />
                     <TextInput
                        mb="sm"
                        label="Address"
                        placeholder="Address"
                        {...form.getInputProps("address.address")}
                     />
                  </Grid.Col>
                  <Grid.Col span={6}>
                     <TextInput
                        mb="sm"
                        label="City"
                        placeholder="City"
                        {...form.getInputProps("address.city")}
                     />
                     <TextInput
                        mb="sm"
                        label="State"
                        placeholder="State"
                        {...form.getInputProps("address.state_division")}
                     />
                     <TextInput
                        mb="sm"
                        label="ZIP Code"
                        placeholder="ZIP Code"
                        {...form.getInputProps("address.post_zip_code")}
                     />
                     <Select
                        mb="sm"
                        label="Country"
                        placeholder="Country"
                        searchable
                        data={[]}
                        {...form.getInputProps("address.country")}
                     />
                     <Textarea
                        mb="sm"
                        label="Description"
                        placeholder="Description"
                        {...form.getInputProps("description")}
                     />
                  </Grid.Col>
               </Grid>

               <Group justify="flex-end" mt="md">
                  <Button type="submit">Save</Button>
               </Group>
            </form>
         </Modal>
      </>
   );
};

export default Index;
