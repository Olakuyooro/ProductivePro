import React, { useState } from "react";
import Image from "next/image";
import signUpPic from "../../../assets/signUpBg.png";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/src/helper/api/signup.api";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter()

  const { mutate: createUser } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      console.log("Profile created successfully");
      setErrorMessage("");
      router.push('/')
    },
    onError: (error: any) => {
      console.error("Failed to create Profile", error);
      setErrorMessage(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      createUser({ name: username, email: email, password: password });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full bg-gray-100 h-screen md:justify-center p-3 shadow-2xl">
      <div className="bg-black rounded-md rounded-bl-none md:rounded-bl-md md:rounded-tr-none rounded-br-none p-2 md:w-[37%]">
        <Image src={signUpPic} alt="sign-up" />
      </div>
      <div className="bg-white rounded-md p-6 md:p-2 rounded-tr-none md:rounded-tr-md md:rounded-br-md rounded-tl-none md:rounded-bl-none md:w-[37%] flex flex-col space-y-4 justify-center items-center">
        <p className="text-2xl font-bold">ProductivePro</p>
        <p className="text-xs font-semibold opacity-80 text-center">
          ProductivePro: Your ultimate productivity companion. Streamline tasks,
          set deadlines, and conquer your to-do list with ease.
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full md:pl-4 my-4 flex flex-col space-y-4"
        >
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold">Username</label>
            <input
              className="md:w-[95%] p-2 border-solid border rounded-md focus:outline focus:outline-[0.1rem]"
              type="text"
              name="name"
              id="name"
              placeholder="Alabanza"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
            className="text-center text-xs font-semibold bg-yellow-400 hover:opacity-70 rounded-md p-2"
          >
            Get Started
          </button>
        </form>
        {errorMessage && (
          <p className="text-xs text-red-500 text-center">
            {errorMessage}
          </p>
        )}
        <p className="text-xs text-center">
          Already have an account?
          <Link href="/login" className="font-bold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
