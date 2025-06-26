import { Button as MuiButton } from "@mui/material";
import type { ButtonProps } from "@mui/material";
import React from "react";

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const defaultSx = {
  background: "var(--background-color)",
  color: "var(--text-color)",
  "&:hover": {
    background: "var(--backgroundHover-color)",
    color: "var(--textHover-color)",
  },
};

const CustomButton: React.FC<CustomButtonProps> = ({ children, sx, ...props }) => {
  return (
    <MuiButton sx={{ ...defaultSx, ...sx }} {...props}>
      {children}
    </MuiButton>
  );
};

export default CustomButton;
