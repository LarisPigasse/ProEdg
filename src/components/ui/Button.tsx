import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "success"
  | "ghost"
  | "link"
  | "info"
  | "warning";

export type ButtonSize = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = "",
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    // Base classes for all buttons
    const baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

    // Size-specific classes
    const sizeClasses = {
      xs: "px-1.5 py-1 text-xxs",
      sm: "px-2 py-1.5 text-xs",
      md: "px-3 py-2 text-sm",
      lg: "px-4 py-2.5 text-base",
    };

    // Variant-specific classes
    const variantClasses = {
      primary:
        "border border-transparent bg-violet-500 text-white hover:bg-violet-600 focus:ring-violet-500 disabled:bg-violet-300",
      secondary:
        "border border-transparent bg-neutral-200 text-stone-600 hover:bg-neutral-300 focus:ring-neutral-500 disabled:bg-neutral-100 disabled:text-stone-400",
      outline:
        "border border-gray-300 text-stone-600 bg-gray-50 hover:bg-gray-100 focus:ring-sky-500 disabled:bg-gray-50 disabled:text-gray-400",
      danger:
        "border border-transparent bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 disabled:bg-red-300",
      success:
        "border border-transparent bg-lime-500 text-white hover:bg-green-400 focus:ring-lime-500 disabled:bg-lime-300",
      warning:
        "border border-transparent bg-yellow-300 text-stone-600 hover:bg-yellow-400 focus:ring-yellow-400 disabled:bg-yellow-100 disabled:text-stone-400",
      info: "border border-transparent bg-sky-200 text-stone-600 hover:bg-sky-300 focus:ring-sky-500 disabled:bg-sky-50 disabled:text-stone-400",
      ghost:
        "border border-transparent bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 disabled:bg-transparent disabled:text-gray-300",
      link: "border border-transparent bg-transparent p-0 text-indigo-600 hover:text-indigo-700 hover:bg-sky-50 focus:ring-0 disabled:text-indigo-300",
    };

    // Full width class
    const widthClass = fullWidth ? "w-full" : "";

    // Loading state
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        className={`
        ${baseClasses} 
        ${sizeClasses[size]} 
        ${variantClasses[variant]} 
        ${widthClass} 
        ${className}
      `}
        disabled={isDisabled}
        {...props}
      >
        {/* Loading spinner */}
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}

        {/* Left icon */}
        {!isLoading && leftIcon && (
          <span className="mr-2 -ml-1 flex items-center">{leftIcon}</span>
        )}

        {/* Button text */}
        <span>{children}</span>

        {/* Right icon */}
        {rightIcon && (
          <span className="ml-2 -mr-1 flex items-center">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
