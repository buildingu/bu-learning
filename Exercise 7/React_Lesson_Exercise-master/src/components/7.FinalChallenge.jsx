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

const initialFormData = {
  first_name: "",
  last_name: "",
  age: "",
  phone: "",
};

const initialErrors = {
  first_name: "",
  last_name: "",
  age: "",
  phone: "",
};

export default function FinalChallenge() {
  const [form, setForm] = useState(initialFormData);
  const [error, setError] = useState(initialErrors);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  }

  function Validate(e) {
    e.preventDefault();
    let valid = true;
    const newErrors = { ...initialErrors };

    if (!form.first_name) {
      newErrors.first_name = "First name is required.";
      valid = false;
    } else if (form.first_name.length > 120) {
      newErrors.first_name = "First name cannot exceed 120 characters.";
      valid = false;
    }

    if (!form.last_name) {
      newErrors.last_name = "Last name is required.";
      valid = false;
    } else if (form.last_name.length > 120) {
      newErrors.last_name = "Last name cannot exceed 120 characters.";
      valid = false;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
      valid = false;
    }

    const ageNumber = parseInt(form.age);
    if (!form.age || isNaN(ageNumber) || form.age.length > 3 || ageNumber <= 18) {
      newErrors.age = "Age must be a number greater than 18.";
      valid = false;
    }

    setError(newErrors);

    if (valid) {
      setForm(initialFormData);
      setError(initialErrors);
      setSuccess(true);
      setTimeout(function() {
        setSuccess(false);
      }, 3000);
    } else {
      setSuccess(false);
    }
  }

  return (
    <main>
      <h1>Final Challenge</h1>
      <div>
        <h2>Subscribe to our Newsletter!</h2>
        {success === true && <p style={{ color: "green" }}>Successfully subscribed!</p>}
        <form autoComplete="off" noValidate onSubmit={Validate}>
          <p>First Name: <input type="text" name="first_name" placeholder="John" value={form.first_name} onChange={handleChange} /></p>
          {error.first_name && <p style={{ color: "red" }}>{error.first_name}</p>}

          <p>Last Name: <input type="text" name="last_name" placeholder="Doe" value={form.last_name} onChange={handleChange} /></p>
          {error.last_name && <p style={{ color: "red" }}>{error.last_name}</p>}

          <p>Age: <input type="number" name="age" placeholder="" value={form.age} onChange={handleChange} /></p>
          {error.age && <p style={{ color: "red" }}>{error.age}</p>}

          <p>Phone: <input type="text" name="phone" placeholder="" value={form.phone} onChange={handleChange} /></p>
          {error.phone && <p style={{ color: "red" }}>{error.phone}</p>}

          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}