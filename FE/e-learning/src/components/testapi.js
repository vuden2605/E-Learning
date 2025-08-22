import React, { useEffect, useState } from "react";
import axios from "axios";

const TestApi = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("✅ TestApi component mounted!");
    axios
      .get("http://localhost:8080/elearning/api/category")
      .then((response) => {
        console.log("Response:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      
  }, []);

  return (
    <div>
      <h1>Test API</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."}
    </div>
  );
};

export default TestApi;
