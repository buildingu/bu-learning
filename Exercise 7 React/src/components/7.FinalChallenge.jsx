/**
 * Challenge 7: Final (Corrected + Records)
 *
 * Fixes applied:
 * 1. Removed maxLength, min, and type="number" attributes → use custom validators only.
 * 2. Used refs properly → focus first invalid field when validation fails.
 * 3. Used `isValid` → disable submit button until form passes validation.
 * 4. Added submissions history → saved records displayed in collapsible boxes.
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
  const [submissions, setSubmissions] = useState([]); // stores submitted records

  // Refs
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
    const age = parseInt(value, 10);
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
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors((prev) => ({
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

    const hasErrors = Object.values(newErrors).some((err) => err !== "");
    setIsValid(!hasErrors);

    return { isFormValid: !hasErrors, newErrors };
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { isFormValid, newErrors } = validateForm();

    if (isFormValid) {
      setIsSubmitted(true);

      // Save record
      setSubmissions((prev) => [...prev, formData]);

      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        phone: ""
      });
      firstNameRef.current?.focus();
    } else {
      if (newErrors.firstName) firstNameRef.current?.focus();
      else if (newErrors.lastName) lastNameRef.current?.focus();
      else if (newErrors.age) ageRef.current?.focus();
      else if (newErrors.phone) phoneRef.current?.focus();
    }
  };

  // Reset success message
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => setIsSubmitted(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  // Re-run validation when data changes
  useEffect(() => {
    const { isFormValid } = validateForm();
    setIsValid(isFormValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>

        {isSubmitted && (
          <div
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "1rem",
              borderRadius: "4px",
              marginBottom: "1rem",
              border: "1px solid #c3e6cb"
            }}
          >
             Success! Thank you for subscribing to our newsletter!
          </div>
        )}

        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {/* First Name */}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="firstName">First Name *</label>
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
            />
            {errors.firstName && <p style={{ color: "#dc3545" }}>{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="lastName">Last Name *</label>
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
            />
            {errors.lastName && <p style={{ color: "#dc3545" }}>{errors.lastName}</p>}
          </div>

          {/* Age */}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="age">Age *</label>
            <input
              ref={ageRef}
              type="text"
              id="age"
              value={formData.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: errors.age ? "1px solid #dc3545" : "1px solid #ccc",
                borderRadius: "4px"
              }}
            />
            {errors.age && <p style={{ color: "#dc3545" }}>{errors.age}</p>}
          </div>

          {/* Phone */}
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="phone">Phone Number *</label>
            <input
              ref={phoneRef}
              type="text"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: errors.phone ? "1px solid #dc3545" : "1px solid #ccc",
                borderRadius: "4px"
              }}
              placeholder="5048073240"
            />
            {errors.phone && <p style={{ color: "#dc3545" }}>{errors.phone}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid}
            style={{
              backgroundColor: !isValid ? "#6c757d" : "#007bff",
              color: "white",
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "4px",
              cursor: !isValid ? "not-allowed" : "pointer"
            }}
          >
            Submit
          </button>
        </form>
      </div>

      {/* Submitted Records */}
      {submissions.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Submitted Records</h3>
          {submissions.map((sub, index) => (
            <details
              key={index}
              style={{
                marginBottom: "1rem",
                padding: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "4px"
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
                {sub.firstName}
              </summary>
              <div style={{ marginTop: "0.5rem" }}>
                <p>Last Name: {sub.lastName}</p>
                <p>Age: {sub.age}</p>
                <p>Phone: {sub.phone}</p>
              </div>
            </details>
          ))}
        </div>
      )}
    </main>
  );
}
