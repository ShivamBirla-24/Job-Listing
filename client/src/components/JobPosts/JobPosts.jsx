import React, { useState, useEffect } from "react";
import styles from "./JobPosts.module.css";
import SearchImg from "../../assests/images/SearchImg.png";
import { useNavigate } from "react-router-dom";
import X from "../../assests/images/xImg.png";
import axios from "axios";
import JobCard from "../JobCard/JobCard";

function JobPosts() {
  const navigate = useNavigate();
  const [skillsRequired, setSkillsRequired] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobPosition, setjobPosition] = useState("");

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setjobPosition(e.target.value);
  };

  const selectSkill = (e) => {
    if (!skillsRequired.includes(e.target.value) && e.target.value.length > 0) {
      setSkillsRequired((prev) => [...prev, e.target.value]);
    }
  };

  const handleRemove = (e) => {
    const skill = e.target.id;
    const index = skillsRequired.indexOf(skill);
    skillsRequired.splice(index, 1);
    setSkillsRequired([...skillsRequired]);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/job/posts?skillsRequired=${[
            skillsRequired,
          ]}&jobPosition=${jobPosition}`
        );
        if (response.status === 200) {
          setJobs(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [jobPosition, skillsRequired]);

  return (
    <div className={styles.main_container}>
      <div className={styles.top_container}>
        <div className={styles.searchdiv}>
          <input
            name="jobPosition"
            id="jobPosition"
            type="text"
            value={jobPosition}
            onChange={handleChange}
            placeholder="Type any Job Position"
          />
          <img
            src={SearchImg}
            alt="Search Icon"
            style={{ height: "20px", cursor: "pointer" }}
          />
        </div>
        <div className={styles.skillsdiv}>
          <div style={{ width: "80%", display: "flex" }}>
            <select
              name="skills"
              id="skills"
              style={{ color: "#9C9C9C" }}
              onClick={selectSkill}
            >
              <option value="">Skills</option>
              {codingSkills.map((skill, index) => (
                <option value={skill} key={index}>
                  {skill}
                </option>
              ))}
            </select>

            <div className={styles.chipdiv}>
              {skillsRequired.map((item, index) => {
                return (
                  <>
                    <div className={styles.chips} key={index}>
                      {item}
                    </div>
                    <div
                      style={{
                        height: "70%",
                        backgroundColor: "#FF6B6B",
                        display: "flex",
                        alignItems: "center",
                      }}
                      id={item}
                      onClick={handleRemove}
                      key={`chip${index}`}
                    >
                      <img
                        src={X}
                        alt="cross icon"
                        style={{ height: "60%" }}
                        id={item}
                        key={`img${index}`}
                      />
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "20%",
            }}
          >
            <span
              style={{ color: "#ED5353", cursor: "pointer" }}
              onClick={() => {
                setSkillsRequired([]);
              }}
            >
              Clear
            </span>
            {token ? (
              <button
                className={styles.addbtn}
                onClick={() => {
                  navigate("/add-job",{state:{id:"",edit:false}});
                }}
              >
                + Add Job
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div className={styles.bottom_container}>
        {jobs.map((item, index) => {
          return <JobCard key={index} data={item} />;
        })}
      </div>
    </div>
  );
}

const codingSkills = [
  "Javascript",
  "Python",
  "Java",
  "C++",
  "Ruby",
  "PHP",
  "Swift",
  "Objective-C",
  "SQL",
  "HTML",
  "CSS",
  "Node",
  "React",
  "Typescript",
  "DSA",
  "DBMS",
  "MongoDb",
  "PostgresSql",
  "GraphQl",
];

export default JobPosts;
