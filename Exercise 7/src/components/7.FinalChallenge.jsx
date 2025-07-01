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
 *    3. Greater than 18.
 * - The `phone` field must be a number and a have max character count of 3.
 *    1. Must be a number
 *    2. Character count equals 10 (e.g., 5048073240).
 * 
 * Lastly, clear the form if validation passes and render a success message.
 */

import {useState, useRef} from "react";

export default function FinalChallenge() {

  const[form, setForm] = useState({
    first_name: "",
    last_name: "",
    age: "",
    phone: "",

  })
  const[error, setError] = useState({
    first_name: "",
    last_name: "",
    age: "",
    phone: "",

  })
  const[success, setSuccess] = useState(false);

  function Validate(e){

    e.preventDefault();
    let valid = true;
    const newErrors = {
      first_name: "",
      last_name: "",
      age: "",
      phone: "",
    }
    if(!form.first_name ){
      newErrors.first_name = "First name is required"
      valid = false;
    }
    else if(form.first_name.length > 120){
      newErrors.first_name = "First name is invalid" // You could give better error message.
      valid = false;
    }
    if(!form.last_name){
      newErrors.last_name = "Last name is required"
      valid = false;
    }
    else if(form.last_name.length > 120){
      newErrors.last_name = "Last name is invalid"
      valid = false;

    }
    if(!/^\d{10}$/.test(form.phone)){
      newErrors.phone = "Phone number is invalid"
      valid = false;
    }
    const ageNumber = parseInt(form.age);
     if(!form.age || isNaN(ageNumber) || form.age.length > 3 || parseInt(form.age)<18){
      newErrors.age = "Age is invalid"
      valid = false;

    }
    

    setError(newErrors)

    if(valid){
      setForm({
        first_name: "",
        last_name: "",
        age: "",
        phone: "",
      });
      setError({
        first_name: "",
        last_name: "",
        age: "",
        phone: "",
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      // alert("You have successfully subscribed to our newsletter!");
    }
    else{
      setSuccess(false)
    }
  }

  return (
    <main>
      <h1>Final Challenge</h1>

      <div>
        <h2>Subscribe to our Newsletter!</h2>
        <form autoComplete="off" noValidate onSubmit={Validate}>
          {/* Implement inputs and error messages below the inputs. */}
          <p>First Name: <input type = "text" placeholder="John" value = {form.first_name} onChange={(e) =>
                setForm({ ...form, first_name: e.target.value })
              }></input></p>
              {error.first_name && <p style={{ color: "red" }}>{error.first_name}</p>}
          <p>Last Name: <input type = "text" placeholder="Doe" value = {form.last_name} onChange={(e) =>
                setForm({ ...form, last_name: e.target.value })
              }></input></p>
              {error.last_name && <p style={{ color: "red" }}>{error.last_name}</p>}
          <p>Age: <input placeholder="" type = "number" value = {form.age} onChange={(e) =>
                setForm({ ...form, age: e.target.value })
              }></input></p>
              {error.age && <p style={{ color: "red" }}>{error.age}</p>}
          <p>Phone: <input type = "text" placeholder="" value = {form.phone} onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }></input></p>
              {error.phone && <p style={{ color: "red" }}>{error.phone}</p>}



          <button type="submit">Submit</button>
        </form>
     
      </div>
    </main>
  );
}
