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

    //set constants
    const [userInput, addUserInput] = useState({
        firstName : "",
        lastName : "",
        age : "",
        phoneNum : ""
    })

    const [inputError, setInputErrors] = useState({
        firstName : "",
        lastName : "",
        age : "",
        phoneNum : ""
    })

    const [isValid, setValidity] = useState(false)

    //validation functions
    const firstNameVal = (fName) => {
        fName = fName.trim()
        if (!fName) {
            return "First Name is a required field."
        }
        if (fName.length > 120) {
            return "First Name must be 120 characters or less."
        }
        return ""
    }

    const lastNameVal = (lName) => {
        lName = lName.trim()
        if (!lName) {
            return "Last Name is a required field."
        }
        if (lName.length > 120) {
            return "Last Name must be 120 characters or less."
        }
        return ""
    }

    const ageVal = (userAge) => {
        userAge = userAge.trim()
        if (!userAge) {
            return "Age is a required field."
        }
        if (isNaN(userAge)) {
            return "Age must be a number."
        }
        if (userAge.length > 2) {
            return "Age must be 2 characters or less."
        }
        if (parseInt(userAge,10) < 18) {
            return "Must be 18 or older."
        }
        return ""
    }

    const phoneNumVal = (pNum) => {
        pNum = pNum.trim()
        if (!pNum) {
            return "Phone Number is a required field."
        }
        if (isNaN(pNum)) {
            return "Phone Number must be a number."
        }
        if (pNum.length != 10) {
            return "Phone Number must be 10 characters."
        }
        return "";
    }

    //validate form
    const valForm = () => {
        setValidity(false)
        const errors = {
            firstName : firstNameVal(userInput.firstName),
            lastName : lastNameVal(userInput.lastName),
            age : ageVal(userInput.age),
            phoneNum : phoneNumVal(userInput.phoneNum)

        }
        setInputErrors(errors)

        if (errors.firstName==="" && errors.lastName==="" && errors.age==="" && errors.phoneNum==="") {
          setValidity(true)
          addUserInput({
            firstName : "",
            lastName : "",
            age: "",
            phoneNum : ""
          })
          setInputErrors({
            firstName : "",
            lastName : "",
            age : "",
            phoneNum : ""
          })
        }
    }

    return (
        <main>
        <h1>Final Challenge</h1>

        <div>
            <h2>Subscribe to our Newsletter!</h2>
            <form autoComplete="off" noValidate onSubmit={(e) => {e.preventDefault(); valForm();}}>

              <div>
                <input type="text" placeholder="First Name" value={userInput.firstName} onChange={(e) => {
                  addUserInput({...userInput, firstName : e.target.value})
                  setInputErrors({...inputError, firstName : ""})
                }}></input>

                {inputError.firstName && <p>{inputError.firstName}</p>}
              </div>

              <div>
                <input type="text" placeholder="Last Name" value={userInput.lastName} onChange={(e) => {
                  addUserInput({...userInput, lastName : e.target.value})
                  setInputErrors({...inputError, lastName : ""})
                }}></input>

                {inputError.lastName && <p>{inputError.lastName}</p>}
              </div>

              <div>
                <input type="text" placeholder="Age" value={userInput.age} onChange={(e) => {
                  addUserInput({...userInput, age : e.target.value})
                  setInputErrors({...inputError, age : ""})
                }}></input>

                {inputError.age && <p>{inputError.age}</p>}
              </div>

              <div>
                <input type="text" placeholder="Phone Number" value={userInput.phoneNum} onChange={(e) => {
                  addUserInput({...userInput, phoneNum : e.target.value})
                  setInputErrors({...inputError, phoneNum : ""})
                }}></input>

                {inputError.phoneNum && <p>{inputError.phoneNum}</p>}
              </div>

              <button type="submit">Submit</button>

              {isValid && <p>Submission Successful!</p>}
            </form>
        </div>
        </main>
    );
}