import React, { useState, useEffect } from "react";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import useSWR from "swr";
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
import { submit, update } from "@/lib/submit";
import { fetcher } from "@/lib/fetch";
import { countries } from "@/data/countries";

const Index = ({ opened, close, item, setItem, mutate }) => {
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    if (item) {
      form.setValues({
        name: item.name || "",
        description: item.description || "",
        company: item.company || "",
        email: item.email || "",
        phone: item.phone || "",
        fax: item.fax || "",
        address: {
          city: item.address.city || "",
          state_division: item.address.state_division || "",
          post_zip_code: item.address.post_zip_code || "",
          country: item.address.country || "",
          address: item.address.address || "",
        },
      });
    }
  }, [item, form]);

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
      name: "company",
      label: item?.name?.toString() || "",
      value: String(item?.id || ""),
    }));

  const handleSubmit = async (values) => {
    console.log(values);
    // e.preventDefault();
    // setSuccess("");
    setIsLoading(true);

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
        title="Edit Branch"
        onClose={() => {
          setItem(null);
          close();
        }}
        centered
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <TextInput
            label="Branch Name"
            placeholder="Branch Name"
            {...form.getInputProps("name")}
          />
          <Textarea
            mt="md"
            label="Description"
            placeholder="Description"
            {...form.getInputProps("description")}
          />
          <Select
            mt="md"
            label="Company"
            placeholder="Company"
            data={companies}
            {...form.getInputProps("company")}
          />
          <TextInput
            mt="md"
            label="Email"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <TextInput
            mt="md"
            label="Phone"
            placeholder="Phone"
            {...form.getInputProps("phone")}
          />
          <TextInput
            mt="md"
            label="Fax"
            placeholder="Fax"
            {...form.getInputProps("fax")}
          />
          <TextInput
            mt="md"
            label="Address"
            placeholder="Address"
            {...form.getInputProps("address.address")}
          />
          <TextInput
            mt="md"
            label="City"
            placeholder="City"
            {...form.getInputProps("address.city")}
          />
          <TextInput
            mt="md"
            label="State"
            placeholder="State"
            {...form.getInputProps("address.state_division")}
          />
          <TextInput
            mt="md"
            label="ZIP Code"
            placeholder="ZIP Code"
            {...form.getInputProps("address.post_zip_code")}
          />
          <Select
            mt="md"
            label="Country"
            placeholder="Country"
            searchable
            data={countries}
            {...form.getInputProps("address.country")}
          />

          {/* <Checkbox
            mt="md"
            label="Is Optional?"
            variant="outline"
            {...form.getInputProps("is_optional")}
          />
          <Checkbox
            mt="md"
            label="Is Calendar Day?"
            variant="outline"
            {...form.getInputProps("is_calendar_day")}
          />
          <Checkbox
            mt="md"
            label="Require Attachment?"
            variant="outline"
            {...form.getInputProps("require_attachment")}
          /> */}

          <Group justify="flex-end" mt="md">
            <Button
              type="button"
              // mt="lg"
              // me={"sm"}
              size="sm"
              variant="outline"
              ml="sm"
              // onClick={() => setIsEditing(false)}
              // disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Index;
