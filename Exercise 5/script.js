/* ========== 1. Enhanced Particle Generator ========== */
const starLayer = document.getElementById('starsLayer');
const STAR_COUNT = 60; // double the stars

for (let i = 0; i < STAR_COUNT; i++) {
  const s = document.createElement('span');
  const size = Math.random() * 3 + 1;         // 1–4 px
  const dur  = 15 + Math.random() * 15;       // 15–30 s
  const delay= Math.random() * -dur;          // random start
  const left = Math.random() * 100;           // vw
  const offset = Math.random() * -100 + 'vh'; // start above
  const xShift = Math.random() * 40 - 20 + 'vw'; // drift
  const opacity= Math.random() * .5 + .2;     // .2–.7

  s.style.width            = s.style.height = size + 'px';
  s.style.left             = left + 'vw';
  s.style.setProperty('--start', offset);
  s.style.setProperty('--xShift', xShift);
  s.style.animationDuration= dur + 's';
  s.style.animationDelay   = delay + 's';
  s.style.setProperty('--o', opacity);
  starLayer.appendChild(s);
}

/* ========== 2. Validator Logic ========== */
function formValidator(firstName, lastName, age, phoneNumber) {
  const fields = [
    { val: firstName,   label: 'First name',    type: 'string' },
    { val: lastName,    label: 'Last name',     type: 'string' },
    { val: age,         label: 'Age',           type: 'number' },
    { val: phoneNumber, label: 'Phone number',  type: 'string' }
  ];
  for (const f of fields) {
    if (f.val === undefined || f.val === null || f.val === '') {
      return { ok: false, msg: `The ${f.label} input is missing.` };
    }
    if (typeof f.val !== f.type) {
      return { ok: false, msg: `The ${f.label} should be a ${f.type}.` };
    }
  }
  if (age < 18) {
    return { ok: false, msg: 'Sorry, not old enough for our app.' };
  }
  return { ok: true, msg: 'WELCOME TO THE ADOS APP.' };
}

/* ========== 3. UI Hooks ========== */
const form   = document.getElementById('validatorForm');
const result = document.getElementById('resultMessage');

form.addEventListener('submit', e => {
  e.preventDefault();

  const firstName   = document.getElementById('firstName').value.trim();
  const lastName    = document.getElementById('lastName').value.trim();
  const ageInput    = document.getElementById('age').value;
  const age         = ageInput === '' ? '' : Number(ageInput);
  const phoneNumber = document.getElementById('phoneNumber').value.trim();

  const { ok, msg } = formValidator(firstName, lastName, age, phoneNumber);
  result.textContent = msg;
  result.className   = 'message ' + (ok ? 'success' : 'error') + ' show';

  if (ok) {
    const card = document.querySelector('.container');
    card.style.animation = 'pulse 1s';
    setTimeout(() => card.style.animation = '', 1000);
  }
});

/* ========== 4. Inject Pulse Keyframes ========== */
document.head.insertAdjacentHTML('beforeend', `
  <style>
    @keyframes pulse {
      0%   { transform: scale(1); }
      50%  { transform: scale(1.02); }
      100% { transform: scale(1); }
    }
  </style>
`);
