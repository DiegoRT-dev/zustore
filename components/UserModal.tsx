"use client"

import { useAppStore } from "@/lib/store/store";
import Link from "next/link";

export function UserModal() {
    const isLogged = useAppStore((s) => s.logged);

  return (
    <div className="cart-modal">
        {!isLogged ? <Link href="/login">Log in</Link> : <Link href="/user">Usuario</Link>}
    </div>
  );
}