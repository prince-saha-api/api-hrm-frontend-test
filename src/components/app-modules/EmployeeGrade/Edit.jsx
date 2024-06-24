import React from "react";
import { DateInput } from "@mantine/dates";
import {
   Modal,
   TextInput,
   Textarea,
   Button,
   Select,
   Group,
   MultiSelect,
   FileInput,
   Grid,
} from "@mantine/core";
import { FiFile } from "react-icons/fi";
const Index = ({ opened, close }) => {
   return (
      <>
         <Modal
            classNames={{
               title: "modalTitle",
            }}
            opened={opened}
            title="Edit Employee Grade"
            onClose={close}
            centered
         >
            <form>
               <Grid>
                  <Grid.Col span={12}>
                     <TextInput
                        mb="sm"
                        label="Employee Grade"
                        placeholder="Employee Grade"
                     />
                  </Grid.Col>
               </Grid>

               <Group justify="flex-end">
                  <Button variant="filled" mt="sm" size="sm">Save</Button>
               </Group>
            </form>
         </Modal>
      </>
   );
};

export default Index;
