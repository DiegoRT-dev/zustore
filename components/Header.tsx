"use client";

import { useCartStore } from "@/lib/store/cartSlice";
import { useAppStore } from "@/lib/store/store";
import { SearchBar } from "./SearchBar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserModal } from "./UserModal";

type HeaderProps = {
  onToggleCart: () => void;
  onToggleUser: () => void;  
};

export const Header = ({ onToggleCart, onToggleUser }: HeaderProps) => {
  const count = useCartStore((s) => s.cart.length);

  const isLogged = useAppStore((s) => s.logged);
  const nombre = useAppStore((s) => s.nombre);

  const theme = useAppStore(s => s.theme);
  const toggleTheme = useAppStore(s => s.toggleTheme);

  const pathname = usePathname();

  const showSearchBar = pathname === "/"

  return (
    <header className="flex relative items-center p-4 border-b border-gray-300 min-h-24">
      <Link href="/"><h1 className="mr-12">Zustore</h1></Link>
      {showSearchBar && <SearchBar />}
      <div className="btnHeader">
        <button onClick={onToggleCart} className="cartBtn">Carrito ({count})</button>
        <button onClick={toggleTheme} className="themeBtn">{theme === "light" ? "Dark":"Light"}</button>
        <button onClick={onToggleUser} className="cartBtn">{!isLogged ? <p>Ingresa</p> : nombre}</button>
      </div>
    </header>
  );
};
