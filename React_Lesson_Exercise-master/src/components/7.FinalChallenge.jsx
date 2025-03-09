/**
 * Challenge 7: Final
 *
 * Description:
 * Create a form with fields for first name, last name, age, and phone number. Use state, refs, and any other React hooks of your choice to 
 * manage form data, validation, and real-time feedback. Incorporate how ever many hooks you want!
 *
 * Validation:
 * Display validation messages under each input if the input is invalid using useState and the error message should clear for the specific 
 * field one if the user types in the field.
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
import { useState } from "react";

export default function FinalChallenge() {
  // State for form fields.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validationMessages, setValidationMessages] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // The submitForm function, is called when the user submits.
  const submitForm = (e) => {

    // Clearing error and success message.
    e.preventDefault();
    setError("");
    setSuccess("");

    // Creating an array to store error message.
    let errors = {};

    // Checking to make sure data meets all condition.
    if (!firstName) errors.firstName = "First name is required";

    if (!lastName) errors.lastName = "Last name is required";

    if (!age) errors.age = "Age is required";

    if (!phoneNumber) errors.phoneNumber = "Phone number is required";

    if (firstName.length > 120) errors.firstName = "First name must be less than 120 characters";

    if (lastName.length > 120) errors.lastName = "Last name must be less than 120 characters";

    if (isNaN(Number(age)) || age.length > 3 || Number(age) < 18) {
      errors.age = "Age must be a number and greater than 18";
    }

    if (isNaN(Number(phoneNumber)) || phoneNumber.length !== 10) {
      errors.phoneNumber = "Phone number must be a 10-digit number";
    }

    // If there was an error, end function and set error state.
    if (Object.keys(errors).length > 0) {
      setValidationMessages(errors);
      return;
    }

    // Clear form and show success message
    setFirstName("");
    setLastName("");
    setAge("");
    setPhoneNumber("");
    setValidationMessages({});
    setSuccess("Form submitted successfully!");
  };

  return (
    <main>
      <h1>Final Challenge</h1>
      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <form autoComplete="off" noValidate onSubmit={submitForm}>
          {/* Form fields */}
          <input value={firstName} type="text" name="firstName" placeholder="First Name" onChange={(e) => {setFirstName(e.target.value); setValidationMessages((prev) => ({ ...prev, firstName: "" }));}}/>
          <p style={{ color: "red" }}>{validationMessages.firstName}</p>

          <input value={lastName} type="text" name="lastName" placeholder="Last Name" onChange={(e) => {setLastName(e.target.value); setValidationMessages((prev) => ({ ...prev, lastName: "" }));}}/>
          <p style={{ color: "red" }}>{validationMessages.lastName}</p>

          <input value={age} type="number" name="age" placeholder="Age" onChange={(e) => {setAge(e.target.value); setValidationMessages((prev) => ({ ...prev, age: "" }));}}/>
          <p style={{ color: "red" }}>{validationMessages.age}</p>

          <input value={phoneNumber} type="tel" name="phoneNumber" placeholder="Phone Number" onChange={(e) => {setPhoneNumber(e.target.value); setValidationMessages((prev) => ({ ...prev, phoneNumber: "" }));}}/>
          <p style={{ color: "red" }}>{validationMessages.phoneNumber}</p>

          <button type="submit">Submit</button>
          <p style={{ color: "red" }}>{error}</p>
          <p style={{ color: "green" }}>{success}</p>
        </form>
      </div>
    </main>
  );
}
