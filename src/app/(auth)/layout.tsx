import Header from "@/components/Header/header";
import { getSession } from "@/lib/auth/lucia";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

const Layout = async (props: PropsWithChildren) => {
  const { user } = await getSession();

  if (user) redirect("/home");

  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default Layout;
