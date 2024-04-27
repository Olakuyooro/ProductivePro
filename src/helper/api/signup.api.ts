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

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    data.statusCode = response.status;
    return data;
  } catch (error) {
    console.error("An error occurred during the API request:", error);
    return { statusCode: 500, error: "Internal Server Error" };
  }
};
