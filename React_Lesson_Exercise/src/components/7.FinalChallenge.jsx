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

import { useState } from "react";

export default function FinalChallenge() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
  })

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
  })

  const [successMessage, setSuccessMessage] = useState("")

  const validation = (name, value) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) {
          return "This field is required!"
        } else if (value.length >= 120) {
          return "The name is too long. The maximum character is 120."
        }
        break

      case "lastName":
        if (!value.trim()) {
          return "This field is required!"
        } else if (value.length >= 120) {
          return "The name is too long. The maximum character is 120."
        }
        break

      case "age":
        if (!value.trim()) {
          return "This field is required!"
        } else if (value > 999) {
          return "The maximum character is 3."
        }
        break

      case "phoneNumber":
        if (!value.trim()) {
          return "This field is required!"
        } else if (value.length != 10) {
          return "Phone number must have 10 digits."
        } else if (isNaN(value)) {
          return "Please enter valid phone number"
        }
        break
    }
    return ""
  }


  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validation(name, value) });

  }


  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {
      firstName: validation("firstName", formData.firstName),
      lastName: validation("lastName", formData.lastName),
      age: validation("age", formData.age),
      phoneNumber: validation("phoneNumber", formData.phoneNumber),
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "")
    if (hasErrors) {
      setSuccessMessage("");
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        age: "",
        phoneNumber: "",
      });
      setSuccessMessage("Form submitted successfully!");
    }
  };
  

  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {/* Implement inputs and error messages below the inputs. */}
          <div>
            <label>First name: </label>
            <input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}></input>
          </div>
          {errors.firstName && <p>{errors.firstName}</p>}
          
          <div>
            <label>Last name: </label>
            <input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}></input>
          </div>
          {errors.lastName && <p>{errors.lastName}</p>}
          
          <div>
            <label>Age: </label>
            <input type="number" id="age" name="age" value={formData.age} onChange={handleChange}></input>
            {errors.age && <p>{errors.age}</p>}
          </div>

          <div>
            <label>Phone number: </label>
            <input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}></input>
            {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
          </div>

          <button type="submit">Submit</button>
          {successMessage && <p>{successMessage}</p>}
        </form>
      </div>
    </main>
  );
}
