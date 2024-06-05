const response = document.getElementById("APIresponse");
async function fetcher(number) {
  let fetched = await fetch(`https://api.isevenapi.xyz/api/iseven/${number}/`);
  let output = await fetched.json();
  return output.iseven;
}
const btn = document.getElementById("submit");
const inputValidator = function (input) {
  if (input === undefined) {
    response.style.color = "red";
    response.textContent = "Please Enter a Number!";
  } else if (Number(input) === NaN) {
    response.style.color = "red";
    response.textContent = "Please Enter a Number!";
  } else if (Number(input) < 1 || Number(input) > 999999) {
    response.style.color = "red";
    response.textContent = "Numbers must be in range 1 to 999999!";
  } else if (Number(input) !== Math.floor(Number(input))) {
    response.style.color = "red";
    response.textContent = "Please Enter a Whole Number!";
  } else {
    try {
      const obj = {
        true: "even",
        false: "odd",
      };
      response.style.color = "black";
      fetcher(input).then((result) => {
        let parity = obj[result];
        response.textContent = `Your number is ${parity}`;
      });
    } catch (error) {
      console.log(error);
      response.style.color = "red";
      response.textContent = "Sorry, an error has occured";
    }
  }
};
btn.addEventListener("click", () => {
  inputValidator(document.getElementById("input_field").value);
  console.log(fetcher(2)["iseven"]);
});
