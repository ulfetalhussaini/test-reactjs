import axios from "axios";
import { useState, useMemo } from "react";

const useHTTP = () => {
  const [res, setRes] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const sendHTTP = useMemo(
    () => async (url, method, data) => {
      setRes((res) => ({ ...res, loading: true, error: null }));

      try {
        const response = await axios({
          url,
          method,
          data,
        });

        if (response?.status === 200) {
          setRes({ data: response?.data, loading: false, error: null });
        }
      } catch (error) {
        setRes({ data: null, loading: false, error });
      }
    },
    []
  );

  return {
    sendHTTP,
    res,
  };
};

export default useHTTP;
