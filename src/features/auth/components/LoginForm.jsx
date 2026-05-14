"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLoginForm } from "@/features/auth/hooks/use-login-form";

export function LoginForm() {
  const { form, onSubmit, serverError, isPending, labels } = useLoginForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{labels.TITLE}</h1>
        <p className="text-sm text-muted-foreground">{labels.DESCRIPTION}</p>
      </div>

      {serverError && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {serverError}
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{labels.EMAIL}</Label>
          <Input
            id="email"
            type="email"
            placeholder={labels.EMAIL_PLACEHOLDER}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">{labels.PASSWORD}</Label>
          <Input
            id="password"
            type="password"
            placeholder={labels.PASSWORD_PLACEHOLDER}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? labels.SUBMITTING : labels.SUBMIT}
      </Button>
    </form>
  );
}
