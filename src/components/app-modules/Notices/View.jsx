import { Modal } from "@mantine/core";

const ViewModal = ({ opened, close, item }) => {
  return (
    <Modal opened={opened} onClose={close} title="Notice" centered>
      <h4 className="mb-3 fs-5">{item?.title}</h4>
      <p>{item?.description}</p>
    </Modal>
  );
};

export default ViewModal;
