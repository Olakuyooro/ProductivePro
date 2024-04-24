import { useState } from "react";

export interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  try {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log(data);
    if (data.token !== undefined) {
      localStorage.setItem("accessToken", data.token);
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken !== null && accessToken !== undefined) {
        window.location.href = "/";
      } else {
        console.error('Access token is not present in localStorage');
      }
    } else {
      console.error('Access token is undefined');
    }
    return data;
  } catch (error) {
    console.error('Wahala', error);
  }
};
