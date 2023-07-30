import React from "react";
import "../styles/Home.css";
import CalendarComponent from "./calendar/calendar";

const Home = () => {
  return (
    <div className="home-container">
      <CalendarComponent />
    </div>
  );
};

export default Home;
