import React, { useEffect, useState } from "react";
import "./dashboard.css";
import axios from "axios";

export default function Dashboard() {
  const [Data, setData] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/get", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        setData(response.data);
      });
  }, []);

  return (
    <div className="App">
      <div id="sidebar" className="neumorphic">
        <ul className="menu">
          <li>Dashboard</li>
        </ul>
      </div>
      <div id="content">
        {Data
          ? Data.map((item) => (
              <div key={item._id} className="dataContainer">
                <div>{item.content}</div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
