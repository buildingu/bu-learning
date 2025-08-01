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
 *    3. Must be 18 or older.
 * - The `phone` field must:
 *    1. Must be a number
 *    2. Character count equals 10 (e.g., 5048073240).
 * 
 * Lastly, clear the form if validation passes and render a success message.
 */

import { useState, useRef } from "react";

const ERROR = {
  required: "This field is required.",
  name_toolong: "Name is too long.",
  invalid_age: "Age must be a number.",
  age_toolong: "Age is too long.",
  age_notolder: "Must be 18+",
  phoneNumber_invalid: "Phone Number must be a number.",
  phoneNumber_toolong: "Phone Number must only be 10 digits.",
};
const INPUTS = {
  firstName,
  lastName,
  age,
  phoneNumber
};

function formValidator(name, value) {
  if (!value) return ERROR.required;
  switch (name) {
    case "firstName":
    case "lastName":
      return value.length > 120 ? ERROR.name_toolong : undefined;
    case "age":
      const parsedAge = parseInt(value);
      if (isNaN(parsedAge)) return ERROR.invalid_age;
      if (parsedAge > 999) return ERROR.age_toolong;
      if (parsedAge < 18) return ERROR.age_notolder;
    case "phoneNumber":
    const num = value.replace(/\D/g, "");
    if (isNaN(num)) return ERROR.phoneNumber_invalid;
    if (num.length !==10) return ERROR.phoneNumber_toolong;   
  }
  
}

export default function FinalChallenge() {
const [formData, setFormData] = useState(INPUTS);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const ageRef = useRef(null);
  const phoneNumberRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    setSuccessMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    let isValid = true;

    for (const name in formData) {
      const value = formData[name];
      const error = formValidator(name, value);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (isValid) {
      setFormData(INPUTS);
      setSuccessMessage("Submitted Successfully!");
      console.log("Form Data:", formData);
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>

          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              ref={firstNameRef}
            />
          </div>

          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              ref={lastNameRef}
            />
          </div>

          <div>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              ref={ageRef}
            />
          </div>

          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              ref={phoneNumberRef}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}