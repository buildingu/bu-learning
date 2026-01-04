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
  const firstNameRef = useRef(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));

    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  }

  function validate() {
    const newErrors = {};

    if (!form.firstName) {
      newErrors.firstName = "First name is required";
    } else if (form.firstName.length > 120) {
      newErrors.firstName = "Max 120 characters";
    }

    if (!form.lastName) {
      newErrors.lastName = "Last name is required";
    } else if (form.lastName.length > 120) {
      newErrors.lastName = "Max 120 characters";
    }

    if (!form.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(form.age)) {
      newErrors.age = "Age must be a number";
    } else if (form.age.length > 2) {
      newErrors.age = "Max 2 characters";
    } else if (Number(form.age) < 18) {
      newErrors.age = "Must be 18 or older";
    }

    if (!form.phone) {
      newErrors.phone = "Phone number is required";
    } else if (isNaN(form.phone)) {
      newErrors.phone = "Phone must be a number";
    } else if (form.phone.length !== 10) {
      newErrors.phone = "Phone must be exactly 10 digits";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSuccess(false);

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setForm({
      firstName: "",
      lastName: "",
      age: "",
      phone: ""
    });
    setErrors({});
    setSuccess(true);

    firstNameRef.current.focus();
  }

  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>

        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div>
            <input
              ref={firstNameRef}
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p>{errors.firstName}</p>}
          </div>

          <div>
            <input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p>{errors.lastName}</p>}
          </div>

          <div>
            <input
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
            />
            {errors.age && <p>{errors.age}</p>}
          </div>

          <div>
            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <p>{errors.phone}</p>}
          </div>

          <button type="submit">Submit</button>

          {success && <p>Successfully subscribed!</p>}
        </form>
      </div>
    </main>
  );
}

