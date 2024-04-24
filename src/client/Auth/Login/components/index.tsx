import React, { useState } from "react";
import Image from "next/image";
import signUpPic from "../../../../assets/signUpBg.png";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/src/helper/api/login.api";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  const { mutate: LogInUser } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      console.log("Login successfully");
    },
    onError: () => {
      console.error("Failed to Login");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      LogInUser({ email: email, password: password });
      // router.push('/')
    } catch (error) {
      console.log("Na Beans you dey cook. Lmao");
    }
  };

  return (
    <div className="flex w-full bg-gray-100 h-screen justify-center p-3 shadow-2xl">
      <div className="bg-black rounded-md rounded-tr-none rounded-br-none p-2 w-[37%]">
        <Image src={signUpPic} alt="sign-up" />
      </div>
      <div className="bg-white rounded-md p-2 rounded-tl-none rounded-bl-none w-[37%] flex flex-col space-y-4 justify-center pl-12">
        <p className="text-2xl font-bold text-left">Sign In</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="w-96 p-2 border-solid border rounded-md"
            type="email"
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-96 p-2 border-solid border rounded-md"
            type="text"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="text-center text-xs font-semibold bg-yellow-400 w-96 rounded-md p-2">
            Sign In
          </button>
        </form>

        <p className="text-xs font-semibold opacity-80 text-center">
          {"Don't have an account? Sign in"}
        </p>
      </div>
    </div>
  );
}
