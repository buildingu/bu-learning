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

import { useState, useRef } from "react";

export default function FinalChallenge() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  })

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    setSuccess(""); 
  }

  const validate = () => {
    const errs = {};
    const { firstName, lastName, age, phone } = formData;
    //seperate errors
    if (!firstName)
      errs.firstName = "First name required";

    if(firstName.length > 120)
      errs.firstName = "First Name as to be under 120 char";
    
    if (!lastName)
      errs.lastName = "Last name required";

     if(lastName.length > 120)
      errs.lastName = "Last Name as to be under 120 char";

    if (isNaN(age))
      errs.age = "Age is required as a number";

    else if(Number(age) <= 18)
      errs.age = "Enter an age over 18";

    else if(age.length > 3)
      errs.age = "Max digits of Age is 3";

    if (!phone)
      errs.phone = "Phone number is required";

    else if (isNaN(phone))
      errs.phone = "Phone number is required";

    else if (phone.length !== 10)
      errs.phone = "Length of phone number should be 10";
    return errs;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if(Object.keys(validationErrors).length === 0){
      setSuccess("Form submit");
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        phone: "",
      });
      setErrors({});
      formRef.current.reset();
    }
    else {
      setErrors(validationErrors);
      setSuccess("");
    }
  }

  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <form autoComplete="off" ref={formRef} onSubmit={handleSubmit} noValidate>

          <div>
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
            {errors.firstName && <p>{errors.firstName}</p>}
          </div>
          <div>
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
            {errors.lastName && <p>{errors.lastName}</p>}
          </div>
          <div>
            <input type="text" name="age" placeholder="Age" onChange={handleChange} />
            {errors.age && <p>{errors.age}</p>}
          </div>
          <div>
            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} />
            {errors.phone && <p>{errors.phone}</p>}
          </div>

          <button type="submit">Submit</button>
        </form>
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
    </main>
  );
}
