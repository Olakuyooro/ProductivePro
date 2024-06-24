import React, { useState } from "react";
import Image from "next/image";
import signUpPic from "../../../../assets/signUpBg.png";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/src/helper/api/login.api";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
      console
    } catch (error) {
      console.log("Na Beans you dey cook. Lmao");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full bg-gray-100 h-screen justify-center p-3 shadow-2xl">
      <div className="bg-black rounded-md rounded-tr-none rounded-br-none p-2 md:w-[37%]">
        <Image src={signUpPic} alt="sign-up" />
      </div>
      <div className="bg-white rounded-md p-4 pb-24 rounded-tl-none rounded-bl-none md:w-[37%] flex flex-col space-y-4 justify-center md:pl-12">
        <p className="text-2xl font-bold text-left mb-8">Sign In</p>
        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-3 flex flex-col">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold">E-mail</label>
            <input
              className="md:w-[95%] p-2 border-solid border rounded-md focus:outline focus:outline-[0.1rem]"
              type="email"
              name="email"
              id="email"
              placeholder="example@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1 relative">
            <label className="text-sm font-semibold">Password</label>
            <input
              className="md:w-[95%] p-2 border-solid border rounded-md focus:outline focus:outline-[0.1rem]"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-10 top-10 transform -translate-y-1/2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            type="submit"
            className="md:w-[95%] text-center text-xs font-semibold bg-yellow-400 hover:opacity-70 rounded-md p-2"
          >
            Sign In
          </button>
        </form>

        <p className="text-xs text-center">
          {"Don't have an account?"} <Link className="font-bold opacity-100" href="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
