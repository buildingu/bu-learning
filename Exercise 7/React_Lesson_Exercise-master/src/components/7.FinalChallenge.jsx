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

import { useState, useRef } from "react";

export default function FinalChallenge() {
  const [form, setForm] = useState({ firstName: "", lastName: "", age: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const firstRef = useRef();

  const validate = () => {
    const errs = {};
    if (!form.firstName) errs.firstName = "First name required";
    else if (form.firstName.length > 120) errs.firstName = "Max 120 chars";

    if (!form.lastName) errs.lastName = "Last name required";
    else if (form.lastName.length > 120) errs.lastName = "Max 120 chars";

    if (!form.age) errs.age = "Age required";
    else if (!/^\d+$/.test(form.age)) errs.age = "Age must be a number";
    else if (form.age.length > 2) errs.age = "Max 2 digits";
    else if (Number(form.age) < 18) errs.age = "Must be 18 or older";

    if (!form.phone) errs.phone = "Phone required";
    else if (!/^\d{10}$/.test(form.phone)) errs.phone = "Must be 10 digits";

    return errs;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setSuccess("");
    } else {
      setSuccess("Form submitted successfully!");
      setForm({ firstName: "", lastName: "", age: "", phone: "" });
      firstRef.current.focus();
    }
  };

  return (
    <main>
      <h1>Final Challenge</h1>
      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <form onSubmit={handleSubmit} autoComplete="off" noValidate>
          <div>
            <input
              ref={firstRef}
              placeholder="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p>{errors.firstName}</p>}
          </div>
          <div>
            <input
              placeholder="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p>{errors.lastName}</p>}
          </div>
          <div>
            <input
              placeholder="Age"
              name="age"
              value={form.age}
              onChange={handleChange}
            />
            {errors.age && <p>{errors.age}</p>}
          </div>
          <div>
            <input
              placeholder="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <p>{errors.phone}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
        {success && <p>{success}</p>}
      </div>
    </main>
  );
}