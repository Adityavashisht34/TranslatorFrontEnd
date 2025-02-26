import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/LetsTranslate.css";
import backgroundVideo from "../../assets/backgroundvideo.mp4";
import Header from "../Header/Header";

function LetsTranslate() {
  return (
    <>
      <Header />
      <div className="background-video">
        <video className="background-clip" autoPlay loop muted>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <section className="lets-translate">
          <p>Let's Translate</p>
          <NavLink to="/translatorapp">
            <button className="go-to-app">Go To App</button>
          </NavLink>
        </section>
      </div>
    </>
  );
}

export default LetsTranslate;
