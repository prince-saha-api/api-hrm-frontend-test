import React from "react";
import { Modal, Button, Group } from "@mantine/core";
import { toast } from "react-toastify";
import { update } from "@/lib/submit";

const Index = ({ opened, close, item, mutate }) => {
  const handleUpdate = async () => {
    try {
      const response = await update(
        `/api/leave/reject-leaverequest/${item.id}`
      );

      // const res = await response.json();

      if (response?.status === "success") {
        toast.success("Request rejected");
        mutate(); // Re-fetch the data
        close();
      } else {
        toast.error(response?.message?.[0] || "Something went wrong");
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
          <p>Are you sure want to reject?</p>

          <Group justify="flex-end" mt="md">
            <Button onClick={close} variant="filled">
              No
            </Button>
            <Button variant="filled" color="red" onClick={handleUpdate}>
              Yes
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Index;
