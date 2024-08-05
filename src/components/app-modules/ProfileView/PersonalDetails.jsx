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
import { DatePickerInput } from "@mantine/dates";
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
      mothers_name: item?.last_name || "",
      nationality: item?.designation?.id.toString() || "",
      religion: item?.religion || null,
      nid_passport_no: item?.departmenttwo?.[0]?.id || "",
      tin_no: item?.joining_date ? new Date(item?.joining_date) : null,
      address: {
        city: "",
        state_division: "",
        post_zip_code: "",
        country: "",
        address: "",
      },
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
    item?.permanentAddressSameAsPresent
  );

  form.watch(
    "permanentAddressSameAsPresent",
    ({ previousValue, value, touched, dirty }) => {
      const { city, state_division, post_zip_code, country, address } =
        form.getValues().present_address;

      console.log(country);

      if (value) {
        form.setFieldValue("address.city", city);
        form.setFieldValue("address.state_division", state_division);
        form.setFieldValue("address.post_zip_code", post_zip_code);
        form.setFieldValue("address.country", country);
        form.setFieldValue("address.address", address);

        // form.setValues({
        //   address: {
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
    return;
    const formattedDOB = values.dob
      ? values.dob.toISOString().split("T")[0]
      : null;

    const formattedJoiningDate = values.joining_date
      ? values.joining_date.toISOString().split("T")[0]
      : null;

    const updatedValues = {
      ...values,
      dob: formattedDOB,
      joining_date: formattedJoiningDate,
    };

    setIsSubmitting(true);

    try {
      const response = await update(
        `/api/user/update-profile/${item.id}`,
        updatedValues
      );

      if (response?.status === "success") {
        setIsSubmitting(false);
        close();
        // mutate();
        setItem((prev) => ({
          ...prev,
          first_name: response?.data?.first_name,
          last_name: response?.data?.last_name,
          // designation: response?.data?.designation?.id.toString(),
          official_id: response?.data?.official_id,
          // department: response?.data?.departmenttwo?.[0]?.id,
          joining_date: response?.data?.joining_date,
          personal_phone: response?.data?.personal_phone,
          personal_email: response?.data?.personal_email,
          dob: response?.data?.dob,
          gender: response?.data?.gender,
          blood_group: response?.data?.blood_group,
          marital_status: response?.data?.marital_status,
          spouse_name: response?.data?.spouse_name,
          // supervisor: response?.data?.supervisor,
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
      }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setTimeout(() => {
        setIsSubmitting(false);
        // mutate();
      }, 5000);
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
                  // {...form.getInputProps("bank_account.address.city")}
                />
                <TextInput
                  mb="sm"
                  // label="City"
                  placeholder="City"
                  // {...form.getInputProps("bank_account.address.city")}
                />
                <TextInput
                  mb="sm"
                  // label="Division"
                  placeholder="Division"
                  // {...form.getInputProps("bank_account.address.state_division")}
                />
                <TextInput
                  mb="sm"
                  // label="ZIP / Postal Code"
                  placeholder="ZIP / Postal Code"
                  // {...form.getInputProps("bank_account.address.post_zip_code")}
                />
                <Select
                  // label="Country"
                  mb="sm"
                  placeholder="Country"
                  searchable
                  data={countries}
                  // {...form.getInputProps("bank_account.address.country")}
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
                />
                <p className="mb-0 mt-1">Permanent Address</p>
                <TextInput
                  mb="sm"
                  // label="Address"
                  placeholder="Address"
                  // {...form.getInputProps("bank_account.address.city")}
                />
                <TextInput
                  mb="sm"
                  // label="City"
                  placeholder="City"
                  // {...form.getInputProps("bank_account.address.city")}
                />
                <TextInput
                  mb="sm"
                  // label="Division"
                  placeholder="Division"
                  // {...form.getInputProps("bank_account.address.state_division")}
                />
                <TextInput
                  mb="sm"
                  // label="ZIP / Postal Code"
                  placeholder="ZIP / Postal Code"
                  // {...form.getInputProps("bank_account.address.post_zip_code")}
                />
                <Select
                  // label="Country"
                  placeholder="Country"
                  searchable
                  data={countries}
                  // {...form.getInputProps("bank_account.address.country")}
                />
              </div>
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" mt="md">
            <Button variant="filled">Update</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Index;
