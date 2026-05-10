import { useState } from "react";

const initialForm = { firstName: "", lastName: "", age: "", phone: "" };
const initialErrors = { firstName: "", lastName: "", age: "", phone: "" };

function validate({ firstName, lastName, age, phone }) {
  const errors = { ...initialErrors };

  if (!firstName) errors.firstName = "First name is required.";
  else if (firstName.length > 120) errors.firstName = "Max 120 characters.";

  if (!lastName) errors.lastName = "Last name is required.";
  else if (lastName.length > 120) errors.lastName = "Max 120 characters.";

  if (!age) {
    errors.age = "Age is required.";
  } else if (!/^\d+$/.test(age)) {
    errors.age = "Age must be a number.";
  } else if (age.length > 2) {
    errors.age = "Max 2 digits.";
  } else if (Number(age) < 18) {
    errors.age = "Must be 18 or older.";
  }

  if (!phone) {
    errors.phone = "Phone is required.";
  } else if (!/^\d+$/.test(phone)) {
    errors.phone = "Phone must be a number.";
  } else if (phone.length !== 10) {
    errors.phone = "Phone must be exactly 10 digits.";
  }

  return errors;
}

export default function FinalChallenge() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    const hasErrors = Object.values(validationErrors).some(Boolean);

    if (hasErrors) {
      setErrors(validationErrors);
      return;
    }

    setForm(initialForm);
    setErrors(initialErrors);
    setSuccess(true);
  };

  return (
    <main>
      <h1>Final Challenge</h1>
      <div>
        <h2>Subscribe to our Newsletter!</h2>
        {success && <p>Successfully subscribed!</p>}
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div>
            <label>First Name</label>
            <input name="firstName" value={form.firstName} onChange={handleChange} />
            {errors.firstName && <p>{errors.firstName}</p>}
          </div>
          <div>
            <label>Last Name</label>
            <input name="lastName" value={form.lastName} onChange={handleChange} />
            {errors.lastName && <p>{errors.lastName}</p>}
          </div>
          <div>
            <label>Age</label>
            <input name="age" value={form.age} onChange={handleChange} />
            {errors.age && <p>{errors.age}</p>}
          </div>
          <div>
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} />
            {errors.phone && <p>{errors.phone}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
