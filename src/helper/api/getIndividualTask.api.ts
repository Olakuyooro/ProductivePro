export const getIndividualTask = async (id: number) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`https://backend-productive-pro-yedj.vercel.app/task/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("Data received from API:", data);
    return data.tasks;
  } catch (error) {
    console.error("An error occurred during the API request:", error);
    return { statusCode: 500, error: "Internal Server Error" };
  }
};
