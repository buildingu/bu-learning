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

import {useState, useRef, useEffect} from "react";

export default function FinalChallenge() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phone: ""
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const ageRef = useRef();
  const phoneRef = useRef();

  useEffect(() => {
    
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); 
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    else if (formData.firstName.length > 120) newErrors.firstName = "First name must be less than 120 characters.";
    
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    else if (formData.lastName.length > 120) newErrors.lastName = "Last name must be less than 120 characters.";

    if (!formData.age) newErrors.age = "Age is required.";
    else if (isNaN(formData.age)) newErrors.age = "Age must be a number.";
    else if (formData.age.length > 2) newErrors.age = "Age must be less than 3 characters.";
    else if (Number(formData.age) < 18) newErrors.age = "You must be 18 or older.";
    
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    else if (isNaN(formData.phone)) newErrors.phone = "Phone number must be a number.";
    else if (formData.phone.length !== 10) newErrors.phone = "Phone number must be exactly 10 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccessMessage("Form submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        phone: ""
      });
    }
  };
 
  

  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div>
            <input
              ref={firstNameRef}
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p>{errors.firstName}</p>}
          </div>

          <div>
            <input
              ref={lastNameRef}
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p>{errors.lastName}</p>}
          </div>

          <div>
            <input
              ref={ageRef}
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <p>{errors.age}</p>}
          </div>

          <div>
            <input
              ref={phoneRef}
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p>{errors.phone}</p>}
          </div>

          {successMessage && <p>{successMessage}</p>}

          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
