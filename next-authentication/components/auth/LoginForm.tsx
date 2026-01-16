"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { loginUser } from "@/app/actions/authAction";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const initialState = {
  success: false,
  error: "",
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginUser,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Logged in Successfully");
      redirect("/dashboard/user");
    }
  }, [state.success]);

  return (
    <div className="w-full max-w-xs mx-auto mt-10 border rounded-md p-6 shadow-md shadow-white">
      <form action={formAction}>
        <FieldGroup>
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
              placeholder="*********"
              required
            />
          </Field>
          <Button variant={"secondary"} type="submit">
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
          <div className="flex items-center justify-center gap-x-2 text-xs">
            <p>Don&apos;t have an account</p>
            <Link
              href="register"
              className="text-blue-400 hover:underline hover:text-blue-500"
            >
              Sign Up
            </Link>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
