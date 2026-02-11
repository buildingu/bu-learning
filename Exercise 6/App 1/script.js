/* ─────────────────────────────────────────────────────────
   1. Starfield Animation
   ───────────────────────────────────────────────────────── */
   class Starfield {
    constructor(canvasId, speed, density) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext("2d");
      this.speed = speed;
      this.density = density;
      this.stars = [];
      this.resize();
      addEventListener("resize", () => this.resize());
      this.populate();
      requestAnimationFrame(() => this.animate());
    }
    resize() {
      this.canvas.width = innerWidth;
      this.canvas.height = innerHeight;
    }
    populate() {
      this.stars.length = 0;
      const count = (innerWidth + innerHeight) / this.density;
      for (let i = 0; i < count; i++) this.stars.push(this.newStar());
    }
    newStar() {
      return {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        r: Math.random() * 1.2 + 0.2,
        o: Math.random() * 0.7 + 0.2,
      };
    }
    animate() {
      const { ctx, canvas, stars, speed } = this;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      stars.forEach((s) => {
        ctx.globalAlpha = s.o;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.y += speed;
        if (s.y > canvas.height) {
          s.y = -s.r;
          s.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(() => this.animate());
    }
  }
  
  // Create starfields
  new Starfield("farStars", 0.3, 8);
  new Starfield("nearStars", 0.7, 4);
  
  /* ─────────────────────────────────────────────────────────
     2. Validator (Lesson 5 Logic)
     ───────────────────────────────────────────────────────── */
  function formValidator(firstName, lastName, age, phoneNumber) {
    const fields = [
      { val: firstName, label: "First name", type: "string" },
      { val: lastName, label: "Last name", type: "string" },
      { val: age, label: "Age", type: "number" },
      { val: phoneNumber, label: "Phone number", type: "string" },
    ];
  
    // Check for missing / type mismatch
    for (const f of fields) {
      if (f.val === undefined || f.val === null || f.val === "") {
        return { ok: false, msg: `The ${f.label} input is missing.` };
      }
      if (typeof f.val !== f.type) {
        return { ok: false, msg: `The ${f.label} should be a ${f.type}.` };
      }
    }
    if (age < 18) {
      return { ok: false, msg: "Sorry, not old enough for our app." };
    }
    return { ok: true, msg: "WELCOME TO THE ADOS APP." };
  }
  
  /* ─────────────────────────────────────────────────────────
     3. UI Interaction
     ───────────────────────────────────────────────────────── */
  const form = document.getElementById("cosmicForm");
  const banner = document.getElementById("resultBanner");
  const bannerText = document.getElementById("resultText");
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    // Grab + trim values
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const ageInput = document.getElementById("age").value;
    const age = ageInput === "" ? "" : Number(ageInput);
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
  
    // Core validation
    const { ok, msg } = formValidator(firstName, lastName, age, phoneNumber);
  
    // Reset field states
    [...form.querySelectorAll(".field")].forEach((f) =>
      f.classList.remove("error", "valid", "show")
    );
  
    // Simple per‑field error visual (missing / type mismatch)
    if (!ok) {
      if (msg.includes("First name")) showError("firstName", msg);
      else if (msg.includes("Last name")) showError("lastName", msg);
      else if (msg.includes("Age")) showError("age", msg);
      else if (msg.includes("Phone number")) showError("phoneNumber", msg);
    } else {
      // Mark all good
      [...form.querySelectorAll(".field")].forEach((f) => {
        f.classList.add("valid", "show");
        f.querySelector("small").textContent = "Looks good!";
      });
    }
  
    // Banner feedback
    bannerText.textContent = msg;
    banner.className = "banner " + (ok ? "success" : "error") + " show";
    banner.hidden = false;
  
    // Subtle pulse on success
    if (ok) {
      form.parentElement.style.animation = "pulse 0.9s";
      setTimeout(() => (form.parentElement.style.animation = ""), 900);
    }
  });
  
  /* Helper */
  function showError(id, msg) {
    const field = document.getElementById(id).closest(".field");
    field.classList.add("error", "show");
    field.querySelector("small").textContent = msg;
  }
  
  /* ─────────────────────────────────────────────────────────
     4. Inject Pulse Animation
     ───────────────────────────────────────────────────────── */
  document.head.insertAdjacentHTML(
    "beforeend",
    `<style>
      @keyframes pulse {
        0%   { transform: scale(1); }
        50%  { transform: scale(1.03); }
        100% { transform: scale(1); }
      }
    </style>`
  );
  