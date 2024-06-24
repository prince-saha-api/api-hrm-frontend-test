import React, { useState, useEffect } from "react";
import useSWR from "swr";
// import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import {
   Modal,
   TextInput,
   Textarea,
   Button,
   Select,
   Group,
   Grid,
} from "@mantine/core";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";
import { fetcher } from "@/lib/fetch";
import { countries } from "@/data/countries";

const Index = ({ opened, close, item, setItem, mutate }) => {
   const [isSubmitting, setIsSubmitting] = useState(false);

   const form = useForm({
      mode: "uncontrolled",
      initialValues: {
         name: "",
         description: "",
         company: "",
         branch: "",
         email: "",
         phone: "",
         fax: "",
         address: {
            address: "",
            city: "",
            state_division: "",
            post_zip_code: "",
            country: "",
         },
      },
      validate: {
         name: (value) =>
            value.length < 2 ? "Name must have at least 2 letters" : null,
      },
   });

   useEffect(() => {
      console.log(item);
      if (item) {
         form.setValues({
            name: item.name || "",
            description: item.description || "",
            company: item.company || "",
            email: item.email || "",
            phone: item.phone || "",
            fax: item.fax || "",
            address_id: item.address?.id || "",
            address: {
               city: item.address.city || "",
               state_division: item.address.state_division || "",
               post_zip_code: item.address.post_zip_code || "",
               country: item.address.country || "",
               address: item.address.address || "",
            },
         });
      }
   }, [item]);

   const {
      data,
      error,
      isLoading: isFetchLoading,
   } = useSWR(`/api/company/get-company/`, fetcher, {
      errorRetryCount: 2,
      keepPreviousData: true,
   });

   const companies = data?.data
      ?.filter((item) => true)
      .map((item) => ({
         // name: "company",
         label: item?.basic_information?.name?.toString() || "",
         value: String(item?.basic_information?.id || ""),
      }));

   const handleSubmit = async (values) => {
      // e.preventDefault();
      // console.log(values);

      setIsSubmitting(true);

      try {
         const response = await update("/api/branch/update-branch/", values);
         // const response = res.json();
         console.log(response);

         // if (response?.status === "success") {
         //   console.log(response);
         //   // setSuccess("Leave Policy created successfully");
         //   setIsLoading(false);
         //   // setErrors({});
         //   // form.reset();
         //   // close();
         //   // setSuccess("Leave Policy created successfully");
         //   toast.success("Leave Policy created successfully");
         // } else {
         //   toast.error(
         //     response?.status === "error"
         //       ? response?.message[0]
         //       : "Error submitting form"
         //   );
         // }

         setTimeout(() => {
            setIsSubmitting(false);
            mutate();
         }, 5000);
      } catch (error) {
         console.error("Error submitting form:", error);
         setTimeout(() => {
            setIsSubmitting(false);
            mutate();
         }, 5000);
      }
   };

   return (
      <>
         <Modal
            classNames={{
               title: "modalTitle",
            }}
            opened={opened}
            title="Edit Department"
            onClose={() => {
               setItem(null);
               close();
            }}
            centered
         >
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
               <Grid>
                  <Grid.Col span={6}>
                     <TextInput
                        mb="sm"
                        label="Name"
                        placeholder="Name"
                        required={true}
                        disabled={isSubmitting}
                        {...form.getInputProps("name")}
                     />
                     <TextInput
                        mb="sm"
                        label="Description"
                        placeholder="Description"
                        disabled={isSubmitting}
                        {...form.getInputProps("description")}
                     />

                     <Select
                        mb="sm"
                        label="Company"
                        placeholder="Company"
                        required={true}
                        disabled={isSubmitting}
                        data={companies}
                        {...form.getInputProps("company")}
                     />
                     <Select
                        mb="sm"
                        label="Branch"
                        placeholder="Branch"
                        required={true}
                        disabled={isSubmitting}
                        data={companies}
                        {...form.getInputProps("branch")}
                     />
                     <TextInput
                        mb="sm"
                        label="Email"
                        placeholder="Email"
                        disabled={isSubmitting}
                        {...form.getInputProps("email")}
                     />
                     <TextInput
                        // mb="sm"
                        label="Phone"
                        placeholder="Phone"
                        disabled={isSubmitting}
                        {...form.getInputProps("phone")}
                     />
                  </Grid.Col>
                  <Grid.Col span={6}>
                     <TextInput
                        mb="sm"
                        label="Fax"
                        placeholder="Fax"
                        disabled={isSubmitting}
                        {...form.getInputProps("fax")}
                     />
                     <TextInput
                        mb="sm"
                        label="Address"
                        placeholder="Address"
                        disabled={isSubmitting}
                        {...form.getInputProps("address.address")}
                     />
                     <TextInput
                        mb="sm"
                        label="City"
                        placeholder="City"
                        disabled={isSubmitting}
                        {...form.getInputProps("address.city")}
                     />
                     <TextInput
                        mb="sm"
                        label="State"
                        placeholder="State"
                        disabled={isSubmitting}
                        {...form.getInputProps("address.state_division")}
                     />
                     <TextInput
                        mb="sm"
                        label="ZIP Code"
                        placeholder="ZIP Code"
                        disabled={isSubmitting}
                        {...form.getInputProps("address.post_zip_code")}
                     />
                     <Select
                        // mb="sm"
                        label="Country"
                        placeholder="Country"
                        disabled={isSubmitting}
                        searchable
                        data={countries}
                        {...form.getInputProps("address.country")}
                     />
                  </Grid.Col>
               </Grid>
               <Group justify="flex-end" mt="md">
                  <Button
                     type="submit"
                     loading={isSubmitting}
                     loaderProps={{ type: "dots" }}
                  >
                     Save
                  </Button>
               </Group>
            </form>
         </Modal>
      </>
   );
};

export default Index;
