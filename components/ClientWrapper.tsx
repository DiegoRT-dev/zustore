"use client";

import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenU, setIsOpenU] = useState(false);
  const theme = useAppStore((s) => s.theme);

  const toggleCart = () => setIsOpen((prev) => !prev);
  const toggleUser = () => setIsOpenU((prev) => !prev);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            try {
              const saved = localStorage.getItem('app-storage');
              if (saved) {
                const theme = JSON.parse(saved).state?.theme || 'light';
                if (theme === 'dark' || theme === 'light') {
                  document.documentElement.classList.add(theme);
                }
              }
            } catch (e) {}
          `,
        }}
      />

      <main className={theme}>
        <Header onToggleCart={toggleCart} onToggleUser={toggleUser} />
        <GlobalLoader />
        <StatusMessage />

        {children}

        {isOpen && <Cart />}
        {isOpenU && <UserModal />}
      </main>
    </>
  );
}