import { useState, useRef } from "react";

export default function FinalChallenge() {
  // State hooks for form data and error messages
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: ""
  });

  const [successMessage, setSuccessMessage] = useState("");

  // Field change handlers
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleAgeChange = (e) => setAge(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Validate first name
    if (!firstName) {
      newErrors.firstName = "First name is required.";
    } else if (firstName.length > 120) {
      newErrors.firstName = "First name must be less than 120 characters.";
    }

    // Validate last name
    if (!lastName) {
      newErrors.lastName = "Last name is required.";
    } else if (lastName.length > 120) {
      newErrors.lastName = "Last name must be less than 120 characters.";
    }

    // Validate age
    if (!age) {
      newErrors.age = "Age is required.";
    } else if (isNaN(age)) {
      newErrors.age = "Age must be a number.";
    } else if (age <= 18) {
      newErrors.age = "Age must be greater than 18.";
    } else if (age.length > 3) {
      newErrors.age = "Age must be a maximum of 3 characters.";
    }

    // Validate phone
    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else if (isNaN(phone)) {
      newErrors.phone = "Phone number must be a valid number.";
    } else if (phone.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSuccessMessage("Form submitted successfully!");
      // Clear form
      setFirstName("");
      setLastName("");
      setAge("");
      setPhone("");
      setErrors({});
    } else {
      setSuccessMessage(""); // Clear success message if there are errors
    }
  };

  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {/* First Name */}
          <div>
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>

          {/* Age */}
          <div>
            <label>Age</label>
            <input
              type="number"
              value={age}
              onChange={handleAgeChange}
            />
            {errors.age && <p className="error">{errors.age}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label>Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={handlePhoneChange}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>

        {/* Success message */}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>
    </main>
  );
}
