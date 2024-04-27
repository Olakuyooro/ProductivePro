export const getSticky = async () => {
    const accessToken = localStorage.getItem('accessToken');
  
    try {
      const response = await fetch("https://backend-productivepro-1.onrender.com/stickywall", {
        method: "GET",
        headers: { 
          "Content-type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
      });
  
  
      const data = await response.json();
      console.log("Data received from Sticky API:", data);
      return data.stickyWall;
    } catch (error) {
      console.log(error);
      
    }
  };
  