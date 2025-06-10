/**
 * Challenge 7: Final
 *
 * Description:
 * Create a form with fields for first name, last name, age, and phone number. Use state, refs, and any other React hooks of your choice to 
 * manage form data, validation, and real-time feedback. Incorporate how ever many hooks you want!
 *
 * Validation:
 * Display validation messages under each input if the input is invalid using useState and the error message should clear for the specific 
 * field if the user types in the field.
 * 
 * - All fields are required.
 * - `First name` and `last name` fields should have a max character count of 120.
 * - The `age` field must:
 *    1. Must be a number
 *    2. Have max character count of 3.
 *    3. Greater than 18.
 * - The `phone` field must be a number and a have max character count of 3.
 *    1. Must be a number
 *    2. Character count equals 10 (e.g., 5048073240).
 * 
 * Lastly, clear the form if validation passes and render a success message.
 */

import React, { useState, useRef } from "react";

export default function FinalChallenge() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const ageRef = useRef();
  const phoneRef = useRef();

  const validateField = (name, value) => {
    let error = "";

    if (!value) {
      error = "This field is required";
    } else {
      switch (name) {
        case "firstName":
        case "lastName":
          if (value.length > 120) {
            error = "Must be 120 characters or less";
          }
          break;
        case "age":
          if (!/^\d+$/.test(value)) {
            error = "Age must be a number";
          } else if (value.length > 3) {
            error = "Age must be at most 3 digits";
          } else if (Number(value) <= 18) {
            error = "Age must be greater than 18";
          }
          break;
        case "phone":
          if (!/^\d+$/.test(value)) {
            error = "Phone must be a number";
          } else if (value.length !== 10) {
            error = "Phone number must be exactly 10 digits";
          }
          break;
      }
    }

    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    for (const field in formData) {
      const error = validateField(field, formData[field]);
      if (error) {
        isValid = false;
        newErrors[field] = error;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccessMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        phone: "",
      });

      setErrors({
        firstName: "",
        lastName: "",
        age: "",
        phone: "",
      });

      setSuccessMessage("Form submitted successfully!");

      firstNameRef.current?.focus();
    }
  };

  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>

          <div style={{ marginBottom: "1rem" }}>
            <label>
              First Name:
              <input
                ref={firstNameRef}
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                maxLength={120}
                placeholder="Enter your first name"
                style={{ display: "block", width: "100%", marginTop: "0.25rem" }}
              />
            </label>
            {errors.firstName && (
              <p style={{ color: "red", marginTop: "0.25rem" }}>{errors.firstName}</p>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>
              Last Name:
              <input
                ref={lastNameRef}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                maxLength={120}
                placeholder="Enter your last name"
                style={{ display: "block", width: "100%", marginTop: "0.25rem" }}
              />
            </label>
            {errors.lastName && (
              <p style={{ color: "red", marginTop: "0.25rem" }}>{errors.lastName}</p>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>
              Age:
              <input
                ref={ageRef}
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                maxLength={3}
                placeholder="Enter your age"
                style={{ display: "block", width: "100%", marginTop: "0.25rem" }}
              />
            </label>
            {errors.age && (
              <p style={{ color: "red", marginTop: "0.25rem" }}>{errors.age}</p>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>
              Phone Number:
              <input
                ref={phoneRef}
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                placeholder="Enter 10-digit phone number"
                style={{ display: "block", width: "100%", marginTop: "0.25rem" }}
              />
            </label>
            {errors.phone && (
              <p style={{ color: "red", marginTop: "0.25rem" }}>{errors.phone}</p>
            )}
          </div>

          <button type="submit" style={{ marginTop: "1rem" }}>
            Submit
          </button>
        </form>

        {successMessage && (
          <p style={{ color: "green", marginTop: "1rem" }}>{successMessage}</p>
        )}
      </div>
    </main>
  );
}
