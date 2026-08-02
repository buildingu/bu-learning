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

import { useState } from "react";

export default function FinalChallenge() {
  const [formData, setFormData] = useState({ fName: "", lName: "", age: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};

    if (!formData.fName) {
      newErrors.fName = "First Name is required.";
    } else if (formData.fName.length > 120) {
      newErrors.fName = "First name cannot exceed 120 characters";
    }

    if (!formData.lName) {
      newErrors.lName = "Last Name is required.";
    } else if (formData.lName.length > 120) {
      newErrors.lName = "Last name cannot exceed 120 characters";
    }

    if (!formData.age) {
      newErrors.age = "Age is required.";
    } else if (formData.age.length > 2) {
      newErrors.age = "Age cannot be more than 2 digits.";
    } else if (Number(formData.age) < 18) {
      newErrors.age = "You must be 18 or older.";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (Object.keys(newErrors).length === 0) {
      setIsSuccess(true);
      setFormData({ fName: "", lName: "", age: "", phone: "" });
    } else {
      setIsSuccess(false);
    }

    setErrors(newErrors);

    console.log(formData);
    console.log(errors);
  }

  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {
            /* Implement inputs and error messages below the inputs. */
            <>
              <input
                type="text"
                value={formData.fName}
                onChange={(e) => {
                  setFormData({ ...formData, fName: e.currentTarget.value });
                  if (errors.fName) {
                    setErrors({ ...errors, fName: "" });
                  }
                }}
                placeholder="Enter your first name"
              />
              {errors.fName && <p style={{ color: "red" }}>{errors.fName}</p>}

              <input
                type="text"
                value={formData.lName}
                onChange={(e) => {
                  setFormData({ ...formData, lName: e.currentTarget.value });
                  if (errors.lName) {
                    setErrors({ ...errors, lName: "" });
                  }
                }}
                placeholder="Enter your last name"
              />
              {errors.lName && <p style={{ color: "red" }}>{errors.lName}</p>}

              <input
                type="number"
                value={formData.age}
                onChange={(e) => {
                  setFormData({ ...formData, age: e.currentTarget.value });
                  if (errors.age) {
                    setErrors({ ...errors, age: "" });
                  }
                }}
                placeholder="Enter your age"
              />
              {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}

              <input
                type="number"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.currentTarget.value });
                  if (errors.phone) {
                    setErrors({ ...errors, phone: "" });
                  }
                }}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}

              {isSuccess && <p style={{ color: "green" }}>Success</p>}
            </>
          }

          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
