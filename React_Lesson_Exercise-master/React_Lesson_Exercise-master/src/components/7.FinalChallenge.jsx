import { useState } from "react";

export default function FinalChallenge() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function validate(name, value) {
    let message = "";

    if (!value.trim()) {
      return "This field is required";
    }

    if (name === "firstName" || name === "lastName") {
      if (value.length > 120) {
        return "Max 120 characters allowed";
      }
    }

    if (name === "age") {
      if (!/^\d+$/.test(value)) {
        return "Age must be a number";
      }
      if (value.length > 2) {
        return "Max 2 digits allowed";
      }
      if (Number(value) < 18) {
        return "Must be 18 or older";
      }
    }

    if (name === "phone") {
      if (!/^\d+$/.test(value)) {
        return "Phone must be numbers only";
      }
      if (value.length !== 10) {
        return "Phone must be exactly 10 digits";
      }
    }

    return message;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validate(name, value),
    }));

    setSuccess(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    Object.keys(form).forEach((key) => {
      const error = validate(key, form[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setForm({
        firstName: "",
        lastName: "",
        age: "",
        phone: "",
      });

      setSuccess(true);
    }
  }

  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>

        {success && <p style={{ color: "green" }}>Form submitted successfully!</p>}

        <form onSubmit={handleSubmit} autoComplete="off" noValidate>
          <div>
            <input
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
            />
            <p>{errors.firstName}</p>
          </div>

          <div>
            <input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
            />
            <p>{errors.lastName}</p>
          </div>

          <div>
            <input
              name="age"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
            />
            <p>{errors.age}</p>
          </div>

          <div>
            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />
            <p>{errors.phone}</p>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}