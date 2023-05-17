import React, { useEffect, useState } from "react";
import "./LoginSignup.css";
import { Link, useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const [signupName, setSignupName] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupAddress, setSignupAddress] = useState("");
  // const [signupImage, setSignupImage] = useState("");
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const Navigate = useNavigate();

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
  }, []);


  async function loginUser(e) {
    e.preventDefault();

    const name = loginName;
    const password = loginPassword;

    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token", data.user);
      alert('Login Successful')
      localStorage.setItem("name", name)
      Navigate('/');
    } else {
      alert("Credential Invalid");
    }
  }

  const [image, setImage] = useState({ preview: '', data: '' });

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img);
  }
  const signupUser = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('name', signupName)
    formData.append('address', signupAddress)
    formData.append('password', signupPassword)

    formData.append('file', image.data)
    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    },);

    if (response.status === 200) {
      alert("Login Successfull")
      window.location.reload();
    }
    else {
      alert("Something went wrong")
      window.location.reload();
    }
  }

  return (
    <div className="container" id="container">
      <div className="form-container sign-up-container">
        <form
          onSubmit={(e) => {
            signupUser(e);
          }}
        >
          <h1>Create Account</h1>
          <span>Signup by providing credentials below</span>
          <input
            type="text"
            value={signupName}
            placeholder="Name"
            onChange={(e) => {
              setSignupName(e.target.value);
            }}
            required
          />
          <input
             type='file' name='file' id="file" onChange={handleFileChange} required
          />
          <input
            type="text"
            value={signupAddress}
            placeholder="Address"
            onChange={(e) => {
              setSignupAddress(e.target.value);
            }}
            required
          />
          <input
            type="password"
            value={signupPassword}
            placeholder="Password"
            onChange={(e) => {
              setSignupPassword(e.target.value);
            }}
            required
          />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form
          onSubmit={(e) => {
            loginUser(e);
          }}
        >
          <h1>Sign in</h1>
          <span>or use your account</span>
          <input
            type="text"
            placeholder="Name"
            value={loginName}
            onChange={(e) => {
              setLoginName(e.target.value);
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
            required
          />
          <button>Sign In</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button className="ghost" id="signIn">
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" id="signUp">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
