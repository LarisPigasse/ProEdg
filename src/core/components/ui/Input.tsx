// src/components/ui/Input.tsx
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  entity?: string; // L'entità a cui appartiene il campo (es. "operatore")
  fieldName: string; // Il nome del campo (es. "email")
  error?: string;
  label?: string;
}

const Input = ({ entity, fieldName, id, name, ...props }: InputProps) => {
  // Genera id e name basati sulla convenzione, se non specificati direttamente
  const inputId = id || `${entity}_${fieldName}`;
  const inputName = name || `${entity}_${fieldName}`;

  return (
    <input
      id={inputId}
      name={inputName}
      className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
      {...props}
    />
  );
};

Input.displayName = "Input";

export default Input;
