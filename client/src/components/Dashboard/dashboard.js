import React, { useEffect, useState } from "react";
import "./dashboard.css";
import axios from "axios";

export default function Dashboard() {
  const [Data, setData] = useState("");
  const [formContent, setFormContent] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    axios
      .post("http://localhost:5000/api/get", {name}, {
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
    if (window.confirm('Are you sure?')) {
      axios
        .post("http://localhost:5000/api/delete", { id }, {
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

  function submitData(e) {
    const content = formContent;
    const name = localStorage.getItem("name");
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/save", { content, name }, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        alert(response.data.message);
        window.location.reload();
      });
  }

  function editData(dataId, dataContent) {
    const id = dataId;
    var content = window.prompt("New Content", dataContent);
    if (content === "") {
      alert("New Content Cannot Be Empty");
    } else if (content) {

      axios
      .post("http://localhost:5000/api/edit", { id, content }, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then(function (response) {
        alert(response.data.message);
        window.location.reload();
      });

    } else {
      alert("Cancelled Process")
    }
  }

  return (
    <div className="App">
      <div id="sidebar" className="neumorphic">
        <ul className="menu">
          <li>Dashboard</li>
          <li style={{color: 'red'}} onClick={()=> {
            localStorage.removeItem("token");
            window.location.reload();
          }}>Logout</li>
        </ul>
      </div>
      <div id="content">
      <form onSubmit={(e) => submitData(e)} className="dataContainer2">
        <textarea placeholder="Enter Data" value={formContent} onChange={(e) => setFormContent(e.target.value)}></textarea>
        <button type="submit">SUBMIT</button>
      </form>
        {Data
          ? Data.map((item) => (
            <div key={item._id} className="dataContainer">
              <div>{item.content}</div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <i className="fa-solid fa-edit" style={{ cursor: 'pointer' }} onClick={() => editData(item._id, item.content)}></i>
              <i className="fa-solid fa-trash" style={{ cursor: 'pointer' }} onClick={() => deleteData(item._id)}></i>
            </div>
              </div>
      ))
          : ""}
    </div>
    </div >
  );
}
