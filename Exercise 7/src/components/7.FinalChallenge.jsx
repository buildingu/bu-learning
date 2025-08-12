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
  phoneNumber_toolong: "Phone Number must be 10 digits.",
};
const INPUTS = {
  firstName: "",
  lastName: "",
  age: "",
  phoneNumber: ""
};

function formValidator(name, value) {
  if (!value) return ERROR.required;
  switch (name) {
    case "firstName":
    case "lastName":
      if (value.length > 120) return ERROR.name_toolong;
      break;
    case "age":
      const parsedAge = parseInt(value);
      if (isNaN(parsedAge)) return ERROR.invalid_age;
      if (value.length > 3) return ERROR.age_toolong;
      if (parsedAge < 18) return ERROR.age_notolder;
      break;
    case "phoneNumber":
      const num = value.replace(/\D/g, "");
      if (isNaN(Number(num))) return ERROR.phoneNumber_invalid;
      if (num.length !== 10) return ERROR.phoneNumber_toolong;
      break;
    default:
      break;
  }
  return "";
}

export default function FinalChallenge() {
  const [formData, setFormData] = useState(INPUTS);
  const [successMessage, setSuccessMessage] = useState("");

  const [errors, setErrors] = useState({});

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

    for (const name in formData) {
      const value = formData[name];
      const error = formValidator(name, value);
      if (error) {
        newErrors[name] = error;
      }
    }
    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length == 0;

    if (isValid) {
      setFormData(INPUTS);
      setSuccessMessage("Successfully Submitted!");
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
        <form>

          <div>
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}/>
            {errors.firstName && <p>{errors.firstName}</p>}
          </div>
          <br></br>
          <div>
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}/>
            {errors.lastName && <p>{errors.lastName}</p>}
          </div>
          <br></br>
          <div>
            <label for="age">Age:</label>
            <input type="number" id="age" name="age" value={formData.age} onChange={handleChange}/>
            {errors.age && <p>{errors.age}</p>}
          </div>
          <br></br>
          <div>
            <label for="phoneNumber">Phone Number:</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
          {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
          </div>
          <br></br>
          <button type="submit" onClick={handleSubmit}>Submit</button> {
          successMessage && <p>{successMessage}</p>}
        </form>
      </div>
    </main>
  );
}
