import React from "react";
import { logo } from "../assets";
const Hero = () => {
  return (
    <header className="flex flex-col justify-center items-center w-full">
      <nav className="flex flex-row justify-between w-full items-center mb-10 pt-3">
        <img src={logo} alt="logo" className="w-28 object-contain" />
        <button
          className="black_btn"
          type="button"
          onClick={() => window.open("https://www.w3schools.com")}
        >
          GitHub
        </button>
      </nav>
      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4 </span>
      </h1>
      <h2 className="desc">
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>{" "}
    </header>
  );
};

export default Hero;
