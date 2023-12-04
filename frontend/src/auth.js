export const verifyToken = async (token) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          access: `${token}`,
        },
      });
  
      if (response.ok) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error verifying token:', error);
      return false;
    }
  };