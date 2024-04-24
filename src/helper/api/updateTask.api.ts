export interface UpdateTaskPayload {
  title: string;
  description: string;
}

export const UpdateTask = async (payload: UpdateTaskPayload, id: string) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`http://localhost:8080/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken} `,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error("An error occurred during the API request:", error);

    return { statusCode: 500, error: "Internal Server Error" };
  }
};
