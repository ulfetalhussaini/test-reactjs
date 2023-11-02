import { useState } from "react";
import axios from "axios";

const useHTTP = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendHTTP = async (url, method, data = null) => {
    setLoading(true);
    setError(null);
    try {
      const config = {
        method,
        url,
        data,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios(config);
      return response.data;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, sendHTTP };
};

export default useHTTP;
