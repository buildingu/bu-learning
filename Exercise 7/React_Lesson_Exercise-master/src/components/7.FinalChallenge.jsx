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

import { useState } from "react";

export default function FinalChallenge() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateInfo = (e) => {
  e.preventDefault();
  const newErrors = {};

  // First Name
  if (!firstName.trim()) newErrors.firstName = "First name is required.";
  else if (firstName.length > 120) newErrors.firstName = "Max 120 characters.";

  // Last Name
  if (!lastName.trim()) newErrors.lastName = "Last name is required.";
  else if (lastName.length > 120) newErrors.lastName = "Max 120 characters.";

  // Age
  const ageNum = Number(age);
  if (!age.trim()) newErrors.age = "Age is required.";
  else if (isNaN(ageNum)) newErrors.age = "Age must be a number.";
  else if (ageNum > 999) newErrors.age = "Age must be 3 digits or less.";
  else if (ageNum <= 18) newErrors.age = "Must be older than 18.";

  // Phone
  if (!phone.trim()) newErrors.phone = "Phone number is required.";
  else if (!/^\d+$/.test(phone)) newErrors.phone = "Phone must be numeric.";
  else if (phone.length !== 10) newErrors.phone = "Phone must be exactly 10 digits.";

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
    setSuccess(true);
    setFirstName("");
    setLastName("");
    setAge("");
    setPhone("");
  } else {
    setSuccess(false);
  }
};


  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <form autoComplete="off" noValidate onSubmit={validateInfo}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setErrors((prev) => ({ ...prev, firstName: "" }));
            }}
          />
          <br />
          {errors.firstName && <p>{errors.firstName}</p>}
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setErrors((prev) => ({ ...prev, lastName: "" }));
            }}
          />
          <br />
          {errors.lastName && <p>{errors.lastName}</p>}
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="text"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
              setErrors((prev) => ({ ...prev, age: "" }));
            }}
          />
          <br />
          {errors.age && <p>{errors.age}</p>}
          <label htmlFor="phNum">Phone Number</label>
          <input
            type="text"
            id="phNum"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors((prev) => ({ ...prev, phone: "" }));
            }}
          />
          <br />
          {errors.phone && <p>{errors.phone}</p>}

          <button type="submit">Submit</button>
        </form>
        {success && <p> The form was submitted successfully!</p>}
      </div>
    </main>
  );
};
