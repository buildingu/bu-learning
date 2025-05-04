document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('crudForm');
  const output = document.getElementById('userData');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload

    // Grab values from inputs
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const sex = document.getElementById('sex').value;
    const position = document.getElementById('position').value.trim();

    // Optional: Validate inputs manually (HTML also does this)
    if (!name || !age || !sex || !position) {
      alert('Please fill out all fields correctly.');
      return;
    }

    // Create new entry block
    const entry = document.createElement('div');
    entry.className = 'user-entry';
    entry.innerHTML = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Sex:</strong> ${sex}</p>
      <p><strong>Position:</strong> ${position}</p>
      <hr/>
    `;

    // Append entry
    output.appendChild(entry);

    // Clear form
    form.reset();
  });
});
