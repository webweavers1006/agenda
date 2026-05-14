"use server";

import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { loginSchema } from "@/features/auth/schemas/auth.schema";
import { authenticateUser } from "@/features/auth/services/auth.service";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const SESSION_DURATION = "8h";

export async function loginAction(formData) {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const result = await authenticateUser(parsed.data.email, parsed.data.password);

  if (!result.success) {
    return {
      success: false,
      errors: { _form: [result.error] },
    };
  }

  const token = await new SignJWT(result.payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(SESSION_DURATION)
    .setIssuedAt()
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 8 * 60 * 60, // 8 hours
    path: "/",
  });

  return { success: true, errors: null };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  return { success: true };
}
