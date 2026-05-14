"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/features/auth/schemas/auth.schema";
import { loginAction } from "@/features/auth/actions/auth.actions";
import { UI } from "@/features/auth/config/auth.constants";

export function useLoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setIsPending(true);
    setServerError(null);

    const formData = new FormData();
    formData.set("email", values.email);
    formData.set("password", values.password);

    const result = await loginAction(formData);

    if (!result.success) {
      setServerError(result.errors?._form?.[0] ?? "Error al iniciar sesión.");
      setIsPending(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  const labels = UI.LABELS.FORM;

  return {
    form,
    onSubmit,
    serverError,
    isPending,
    labels,
  };
}
