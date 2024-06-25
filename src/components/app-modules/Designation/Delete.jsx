import React from "react";
import { Modal, Button, Group } from "@mantine/core";
import { toast } from "react-toastify";

const Index = ({ opened, close, item, mutate }) => {
   const handleDelete = async () => {
      try {
         const response = await fetch(
            `/api/leave/delete-leavepolicy/${item.id}/`,
            {
               method: "DELETE",
            }
         );
         if (response.ok) {
            toast.success("Item deleted successfully");
            mutate(); // Re-fetch the data
            close();
         } else {
            throw new Error("Failed to delete item");
         }
      } catch (error) {
         toast.error(error.message);
      }
   };

   return (
      <>
         <Modal
            classNames={{
               title: "modalTitle",
            }}
            opened={opened}
            title="Delete"
            onClose={close}
            centered
         >
            <form>
               <p>Are you sure want to delete ?</p>

               <Group justify="flex-end" mt="md">
                  <Button onClick={close} variant="filled">
                     No
                  </Button>
                  <Button variant="filled" color="red" onClick={handleDelete}>
                     Yes
                  </Button>
               </Group>
            </form>
         </Modal>
      </>
   );
};

export default Index;
