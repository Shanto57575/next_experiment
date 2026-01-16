/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/lib/prisma";
import {
  createSession,
  destroySession,
  getUserFromSession,
} from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function registerUser(_: any, formData: FormData) {
  const name = formData.get("userName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return {
      success: false,
      message: "All fields are required",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    redirect("/login");
  } catch {
    return {
      success: false,
      message: "Something went wrong! try again",
    };
  }
}

export async function loginUser(_: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      error: "All fields are required",
    };
  }

  const isUserExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExists) {
    return {
      success: false,
      error: "User Not Found",
    };
  }

  const isValid = await bcrypt.compare(
    password as string,
    isUserExists.password
  );
  if (!isValid) {
    return {
      success: false,
      error: "Invalid credentials",
    };
  }

  await createSession(isUserExists.id);
  return {
    success: true,
    error: null,
  };
}

export async function Logout() {
  await destroySession();
  redirect("/login");
}

export async function GetMe() {
  const user = await getUserFromSession();
  return {
    success: true,
    user: user ?? null,
  };
}
