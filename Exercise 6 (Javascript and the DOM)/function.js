import { formValidator } from './validation.js';
import { employeeValidator } from './employee_validator.js';

document.addEventListener('DOMContentLoaded', () => {
    const btnFormValidate = document.getElementById('formValidation');
    const btnEmployeeEntry = document.getElementById('employeeEntry');
    const btnApi = document.getElementById('api');
    const mainContent = document.getElementById('mainContent');

    if (!btnFormValidate || !btnEmployeeEntry || !btnApi || !mainContent) {
        console.error("Missing required elements.");
        return;
    }

    btnApi.addEventListener('click', async () => {

        console.log("btnApi is clicked");
        mainContent.innerHTML = "";

        const response = await fetch('api.html');
        const html = await response.text();

        mainContent.innerHTML = html;

        const resultContainer = document.createElement('div');
        mainContent.appendChild(resultContainer);

        const form = mainContent.querySelector('form');
        if (form) {
            form.addEventListener('submit', async function (e) {
                e.preventDefault();

                const num = parseInt(form.querySelector('#number').value.trim(), 10);

                if (isNaN(num) || num <= 0) {
                    alert("Please enter a number greater than 0");
                    return;
                }

                try {
                    const res = await fetch(`https://meowfacts.herokuapp.com/?count=${num}`);
                    const data = await res.json();

                    resultContainer.innerHTML = '';

                    if (Array.isArray(data.data)) {
                        data.data.forEach(fact => {
                            const card = document.createElement('div');
                            card.classList.add('card', 'mb-3');
                            card.style.margin = '10px';
                            card.innerHTML = `
                                <div class="card-body">
                                    <p class="card-text">${fact}</p>
                                </div>
                            `;
                            resultContainer.appendChild(card);
                            form.reset();
                        });
                    } else {
                        resultContainer.innerHTML = '<p>No facts found.</p>';
                    }
                } catch (error) {
                    console.error('Error fetching cat facts:', error);
                    alert('Something went wrong while fetching cat facts.');
                }
            });
        }
    });

    btnEmployeeEntry.addEventListener('click', async () => {

        console.log("btnEmployeeEntry is clicked");
        mainContent.innerHTML = "";

        const response = await fetch('employee_entry.html');
        const html = await response.text();

        mainContent.innerHTML = html;

        let cardsContainer = mainContent.querySelector('#employeeCardsContainer');
        if (!cardsContainer) {
            cardsContainer = document.createElement('div');
            cardsContainer.id = 'employeeCardsContainer';
            cardsContainer.classList.add('container', 'mt-4');
            mainContent.appendChild(cardsContainer);
        }


        const form = mainContent.querySelector('form');
        if (form) {
            let editingCard = null;

            form.addEventListener('submit', function (e) {
                e.preventDefault();

                const name = form.querySelector('#name').value.trim();
                const age = form.querySelector('#age').value.trim();
                const sex = form.querySelector('#sex').value.trim();
                const position = form.querySelector('#position').value.trim();

                employeeValidator(name, age, sex, position);

                if (editingCard) {
                    editingCard.querySelector('.card-title').textContent = name;
                    editingCard.querySelector('.card-text').innerHTML = `
                        <strong>Age:</strong> ${age} <br>
                        <strong>Sex:</strong> ${sex} <br>
                        <strong>Position:</strong> ${position}
                    `;

                    editingCard = null;
                    form.reset();
                } else {
                    const card = document.createElement('div');
                    card.classList.add('card', 'mb-3');

                    card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">
                        <strong>Age:</strong> ${age} <br>
                        <strong>Sex:</strong> ${sex} <br>
                        <strong>Position:</strong> ${position}
                    </p>
                    <button class="btn btn-sm btn-warning edit-btn">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn">Delete</button>
                </div>
            `;
                    card.querySelector('.delete-btn').addEventListener('click', () => {
                        cardsContainer.removeChild(card);
                    });

                    card.querySelector('.edit-btn').addEventListener('click', () => {
                        form.querySelector('#name').value = name;
                        form.querySelector('#age').value = age;
                        form.querySelector('#sex').value = sex;
                        form.querySelector('#position').value = position;
                        editingCard = card;
                    });

                    cardsContainer.appendChild(card);

                    form.reset();
                }


            });
        }
    });

    btnFormValidate.addEventListener('click', async () => {
        console.log("btnFormValidate is clicked");

        mainContent.innerHTML = "";

        const response = await fetch('form_validator.html');
        const html = await response.text();

        mainContent.innerHTML = html;

        const form = mainContent.querySelector("form");
        if (form) {
            form.addEventListener("submit", function (e) {
                e.preventDefault();

                const firstName = document.getElementById("firstName").value.trim();
                const lastName = document.getElementById("lastName").value.trim();
                const age = Number(document.getElementById("age").value.trim());
                const phonePart1 = document.getElementById("phonePart1").value.trim();
                const phonePart2 = document.getElementById("phonePart2").value.trim();
                const phonePart3 = document.getElementById("phonePart3").value.trim();

                const errors = formValidator(firstName, lastName, age, phonePart1, phonePart2, phonePart3);

                if (errors.length > 0) {
                    alert("Please fix the following errors:\n\n" + errors.join("\n"));
                } else {
                    alert("WELCOME TO THE ADOS APP.");
                    form.reset();
                }
            });
        } else {
            console.error("Form not found in loaded HTML.");
        }
    });
});