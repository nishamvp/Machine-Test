import React, { useEffect, useState } from "react";
import "./profile.css";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

export default function Profile() {
  const [Data, setData] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    axios
      .post("http://localhost:5000/api/profile", {name}, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        setData(response.data);
      });
  }, []);

const navigate = useNavigate();

  return (
    <div className="App">
      <div id="sidebar" className="neumorphic">
        <ul className="menu">
          <li onClick={()=> {
            navigate('/')
          }}>Dashboard</li>
          <li>Profile</li>
          <li style={{color: 'red'}} onClick={()=> {
            localStorage.removeItem("token");
            window.location.reload();
          }}>Logout</li>
        </ul>
      </div>
      <div id="content">
      <div key={Data._id}>
        <img style={{width: 200, height: 200, objectFit: "cover", borderRadius: 100,}} src={Data.file?Data.file:''} alt="logo"/>
        <div>Name : {Data.name}</div>
        <div>Address : {Data.address}</div>
      </div>
    </div>
    </div >
  );
}
