export const getTasks = async () => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await fetch("https://backend-productivepro-1.onrender.com/tasks", {
      method: "GET",
      headers: { 
        "Content-type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
    });


    const data = await response.json();
    console.log("Data received from API:", data);
    return data.tasks;
  } catch (error) {
    console.log(error);
    
  }
};
