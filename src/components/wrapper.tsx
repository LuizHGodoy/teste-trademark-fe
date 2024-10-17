"use client";

import { AuthProvider } from "@/context/auth-context";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./theme-provider";

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <AuthProvider>{children}</AuthProvider>
      <ToastContainer />
    </ThemeProvider>
  );
};
