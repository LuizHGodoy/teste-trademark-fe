"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    login({ email: email, password: password })
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        return;
      });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full max-w-[450px] min-h-screen mx-auto">
      <p className="mb-10 font-bold text-2xl text-center">
        &#128198; Task Manager
      </p>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <Input
          type="email"
          label="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="senha"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="mt-4">Continuar com email e senha</Button>
        <p className="mt-4 text-center">
          Não tem uma conta?{" "}
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}
