// src/components/ui/Input.tsx
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Proprietà aggiuntive specifiche, se necessarie
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error, ...props }, ref) => {
    return (
      <div>
        <input
          ref={ref}
          className={`block w-full rounded-md border border-gray-300 px-3 py-3 text-stone-800 placeholder-gray-500 bg-gray-50 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
