"use client";

import * as React from "react";

import {
  getEmailRegistryErrorMessage,
  submitEmailToRegistry,
  type EmailRegistrySubmitStatus,
  type SubmitEmailRegistryResult,
} from "@/lib/email-registry";

type UseEmailRegistrySubmitOptions = {
  source: string;
  onSuccess?: () => void;
};

type UseEmailRegistrySubmitReturn = {
  status: EmailRegistrySubmitStatus;
  errorMessage: string | null;
  submit: (email: string) => Promise<SubmitEmailRegistryResult>;
  reset: () => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
};

export function useEmailRegistrySubmit(
  options: UseEmailRegistrySubmitOptions,
): UseEmailRegistrySubmitReturn {
  const { source, onSuccess } = options;
  const [status, setStatus] = React.useState<EmailRegistrySubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const reset = React.useCallback(() => {
    setStatus("idle");
    setErrorMessage(null);
  }, []);

  const submit = React.useCallback(
    async (email: string) => {
      setStatus("submitting");
      setErrorMessage(null);

      const result = await submitEmailToRegistry({ email, source });

      if (result.ok) {
        setStatus("success");
        onSuccess?.();
        return result;
      }

      setStatus("error");
      setErrorMessage(getEmailRegistryErrorMessage(result.reason));
      return result;
    },
    [onSuccess, source],
  );

  return {
    status,
    errorMessage,
    submit,
    reset,
    isSubmitting: status === "submitting",
    isSuccess: status === "success",
    isError: status === "error",
  };
}
