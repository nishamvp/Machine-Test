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

  function deleteData(delId) {
    const id = delId;
    if(window.confirm('Are you sure?')){
    axios
      .post("http://localhost:5000/api/delete", {id}, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        alert(response.data.message);
        window.location.reload();
      });
    }
  }

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
                <div><i className="fa-solid fa-trash" style={{cursor: 'pointer'}} onClick={()=> deleteData(item._id)}></i></div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
