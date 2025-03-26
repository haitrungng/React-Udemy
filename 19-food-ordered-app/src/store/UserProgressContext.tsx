import React, { useReducer, useState } from "react";

type CtxInterface = {
  progress: "" | "cart" | "checkout" | "confirm";
  showDialog: (screen: ScreenType) => void;
  hideDialog: () => void;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
};

type ScreenType = "cart" | "checkout" | "confirm" | "";

export const UserProgressContext = React.createContext<CtxInterface>({
  progress: "",
  showDialog: (screen: ScreenType) => {},
  hideDialog: () => {},
  dialogRef: React.createRef(),
});

export const UserProgressProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState<ScreenType>("");
  const dialogRef = React.useRef<HTMLDialogElement | null>(null);

  const showDialog = (screen: ScreenType) => {
    setUserProgress(screen);
    dialogRef.current?.showModal();
  };

  const hideDialog = () => {
    setUserProgress("");
    dialogRef.current?.close();
  };

  const userProgressCtx = {
    progress: userProgress,
    showDialog,
    hideDialog,
    dialogRef,
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
};
