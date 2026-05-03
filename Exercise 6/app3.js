const fetchBtn  = document.getElementById('fetchBtn');
const resultBox = document.getElementById('resultBox');

function showSpinner() {
  resultBox.classList.remove('loaded');
  resultBox.innerHTML = '<div class="spinner"></div>';
}

function showError(msg) {
  resultBox.innerHTML = `<p class="placeholder-text" style="color:#ef4444">${msg}</p>`;
}

function showActivity(data) {
  resultBox.classList.add('loaded');

  const typeEl = document.createElement('div');
  typeEl.className = 'activity-type';
  typeEl.textContent = data.type;

  const textEl = document.createElement('div');
  textEl.className = 'activity-text';
  textEl.textContent = data.activity;

  const metaEl = document.createElement('div');
  metaEl.className = 'activity-meta';

  const metaItems = [
    { label: 'Participants', value: data.participants },
    { label: 'Accessibility', value: accessibilityLabel(data.accessibility) },
    { label: 'Price',         value: priceLabel(data.price) },
  ];

  metaItems.forEach(item => {
    const wrapper = document.createElement('div');
    wrapper.className = 'meta-item';

    const label = document.createElement('span');
    label.className = 'meta-label';
    label.textContent = item.label;

    const value = document.createElement('span');
    value.className = 'meta-value';
    value.textContent = item.value;

    wrapper.appendChild(label);
    wrapper.appendChild(value);
    metaEl.appendChild(wrapper);
  });

  resultBox.innerHTML = '';
  resultBox.appendChild(typeEl);
  resultBox.appendChild(textEl);
  resultBox.appendChild(metaEl);
}

function accessibilityLabel(score) {
  if (score <= 0.2) return 'Very Easy';
  if (score <= 0.5) return 'Moderate';
  return 'Challenging';
}

function priceLabel(price) {
  if (price === 0)    return 'Free';
  if (price <= 0.1)   return 'Very Cheap';
  if (price <= 0.5)   return 'Affordable';
  return 'Costly';
}

fetchBtn.addEventListener('click', async () => {
  showSpinner();
  fetchBtn.disabled = true;

  try {
    const response = await fetch('https://www.boredapi.com/api/activity');

    if (!response.ok) throw new Error('Network response was not ok.');

    const data = await response.json();
    showActivity(data);
  } catch (err) {
    showError('Could not fetch an activity. Please check your connection and try again.');
  } finally {
    fetchBtn.disabled = false;
  }
});