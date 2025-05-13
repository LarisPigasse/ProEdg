import { ButtonHTMLAttributes, ReactNode } from "react";
import Button from "./Button";

interface SubmitButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loadingText?: string;
}

const SubmitButton = ({
  children,
  isLoading = false,
  leftIcon,
  rightIcon,
  loadingText,
  ...props
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      variant="primary"
      isLoading={isLoading}
      leftIcon={!isLoading ? leftIcon : undefined}
      rightIcon={rightIcon}
      disabled={isLoading}
      {...props}
    >
      {isLoading && loadingText ? loadingText : children}
    </Button>
  );
};

export default SubmitButton;
