    import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  id: string;
};

export default function Textarea({
  label,
  id,
  className = "",
  ...props
}: TextareaProps) {
  return (
    <div>
      <label htmlFor={id} className="moca-form-label">
        {label}
      </label>

      <textarea
        id={id}
        className={`moca-field moca-textarea ${className}`}
        {...props}
      />
    </div>
  );
}