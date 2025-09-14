const generate = async () => {
    const num_input = document.querySelector('input[type="number"]');
    const number = num_input.value;
    if(number.length>0){        
        try {
            let response = await fetch(`http://numbersapi.com/${number}?notfound=floor`);
            alert(await response.text());
            console.log(fact);
        } catch (error) {
            console.error(error);
        }
    }
    else{
        alert('Please enter a value!');
    }

};

window.onload = () => {
    const main_div = document.createElement('div');
    const num_label = document.createElement('h3');
    num_label.textContent = 'Please enter a number below:';
    const num_input = document.createElement('input');
    num_input.type = 'number';
    const break_line1=document.createElement('br');
    const submit_button = document.createElement('button');
    submit_button.type = 'button';
    submit_button.innerHTML = 'SUBMIT';
    submit_button.addEventListener('click', generate);


    main_div.append(num_label, num_input,break_line1,submit_button);
    document.body.appendChild(main_div);
};
