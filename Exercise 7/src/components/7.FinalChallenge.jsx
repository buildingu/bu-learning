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
  
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const ageRef = useRef();
  const phoneRef = useRef();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      const newErrors = {};
      for (const field in formData) {
        const error = validateField(field, formData[field]);
        if (error) newErrors[field] = error;
      }
      setErrors(prev => ({...prev, ...newErrors}));
    }, 800);
  
    return () => clearTimeout(timer);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]:value}));
  };

  const validateField = (name, value) => {
    switch(name){
      case 'firstName':
      case 'lastName':
        if (!value.trim()) return 'Neccesary field';
        if (value.length > 120) return 'Maximum of 120 characters';
        return '';

      case 'age':
        if (!value.trim()) return 'Neccesary field';
        if (value.length > 3) return 'Maximum of 3 numbers';
        if (!/^\d+$/.test(value)) return 'Should be a number';
        if (parseInt(value) <= 18) return 'Should be older than 18';

        return '';

      case 'phone':
        if (!value.trim()) return 'Neccesary field';
        if (!/^\d+$/.test(value)) return 'Should be a number';
        if (value.length !== 10) return 'Maximum of 10 characters';

        return '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = {};

    for (const field in formData) {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (isValid) {
      setFormData({ firstName:'', lastName:'', age:'', phone:''});
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };
  

  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>
        {isSubmitted && (
          <div style={{ color: 'green'}}>Form submitted successfully!</div>
        )}
        <form onSubmit={handleSubmit} autoComplete="off" noValidate>
          {/* Implement inputs and error messages below the inputs. */}
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" ref={firstNameRef} value={formData.firstName} onChange={handleChange} />
            {errors.firstName && (
              <div style={{ color: 'red'}}>{errors.firstName}</div>
            )}
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" ref={lastNameRef} value={formData.lastName} onChange={handleChange} />
            {errors.lastName && (
              <div style={{ color: 'red'}}>{errors.lastName}</div>
            )}
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input type="text" id="age" name="age" ref={ageRef} value={formData.age} onChange={handleChange} />
            {errors.age && (
              <div style={{ color: 'red'}}>{errors.age}</div>
            )}
          </div>
          <div>
            <label htmlFor="phone">Phone Number:</label>
            <input type="text" id="phone" name="phone" ref={phoneRef} value={formData.phone} onChange={handleChange} />
            {errors.phone && (
              <div style={{ color: 'red'}}>{errors.phone}</div>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
