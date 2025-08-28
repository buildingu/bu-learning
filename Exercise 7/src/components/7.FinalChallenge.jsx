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
 *    2. Have max character count of 3.
 *    3. Must be 18 or older.
 * - The `phone` field must:
 *    1. Must be a number
 *    2. Character count equals 10 (e.g., 5048073240).
 * 
 * Lastly, clear the form if validation passes and render a success message.
 */

import { useState, useRef, useEffect } from "react";

export default function FinalChallenge() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    phone: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    age: '',
    phone: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const ageRef = useRef();
  const phoneRef = useRef();

  function validateField(name, value) {
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) return 'This field is required';
        if (value.length > 120) return 'Maximum 120 characters allowed';
        return '';
      
      case 'age':
        if (!value.trim()) return 'Age is required';
        if (!/^\d+$/.test(value)) return 'Age must be a number';
        if (value.length > 3) return 'Maximum 3 characters allowed';
        if (parseInt(value) < 18) return 'Must be 18 or older';
        return '';
      
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^\d+$/.test(value)) return 'Phone must contain only numbers';
        if (value.length !== 10) return 'Phone number must be exactly 10 digits';
        return '';
      
      default:
        return '';
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    
    setFormData(function(prev) {
      return {
        ...prev,
        [name]: value
      };
    });

    const error = validateField(name, value);
    setErrors(function(prev) {
      return {
        ...prev,
        [name]: error
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    const newErrors = {};
    Object.keys(formData).forEach(function(field) {
      newErrors[field] = validateField(field, formData[field]);
    });

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(function(error) {
      return error !== '';
    });
    
    if (!hasErrors) {
      setIsValid(true);
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        age: '',
        phone: ''
      });

      firstNameRef.current.value = '';
      lastNameRef.current.value = '';
      ageRef.current.value = '';
      phoneRef.current.value = '';
    }
  }

  function resetForm() {
    setIsSubmitted(false);
    setIsValid(false);
    setErrors({
      firstName: '',
      lastName: '',
      age: '',
      phone: ''
    });
  }

  if (isSubmitted && isValid) {
    return (
      <main>
        <h1>Final Challenge</h1>
        <div>
          <h2>Success!</h2>
          <p>Thank you for subscribing to our newsletter!</p>
          <button onClick={resetForm}>Submit Another</button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              ref={firstNameRef}
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              maxLength={120}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>

          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              ref={lastNameRef}
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              maxLength={120}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>

          <div>
            <label htmlFor="age">Age:</label>
            <input
              ref={ageRef}
              type="text"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              maxLength={3}
            />
            {errors.age && <p className="error">{errors.age}</p>}
          </div>

          <div>
            <label htmlFor="phone">Phone Number:</label>
            <input
              ref={phoneRef}
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              maxLength={10}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
