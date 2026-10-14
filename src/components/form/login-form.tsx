"use client";
import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { loginSchema } from "@/validation";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import GoogleLoginComponent from "../modules/google-login/GoogleLogin";
import Link from "next/link";
import { toast } from "sonner";
import { useLogin } from "@/hooks";
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { mutate: login, isPending: loginPending } = useLogin();

  const form = useForm({
    defaultValues: {
      email: "mrdjworker@gmail.com",
      password: "aA@123456",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };
      login(loginData, {
        onSuccess: () => {
          router.push("/");
          toast.success("Login Successful");
        },
        onError: (err) => {
          toast.error(err.message || "Something went wrong!");
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <div className=" flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-center">
          Login to Your Account
        </h1>
        <p className="text-sm text-center text-muted-foreground">
          Please enter your email and password to login.
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    placeholder="Email"
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                  />
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors}></FieldError>
                  )}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    />
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeClosed size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {isInvalid && (
                    <FieldError errors={field.state.meta.errors}></FieldError>
                  )}
                </Field>
              );
            }}
          </form.Field>

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-blue-600 underline-offset-4 hover:text-blue-700 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button disabled={loginPending} type="submit">
            {loginPending ? <Spinner /> : "Submit"}
          </Button>
        </FieldGroup>
      </form>
      <FieldSeparator>Or</FieldSeparator>
      <GoogleLoginComponent />

      <div className="text-center text-sm text-muted-foreground">
        Don't have any account?
        <Link
          href={"/register"}
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
