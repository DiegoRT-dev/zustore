"use client";

import { useAppStore } from "@/lib/store/store";
import { LoginForm } from "@/components/LoginForm";
import { UserInfo } from "@/components/UserInfo";
import { CategoryFilter } from "@/components/CategoryFilter";

export default function ClientHome() {
  const isLogged = useAppStore((s) => s.logged);

  return (
    <>
      {!isLogged ? <p>No estas logeado</p>: <UserInfo />}
      
    </>
  );
}
