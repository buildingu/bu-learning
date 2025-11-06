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

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const ageRef = useRef(null);
  const phoneRef = useRef(null);

  function validateField(name, value) {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) return "This field is required";
        if (value.length > 120) return "Maximum 120 characters allowed";
        return "";
      case "age":
        if (!value.trim()) return "Age is required";
        if (!/^\d+$/.test(value)) return "Age must be a number";
        if (value.length > 2) return "Maximum 2 digits allowed";
        if (Number(value) < 18) return "Must be 18 or older";
        return "";
      case "phone":
        if (!value.trim()) return "Phone is required";
        if (!/^\d+$/.test(value)) return "Phone must be a number";
        if (value.length !== 10) return "Phone must be exactly 10 digits";
        return "";
      default:
        return "";
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    Object.keys(form).forEach((field) => {
      newErrors[field] = validateField(field, form[field]);
    });
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err !== "");

    if (!hasErrors) {
      setSuccess("Form submitted successfully!");
      setForm({ firstName: "", lastName: "", age: "", phone: "" });
    } else {
      setSuccess("");
      const order = ["firstName", "lastName", "age", "phone"];
      const firstInvalid = order.find((key) => newErrors[key]);
      if (firstInvalid === "firstName") firstNameRef.current.focus();
      else if (firstInvalid === "lastName") lastNameRef.current.focus();
      else if (firstInvalid === "age") ageRef.current.focus();
      else if (firstInvalid === "phone") phoneRef.current.focus();
    }
  }
  
  return (
    <main>
      <h1>Final Challenge</h1>
      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <form onSubmit={handleSubmit} autoComplete="off" noValidate>
          <div>
            <input
              placeholder="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              ref = {firstNameRef}
              maxLength={120}
            />
            {errors.firstName && <p>{errors.firstName}</p>}
          </div>

          <div>
            <input
              placeholder="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              ref={lastNameRef}
              maxLength={120}
            />
            {errors.lastName && <p>{errors.lastName}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Age"
              name="age"
              value={form.age}
              onChange={handleChange}
              ref={ageRef}
              min = {18}
              max = {99}
            />
            {errors.age && <p>{errors.age}</p>}
          </div>

          <div>
            <input
              type="number"
              placeholder="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              ref={phoneRef}
              maxLength = {10}
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