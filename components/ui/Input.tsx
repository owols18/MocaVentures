import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
};

export default function Input({
  label,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="moca-form-label">
        {label}
      </label>

      <input
        id={id}
        className={`moca-field ${className}`}
        {...props}
      />
    </div>
  );
}