export const getProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');
  
    try {
      const response = await fetch("https://backend-productivepro-1.onrender.com/profile", {
        method: "GET",
        headers: { 
          "Content-type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
      });
  
  
      const data = await response.json();
      console.log("Profile from API:", data);
      return data.user.username;
    } catch (error) {
      console.log(error);
      
    }
  };
  