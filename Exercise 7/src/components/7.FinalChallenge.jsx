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

import {useRef,useReducer, useEffect} from "react";

export default function FinalChallenge() {

  const [user, dispatch] = useReducer(reducer, {
    values: {firstName: "", lastName: "", age: "", phone: ""},
    errors: {firstNameError: "", lastNameError: "", ageError: "", phoneError: ""}
  })

  useEffect(() => { validation(); }, [user.values])

  function validation() {
    const errors = {
      firstNameError: "",
      lastNameError: "",
      ageError: "",
      phoneError: ""
    };

    if (!user.values.firstName) {
      errors.firstNameError = "First name is required*";
    } else if (user.values.firstName.length > 120) {
      errors.firstNameError = "First name length should be less than 120";
    }

    if (!user.values.lastName) {
      errors.lastNameError = "Last name is required*";
    } else if (user.values.lastName.length > 120) {
      errors.lastNameError = "Last name length should be less than 120";
    }

    const ageNum = Number(user.values.age);
    if (user.values.age === "") {
      errors.ageError = "Age is required*";
    } else if (!Number.isFinite(ageNum)) {
      errors.ageError = "Age should be a number";
    } else if (user.values.age.length > 2) {
      errors.ageError = "Age shouldn't consist of more than 2 characters";
    } else if (ageNum < 18) {
      errors.ageError = "Age should be 18 or older";
    }

    const phone = user.values.phone;
    const phoneNum = Number(user.values.phone);
    if (!phone) {
      errors.phoneError = "Phone is required*";
    } else if (!Number.isFinite(phoneNum)) {
      errors.phoneError = "Phone should contain only numbers";
    } else if (phone.length !== 10) {
      errors.phoneError = "Phone's length should be 10";
    }

    dispatch({ type: "setErrors", payload: errors });
    return errors;
  }

  function reducer(state, action) {
    switch (action.type) {
      case "setFirstName":
        return {
          ...state,
          values: { ...state.values, firstName: action.payload },
          errors: { ...state.errors, firstNameError: "" }
        };
      case "setLastName":
        return {
          ...state,
          values: {...state.values, lastName: action.payload},
          errors: { ...state.errors, lastNameError: "" }
        };
      case "setAge":
        return {
          ...state,
          values: {...state.values, age: action.payload},
          errors: { ...state.errors, ageError: "" }
        };
      case "setPhone":
        return {
          ...state,
          values: {...state.values, phone: action.payload},
          errors: { ...state.errors, phoneError: "" }
        };
      case "setErrors":
        return {
          ...state,
          errors: action.payload
        };
      case "clearForm":
        return {
          ...state,
          values: { firstName: "", lastName: "", age: "", phone: "" },
          errors: { firstNameError: "", lastNameError: "", ageError: "", phoneError: "" }
        };
      default:
        return state;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = validation();
    console.log(errors)
    if (!Object.values(errors).some(Boolean)) {
      console.log("Yes")
      dispatch({ type: "clearForm" });
      alert("You have filled out the form successfully")
      firstInputRef.current?.focus()
    }
    
  }

  const firstInputRef = useRef(null)

  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>

          <p style={{color: "rgba(255, 0, 0, 0.5)", margin: "5px"}}>{user.errors.firstNameError}</p>
          <input style={{marginBottom: "10px"}} type="text" value={user.values.firstName} onChange={(e) => dispatch({type: "setFirstName", payload: e.target.value})} placeholder="First Name" ref={firstInputRef}/>
          <p style={{color: "rgba(255, 0, 0, 0.5)", margin: "5px"}}>{user.errors.lastNameError}</p>
          <input style={{marginBottom: "10px"}} type="text" value={user.values.lastName} onChange={(e) => dispatch({type: "setLastName", payload: e.target.value})} placeholder="Last Name"/>
          <p style={{color: "rgba(255, 0, 0, 0.5)", margin: "5px"}}>{user.errors.ageError}</p>
          <input style={{marginBottom: "10px"}} type="text" value={user.values.age} onChange={(e) => dispatch({type: "setAge", payload: e.target.value})} placeholder="Age"/>
          <p style={{color: "rgba(255, 0, 0, 0.5)", margin: "5px"}}>{user.errors.phoneError}</p>
          <input style={{marginBottom: "10px"}} type="text" value={user.values.phone} onChange={(e) => dispatch({type: "setPhone", payload: e.target.value})} placeholder="Phone"/><br/>
          
          <button style={{marginTop: "10px"}} type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
