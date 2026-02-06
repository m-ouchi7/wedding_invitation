import { Button, ButtonProps } from "@mui/material";
import ArrowRight from "@mui/icons-material/ArrowRight";

interface FormButtonProps extends ButtonProps {
  label: string;
}

export const FormButton = ({
  variant = "contained",
  color = "success",
  label,
  ...props
}: FormButtonProps) => {
  return (
    <Button
      size="medium"
      sx={{ width: "60%" }}
      endIcon={<ArrowRight />}
      variant={variant}
      color={color}
      {...props}
    >
      {label}
    </Button>
  );
};
