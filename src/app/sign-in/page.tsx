"use client";

import { ModeToggle } from "@/components/ThemeProvider/mode-toggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Signin = () => {
  return (
    <div className="h-screen relative flex flex-col items-center justify-center gap-y-6">
      <h1 className="text-2xl font-medium">Kanban Board</h1>

      <Tabs defaultValue="signin" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign in</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin"></TabsContent>
        <TabsContent value="signup"></TabsContent>
      </Tabs>

      <div className="absolute top-4 right-6">
         <ModeToggle/>
      </div>
    </div>
  );
};

export default Signin;
