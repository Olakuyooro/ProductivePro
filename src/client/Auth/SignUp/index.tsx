import React, { useState } from "react";
import Image from "next/image";
import signUpPic from "../../../assets/signUpBg.png";
import { useMutation, useQuery } from "@tanstack/react-query";
import { signUp } from "@/src/helper/api/signup.api";
import { getTasks } from "@/src/helper/api/getTask.api";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: createUser } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      console.log("Profile created changed successfully");
    },
    onError: () => {
      console.error("Failed to change create Profile");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      createUser({ name: username, email: email, password: password });
    } catch (error) {
      console.log("Na Beans you dey cook. Lmao");
    }
  };

  return (
    <div className=" flex flex-col md:flex-row w-full bg-gray-300 h-screen md:justify-center p-3 shadow-2xl">
      <div className=" bg-black rounded-md rounded-bl-none md:rounded-bl-md md:rounded-tr-none rounded-br-none p-2 md:w-[37%]">
        <Image src={signUpPic} alt="sign-up" />
      </div>
      <div className="bg-white rounded-md p-6 md:p-2 rounded-tr-none md:rounded-tr-md  md:rounded-br-md rounded-tl-none md:rounded-bl-none md:w-[37%] flex flex-col space-y-4 justify-center items-center">
        <p className="text-2xl font-bold">ProductivePro</p>
        <p className="text-xs font-semibold opacity-80 text-center">
          ProductivePro: Your ultimate productivity companion. Streamline tasks,
          set deadlines, and conquer your to-do list with ease.
        </p>
        <form onSubmit={handleSubmit} className="w-full md:pl-4 my-4 flex flex-col space-y-4">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold">Username</label>
            <input
              className=" md:w-[95%] p-2 border-solid border rounded-md focus:outline focus:outline-[0.1rem]"
              type="text"
              name="name"
              id="name"
              placeholder="Alabanza"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className=" text-sm font-semibold">E-mail</label>
            <input
              className=" md:w-[95%] p-2 border-solid border rounded-md focus:outline focus:outline-[0.1rem]"
              type="email"
              name="email"
              id="email"
              placeholder="example@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold">Password</label>
            <input
              className=" md:w-[95%] p-2 border-solid border rounded-md focus:outline focus:outline-[0.1rem]"
              type="text"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-center text-xs font-semibold bg-yellow-400  rounded-md p-2"
          >
            Get Started
          </button>
        </form>

        <p className="text-xs font-semibold opacity-80 text-center">
          Already have an account? Sign in
        </p>
      </div>
    </div>
  );
};

export default SignUp;
