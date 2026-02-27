"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store/store";

import { Header } from "@/components/Header";
import { GlobalLoader } from "@/components/GlobalLoader";
import { StatusMessage } from "@/components/StatusMessage";
import { Cart } from "@/components/Cart";
import { UserModal } from "./UserModal";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleCart = () => {
    setIsCartOpen((prev) => {
      const newState = !prev;
      if (newState) setIsUserOpen(false);
      return newState;
    });
  };

  const toggleUser = () => {
    setIsUserOpen((prev) => {
      const newState = !prev;
      if (newState) setIsCartOpen(false);
      return newState;
    });
  };

  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 ease-in-out">
      <Header onToggleCart={toggleCart} onToggleUser={toggleUser} />
      <GlobalLoader />
      <StatusMessage />

      <div className="grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>

      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
      {isUserOpen && <UserModal onClose={() => setIsUserOpen(false)} />}
    </main>
  );
}
