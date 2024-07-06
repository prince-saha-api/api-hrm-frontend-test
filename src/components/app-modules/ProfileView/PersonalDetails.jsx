import React, { useState } from "react";
import {
   Modal,
   Button,
   Group,
   Grid,
   TextInput,
   Select,
   NumberInput,
   Textarea,
   DateInput,
   Checkbox,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { toast } from "react-toastify";
import { deleteItem } from "@/lib/submit";
import { countries } from "@/data/countries";

const Index = ({ opened, close, item }) => {
   const [value, setValue] = useState(null);
   const [value2, setValue2] = useState(null);
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
            <form>
               <Grid>
                  <Grid.Col span={6}>
                     <TextInput
                        mb="sm"
                        label="Fathers Name"
                        placeholder="Fathers Name"
                        // // required={true}
                        // disabled={isSubmitting}
                        // {...form.getInputProps("name")}
                     />
                     <TextInput
                        mb="sm"
                        label="Mothers Name"
                        placeholder="Mothers Name"
                        // // required={true}
                        // disabled={isSubmitting}
                        // {...form.getInputProps("name")}
                     />
                     <TextInput
                        mb="sm"
                        label="Spouse Name"
                        placeholder="Spouse Name"
                        // // required={true}
                        // disabled={isSubmitting}
                        // {...form.getInputProps("name")}
                     />
                     <TextInput
                        mb="sm"
                        label="Nationality"
                        placeholder="Nationality"
                        // // required={true}
                        // disabled={isSubmitting}
                        // {...form.getInputProps("name")}
                     />
                     <TextInput
                        // mb="sm"
                        label="Religion"
                        placeholder="Religion"
                        // required={true}
                        // disabled={isSubmitting}
                        // {...form.getInputProps("name")}
                     />
                  </Grid.Col>
                  <Grid.Col span={6}>
                     <NumberInput
                        mb="sm"
                        label="NID / Passport"
                        placeholder="NID / Passport"
                        // required={true}
                        hideControls
                     />
                     <NumberInput
                        mb="sm"
                        label="TIN No"
                        placeholder="TIN No"
                        // required={true}
                        hideControls
                     />
                     <Textarea
                        mb="sm"
                        label="Present Address"
                        placeholder="Present Address"
                        // required={true}
                        //  {...form.getInputProps("present_address.address")}
                     />
                     <Textarea
                        // mb="sm"
                        label="Permanent Address"
                        placeholder="Permanent Address"
                        // required={true}
                        //  {...form.getInputProps("present_address.address")}
                     />
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
