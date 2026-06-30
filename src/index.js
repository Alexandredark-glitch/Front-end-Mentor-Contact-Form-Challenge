const textarea = document.getElementById('message');
const form = document.querySelector('form');
const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="checkbox"]');
const radios = form.querySelectorAll('input[type="radio"]');
const successMessage = document.querySelector("#success");


window.addEventListener('load', () => {
  form.reset();
  // Clear any persistent accessibility runtime attributes
  [...inputs, ...radios, textarea].forEach(el => el.setAttribute('aria-invalid', 'false'));
});

function adjustRows() {
  if (window.innerWidth >= 768) { 
    textarea.rows = 5;
  } else {
    textarea.rows = 10;
  }
}
adjustRows();
window.addEventListener('resize', adjustRows);

const checkingInputs = () => {
  let isError = false;

  inputs.forEach(input => {
    const errorElement = input.parentElement.querySelector('.error-message');
    if (!input.validity.valid) {
      errorElement.textContent = input.dataset.error || 'This field is required';
      input.style.borderColor = 'var(--color-red)';
      input.setAttribute('aria-invalid', 'true'); // Formally alerts screen readers of invalid state
      isError = true;
    } else {
      errorElement.textContent = '';
      input.style.borderColor = '';
      input.setAttribute('aria-invalid', 'false'); // Reverts to valid state
    }
  });

  return isError;
};

const checkingTextarea = () => {
  let isError = false;
  const errorElement = document.getElementById('span-textarea');

  if (!textarea.validity.valid) {
    if (textarea.validity.valueMissing || !textarea.value.trim()) {
      errorElement.textContent = 'This field is required';
    } else if (textarea.validity.tooShort) {
      errorElement.textContent = textarea.dataset.error || 'Message is too short';
    } else {
      errorElement.textContent = 'Invalid message';
    }
    textarea.style.borderColor = 'var(--color-red)';
    textarea.setAttribute('aria-invalid', 'true'); // Toggles error attribute
    isError = true;
  } else {
    errorElement.textContent = '';
    textarea.style.borderColor = 'var(--color-border-color)';
    textarea.setAttribute('aria-invalid', 'false'); // Clears error attribute
  }

  return isError;
};

const checkingRadioButtons = () => {
  let isError = false;
  const errorElement = document.getElementById('radio-span');
  const radioChecked = document.querySelectorAll('input[type="radio"]:checked').length;

  if (radioChecked === 0) {
    errorElement.textContent = 'Please select a query type';
    radios.forEach(radio => radio.setAttribute('aria-invalid', 'true')); // Marks entire radio group invalid
    isError = true;
  } else {
    errorElement.textContent = '';
    radios.forEach(radio => radio.setAttribute('aria-invalid', 'false')); // Clears entire group
  }

  return isError;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const hasErrorOnTexts = checkingInputs();
  const hasErrorOnTextarea = checkingTextarea();
  const hasErrorOnRadios = checkingRadioButtons();

  if (!hasErrorOnTexts && !hasErrorOnTextarea && !hasErrorOnRadios) {
    setTimeout(() => {
      successMessage.classList.remove("hide");
      form.reset();
      // Ensure aria states wipe alongside the native form reset
      [...inputs, ...radios, textarea].forEach(el => el.setAttribute('aria-invalid', 'false'));
    }, 1000);

    setTimeout(() => {
      successMessage.classList.add("hide");
    }, 7000);
  }
});

// Accessible container clicks
const radioOptions = document.querySelectorAll(".radio-option");
radioOptions.forEach(option => {
  option.addEventListener("click", () => {
    const radio = option.querySelector('input[type="radio"]');
    radio.checked = true;
    // Clear error tags across the group instantly upon selection
    radios.forEach(r => r.setAttribute('aria-invalid', 'false'));
    const errorElement = document.getElementById('radio-span');
    if (errorElement) errorElement.textContent = '';
  });
});