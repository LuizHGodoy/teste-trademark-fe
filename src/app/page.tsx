"use client";

import { SignIn } from "@/components/sign-in";
import { TaskManager } from "@/components/task-manager";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (user: string) => {
    setIsLoggedIn(true);
    setUsername(user);
    toast.success(`Bem-vindo, ${user}!`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    toast.info("Você saiu do sistema.");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
      {!isLoggedIn ? (
        <SignIn onSignIn={handleLogin} />
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Bem-vindo, {username}!
            </h1>
            <button
              onClick={handleLogout}
              className="text-blue-500 hover:underline dark:text-blue-300"
            >
              Sair
            </button>
          </div>
          <TaskManager />
        </div>
      )}
    </main>
  );
}
