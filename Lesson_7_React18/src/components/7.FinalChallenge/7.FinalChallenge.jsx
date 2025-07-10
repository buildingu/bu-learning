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
 *    3. Greater than 18. (or equal to like validation and crud app?)
 * - The `phone` field must be a number and a have max character count of 3.
 *    1. Must be a number
 *    2. Character count equals 10 (e.g., 5048073240).
 * 
 * Lastly, clear the form if validation passes and render a success message.
 */

/* ===== IMPORTS AND CONSTANTS ===== */

import { useReducer } from "react";
import { useSubscription } from "./SubscriptionContext";

const ERROR_MESSAGES = {
  REQUIRED: "ⓘ This field is required",
  NAME_TOO_LONG: "ⓘ Maximum 120 characters allowed",
  INVALID_NUMBER: "ⓘ Must be a number",
  AGE_TOO_LONG: "ⓘ Maximum 3 digits allowed",
  AGE_TOO_YOUNG: "ⓘ Must be 18+",
  PHONE_LENGTH: "ⓘ Must be 10 digits",
};
const ACTIONS = {
  CHANGE_FIELD: "CHANGE_FIELD",
  SET_ERROR: "SET_ERROR",
  SET_ALL_ERRORS: "SET_ALL_ERRORS",
  RESET_FORM: "RESET_FORM",
  TOUCH_ALL: "TOUCH_ALL",
};
const FIELDS = [
  "firstName",
  "lastName",
  "age",
  "phone",
]

/* ===== REDUCER AND RELATED CONFIGURATIONS ===== */

const initialState = {
  /* Builds up data using FIELDS Array */
  formData: FIELDS.reduce((acc, field) => ({
    ...acc,
    [field]: ""
  }), {}),
  touched: FIELDS.reduce((acc, field) => ({
    ...acc,
    [field]: false
  }), {}),
  errors: {},
};

function reducer(state, action) {
  /* Switch for actions (declared with ACTIONS object not string literals for maintainability :D):
    CHANGE_FIELD: gets name and new value of the field to change from action and  applies to form data appropriately aswell as updating "touched" object
    SET_ERROR: gets name and error message of field from action and applies to errors object
    SET_ALL_ERRORS: Shows all errors for all fields validation
    RESET_FORM: Set all form data objects (form inputs, errors, touched) back to initial state (blank)
    TOUCH_ALL: Set all "touched" objects to true (for correctly rendering validating all fields)
  */
  switch (action.type) {
    case ACTIONS.CHANGE_FIELD: {
      const { name, value } = action;
      return {
        ...state,
        formData: {
          ...state.formData,
          [name]: value,
        },
        touched: {
          ...state.touched,
          [name]: true,
        },
      };
    }
    case ACTIONS.SET_ERROR: {
      const { name, error } = action;
      return {
        ...state,
        errors: {
          ...state.errors,
          [name]: error || undefined,
        },
      };
    }
    case ACTIONS.SET_ALL_ERRORS: {
      return {
        ...state,
        errors: action.errors,
      };
    }
    case ACTIONS.TOUCH_ALL: {
      return {
        ...state,
        touched: FIELDS.reduce((acc, field) => ({
          ...acc,
          [field]: true
        }), {}),
      }
    }
    case ACTIONS.RESET_FORM: {
      return initialState;
    }
    default:
      return state;
  }
}

/* ===== ABSTRACT INDIVIDUAL VALIDATION HANDLING ===== */

function validateField(name, value) {
  value = value.trim();
  if (!value) return ERROR_MESSAGES.REQUIRED;

  switch (name) {
    case "firstName":
    case "lastName":
      return value.length > 120 ? ERROR_MESSAGES.NAME_TOO_LONG : ""; // falsy validation
    case "age":
      const parsedAge = parseInt(value, 10); // parsed to validate edge cases like 00018
      if (isNaN(parsedAge)) return ERROR_MESSAGES.INVALID_NUMBER;
      if (parsedAge > 999) return ERROR_MESSAGES.AGE_TOO_LONG;
      if (parsedAge < 18) return ERROR_MESSAGES.AGE_TOO_YOUNG;
      return ""; // falsy validation
    case "phone":
      const digitsOnly = value.replace(/\D/g, "");
      if (!digitsOnly) return ERROR_MESSAGES.REQUIRED;
      if (digitsOnly.length !== 10) return ERROR_MESSAGES.PHONE_LENGTH;
      return ""; // falsy validation
  }
}
/* ======================================= */
/* ======== MAIN COMPONENT EXPORT ======== */
/* ======================================= */
export default function FinalChallenge() {

  /* ===== CONTEXT AND REDUCER HOOK DECLARATIONS ===== */

  const { isSubscribed, subscribe, resetSubscription } = useSubscription(); // context for globally tracking if your subscribed (extra)
  const [state, dispatch] = useReducer(reducer, initialState);

  /* ===== EVENT HANDLERS AND UTILITY FUNCTIONS ===== */

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: ACTIONS.CHANGE_FIELD, name, value });
    const error = validateField(name, value);
    dispatch({ type: ACTIONS.SET_ERROR, name, error });
  };

  const validateAllFields = () => {
    const newErrors = {};
    FIELDS.forEach(field => {
      const error = validateField(field, state.formData[field]);
      if (error) newErrors[field] = error;
    });
    dispatch({ type: ACTIONS.TOUCH_ALL });
    dispatch({ type: ACTIONS.SET_ALL_ERRORS, errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateAllFields()) {
      subscribe();
      /* ANY FORM FUNCTIONALITY, for example adding info to a backend to send Newsletters */
      console.log(state.formData)
      dispatch({ type: ACTIONS.RESET_FORM });
    }
  };

  /* ===== RENDERING ===== */

  if (isSubscribed) {
    return (
      <main>
        <h1 className="high-title">Final Challenge</h1>
        <div className="form-container">
          <h2>Thank you for subscribing!</h2>
          <button onClick={resetSubscription}>Unsubscribe</button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1 className="high-title">Final Challenge</h1>
      <div className="form-container">
        <h3>Subscribe to our Newsletter!</h3>
        <form onSubmit={handleSubmit} autoComplete="off" noValidate>
          {/* Mapped Form Fields using declared array */}
          {FIELDS.map((field, index) => (
            <div className="form-group" key={field}>
              <input
                autoFocus={index === 0} // autofocus on the first field element ALWAYS (more flexible than 'field === "firstName"')
                type={field === "age" ? "number" : field === "phone" ? "tel" : "text"}
                name={field}
                value={state.formData[field]}
                onChange={handleChange}
                placeholder={field
                  .replace(/([A-Z])/g, ' $1') // Add space before capital letters (for multiword fields with camelCase, I.E. "firstName" & "lastName")
                  .replace(/^./, str => str.toUpperCase()) // Capitalize first letter (required for camelCase) (AFTER WE ADD SPACE ON CAPITALS)
                  .trim()}
                className={
                  // Interactive Class logic for real-time styling
                  state.touched[field]
                    ? state.errors[field]
                      ? "error"
                      : "success"
                    : ""
                }
              />
              {state.errors[field] && ( <div className="error-message">{state.errors[field]}</div> )}
            </div>
          ))}

          <button type="submit">Subscribe</button>
        </form>
      </div>
    </main>
  );
}
