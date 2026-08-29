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

function validateForm(firstName, lastName, age, phone) {
  let errors = {};
  if (!firstName) {
    errors.firstName = "First name is required.";
  } else if (firstName.length > 120) {
    errors.firstName = "First name should have a max character count of 120.";
  }
  if (!lastName) {
    errors.lastName = "Last name is required.";
  } else if (lastName.length > 120) {
    errors.lastName = "Last name should have a max character count of 120.";
  }
  if (!age) {
    errors.age = "Age is required.";
  } else if (isNaN(age)) {
    errors.age = "Age must be a number.";
  } else if (age < 18) {
    errors.age = "You must be at least 18 or older.";
  } else if (age.length > 2) {
    errors.age = "Age should have a max character count of 2.";
  }
  if (!phone) {
    errors.phone = "Phone number is required.";
  } else if (isNaN(phone)) {
    errors.phone = "Phone number must be a number.";
  } else if (phone.length !== 10) {
    errors.phone = "Phone number should have a character count of 10.";
  }

  return errors;
}

export default function FinalChallenge() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState({});
  const [success, setSuccess] = useState(false);
  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <form style={{display: "flex", flexDirection: "column", gap: "10px"}} autoComplete="off" noValidate onSubmit={(e) => {
          e.preventDefault();
          const errors = validateForm(firstName, lastName, age, phone);
          setResult(errors);
          if (Object.keys(errors).length === 0) {
            setSuccess(true);
            setFirstName("");
            setLastName("");
            setAge("");
            setPhone("");
          }
        }}>
          <input placeholder="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
          {result.firstName && <p className="error" style={{ color: "red" }}>{result.firstName}</p>}
          <input placeholder="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
          {result.lastName && <p className="error" style={{ color: "red" }}>{result.lastName}</p>}
          <input placeholder="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)}></input>
          {result.age && <p className="error" style={{ color: "red" }}>{result.age}</p>}
          <input placeholder="Phone Number" type="number" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
          {result.phone && <p className="error" style={{ color: "red" }}>{result.phone}</p>}
          <button type="submit">Submit</button>
          {success && <p className="success" style={{ color: "green" }}>Success!</p>}
        </form>
      </div>
    </main>
  );
}
