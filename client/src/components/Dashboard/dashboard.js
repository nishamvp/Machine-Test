import React, { useEffect } from 'react'
import './dashboard.css'

export default function Dashboard() {

  useEffect(() => {
    const toggleButton = document.getElementById('toggle');
    const sidebar = document.getElementById('sidebar');

        toggleButton.addEventListener('click', function() {
          sidebar.classList.toggle('hide');
          toggleButton.classList.toggle('hide');
        })

  }, [])
  

    return (
      <div className="App">
      <div id="sidebar" className="neumorphic">
      <ul className="menu">
        <li>Dashboard</li>
      </ul>
    </div>
    <div id="content">
      <h1>Collapsible Sidebar Example</h1>
        <p>Click the toggle button to hide/show the sidebar.</p>
  </div>
  <div id="toggle" className="neumorphic">
    <span></span>
    <span></span>
    <span></span>
  </div>
    </div>
    
    )
};
