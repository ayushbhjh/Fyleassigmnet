function allowNumbersOnly() {
  const inputs = document.querySelectorAll('input[type="text"]'); // Target text inputs

  inputs.forEach(input => {
    input.addEventListener('keypress', function(event) {
      const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', 'Backspace', '.'];
      if (!allowedKeys.includes(event.key)) {
        event.preventDefault(); // Prevent non-numeric characters

        // Add optional visual cue for non-numeric input (if you want)
        input.classList.add('invalid-input');
        setTimeout(() => input.classList.remove('invalid-input'), 500); // Remove cue after a brief delay
      }
    });
  });
}

// Call the function to activate it
allowNumbersOnly();

document.querySelector('.submit').addEventListener('click', function() {
  // Validate all inputs
  let valid = true;
  const inputs = document.querySelectorAll('input, select');
  inputs.forEach(input => {
    if (!input.checkValidity()) {
      valid = false;
      input.parentNode.classList.add('error');
    } else {
      input.parentNode.classList.remove('error');
    }
  });
  
  if (valid) {
    console.log('Form submitted successfully!');
  } else {
    alert('Form submission failed. Please fill out all fields correctly.');
  }
});

function calculateTax() {
  // document.getElementsByClassName('main-box').style.border = '1px solid red'
  // console.log(document.getElementsByClassName('main-box'))
  // return


  // alert(3)
  // return
  document.getElementById('form').style.display = 'none'
  document.getElementById('popup').style.display = 'block'
  // document.getElementById('popup').style.opacity = 1
 
 
 
  // 
  // Get input values
  const annualIncome = parseFloat(document.getElementById('annual-income').value);
  const extraIncome = parseFloat(document.getElementById('extra-income').value);
  const ageGroup = document.getElementById('age-group').value;
  const deduction = parseFloat(document.getElementById('applicable-group').value);

  // Validate input values
  const errorIcons = document.querySelectorAll('.input-wrapper .fa-exclamation');
  errorIcons.forEach(icon => icon.style.visibility = 'hidden');
  let isError = false;

  if (isNaN(annualIncome) || annualIncome <= 0) {
    document.querySelector('#annual-income + .input-wrapper .fa-exclamation').style.visibility = 'visible';
    isError = true;
  }

  if (isNaN(extraIncome) || extraIncome < 0) {
    document.querySelector('#extra-income + .input-wrapper .fa-exclamation').style.visibility = 'visible';
    isError = true;
  }

  if (ageGroup === '') {
    document.querySelector('#age-group + .input-wrapper .fa-exclamation').style.visibility = 'visible';
    isError = true;
  }

  if (isNaN(deduction) || deduction < 0) {
    document.querySelector('#applicable-group + .input-wrapper .fa-exclamation').style.visibility = 'visible';
    isError = true;
  }

  if (isError) {
    return;
  }

  // Calculate tax
  let amount = 0;
  if (annualIncome + extraIncome - deduction > 800000) {
    const taxableAmount = annualIncome + extraIncome - deduction;
    switch (ageGroup) {
      case 'less than 40':
        amount = taxableAmount- 0.3 * taxableAmount;
        break;
      case 'between 40 and 60':
        amount = taxableAmount- 0.4 * taxableAmount;
        break;
      case 'greater than 60':
        amount = taxableAmount- 0.1 * taxableAmount;
        break;
    }
  }
  else{
     amount = annualIncome+extraIncome-deduction
  }

  // Display tax
  const popup = document.querySelector('.popup');
  popup.innerHTML = `<h1>Your Overall income  will be <br>
   ${amount.toFixed(2)}</h1>`;
  popup.style.display = 'block';

}




document.querySelector('.submit').addEventListener('click', calculateTax);
