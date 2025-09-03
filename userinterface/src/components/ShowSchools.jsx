import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function ShowSchools() {

  // axios.defaults.baseURL = "http://localhost:4000";

  let [schools, setSchools] = useState([]);

  let getSchoolsData = async () => {
    let response = await axios.get("/showschools");
    if (response.data.status === "success") {
      setSchools(response.data.schools);
      // return response.data.schools;
    } else {
      alert("Error fetching schools");
    }
  };

  useEffect(() => {
    getSchoolsData();
  }, []);

  return (
    <div className="container">
      <h1 className="page-title"><u>Schools</u></h1>

      <div className="schools-grid">
        {schools.map((school, index) => (
          <div className="school-card" key={index}>
            <img
              src={`http://localhost:4500/schoolImages/${ school.image }`}
              alt={school.name}
              className="school-image"
            />
            <h2 className="school-name">{school.name}</h2>
            <p className="school-address">{school.address}</p>
            <p className="school-city">{school.city}</p>
          </div>
        ))}
      </div>
      <div>
        <Link to="/" className="back-btn">
          Back to Add School Form
        </Link>
      </div>
    </div>
  )
}


export default ShowSchools