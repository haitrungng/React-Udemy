import { useRef, useState } from "react";
import Dialog from "./components/Dialog";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartProvider } from "./store/CartContext";
import { UserProgressProvider } from "./store/UserProgressContext";

function App() {
  return (
    <CartProvider>
      <UserProgressProvider>
        <Dialog />
        <Header />
        <Meals />
      </UserProgressProvider>
    </CartProvider>
  );
}

export default App;
