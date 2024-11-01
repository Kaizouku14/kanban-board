import { getSession } from "@/lib/auth/lucia";
import { redirect } from "next/navigation";
import type { PropsWithChildren } from "react";

const Layout = async (props : PropsWithChildren) => {
    const session = await getSession();

    if (session?.user) {
      redirect('/page');
    }
    
  return( 
    <>
     {props.children}
    </>
  )
}

export default Layout;
