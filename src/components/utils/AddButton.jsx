import React from "react";
import { Button } from "@mantine/core";

const AddButton = ({ label, icon, handleClick, fontSize }) => {
   return (
      <Button
        style={{ fontSize: fontSize }}
         classNames={{
            root: "cusBtn",
         }}
         onClick={handleClick}
         leftSection={icon}
      >
         {label}
      </Button>
   );
};

export default AddButton;
