import React, { useState } from "react";
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
import { submit } from "@/lib/submit";
import { fetcher } from "@/lib/fetch";
import { countries } from "@/data/countries";

const Index = ({ opened, close, mutate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      description: "",
      company: "",
      email: "",
      phone: "",
      fax: "",
      address: {
        city: "",
        state_division: "",
        post_zip_code: "",
        country: "",
        address: "",
      },
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
    },
  });

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
      const response = await submit("/api/branch/add-branch/", values);
      console.log(response);
      // return;

      // const response = res.json();
      if (response?.status === "success") {
        console.log(response);
        // setSuccess("Leave Policy created successfully");

        // setErrors({});
        // form.reset();
        // close();
        // setSuccess("Leave Policy created successfully");
        toast.success("Leave Policy created successfully");
        mutate();
      } else {
        toast.error(
          response?.status === "error"
            ? response?.message[0]
            : "Error submitting form"
        );
      }
      setTimeout(() => {
        setIsSubmitting(false);
        mutate();
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setTimeout(() => {
        setIsSubmitting(false);
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
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("name")}
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
              <TextInput
                mb="sm"
                label="Email"
                placeholder="Email"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("email")}
              />
              <TextInput
                mb="sm"
                label="Phone"
                placeholder="Phone"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("phone")}
              />
              <TextInput
                // mb="sm"
                label="Fax"
                placeholder="Fax"
                disabled={isSubmitting}
                {...form.getInputProps("fax")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                mb="sm"
                label="Address"
                placeholder="Address"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("address.address")}
              />
              <TextInput
                mb="sm"
                label="City"
                placeholder="City"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("address.city")}
              />
              <TextInput
                mb="sm"
                label="State"
                placeholder="State"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("address.state_division")}
              />
              <TextInput
                mb="sm"
                label="ZIP Code"
                placeholder="ZIP Code"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("address.post_zip_code")}
              />
              <Select
                // mb="sm"
                label="Country"
                placeholder="Country"
                required={true}
                disabled={isSubmitting}
                searchable
                data={countries}
                {...form.getInputProps("address.country")}
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={12}>
              <Textarea
                mb="sm"
                label="Description"
                placeholder="Description"
                required={true}
                disabled={isSubmitting}
                {...form.getInputProps("description")}
              />
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="sm">
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
