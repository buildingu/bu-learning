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
  const [form, setForm] = useState({ firstName: '', lastName: '', age: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const firstNameRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.firstName || form.firstName.length > 120) newErrors.firstName = 'First name is required (max 120 chars)';
    if (!form.lastName || form.lastName.length > 120) newErrors.lastName = 'Last name is required (max 120 chars)';
    if (!form.age || isNaN(form.age) || form.age.length > 2 || Number(form.age) < 18) newErrors.age = 'Age must be a number, max 2 digits, and you must be 18+';
    if (!form.phone || isNaN(form.phone) || form.phone.length !== 10) newErrors.phone = 'Phone must be exactly 10 digits';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      firstNameRef.current.focus();
    }
    else {
      setForm({ firstName: '', lastName: '', age: '', phone: '' });
      setErrors({});
      setSuccess(true);
    }
  };

  return (
    <main>
      <h1>Final Challenge</h1>
      <h2>Subscribe to our Newsletter!</h2>

      {success && <p style={{ color: 'green' }}>Successfully subscribed!</p>}

      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input ref={firstNameRef} name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" style={{ width: '100%', padding: '5px' }} />
          {errors.firstName && <p style={{ color: 'red' }}>{errors.firstName}</p>}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" style={{ width: '100%', padding: '5px' }} />
          {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input name="age" value={form.age} onChange={handleChange} placeholder="Age" style={{ width: '100%', padding: '5px' }} />
          {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" style={{ width: '100%', padding: '5px' }} />
          {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}