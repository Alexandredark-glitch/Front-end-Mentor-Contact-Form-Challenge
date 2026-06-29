
const textarea = document.getElementById('message');

function adjustRows() {
  if (window.innerWidth >= 768) { 
    textarea.rows = 5;
  } else {
    textarea.rows = 10;
  }
}


adjustRows();


window.addEventListener('resize', adjustRows);



const form = document.querySelector('form');
const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="checkbox"]');
const radios = form.querySelectorAll('input[type="radio"]');
const successMessage = document.querySelector("#success");


const checkingInputs = () => {
  let isError = false;

  inputs.forEach(input => {
    const errorElement = input.parentElement.querySelector('.error-message');
    if (!input.validity.valid) {
      errorElement.textContent = input.dataset.error || 'This field is required';
      input.style.borderColor = 'var(--color-red)';
      isError = true;             
      errorElement.textContent = '';
      input.style.borderColor = '';
      
    }
  });

  return isError;
};

const checkingTextarea = () => {
  let isError = false;
  const errorElement = document.getElementById('span-textarea');

  if (!textarea.validity.valid) {
    // Provide a meaningful message for too short vs completely empty
    if (textarea.validity.valueMissing) {
      errorElement.textContent = 'This field is required';
    } else if (textarea.validity.tooShort) {
      errorElement.textContent = textarea.dataset.error || 'Message is too short';
    } else {
      errorElement.textContent = 'Invalid message';
    }
    textarea.style.borderColor = 'var(--color-red)';
    isError = true;
  } else {
    errorElement.textContent = '';
    textarea.style.borderColor = 'var(--color-border-color)';
  }

  return isError;
};

const checkingRadioButtons = () => {
  let isError = false;
  const errorElement = document.getElementById('radio-span');
  const radioChecked = document.querySelectorAll('input[type="radio"]:checked').length;

  if (radioChecked === 0) {
    errorElement.textContent = 'Please select a query type';
    isError = true;
  } else {
    errorElement.textContent = '';
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
    }, 1000);

    setTimeout(() => {
      successMessage.classList.add("hide");
    }, 7000);
  }
});


const radioOptions = document.querySelectorAll(".radio-option");
radioOptions.forEach(option => {
  option.addEventListener("click", () => {
    const radio = option.querySelector('input[type="radio"]');
    radio.checked = true;
  });
});