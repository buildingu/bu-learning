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
  // State for form values
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
  });

  // State for error messages
  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
  });

  // State for success message
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Clear error message when the user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Validate form
  const validateForm = () => {
    let valid = true;
    let newErrors = { ...errors };

    // Email Validation
    if (!formData.email) {
      valid = false;
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      valid = false;
      newErrors.email = "Please enter a valid email address.";
    }

    // First Name Validation
    if (!formData.firstName) {
      valid = false;
      newErrors.firstName = "First name is required.";
    } else if (formData.firstName.length > 120) {
      valid = false;
      newErrors.firstName = "First name cannot exceed 120 characters.";
    }

    // Last Name Validation
    if (!formData.lastName) {
      valid = false;
      newErrors.lastName = "Last name is required.";
    } else if (formData.lastName.length > 120) {
      valid = false;
      newErrors.lastName = "Last name cannot exceed 120 characters.";
    }

    // Age Validation
    if (!formData.age) {
      valid = false;
      newErrors.age = "Age is required.";
    } else if (isNaN(formData.age)) {
      valid = false;
      newErrors.age = "Age must be a number.";
    } else if (formData.age <= 18) {
      valid = false;
      newErrors.age = "Age must be greater than 18.";
    }

    // Phone Number Validation
    if (!formData.phone) {
      valid = false;
      newErrors.phone = "Phone number is required.";
    } else if (isNaN(formData.phone)) {
      valid = false;
      newErrors.phone = "Phone number must be a number.";
    } else if (formData.phone.length !== 10) {
      valid = false;
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSuccessMessage("Form submitted successfully!");
      setFormData({ email: "", firstName: "", lastName: "", age: "", phone: "" });
    }
  };

  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
          </div>

          <div>
            <label htmlFor="age">Age</label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
          </div>

          <button type="submit">Submit</button>
        </form>

        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
    </main>
  );
}