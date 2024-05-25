import axios from "axios";

export const fetchTasksByCategory = async (category:any) => {
  const token = localStorage.getItem("accessToken");
  let endpoint = "";
  switch (category) {
    case "today":
      endpoint = "https://backend-productivepro-1.onrender.com/tasks/today";
      break;
    case "upcoming":
      endpoint = "https://backend-productivepro-1.onrender.com/tasks/upcoming";
      break;
    case "personal":
      endpoint = "https://backend-productivepro-1.onrender.com/tasks/personal";
      break;
    case "work":
      endpoint = "https://backend-productivepro-1.onrender.com/tasks/work";
      break;
    default:
      throw new Error("Invalid category");
  }

  const response = await axios.get(endpoint, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.tasks;
};
