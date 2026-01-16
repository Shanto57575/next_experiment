/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { registerUser } from "@/app/actions/authAction";
import { useActionState } from "react";
import Link from "next/link";

const initialState = {
  success: false,
  message: "",
  user: null as any,
};

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    registerUser,
    initialState
  );
  if (state) {
    console.log("state==>", state);
  }

  return (
    <div className="w-full max-w-xs mx-auto mt-10 border rounded-md p-6 shadow-md shadow-white">
      <form action={formAction}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="userName">Name</FieldLabel>
            <Input
              type="text"
              id="userName"
              name="userName"
              placeholder="john doe"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@mail.com"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password">password</FieldLabel>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="******"
              required
            />
          </Field>
          <Button variant={"secondary"} type="submit">
            {isPending ? "Signing up..." : "Sign Up"}
          </Button>
          <div className="flex items-center justify-center gap-x-2 text-xs">
            <p>Already have an account ?</p>
            <Link
              href="login"
              className="text-blue-400 hover:underline hover:text-blue-500"
            >
              Login
            </Link>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
