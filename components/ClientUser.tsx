"use client";

import { useAppStore } from "@/lib/store/store";
import { UserInfo } from "@/components/UserInfo";
import Link from "next/link";

export default function ClientUser() {
  const isLogged = useAppStore((s) => s.logged);

  return (
    <div>
      {!isLogged ? 
      <>
        <h1>No estas logeado</h1> 
        <Link href="/login">Ingresar</Link>
        </>
        : <>
        <h1>Mi cuenta</h1>
        <UserInfo />
        </>}
    </div>
  );
}
