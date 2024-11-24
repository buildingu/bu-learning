import { useState } from "react";

export default function FinalChallenge() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const { firstName, lastName, age, phone } = formData;

    if (!firstName) newErrors.firstName = "First name is required.";
    else if (firstName.length > 120)
      newErrors.firstName = "First name cannot exceed 120 characters.";

    if (!lastName) newErrors.lastName = "Last name is required.";
    else if (lastName.length > 120)
      newErrors.lastName = "Last name cannot exceed 120 characters.";

    if (!age) newErrors.age = "Age is required.";
    else if (isNaN(age) || age <= 18 || age.length > 3)
      newErrors.age = "Age must be a number greater than 18 and max 3 digits.";

    if (!phone) newErrors.phone = "Phone number is required.";
    else if (isNaN(phone) || phone.length !== 10)
      newErrors.phone = "Phone number must be 10 digits long.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setSuccessMessage("Form submitted successfully!");
      setFormData({ firstName: "", lastName: "", age: "", phone: "" }); 
    } else {
      setErrors(validationErrors);
      setSuccessMessage(""); 
    }
  };

  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </label>
            {errors.firstName && <p style={{ color: "red" }}>{errors.firstName}</p>}
          </div>

          <div>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </label>
            {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
          </div>

          <div>
            <label>
              Age:
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </label>
            {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
          </div>

          <div>
            <label>
              Phone Number:
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>
            {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
          </div>

          <button type="submit">Submit</button>
        </form>

        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
    </main>
  );
}
