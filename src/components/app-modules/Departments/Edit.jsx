import React, { useState, useEffect } from "react";
import useSWR from "swr";
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
import { fetcher, getData } from "@/lib/fetch";
import { countries } from "@/data/countries";
import { validateEmail, validatePhoneNumber } from "@/lib/validate";

const Index = ({ opened, close, item, setItem, mutate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [branches, setBranches] = useState([]);

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
      name: (value) => (!value ? "Name is required" : null),
      company: (value) => (!value ? "Select a company" : null),
      branch: (value) => (!value ? "Select a branch" : null),
      email: (value) =>
        value && !validateEmail(value) ? "Invalid email" : null,
      phone: (value) =>
        value && !validatePhoneNumber(value) ? "Invalid phone number" : null,
    },
  });

  useEffect(() => {
    console.log(item);
    if (item) {
      form.setValues({
        name: item.name || "",
        description: item.description || "",
        company: item?.branch?.company?.id.toString() || "",
        // branch: String(item?.branch?.id) || "",
        email: item.email || "",
        phone: item.phone || "",
        fax: item.fax || "",
        address_id: item.address?.id || "",
        address: {
          city: item?.address?.city || "",
          state_division: item?.address?.state_division || "",
          post_zip_code: item?.address?.post_zip_code || "",
          country: item?.address?.country || "",
          address: item?.address?.address || "",
        },
      });

      if (item?.branch?.company?.id) {
        fetchBranches(item?.branch?.company?.id).then(() => {
          form.setFieldValue("branch", String(item?.branch?.id));
        });
      }
    }
  }, [item]);

  const {
    data: companyData,
    error: companyError,
    isLoading: isCompanyLoading,
  } = useSWR(`/api/company/get-company/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  const companies = companyData?.data?.result?.map((item) => ({
    label: item?.basic_information?.name?.toString() || "",
    value: item?.id.toString() || "",
  }));

  const fetchBranches = async (companyId) => {
    try {
      const response = await getData(
        `/api/branch/get-branch/?company=${companyId}`
      );
      console.log(response);
      const branchData = response?.data?.data?.result.map((branch) => ({
        label: branch?.name?.toString() || "",
        value: branch?.id.toString() || "",
      }));
      setBranches(branchData);
    } catch (error) {
      console.error("Error fetching branches:", error);
      toast.error("Error fetching branches");
    }
  };

  // useEffect(() => {
  //   if (form.values.company) {
  //     fetchBranches(form.values.company);
  //   }
  // }, [form.values.company]);

  form.watch("company", ({ previousValue, value, touched, dirty }) => {
    if (value) {
      fetchBranches(value);
    } else {
      form.setFieldValue("branch", "");
      setBranches([]);
    }
  });

  const handleSubmit = async (values) => {
    // e.preventDefault();
    // console.log(values);

    setIsSubmitting(true);

    try {
      const response = await update(
        `/api/department/update-department/${item?.id}`,
        values
      );
      // const response = res.json();
      // console.log(response);

      if (response?.status === "success") {
        toast.success("Department updated successfully");
        mutate();
        form.reset();
        close();
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
      }, 500);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
      setTimeout(() => {
        setIsSubmitting(false);
        mutate();
      }, 500);
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
                key={form.key("company")}
              />
              <Select
                mb="sm"
                label="Branch"
                placeholder="Branch"
                required={true}
                disabled={isSubmitting}
                data={branches}
                {...form.getInputProps("branch")}
                key={form.key("branch")}
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
                label="Division / State"
                placeholder="Division / State"
                disabled={isSubmitting}
                {...form.getInputProps("address.state_division")}
              />
              <TextInput
                mb="sm"
                label="Postal / ZIP Code"
                placeholder="Postal / ZIP Code"
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
