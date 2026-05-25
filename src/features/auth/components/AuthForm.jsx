"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UI } from "@/features/auth/config/auth.constants";
import { userFormSchema } from "@/features/auth/config/auth.form.config";

const LABELS = UI.LABELS.FORM;

/**
 * User create/edit form rendered inside a Dialog.
 * Used by AuthTableDialogs.
 */
export function AuthForm({ user, onSubmit, isPending }) {
  const isEditing = !!user;

  const form = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      idNumber: user?.idNumber ?? "",
      roleId: user?.roleId ?? undefined,
      areaId: user?.areaId ?? null,
      isActive: user?.isActive ?? true,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const isActive = watch("isActive");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName">{LABELS.FIRST_NAME}</Label>
          <Input
            id="firstName"
            placeholder={LABELS.FIRST_NAME_PLACEHOLDER}
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName">{LABELS.LAST_NAME}</Label>
          <Input
            id="lastName"
            placeholder={LABELS.LAST_NAME_PLACEHOLDER}
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">{LABELS.EMAIL}</Label>
        <Input
          id="email"
          type="email"
          placeholder={LABELS.EMAIL_PLACEHOLDER}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="idNumber">{LABELS.ID_NUMBER}</Label>
        <Input
          id="idNumber"
          placeholder={LABELS.ID_NUMBER_PLACEHOLDER}
          {...register("idNumber")}
        />
        {errors.idNumber && (
          <p className="text-sm text-destructive">{errors.idNumber.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="roleId">{LABELS.ROLE}</Label>
        <Select
          defaultValue={user?.roleId?.toString()}
          onValueChange={(v) => setValue("roleId", parseInt(v), { shouldValidate: true })}
        >
          <SelectTrigger id="roleId">
            <SelectValue placeholder={LABELS.ROLE_PLACEHOLDER} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Admin</SelectItem>
            <SelectItem value="2">Usuario</SelectItem>
          </SelectContent>
        </Select>
        {errors.roleId && (
          <p className="text-sm text-destructive">{errors.roleId.message}</p>
        )}
      </div>

      {isEditing && (
        <div className="flex items-center gap-3">
          <Switch
            checked={isActive}
            onCheckedChange={(v) => setValue("isActive", v)}
          />
          <Label>{LABELS.IS_ACTIVE}</Label>
        </div>
      )}

      <Button type="submit" disabled={isPending} className="mt-2">
        {isPending ? LABELS.SAVING : LABELS.SAVE}
      </Button>
    </form>
  );
}
