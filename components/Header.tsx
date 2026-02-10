"use client";

import { useCartStore } from "@/lib/store/cartSlice";
import { useAppStore } from "@/lib/store/store";
import { SearchBar } from "./SearchBar";

type HeaderProps = {
  onToggleCart: () => void;  
};

export const Header = ({ onToggleCart }: HeaderProps) => {
  const count = useCartStore((s) => s.cart.length);

  const theme = useAppStore(s => s.theme);
  const toggleTheme = useAppStore(s => s.toggleTheme);

  return (
    <header>
      <h1>Tiendita</h1>
      <SearchBar />
      <div className="btnHeader">
        <button onClick={onToggleCart} className="cartBtn">Carrito ({count})</button>
      <button onClick={toggleTheme} className="themeBtn">{theme === "light" ? "Dark":"Light"}</button>
      </div>
    </header>
  );
};
