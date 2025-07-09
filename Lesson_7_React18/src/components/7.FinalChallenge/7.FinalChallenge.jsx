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
 *    3. Greater than (or equal to?) 18.
 * - The `phone` field must be a number and a have max character count of 3.
 *    1. Must be a number
 *    2. Character count equals 10 (e.g., 5048073240).
 * 
 * Lastly, clear the form if validation passes and render a success message.
 */

import { useState } from "react";
import { useSubscription } from "./SubscriptionContext";

const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  NAME_TOO_LONG: 'Maximum 120 characters allowed',
  INVALID_NUMBER: 'Must be a number',
  AGE_TOO_LONG: 'Maximum 3 digits allowed',
  AGE_TOO_YOUNG: 'Must be 18+',
  PHONE_LENGTH: 'Must be 10 digits'
};

export default function FinalChallenge() {
  const { isSubscribed, subscribe, resetSubscription } = useSubscription(); // get subscription information from context (makes globally trackable)
  
  /* useState for userData tracking */
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    phone: ''
  });
  /* useStates for error tracking */
  const [errors, setErrors] = useState({});

  
  // abstracted validation function for individual fields
  const validateField = (name, value) => {
    value = value.trim();

    if (!value) return ERROR_MESSAGES.REQUIRED;
    
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.length > 120 ? ERROR_MESSAGES.NAME_TOO_LONG : '';
      case 'age':
        if (isNaN(value)) return ERROR_MESSAGES.INVALID_NUMBER;
        if (value.length > 3) return ERROR_MESSAGES.AGE_TOO_LONG;
        if (parseInt(value) < 18) return ERROR_MESSAGES.AGE_TOO_YOUNG;
        return '';
      case 'phone':
        const digitsOnly = value.replace(/\D/g, '');
        if (!digitsOnly) return ERROR_MESSAGES.REQUIRED;
        if (digitsOnly.length !== 10) return ERROR_MESSAGES.PHONE_LENGTH;
        return '';
    }
  };

  // Handle real time validation (parameters for the name of the input and the current inputted value)
  const handleFieldChange = (name, value) => {
    setFormData(prev => ({
      ...prev, 
      [name]: value
    }));
    
    // Only validate the current field for real-time feedback specifically on what you are currently changing
    validateSingleField(name, value);
  };
  
  // Validate a single field and update errors
  const validateSingleField = (name, value) => {
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error || undefined // Remove the error if there are no errors (validation passes)
    }));
  };

  // Validate all form fields
  const validateAllFields = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      phone: ''
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleFieldChange(name, value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateAllFields()) {
      // Form is valid, proceed with submission
      subscribe();
      resetForm();
    }
  };

  /* case: already subscribed */
  if (isSubscribed) {
    return (
      <main>
        <h1 className="high-title">Final Challenge</h1>
        <div className="form-container">
          <h2>Thank you for subscribing!</h2>
          <button onClick={resetSubscription}>Unsubscribe</button>
        </div>
      </main>
    );
  }

  /* default case: not yet subscibed */
  return (
    <main>
      <h1 className="high-title">Final Challenge</h1>
      <div className="form-container">
        <h2>Subscribe to our Newsletter!</h2>
        <form onSubmit={handleSubmit} autoComplete="off" noValidate>
          {/* First Name */}
          <div className="form-group">
            <input
              autoFocus // UX: focus on the first name field automatically on mount
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className={errors.firstName ? 'error' : ''}
            />
            {errors.firstName && <div className="error-message">{errors.firstName}</div>}
          </div>

          {/* Last Name */}
          <div className="form-group">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className={errors.lastName ? 'error' : ''}
            />
            {errors.lastName && <div className="error-message">{errors.lastName}</div>}
          </div>

          {/* Age */}
          <div className="form-group">
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className={errors.age ? 'error' : ''}
            />
            {errors.age && <div className="error-message">{errors.age}</div>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>

          {/* Submit Button */}
          <button type="submit">
            Subscribe
          </button>
        </form>
      </div>
    </main>
  );
}
