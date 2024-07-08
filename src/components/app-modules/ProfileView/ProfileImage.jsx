import React, { useState } from "react";
import {
  Modal,
  Button,
  Group,
  PasswordInput,
  Grid,
  TextInput,
  Select,
  NumberInput,
  Textarea,
  FileButton,
  Text,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { toast } from "react-toastify";
import { deleteItem } from "@/lib/submit";
import Image from "next/image";
import { MdOutlineFileUpload } from "react-icons/md";

const Index = ({ opened, close, item }) => {
  const [value, setValue] = useState(null);
  const [value2, setValue2] = useState(null);

  const [file, setFile] = useState(null);

  return (
    <>
      <Modal
        classNames={{
          title: "modalTitle",
        }}
        opened={opened}
        title="Edit Image"
        onClose={close}
        centered
      >
        <form>
          {/* <div className="text-center">
            <Image
              src="/profile03.jpg"
              width={200}
              height={200}
              alt="profile_img"
            />
          </div> */}

          <div className="profile profileEdit position-relative">
            <Image
              src="/profile03.jpg"
              width={200}
              height={200}
              alt="profile_img"
            />
            {/* <button className="border-0 proOverly">
              <MdOutlineFileUpload className="iconBtn me-2 text-dark" />
              Upload
            </button> */}
          </div>

          <Group justify="center">
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => (
                <Button
                  classNames={{
                    root: "jiaur"
                  }}
                  variant="filled"
                  {...props}
                >
                  <MdOutlineFileUpload className="iconBtn me-2 fs-6" />
                  Upload image
                </Button>
              )}
            </FileButton>
          </Group>

          {file && (
            <Text size="sm" ta="center" mt="sm">
              Picked file: {file.name}
            </Text>
          )}

          {/* <Group justify="center">
            <FileButton
              //   ref={fileInputRef}
              //   onChange={handleFileChange}
              accept="image/png,image/jpeg"
              //   disabled={isSubmitting}
            >
              {(props) => <Button {...props}>Upload Image</Button>}
            </FileButton>
          </Group> */}

          <Group justify="flex-end" mt="md">
            <Button variant="filled">Update</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default Index;
