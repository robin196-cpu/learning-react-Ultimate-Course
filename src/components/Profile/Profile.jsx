import React from "react";
import "./profile.css";
const Profile = () => {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
};
function Avatar() {
  return (
    <div>
      <img className="avatar" src="/src/assets/1.jpg" alt="" />
    </div>
  );
}

function Intro() {
  return (
    <>
      <h1>DinIslam Hassan Robin</h1>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
    </>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      <Skill skill="HTML + CSS" emoji="😀" color="green" />
      <Skill skill="React" emoji="😀" color="red" />
      <Skill skill="Node JS" emoji="😀" color="blue" />
    </div>
  );
}
function Skill(props) {
  return (
    <div className="skill" style={{ backgroundColor: props.color }}>
      <span>{props.skill}</span>
      <span>{props.emoji}</span>
    </div>
  );
}
export default Profile;
