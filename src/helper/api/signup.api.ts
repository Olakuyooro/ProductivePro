export interface RegisterUserPayload {
  name: string;
  email: string;
  password: string;
}

export const signUp = async (payload: RegisterUserPayload) => {
  try {
    const response = await fetch("https://backend-productivepro-1.onrender.com/auth/signup", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.data?.[0]?.msg || data.message || `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }
    localStorage.setItem("accessToken", data.token);
    data.statusCode = response.status;
    return data;
  } catch (error: any) {
    console.error("An error occurred during the API request:", error);
    throw new Error(error.message || "Internal Server Error");
  }
};
