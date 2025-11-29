import { useState, useRef } from "react";
export default function FinalChallenge() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const ageRef = useRef(null);
  const phoneRef = useRef(null);
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setSuccess("");
  }
  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    } else if (formData.firstName.length > 120) {
      newErrors.firstName = "Max 120 characters allowed.";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    } else if (formData.lastName.length > 120) {
      newErrors.lastName = "Max 120 characters allowed.";
    }
    if (!formData.age) {
      newErrors.age = "Age is required.";
    } else if (!/^\d+$/.test(formData.age)) {
      newErrors.age = "Age must be a number.";
    } else if (formData.age.length > 2) {
      newErrors.age = "Age must be 2 digits max.";
    } else if (Number(formData.age) < 18) {
      newErrors.age = "You must be 18 or older.";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Phone must be a number.";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone must be exactly 10 digits.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (newErrors.firstName) firstNameRef.current.focus();
      else if (newErrors.lastName) lastNameRef.current.focus();
      else if (newErrors.age) ageRef.current.focus();
      else if (newErrors.phone) phoneRef.current.focus();
      return;
    }
    setSuccess("Form submitted successfully!");
    setFormData({ firstName: "", lastName: "", age: "", phone: "" });
    setErrors({});
  }
  return (
    <main>
      <h1>Final Challenge</h1>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div className="field">
          <label>First Name</label>
          <input
            ref={firstNameRef}
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div className="field">
          <label>Last Name</label>
          <input
            ref={lastNameRef}
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
        <div className="field">
          <label>Age</label>
          <input
            ref={ageRef}
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>
        <div className="field">
          <label>Phone</label>
          <input
            ref={phoneRef}
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
      {success && <p className="success">{success}</p>}
    </main>
  );
}
