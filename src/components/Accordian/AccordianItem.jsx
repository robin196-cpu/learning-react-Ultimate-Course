import React, { useState } from "react";
import "./accordian.css";

export default function AccordianItem({ num, title, text }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggole = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <div className={`item ${isOpen ? "open" : ""}`} onClick={handleToggole}>
      <p className="number">{num < 9 ? `0${num + 1}` : num + 1}</p>
      <p className="text">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
}
