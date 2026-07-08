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
 *    2. Have max character count of 2.
 *    3. Must be 18 or older.
 * - The `phone` field must:
 *    1. Must be a number
 *    2. Character count equals 10 (e.g., 5048073240).
 * 
 * Lastly, clear the form if validation passes and render a success message.
 */

import { useState } from "react";

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

  const [success, setSuccess] = useState(false);

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: ""
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
  
    let currentErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      currentErrors.firstName = "First name is required.";
      isValid = false;
    } else if (formData.firstName.length > 120) {
      currentErrors.firstName = "First name length cannot exceed 120 characters";
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      currentErrors.lastName = "Last name is required.";
      isValid = false;
    } else if (formData.lastName.length > 120) {
      currentErrors.lastName = "Last name cannot exceed 120 characters.";
      isValid = false;
    }
    if (!formData.age.trim()) {
      currentErrors.age = "Age is required.";
      isValid = false;
    } else if (isNaN(formData.age)) {
      currentErrors.age = "Age must be a number.";
      isValid = false;
    } else if (formData.age.length > 2) {
      currentErrors.age = "Age cannot exceed 2 digits.";
      isValid = false;
    } else if (Number(formData.age) < 18) {
      currentErrors.age = "You must be 18 or older.";
      isValid = false;
    }
    if(!formData.phone.trim()) {
      currentErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (isNaN(formData.phone)) {
      currentErrors.phone = "Phone number must contain only digits.";
      isValid = false;
    } else if (formData.phone.length !== 10) {
      currentErrors.phone = "Phone number must be exactly 10 digits.";
      isValid = false;
    }
    if (isValid) {
      setSuccess(true);
      setFormData({ firstName: "", lastName: "", age: "", phone: "" });
    } else {
      setErrors(currentErrors);
    }
  };
  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {success && <p style={{ color: "green" }}>Form submitted successfully!</p>}
          <div>
            <label>First Name:</label>
            <input 
              type="text" 
              value={formData.firstName} 
              onChange={(e) => handleInputChange("firstName", e.target.value)} 
            />
            {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
          </div>
          <div>
            <label>Last Name:</label>
            <input 
              type="text" 
              value={formData.lastName} 
              onChange={(e) => handleInputChange("lastName", e.target.value)} 
            />
            {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
          </div>
          <div>
            <label>Age:</label>
            <input 
              type="text" 
              value={formData.age} 
              onChange={(e) => handleInputChange("age", e.target.value)} 
            />
            {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
          </div>
          <div>
            <label>Phone Number:</label>
            <input 
              type="text" 
              value={formData.phone} 
              onChange={(e) => handleInputChange("phone", e.target.value)} 
            />
            {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
          </div>




          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
