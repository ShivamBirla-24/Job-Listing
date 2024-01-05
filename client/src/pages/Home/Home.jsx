import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import JobPosts from "../../components/JobPosts/JobPosts";
import styles from './Home.module.css';
function Home() {
  return <>
    <Navbar />
    <JobPosts/>
  </>
}


export default Home;