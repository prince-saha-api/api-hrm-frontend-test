import React, { useState } from "react";
import useSWR from "swr";
import { useForm } from "@mantine/form";
import {
  Modal,
  Button,
  Group,
  Grid,
  TextInput,
  Select,
  NumberInput,
  Checkbox,
} from "@mantine/core";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";
import { fetcher } from "@/lib/fetch";
import { countries } from "@/data/countries";

const Index = ({ opened, close, item, setItem }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      fathers_name: item?.fathers_name || "",
      mothers_name: item?.mothers_name || "",
      nationality: item?.nationality || "",
      religion: item?.religion?.id.toString() || null,
      nid_passport_no: item?.nid_passport_no || "",
      tin_no: item?.tin_no || "",
      present_address: item?.present_address,
      permanent_address: item?.permanent_address,
      permanentAddressSameAsPresent:
        item?.permanent_address?.id === item?.present_address?.id,
    },
    validate: {},
  });

  const {
    data: religionsData,
    error: religionsError,
    isLoading: religionsIsFetchLoading,
  } = useSWR(`/api/user/get-religion/`, fetcher, {
    errorRetryCount: 2,
    keepPreviousData: true,
  });

  // console.log(religionsData);

  const religions = religionsData?.data?.result?.map((item) => ({
    value: item?.id.toString() || "",
    label: item?.name?.toString() || "",
  }));

  const [sameAsPresent, setSameAsPresent] = useState(
    item?.permanent_address?.id !== item?.present_address?.id
  );

  form.watch(
    "permanentAddressSameAsPresent",
    ({ previousValue, value, touched, dirty }) => {
      const { city, state_division, post_zip_code, country, address } =
        form.getValues().present_address;

      // console.log(country);

      if (value) {
        form.setFieldValue("permanent_address.city", city);
        form.setFieldValue("permanent_address.state_division", state_division);
        form.setFieldValue("permanent_address.post_zip_code", post_zip_code);
        form.setFieldValue("permanent_address.country", country);
        form.setFieldValue("permanent_address.address", address);

        // form.setValues({
        //   permanent_address: {
        //     city,
        //     state_division,
        //     post_zip_code,
        //     country,
        //     address,
        //   },
        // });
        setSameAsPresent(true);
      } else {
        setSameAsPresent(false);
      }
    }
  );

  const handleSubmit = async (values) => {
    // return;

    const updatedValues = {
      ...values,
      ...(values.permanentAddressSameAsPresent && {
        permanent_address: values.present_address,
      }),
    };

    setIsSubmitting(true);

    try {
      const response = await update(
        `/api/user/update-personal-details/${item.id}`,
        updatedValues
      );

      if (response?.status === "success") {
        setIsSubmitting(false);
        close();
        // mutate();
        setItem((prev) => ({
          ...prev,
          fathers_name: response?.data?.fathers_name,
          mothers_name: response?.data?.mothers_name,
          nationality: response?.data?.nationality,
          nid_passport_no: response?.data?.nid_passport_no,
          present_address: response?.data?.present_address,
          permanent_address: response?.data?.permanent_address,
        }));
        toast.success("Profile updated successfully");
      } else {
        toast.error(
          response?.status === "error"
            ? response?.message[0]
            : "Error submitting form"
        );
      }
      setTimeout(() => {
        setIsSubmitting(false);
        // mutate();
      }, 500);
    } catch (error) {
      console.error("Error submitting form:", error);
      setTimeout(() => {
        setIsSubmitting(false);
        // mutate();
      }, 500);
    }
  };

  const handleError = (errors) => {
    console.log(errors);
  };

  return (
    <>
      <Modal
        classNames={{
          title: "modalTitle",
        }}
        opened={opened}
        title="Edit Personal Details"
        onClose={close}
        centered
      >
        <form
          onSubmit={form.onSubmit(
            (values) => handleSubmit(values),
            handleError
          )}
        >
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                mb="sm"
                label="Fathers Name"
                placeholder="Fathers Name"
                // // required={true}
                // disabled={isSubmitting}
                {...form.getInputProps("fathers_name")}
              />
              <TextInput
                mb="sm"
                label="Mothers Name"
                placeholder="Mothers Name"
                // // required={true}
                // disabled={isSubmitting}
                {...form.getInputProps("mothers_name")}
              />
              <TextInput
                //  mb="sm"
                label="Nationality"
                placeholder="Nationality"
                // // required={true}
                // disabled={isSubmitting}
                {...form.getInputProps("nationality")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                mb="sm"
                label="Religion"
                placeholder="Religion"
                data={religions}
                {...form.getInputProps("religion")}
              />

              {/* <TextInput
                mb="sm"
                label="Religion"
                placeholder="Religion"
                // required={true}
                // disabled={isSubmitting}
                // {...form.getInputProps("name")}
              /> */}
              <NumberInput
                mb="sm"
                label="NID / Passport"
                placeholder="NID / Passport"
                // required={true}
                hideControls
                {...form.getInputProps("nid_passport_no")}
              />
              <NumberInput
                //  mb="sm"
                label="TIN No"
                placeholder="TIN No"
                // required={true}
                hideControls
                {...form.getInputProps("tin_no")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <div className="mt-4">
                <p className="mb-0">Present Address</p>
                <TextInput
                  mb="sm"
                  // label="Address"
                  placeholder="Address"
                  {...form.getInputProps("present_address.address")}
                  // {...form.getInputProps("bank_account.address.city")}
                />
                <TextInput
                  mb="sm"
                  // label="City"
                  placeholder="City"
                  {...form.getInputProps("present_address.city")}
                />
                <TextInput
                  mb="sm"
                  // label="Division"
                  placeholder="Division"
                  {...form.getInputProps("present_address.state_division")}
                />
                <TextInput
                  mb="sm"
                  // label="ZIP / Postal Code"
                  placeholder="ZIP / Postal Code"
                  {...form.getInputProps("present_address.post_zip_code")}
                />
                <Select
                  // label="Country"
                  // mb="sm"
                  placeholder="Country"
                  searchable
                  data={countries}
                  {...form.getInputProps("present_address.country")}
                />
              </div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className="mt-0">
                <Checkbox
                  styles={{
                    label: { fontSize: 12 },
                  }}
                  label="Same as Present Address"
                  checked={form.getValues().permanentAddressSameAsPresent}
                  {...form.getInputProps("permanentAddressSameAsPresent")}
                />
                <p className="mb-0 mt-1">Permanent Address</p>
                <TextInput
                  mb="sm"
                  // label="Address"
                  placeholder="Address"
                  disabled={sameAsPresent}
                  {...form.getInputProps("permanent_address.address")}
                  key={form.key("permanent_address.address")}
                />
                <TextInput
                  mb="sm"
                  // label="City"
                  placeholder="City"
                  disabled={sameAsPresent}
                  {...form.getInputProps("permanent_address.city")}
                  key={form.key("permanent_address.city")}
                />
                <TextInput
                  mb="sm"
                  // label="Division"
                  placeholder="Division"
                  disabled={sameAsPresent}
                  {...form.getInputProps("permanent_address.state_division")}
                  key={form.key("permanent_address.state_division")}
                />
                <TextInput
                  mb="sm"
                  // label="ZIP / Postal Code"
                  placeholder="ZIP / Postal Code"
                  disabled={sameAsPresent}
                  {...form.getInputProps("permanent_address.post_zip_code")}
                  key={form.key("permanent_address.post_zip_code")}
                />
                <Select
                  // label="Country"
                  // mb="sm"
                  placeholder="Country"
                  searchable
                  disabled={sameAsPresent}
                  data={countries}
                  {...form.getInputProps("permanent_address.country")}
                  key={form.key("permanent_address.country")}
                />
              </div>
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="md">
            <Button
              type="submit"
              variant="filled"
              loading={isSubmitting}
              loaderProps={{ type: "dots" }}
            >
              Update
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Index;
