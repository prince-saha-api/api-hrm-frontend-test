import React from "react";
import { Modal, Button, Group } from "@mantine/core";
import { toast } from "react-toastify";
import { deleteItem } from "@/lib/submit";

const Index = ({ opened, close, item, mutate }) => {
  const handleDelete = async () => {
    try {
      const response = await deleteItem(`/api/device/delete-group/${item.id}`);

      const res = await response.json();

      if (res?.status === "success") {
        toast.success("Item deleted successfully");
        mutate(); // Re-fetch the data
        close();
      } else {
        console.log(res);
        toast.error(res.message[0]);
        close();
        // mutate();
        // throw new Error("Failed to delete item");
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
