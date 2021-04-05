/*VARIABLES*/ 
var formRegisterName = document.getElementById('form-register-name');
var formRegisterEmail = document.getElementById('form-register-email');
var formRegisterFirstPassword = document.getElementById('form-register-first-password');
var formRegisterSecondPassword = document.getElementById('form-register-second-password');
var errorLoginContainer = document.getElementById('error-log-container');
var formRegisterSubmitButton = document.getElementById('submit-button');
var formRegisterResetButton = document.getElementById('reset-fields-button');
var registerForm = document.getElementsByTagName('form');
var listOfErrors = document.getElementById('list-of-errors');
var labelsCounter = document.getElementsByTagName('label');
var inputsCounter = document.getElementsByTagName('input');
var buttonsCounter = document.getElementsByTagName('button');
var formCounter = document.getElementsByTagName('form');
/*EVENT LISTENERS*/
formRegisterSubmitButton.addEventListener('click', submitRegisterForm);
formRegisterResetButton.addEventListener('click', resetRegisterForm);
/*FUNCTIONS*/
/*First we create a function that creates new li items on a list to add error messages 
on to the errors log div*/
function createMenuItem(error) {
    let newListItem = document.createElement('li');
    newListItem.textContent = error;
    return newListItem;
}
/*the function performs a validation for the fields and the DOM elements as well*/
function submitRegisterForm(e) {    
    e.preventDefault();
    errorLoginContainer.classList.toggle('hidden');
    /*validation for elements*/
    if ( 
        formCounter && labelsCounter.length === 4 && inputsCounter.length === 4 
        && buttonsCounter.length === 3 && formRegisterName.value.length !==0 
        && formRegisterEmail.value.length !==0
        && formRegisterEmail.value.includes('@') && formRegisterEmail.value.includes('.com') 
        && formRegisterFirstPassword.value.length !==0 
        && formRegisterSecondPassword.value.length !== 0 
        && formRegisterFirstPassword.value === formRegisterSecondPassword.value
        ) {
            listOfErrors.appendChild(createMenuItem('Every validation has passed')); 
        } else {            
            if (!formCounter) {
                listOfErrors.appendChild(createMenuItem('There is no form in DOM')).
                classList.toggle('error-message'); 
            }
            if (labelsCounter.length === 0) {
                listOfErrors.appendChild(createMenuItem('There are no labels in the form')).
                classList.toggle('error-message'); 
            } else if (labelsCounter.length < 4) {
                listOfErrors.appendChild(createMenuItem('There are missing labels in the form')).
                classList.toggle('error-message'); 
            }  else if (labelsCounter.length >= 4) {
                listOfErrors.appendChild(createMenuItem('There are ' 
                + labelsCounter.length + ' labels in the form'));
            }
            if (inputsCounter.length === 0) {
                listOfErrors.appendChild(createMenuItem('There are no inputs in the form')).
                classList.toggle('error-message'); 
            } else if (inputsCounter.length < 4) {
                listOfErrors.appendChild(createMenuItem('There are missing inputs in the form')).
                classList.toggle('error-message'); 
            }  else if (inputsCounter.length >= 4) {
                listOfErrors.appendChild(createMenuItem('There are ' 
                + inputsCounter.length + ' inputs in the form'));
            }
            if (buttonsCounter.length === 0) {
                listOfErrors.appendChild(createMenuItem('There are no buttons in the form')).
                classList.toggle('error-message'); 
            } else if (buttonsCounter.length < 3) {
                listOfErrors.appendChild(createMenuItem('There are missing buttons in the form')).
                classList.toggle('error-message'); 
            }  else if (buttonsCounter.length >= 3) {
                listOfErrors.appendChild(createMenuItem('There are ' 
                + buttonsCounter.length + ' buttons in the form'));
            }
            if (formRegisterName.value.length === 0) {
                listOfErrors.appendChild(createMenuItem('The Name field is empty')).
                classList.toggle('error-message');
            } else {
                listOfErrors.appendChild(createMenuItem('The Name field is not empty')); 
            }
            if (formRegisterEmail.value.length === 0) {
                listOfErrors.appendChild(createMenuItem('The e-mail field is empty')).
                classList.toggle('error-message');
            } else {
                listOfErrors.appendChild(createMenuItem('The e-mail field is not empty')); 
            }
            if (!formRegisterEmail.value.includes('@') || !formRegisterEmail.value.includes('.com')) {
                listOfErrors.appendChild(createMenuItem('The e-mail format is incorrect')).
                classList.toggle('error-message');
            }
            if (formRegisterFirstPassword.value.length === 0) {
                listOfErrors.appendChild(createMenuItem('The first password field is empty')).
                classList.toggle('error-message');
            } else {
                listOfErrors.appendChild(createMenuItem('The first password field is not empty')); 
            }
            if (formRegisterSecondPassword.value.length === 0) {
                listOfErrors.appendChild(createMenuItem('The second password field is empty')).
                classList.toggle('error-message');
            } else {
                listOfErrors.appendChild(createMenuItem('The second password field is not empty')); 
            }
            if (formRegisterFirstPassword.value === formRegisterSecondPassword.value) {
                listOfErrors.appendChild(createMenuItem('Passwords match'));                 
            } else {
                listOfErrors.appendChild(createMenuItem('Passwords do not match')).
                classList.toggle('error-message');
            }
        }
}
function resetRegisterForm(e) {
    registerForm.reset();
}