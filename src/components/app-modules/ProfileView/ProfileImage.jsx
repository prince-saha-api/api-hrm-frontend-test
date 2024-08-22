import React, { useState, useRef } from "react";
import Image from "next/image";
import { useForm } from "@mantine/form";
import { Modal, Button, Group, FileButton } from "@mantine/core";
import { toast } from "react-toastify";
import { MdOutlineFileUpload } from "react-icons/md";
import { update } from "@/lib/submit";
import { getStoragePath } from "@/lib/helper";
import { useUser } from "@/components/contexts/UserContext";

const Index = ({ opened, close, item, setItem }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, setUser } = useUser();
  const userId = user?.id;

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      photo: null,
    },
    validate: {
      photo: (value) => {
        if (!value) {
          return "Upload a new photo";
        }

        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(value.type)) {
          return "Photo should be in .jpg or .png format";
        }

        if (value.size > 100 * 1024) {
          return "Photo must not be more than 100KB";
        }

        // const dimensionError = await validateImageDimensions(value);
        // console.log(dimensionError);

        // if (dimensionError) {
        //   return dimensionError;
        // }

        return null;
      },
    },
  });

  // const validateImageDimensions = (file) => {
  //   return new Promise((resolve) => {
  //     const img = new window.Image();
  //     img.onload = () => {
  //       if (img.width !== img.height) {
  //         resolve("Photo should be square size");
  //       } else {
  //         resolve(null);
  //       }
  //     };

  //     img.onerror = () => {
  //       resolve("Invalid image file");
  //     };

  //     img.src = URL.createObjectURL(file);
  //   });
  // };

  const handleFileChange = (file) => {
    if (file) {
      setPreview(URL.createObjectURL(file));
      form.setFieldValue("photo", file); // add this line
    }
  };

  const handleClearPhoto = () => {
    setPreview(null);
    form.setFieldValue("photo", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
  };

  const handleSubmit = async (values) => {
    // const validationErrors = await form.validate();
    // if (validationErrors.hasErrors) {
    //   return;
    // }

    setIsSubmitting(true);

    console.log(values);
    // return;

    try {
      const formValues = new FormData();

      const flattenObject = (obj, prefix = "") => {
        Object.keys(obj).forEach((key) => {
          const value = obj[key];
          const formKey = prefix ? `${prefix}[${key}]` : key;

          if (value && typeof value === "object" && !(value instanceof File)) {
            flattenObject(value, formKey);
          } else {
            formValues.append(formKey, value);
          }
        });
      };

      flattenObject(values);

      // Upload the file to the server
      // const formValues = new FormData();
      // formValues.append("photo", values.photo);

      const response = await update(
        `/api/user/update-profilepic/${item?.user}`,
        formValues,
        true
      );

      console.log(response);
      setIsSubmitting(false);

      if (response?.status === "success") {
        setItem((prev) => ({
          ...prev,
          photo: response?.data?.photo,
        }));
        form.reset();

        setPreview(null);
        close();
        // mutate();

        if (item?.user == userId) {
          setUser((prev) => ({
            ...prev,
            photo: response?.data?.photo,
          }));
        }

        toast.success("Profile photo changed successfully");
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
      // setTimeout(() => {
      //   setIsSubmitting(false);
      //   notifications.show({
      //     withCloseButton: true,
      //     autoClose: 5000,
      //     title: "Error!",
      //     message: "Something went wrong!",
      //     color: "red",
      //     // icon: <></>,
      //     className: "my-notification-class",
      //     // style: { backgroundColor: "red" },
      //     loading: false,
      //   });
      // }, 500);
    }
  };

  return (
    <>
      <Modal
        classNames={{
          title: "modalTitle",
        }}
        opened={opened}
        title="Edit Image"
        onClose={() => {
          close();
          setTimeout(() => {
            form.reset();
            form.setFieldError("photo", null);
            setPreview(null);
          }, 500);
        }}
        centered
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <div className="profile profileEdit position-relative">
            <Image
              src={preview ? preview : getStoragePath(item?.photo)}
              alt="Preview"
              width={200}
              height={200}
            />
            {preview ? (
              <button
                type="button"
                onClick={handleClearPhoto}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            ) : (
              ""
            )}
          </div>

          <Group justify="center">
            <FileButton
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png,image/jpeg"
              disabled={isSubmitting}
            >
              {(props) => (
                <Button
                  classNames={{
                    root: "jiaur",
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

          {form?.errors?.photo && (
            <p className="text-danger text-center mt-2">
              {form?.errors?.photo}
            </p>
          )}

          <Group justify="flex-end" mt="md">
            <Button
              type="submit"
              size="sm"
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
