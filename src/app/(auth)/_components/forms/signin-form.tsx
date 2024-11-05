"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { signInFormSchema } from "../schema";
import { api } from "@/app/_trpc/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/forms/password-input";
import SubmitButton from "@/components/forms/submit-button";

const SignInForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signinMutation = api.auth.signin.useMutation();
  function onSubmit(values: z.infer<typeof signInFormSchema>) {
    toast.promise(signinMutation.mutateAsync(values), {
      loading: "Logging in...",
      success: () => {
        router.push("/home");
        return "Logged in successfully";
      },
      error: (error: unknown) => {
        return (error as Error).message;
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Email Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton mutation={signinMutation}>Sign in</SubmitButton>
      </form>
    </Form>
  );
};

export default SignInForm;
