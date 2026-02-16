"use client"

import { useAppStore } from "@/lib/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserModalProps {
  onClose: () => void;
}

export function UserModal({ onClose }: UserModalProps) {
    const isLogged = useAppStore((s) => s.logged);
    const logout = useAppStore((s) => s.logout);
    const router = useRouter();

    const handleLogOut = () => {
      logout();
      onClose();
      router.push("/");
    }

  return (
    <div className="cart-modal">
        {!isLogged ? 
        <Link href="/login" onClick={onClose}>Log in</Link> 
        : 
        <>
          <Link href="/user" onClick={onClose}>Usuario</Link>
          <button
          className="bg-red-600 w-full cursor-pointer text-white py-3 rounded"
           onClick={handleLogOut}>Cerrar Sesion</button>
        </>
        }
    </div>
  );
}