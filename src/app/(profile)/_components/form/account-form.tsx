"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { accountFormSchema } from "../schema/account-schema";
import { z } from "zod";
import { api } from "@/app/_trpc/client";
import { useEffect } from "react";
import AccountFormSkeleton from "../skeleton/form-skeleton";

const AccountForm = () => {
  const { data, isLoading } = api.profile.getUserInfo.useQuery();

  const form = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        username: data.username || "",
        email: data.email || "",
        password: "",
        newPassword: "",
      });
    }
  }, [data, form]);

  function onSubmit(values: z.infer<typeof accountFormSchema>) {
    console.log(values);
  }

 if (isLoading) return <AccountFormSkeleton/>

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center gap-x-4">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name that will be displayed on your profile.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email address" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be your email address for this account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your current password to authorize changes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter new password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Create a strong password that you haven’t used before.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit">Update account</Button>
      </form>
    </Form>
  );
};

export default AccountForm;
