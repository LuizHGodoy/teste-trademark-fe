"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { create } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    create({ name: name, email: email, password: password })
      .then(() => {
        toast.success("Conta criada com sucesso!");
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Erro ao criar conta. Tente novamente.");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full max-w-[450px] min-h-screen mx-auto">
      <p className="mb-10 font-bold text-2xl text-center">
        &#128198; Task Manager
      </p>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <Input
          label="nome"
          placeholder="Jhon"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <Input
          type="password"
          label="confirmar senha"
          placeholder="******"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button className="mt-4">Criar conta</Button>
        <p className="mt-4 text-center">
          Já tem uma conta?{" "}
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            Faça login
          </Link>
        </p>
      </form>
    </div>
  );
}
