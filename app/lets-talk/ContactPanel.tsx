"use client";

import {
  useState,
  type FocusEvent,
  type FormEvent,
} from "react";
import Button from "../../components/ui/Button";
import countryCodes from "../../content/phone-country-codes.json";
import styles from "./LetsTalkPage.module.css";

type TextFieldContent = {
  label: string;
  requiredError: string;
  formatError?: string;
  maxLength: number;
};

type FormContent = {
  label: string;
  fields: {
    firstName: TextFieldContent;
    lastName: TextFieldContent;
    email: TextFieldContent;
    phone: TextFieldContent & { countryLabel: string };
    subject: TextFieldContent;
    message: TextFieldContent;
  };
  submitLabel: string;
  submittingLabel: string;
  successMessage: string;
  errorSummary: string;
};

type ContactPanelProps = {
  form: FormContent;
};

type FieldName =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "subject"
  | "message";

type FormErrors = Partial<Record<FieldName, string>>;
type FormStatus = "idle" | "error" | "success";

const personNamePattern = /^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;
const subjectPattern = /^[\p{L}\p{M}\p{N} .,'’&()\-/?]+$/u;

export default function ContactPanel({ form }: ContactPanelProps) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [pending, setPending] = useState(false);

  const validateField = (
    name: FieldName,
    value: string,
  ): string | undefined => {
    const trimmedValue = value.trim();
    const field = form.fields[name];
    if (!trimmedValue) return field.requiredError;

    if (
      (name === "firstName" || name === "lastName") &&
      !personNamePattern.test(trimmedValue)
    ) {
      return field.formatError;
    }

    if (name === "email" && !emailPattern.test(trimmedValue)) {
      return field.formatError;
    }

    if (name === "phone" && !/^\d+$/u.test(trimmedValue)) {
      return field.formatError;
    }

    if (name === "subject" && !subjectPattern.test(trimmedValue)) {
      return field.formatError;
    }

    return undefined;
  };

  const setFieldError = (
    name: FieldName,
    value: string,
  ) => {
    const nextError = validateField(name, value);
    setErrors((current) => ({ ...current, [name]: nextError }));
  };

  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFieldError(event.currentTarget.name as FieldName, event.currentTarget.value);
  };

  const revalidateChangedField = (
    name: FieldName,
    value: string,
  ) => {
    if (errors[name]) setFieldError(name, value);
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;

    const enquiryForm = event.currentTarget;
    const formData = new FormData(enquiryForm);
    const nextErrors: FormErrors = {
      firstName: validateField(
        "firstName",
        String(formData.get("firstName") ?? ""),
      ),
      lastName: validateField(
        "lastName",
        String(formData.get("lastName") ?? ""),
      ),
      email: validateField("email", String(formData.get("email") ?? "")),
      phone: validateField("phone", String(formData.get("phone") ?? "")),
      subject: validateField(
        "subject",
        String(formData.get("subject") ?? ""),
      ),
      message: validateField(
        "message",
        String(formData.get("message") ?? ""),
      ),
    };

    const invalidFields = Object.entries(nextErrors).filter(
      ([, message]) => Boolean(message),
    );

    if (invalidFields.length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      const firstInvalidField = enquiryForm.elements.namedItem(
        invalidFields[0][0],
      );
      if (firstInvalidField instanceof HTMLElement) firstInvalidField.focus();
      return;
    }

    setErrors({});
    setStatus("idle");
    setPending(true);
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    enquiryForm.reset();
    setPending(false);
    setStatus("success");
  };

  const renderError = (name: FieldName) =>
    errors[name] ? (
      <p id={`${name}-error`} className={styles.fieldError} role="alert">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form
      className={styles.contactForm}
      aria-label={form.label}
      noValidate
      onSubmit={handleSubmit}
    >
      <div className={styles.fieldGroup}>
        <label htmlFor="firstName">{form.fields.firstName.label}</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          autoComplete="given-name"
          maxLength={form.fields.firstName.maxLength}
          required
          aria-invalid={Boolean(errors.firstName)}
          aria-describedby={errors.firstName ? "firstName-error" : undefined}
          onBlur={handleBlur}
          onChange={(event) =>
            revalidateChangedField("firstName", event.currentTarget.value)
          }
        />
        {renderError("firstName")}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="lastName">{form.fields.lastName.label}</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          autoComplete="family-name"
          maxLength={form.fields.lastName.maxLength}
          required
          aria-invalid={Boolean(errors.lastName)}
          aria-describedby={errors.lastName ? "lastName-error" : undefined}
          onBlur={handleBlur}
          onChange={(event) =>
            revalidateChangedField("lastName", event.currentTarget.value)
          }
        />
        {renderError("lastName")}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="email">{form.fields.email.label}</label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={form.fields.email.maxLength}
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          onBlur={handleBlur}
          onChange={(event) =>
            revalidateChangedField("email", event.currentTarget.value)
          }
        />
        {renderError("email")}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="phone">{form.fields.phone.label}</label>
        <div className={styles.phoneField}>
          <select
            id="countryCode"
            name="countryCode"
            defaultValue="US"
            aria-label={form.fields.phone.countryLabel}
            required
          >
            {countryCodes.map((country) => (
              <option key={country.iso} value={country.iso}>
                {country.name} {country.dialCode}
              </option>
            ))}
          </select>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={form.fields.phone.maxLength}
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            onBlur={handleBlur}
            onInput={(event) => {
              event.currentTarget.value = event.currentTarget.value.replace(
                /\D/gu,
                "",
              );
              revalidateChangedField("phone", event.currentTarget.value);
            }}
          />
        </div>
        {renderError("phone")}
      </div>

      <div className={styles.fieldGroup}>
        <label htmlFor="subject">{form.fields.subject.label}</label>
        <input
          id="subject"
          name="subject"
          type="text"
          maxLength={form.fields.subject.maxLength}
          required
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          onBlur={handleBlur}
          onChange={(event) =>
            revalidateChangedField("subject", event.currentTarget.value)
          }
        />
        {renderError("subject")}
      </div>

      <div className={`${styles.fieldGroup} ${styles.messageField}`}>
        <label htmlFor="message">{form.fields.message.label}</label>
        <textarea
          id="message"
          name="message"
          maxLength={form.fields.message.maxLength}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          onBlur={handleBlur}
          onChange={(event) =>
            revalidateChangedField("message", event.currentTarget.value)
          }
        />
        {renderError("message")}
      </div>

      {status === "error" ? (
        <p className={styles.formStatusError} role="alert">
          {form.errorSummary}
        </p>
      ) : null}

      <div className={styles.submitRow}>
        <Button type="submit" disabled={pending}>
          {pending ? form.submittingLabel : form.submitLabel}
        </Button>
      </div>

      {status === "success" ? (
        <p className={styles.formStatusSuccess} role="status">
          {form.successMessage}
        </p>
      ) : null}
    </form>
  );
}
