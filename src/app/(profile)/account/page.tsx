import { Separator } from "@/components/ui/separator";
import React from "react";
import AccountForm from "../_components/form/account-form";

const Page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings.
        </p>
      </div>
      <Separator />
      <div className="w-fit">
        <AccountForm/>
      </div>
    </div>
  );
};

export default Page;
