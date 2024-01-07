import React from "react";

export default function LogOut() {
  localStorage.removeItem("email"); //remove email from localstorage


  return (
    <div style={{ paddingTop: "100px" }}>
      <p>You Have been logged out successfully!</p>
      <a style={{color:"black"}}href="/"> Return Home</a>
    </div>
  );
}
