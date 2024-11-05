"use client";

import React from "react";
import Light from "../_components/theme/light";
import Dark from "../_components/theme/dark";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const Page = () => {
  const theme = useTheme();

  return (
    <div className="flex flex-col gap-y-4 ">
      <div className="h-20">
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>

      <Separator />

      <h1>Theme</h1>
      <div>Select the theme for the dashboard.</div>
      <div className="md:w-96 md:ml-4 flex gap-x-4 justify-center">
        <Button className="h-fit bg-transparent text-primary hover:bg-transparent shadow-none" onClick={() => theme.setTheme("light")}>
          <Light />
        </Button>
        <Button className="h-fit bg-transparent text-primary hover:bg-transparent shadow-none" onClick={() => theme.setTheme("dark")}>
          <Dark />
        </Button>
      </div>
    </div>
  );
};

export default Page;
