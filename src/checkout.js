import { validateCheckout } from "./checkout-validation.js";

const form = document.getElementById("checkout-form");

function showErrors(errors) {
  for (const el of form.querySelectorAll("[data-err]")) el.textContent = errors[el.dataset.err] || "";
  for (const input of form.querySelectorAll("input")) {
    input.setAttribute("aria-invalid", errors[input.name] ? "true" : "false");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const errors = validateCheckout(data);
  showErrors(errors);
  const result = document.getElementById("result");
  if (Object.keys(errors).length) {
    result.textContent = "Please fix the highlighted fields.";
    form.querySelector('[aria-invalid="true"]')?.focus();
  } else {
    result.textContent = `Thanks, ${data.name.trim()}! (Demo order – nothing was charged.)`;
  }
});
