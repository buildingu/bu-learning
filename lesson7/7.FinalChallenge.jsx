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

import { useState} from "react";

export default function FinalChallenge() {
  const [formData, set_form_data] = useState({
    first_name: "",
    last_name: "",
    age: "",
    phone: "",
  });
  const [errors, set_error] = useState({});
  const [success, set_success] = useState("");

  function change(e) {
    const { name, value } = e.target;
    set_form_data({ ...formData, [name]: value });
    set_error({ ...errors, [name]: "" });
  }

  function submit(e) {
    e.preventDefault();
    const new_errors = {};

    if (!formData.first_name.trim()) {
      new_errors.first_name = "First name is required.";
    } else if (formData.first_name.length > 120) {
      new_errors.first_name = "Max 120 characters allowed.";
    }

    if (!formData.last_name.trim()) {
      new_errors.last_name = "Last name is required.";
    } else if (formData.last_name.length > 120) {
      new_errors.last_name = "Max 120 characters allowed.";
    }

    if (!formData.age) {
      new_errors.age = "Age is required.";
    } else if (isNaN(formData.age)) {
      new_errors.age = "Age must be a number.";
    } else if (formData.age.length > 2) {
      new_errors.age = "Age must be 2 digits max.";
    } else if (Number(formData.age) < 18) {
      new_errors.age = "You must be 18 or older.";
    }

    if (!formData.phone) {
      new_errors.phone = "Phone is required.";
    } else if (isNaN(formData.phone)) {
      new_errors.phone = "Phone must be a number.";
    } else if (formData.phone.length !== 10) {
      new_errors.phone = "Phone must be exactly 10 digits.";
    }

    if (Object.keys(new_errors).length > 0) {
      set_error(new_errors);
      set_success("");
      return;
    }

    set_success("Form submitted successfully!");
    set_form_data({ first_name: "", last_name: "", age: "", phone: "" });
    set_error({});
  }

  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <form autoComplete="off" noValidate onSubmit={submit}>
          <label>
            First Name:
            <input
              name="first_name"
              value={formData.first_name}
              onChange={change}
              placeholder="Enter first name"
            />
            {errors.first_name && <p style={{ color: "red" }}>{errors.first_name}</p>}
          </label>
          <br></br>
          <br></br>
          <label>
            Last Name:
            <input
              name="last_name"
              value={formData.last_name}
              onChange={change}
              placeholder="Enter last name"
            />
            {errors.last_name && <p style={{ color: "red" }}>{errors.last_name}</p>}
          </label>
          <br></br>
          <br></br>
          <label>
            Age:
            <input
              name="age"
              value={formData.age}
              onChange={change}
              placeholder="Enter age"
            />
            {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
          </label>
          <br></br>
          <br></br>
          <label>
            Phone:
            <input
              name="phone"
              value={formData.phone}
              onChange={change}
              placeholder="Enter phone number"
            />
            {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
          </label>
          <br></br>
          <br></br>
          <button type="submit">Submit</button>
        </form>

        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
    </main>
  );
}
