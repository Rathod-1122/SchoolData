import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AddSchool() {

  // axios.defaults.baseURL = "http://localhost:4500";
  let nameRef = useRef();
  let addressRef = useRef();
  let cityRef = useRef();
  let stateRef = useRef();
  let contactNoRef = useRef();
  let imageRef = useRef();
  let emailIdRef = useRef();

  let [errors, setErrors] = useState({ name: "", address: "", city: "", state: "", contactNo: "", image: "", emailId: "" });
  let [imagePreview, setImagePreview] = useState(null);

  // Validate all input fields
  let validateAllInputFields = (inputFiled) => {

    if (inputFiled === "name") {
      let newError = { ...errors };
      if (!nameRef.current.value) {
        newError.name = "Name is required";
        setErrors(newError);
      }
      else {
        newError.name = "valid";
        setErrors(newError);
      }
    }
    if (inputFiled === "address") {
      let newError = { ...errors };
      if (!addressRef.current.value) {
        newError.address = "Address is required";
        setErrors(newError);
      }
      else {
        newError.address = "valid";
        setErrors(newError);
      }
    }
    if (inputFiled === "city") {
      let newError = { ...errors };
      if (!cityRef.current.value) {
        newError.city = "City is required";
        setErrors(newError);
      }
      else {
        newError.city = "valid";
        setErrors(newError);
      }
    }
    if (inputFiled === "state") {
      let newError = { ...errors };
      if (!stateRef.current.value) {
        newError.state = "State is required";
        setErrors(newError);
      }
      else {
        newError.state = "valid";
        setErrors(newError);
      }
    }
    if (inputFiled === "contactNo") {
      let newError = { ...errors };
      if (!contactNoRef.current.value) {
        newError.contactNo = "Contact No is required";
        setErrors(newError);
      }
      else if (!/^\d{10}$/.test(contactNoRef.current.value)) {
        newError.contactNo = "Contact No is invalid, it should be 10 digit number";
        setErrors(newError);
      }
      else {
        newError.contactNo = "valid";
        setErrors(newError);
      }
    }
    if (inputFiled === "image") {
      let newError = { ...errors };
      if (!imageRef.current.value) {
        newError.image = "Image is required";
        setErrors(newError);
      }
      else {
        newError.image = "valid";
        setErrors(newError);
      }
    }
    if (inputFiled === "emailId") {
      console.log('inside  emailid ref')
      let newError = { ...errors };
      if (!emailIdRef.current.value) {
        newError.emailId = "Email Id is required";
        setErrors(newError);
      }
      else if (!/^[a-zA-Z0-9]+@[a-zA-Z]+\.[A-Z]{2,4}$/i.test(emailIdRef.current.value)) {
        newError.emailId = "Email Id is invalid,enter it as 'example@domain.com'";
        setErrors(newError);
      }
      else {
        newError.emailId = "valid";
        setErrors(newError);
      }
    }


  }

  // Handle Add School
  let handleAddSchool = async () => {

    console.log("the length of the errors object is :", Object.keys(errors).length);

    // Check if all fields are filled
    if (errors.name === "" || errors.address === "" || errors.city === "" || errors.state === "" || errors.contactNo === "" || errors.image === "" || errors.emailId === "") {
      alert("Please fill all fields");
    }//check if all fields are with errors 
    else if (errors.name !== "valid" || errors.address !== "valid" || errors.city !== "valid" || errors.state !== "valid" || errors.contactNo !== "valid" || errors.image !== "valid" || errors.emailId !== "valid") {
      alert("Please enter a valid  input field value ");
      return;
    }

    let dataToSend = new FormData();
    dataToSend.append("name", nameRef.current.value);
    dataToSend.append("address", addressRef.current.value);
    dataToSend.append("city", cityRef.current.value);
    dataToSend.append("state", stateRef.current.value);
    dataToSend.append("contact", contactNoRef.current.value);
    dataToSend.append("image", imageRef.current.files[0]);
    dataToSend.append("emailId", emailIdRef.current.value);

    let response = await axios.post("/addschooldata", dataToSend);
    if (response.data.status === 'success') {
      alert("School added successfully");
    }
    else {
      alert("Error adding school");
    }

  }

  return (
    <div>
      <form action="">
        <fieldset>
          <legend><u>Add School</u></legend>
          <div>
            <label htmlFor="">Name</label>
            <input type="text" ref={nameRef} onChange={() => validateAllInputFields("name")} />
            {errors.name !== 'valid' ? <span style={{ color: "red" }}>{errors.name}</span> : null}
          </div>

          <div>
            <label htmlFor="">Address</label>
            <input type="text" required ref={addressRef} onChange={() => validateAllInputFields("address")} />
            {errors.address !== 'valid' ? <span style={{ color: "red" }}>{errors.address}</span> : null}
          </div>

          <div>
            <label htmlFor="">City</label>
            <input type="text" ref={cityRef} onChange={() => validateAllInputFields("city")} />
            {errors.city !== 'valid' ? <span style={{ color: "red" }}>{errors.city}</span> : null}
          </div>

          <div>
            <label htmlFor="">State</label>
            <input type="text" ref={stateRef} onChange={() => validateAllInputFields("state")} />
            {errors.state !== 'valid' ? <span style={{ color: "red" }}>{errors.state}</span> : null}
          </div>

          <div>
            <label htmlFor="">Image</label>
            <input type="file" ref={imageRef} onChange={() => {
              console.log('the image file is ;', imageRef.current.files[0]);
              let imgPath = URL.createObjectURL(imageRef.current.files[0]);
              setImagePreview(imgPath);
              validateAllInputFields("image")
            }} />
            <img src={imagePreview} style={{ maxWidth: "200px", maxHeight: "200px" }} alt="Image preview" />
            {errors.image !== 'valid' ? <span style={{ color: "red" }}>{errors.image}</span> : null}
          </div>

          <div>
            <label htmlFor="">Contact-No</label>
            <input type="number" ref={contactNoRef} onChange={() => validateAllInputFields("contactNo")} placeholder="Enter 10-digit number"/>
            {errors.contactNo !== 'valid' ? <span style={{ color: "red" }}>{errors.contactNo}</span> : null}
          </div>

          <div>
            <label htmlFor="">Email-Id</label>
            <input type="text" ref={emailIdRef} onChange={() => validateAllInputFields("emailId")} placeholder="example@domain.com" />
            {errors.emailId !== 'valid' ? <span style={{ color: "red" }}>{errors.emailId}</span> : null}
          </div>

          <div>
            <button type='button' onClick={handleAddSchool}>Add School</button>
          </div>
        </fieldset>
      </form>
      <div>
        <Link to="/ShowSchools">View Schools</Link>
      </div>

    </div>
  )
}

export default AddSchool