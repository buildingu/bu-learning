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
    firstName: "",
    lastName: "",
    age: "",
    phone: ""
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const ageRef = useRef(null);
  const phoneRef = useRef(null);

  // Validation functions
  const validateFirstName = (value) => {
    if (!value.trim()) return "First name is required";
    if (value.length > 120) return "First name must be 120 characters or less";
    return "";
  };

  const validateLastName = (value) => {
    if (!value.trim()) return "Last name is required";
    if (value.length > 120) return "Last name must be 120 characters or less";
    return "";
  };

  const validateAge = (value) => {
    if (!value.trim()) return "Age is required";
    if (value.length > 3) return "Age must be 3 characters or less";
    if (!/^\d+$/.test(value)) return "Age must be a number";
    const age = parseInt(value);
    if (age < 18) return "Age must be 18 or older";
    return "";
  };

  const validatePhone = (value) => {
    if (!value.trim()) return "Phone number is required";
    if (!/^\d+$/.test(value)) return "Phone number must contain only numbers";
    if (value.length !== 10) return "Phone number must be exactly 10 digits";
    return "";
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {
      firstName: validateFirstName(formData.firstName),
      lastName: validateLastName(formData.lastName),
      age: validateAge(formData.age),
      phone: validatePhone(formData.phone)
    };

    setErrors(newErrors);
    
    const hasErrors = Object.values(newErrors).some(error => error !== "");
    setIsValid(!hasErrors);
    
    return !hasErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitted(true);
      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        phone: ""
      });
      // Focus first field
      firstNameRef.current?.focus();
    }
  };

  // Reset success message after 5 seconds
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>
        
        {isSubmitted && (
          <div style={{ 
            backgroundColor: "#d4edda", 
            color: "#155724", 
            padding: "1rem", 
            borderRadius: "4px", 
            marginBottom: "1rem",
            border: "1px solid #c3e6cb"
          }}>
            ✅ Success! Thank you for subscribing to our newsletter!
          </div>
        )}

        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="firstName" style={{ display: "block", marginBottom: "0.5rem" }}>
              First Name *
            </label>
            <input
              ref={firstNameRef}
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: errors.firstName ? "1px solid #dc3545" : "1px solid #ccc",
                borderRadius: "4px"
              }}
              maxLength={120}
            />
            {errors.firstName && (
              <p style={{ color: "#dc3545", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                {errors.firstName}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="lastName" style={{ display: "block", marginBottom: "0.5rem" }}>
              Last Name *
            </label>
            <input
              ref={lastNameRef}
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: errors.lastName ? "1px solid #dc3545" : "1px solid #ccc",
                borderRadius: "4px"
              }}
              maxLength={120}
            />
            {errors.lastName && (
              <p style={{ color: "#dc3545", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                {errors.lastName}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="age" style={{ display: "block", marginBottom: "0.5rem" }}>
              Age *
            </label>
            <input
              ref={ageRef}
              type="number"
              id="age"
              value={formData.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: errors.age ? "1px solid #dc3545" : "1px solid #ccc",
                borderRadius: "4px"
              }}
              maxLength={3}
              min="18"
            />
            {errors.age && (
              <p style={{ color: "#dc3545", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                {errors.age}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="phone" style={{ display: "block", marginBottom: "0.5rem" }}>
              Phone Number *
            </label>
            <input
              ref={phoneRef}
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: errors.phone ? "1px solid #dc3545" : "1px solid #ccc",
                borderRadius: "4px"
              }}
              maxLength={10}
              placeholder="5048073240"
            />
            {errors.phone && (
              <p style={{ color: "#dc3545", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                {errors.phone}
              </p>
            )}
          </div>

          <button 
            type="submit"
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem"
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#007bff"}
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
