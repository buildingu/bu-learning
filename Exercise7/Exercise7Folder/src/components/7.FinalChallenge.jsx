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

import { useState } from "react";

export default function FinalChallenge() {
  // formInfo will hold all inputs
  const [formInfo, setFormInfo] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
  });

  // errors stores validation messages for the fields
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
  });

  // will store a single success message when the form is submitted correctly
  const [success, setSuccess] = useState("");

  // when user types, React passes the event as e
  const handleChange = (e) => {
    // store the name of the input field
    const name = e.target.name;

    // store the text input by the user
    const value = e.target.value;

    // update the previous errors (stored as prevErrors) to a new error object with the current field cleared
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    // update the specific field in formInfo with the text the user typed
    setFormInfo((prev) => ({ ...prev, [name]: value }));

    // use [name] to access key since it's a variable
  };

  const validate = () => {
    // will store the errors for each run
    const newErrors = {};

    // first name
    // if empty
    if (!formInfo.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    // if the length is more than 120 characters
    else if (formInfo.firstName.length > 120) {
      newErrors.firstName = "First name can have at most 120 characters.";
    }

    // last name
    // if empty
    if (!formInfo.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    // if the length is more than 120 characters
    else if (formInfo.lastName.length > 120) {
      newErrors.lastName = "Last name can have at most 120 characters.";
    }

    // age
    // if empty
    if (!formInfo.age.trim()) {
      newErrors.age = "Age is required.";
    }
    // if not a number
    else if (isNaN(Number(formInfo.age))) {
      newErrors.age = "Age must be a number.";
    }
    // if there are more than 3 digits
    else if (formInfo.age.length > 3) {
      newErrors.age = "Age must be at most 3 digits.";
    }
    // if less than 18
    else if (Number(formInfo.age) < 18) {
      newErrors.age = "Must be 18 or older.";
    }

    // phone
    // if empty
    if (!formInfo.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    }
    // if not a number
    else if (isNaN(Number(formInfo.phoneNumber))) {
      newErrors.phoneNumber = "Phone must be a number.";
    }
    // if there are not 10 digits
    else if (formInfo.phoneNumber.length !== 10) {
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    }

    // return the object with all the errors
    return newErrors;
  };

  // takes in event object from React
  const handleSubmit = (e) => {
    // stop the browser from reloading the page when submitting
    e.preventDefault();

    // call the validation function
    const validationErrors = validate();

    // check if the number of keys is greater than 0 (indicating errors)
    if (Object.keys(validationErrors).length > 0) {
      // update the errors
      setErrors(validationErrors);

      // clear success message
      setSuccess("");
    }
    // if there are no errors
    else {
      // clear the form
      setFormInfo({
        firstName: "",
        lastName: "",
        age: "",
        phoneNumber: "",
      });
      // clear errors
      setErrors({
        firstName: "",
        lastName: "",
        age: "",
        phoneNumber: "",
      });
      // success message
      setSuccess("Form has been submitted successfully!");
    }
  };

  return (
    <main>
      <h1>Final Challenge</h1>
      <div>
        <h2>Subscribe to our Newsletter!</h2>
        {/* here is where the success message would show if all input forms are correct */}
        {success && <p>{success}</p>}
        {/* onSubmit is called when enter is pressed on a form field or submit button is pressed */}
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {/* Implement inputs and error messages below the inputs. */}
          {/* first name */}
          <div>
            <label>First Name: </label>
            <input
              type="text"
              name="firstName"
              // the input's value reflects what is in state
              value={formInfo.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p>{errors.firstName}</p>}
          </div>

          {/* last name */}
          <div>
            <label>Last Name: </label>
            <input
              type="text"
              name="lastName"
              value={formInfo.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p>{errors.lastName}</p>}
          </div>

          {/* age */}
          <div>
            <label>Age: </label>
            <input
              type="text"
              name="age"
              value={formInfo.age}
              onChange={handleChange}
            />
            {errors.age && <p>{errors.age}</p>}
          </div>

          {/* phone number */}
          <div>
            <label>Phone Number: </label>
            <input
              type="text"
              name="phoneNumber"
              value={formInfo.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
          </div>
          <br />
          {/* when clicked, it triggers the onSubmit event */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}

// npm run dev:final
