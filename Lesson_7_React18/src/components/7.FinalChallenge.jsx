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
 *    3. Greater than 18. (or equal to?)
 * - The `phone` field must be a number and a have max character count of 3.
 *    1. Must be a number
 *    2. Character count equals 10 (e.g., 5048073240).
 * 
 * Lastly, clear the form if validation passes and render a success message.
 */

import { useState, useRef, useEffect } from "react";

export default function FinalChallenge() {
  /* useState for userData tracking */
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    phone: ''
  });
  /* useStates for selective logic */
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  /* useRefs for focus management throughout input fields */
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const ageRef = useRef(null);
  const phoneRef = useRef(null);

  // Focus first input on mount (initial focus)
  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  // abstracted validation function for individual fields
  const validateField = (name, value) => {
    if (!value.trim()) return 'This field is required';
    
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.length > 120 ? 'Maximum 120 characters allowed' : '';
      case 'age':
        if (isNaN(value)) return 'Must be a number';
        if (value.length > 3) return 'Maximum 3 digits allowed';
        if (parseInt(value) < 18) return 'Must be older than 18';
        return '';
      case 'phone':
        if (isNaN(value)) return 'Must be a number';
        return value.length !== 10 ? 'Must be 10 digits' : '';
      default:
        return '';
    }
  };

  /* 
    handleChange:
    Get Changed form element, its name and the current inputed value
    update the formData appropriately
    clear error warnings for the specific changed form element if there are any
  */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value}));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    /* 
      Logic tree:
      1. Prevent default form submission from html
      2. Initialize the newErrors object
      3. Validate all fields
      4. If there are errors, set them and return
      5. If there are no errors, set isSubmitting to true
      6. Simulate API call
      7. If successful, clear form data, errors, and isSubmitting
    */
    e.preventDefault();
    const newErrors = {};

    // Validate all fields
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error; // if we get an error from any of our fields, add the error with its appropriate key to the newErrors object
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        age: '',
        phone: ''
      });
      setErrors({});
      setIsSubmitting(false);
    }, 1000);
  };

  /* case: already subscribed */
  if (isSuccess) {
    return (
      <main>
        <h1 className="high-title">Final Challenge</h1>
        <div className="form-container">
          <h2>Thank you for subscribing!</h2>
          <button onClick={() => setIsSuccess(false)}>Unsubscribe</button>
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
              ref={firstNameRef}
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
              ref={lastNameRef}
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
              ref={ageRef}
              type="text"
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
              ref={phoneRef}
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone (10 digits)"
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isSubmitting}>
            Subscribe
            {/* LoadingAnim logic and Display */}
            {isSubmitting && <span className="spinner"></span>}
          </button>
        </form>
      </div>
    </main>
  );
}
