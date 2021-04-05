/*VARIABLES*/ 
var formLoginEmail = document.getElementById('form-login-email');
var formLoginPassword = document.getElementById('form-login-password');
var errorLoginContainer = document.getElementById('error-log-container');
var formLoginButton = document.getElementById('login-button');
var listOfErrors = document.getElementById('list-of-errors');
var labelsCounter = document.getElementsByTagName('label');
var inputsCounter = document.getElementsByTagName('input');
var buttonsCounter = document.getElementsByTagName('button');
var formCounter = document.getElementsByTagName('form');
/*EVENT LISTENERS*/
formLoginButton.addEventListener('click', submitLoginForm);
/*FUNCTIONS*/
/*First we create a function that creates new li items on a list to add error messages 
on to the errors log div*/
function createMenuItem(error) {
    let newListItem = document.createElement('li');
    newListItem.textContent = error;
    return newListItem;
}
/*the function performs a validation for the fields and the DOM elements as well*/
function submitLoginForm(e) {    
    e.preventDefault();
    errorLoginContainer.classList.toggle('hidden');
    /*validation for elements*/
    if (
        formCounter && labelsCounter.length === 2 && inputsCounter.length === 2 
        && buttonsCounter.length === 2 && formLoginEmail.value.length !==0
        && formLoginEmail.value.includes('@') && formLoginEmail.value.includes('.com')  
        && formLoginPassword.value.length !== 0 
        ) {
            listOfErrors.appendChild(createMenuItem('Everything is fine')); 
        } else {
            if (!formCounter) {
                listOfErrors.appendChild(createMenuItem('There is no form in DOM')).
                classList.toggle('error-message'); 
            }
            if (labelsCounter.length === 0) {
                listOfErrors.appendChild(createMenuItem('There are no labels in the form')).
                classList.toggle('error-message'); 
            } else if (labelsCounter.length < 2) {
                listOfErrors.appendChild(createMenuItem('There are missing labels in the form')).
                classList.toggle('error-message'); 
            }  else if (labelsCounter.length >= 2) {
                listOfErrors.appendChild(createMenuItem('There are ' 
                + labelsCounter.length + ' labels in the form'));
            }
            if (inputsCounter.length === 0) {
                listOfErrors.appendChild(createMenuItem('There are no inputs in the form')).
                classList.toggle('error-message'); 
            } else if (inputsCounter.length < 2) {
                listOfErrors.appendChild(createMenuItem('There are missing inputs in the form')).
                classList.toggle('error-message'); 
            }  else if (inputsCounter.length >= 2) {
                listOfErrors.appendChild(createMenuItem('There are ' 
                + inputsCounter.length + ' inputs in the form'));
            }
            if (buttonsCounter.length === 0) {
                listOfErrors.appendChild(createMenuItem('There are no buttons in the form')).
                classList.toggle('error-message'); 
            } else if (buttonsCounter.length < 2) {
                listOfErrors.appendChild(createMenuItem('There are missing buttons in the form')).
                classList.toggle('error-message');; 
            }  else if (buttonsCounter.length >= 2) {
                listOfErrors.appendChild(createMenuItem('There are ' 
                + buttonsCounter.length + ' buttons in the form'));
            }
            if (formLoginEmail.value.length === 0) {              
                listOfErrors.appendChild(createMenuItem('The e-mail field is empty')).
                classList.toggle('error-message');        
            } else {
                listOfErrors.appendChild(createMenuItem('The e-mail field is not empty'));                
            }
            if (!formLoginEmail.value.includes('@') || !formLoginEmail.value.includes('.com')) {
                listOfErrors.appendChild(createMenuItem('The e-mail format is incorrect')).
                classList.toggle('error-message');
            }
            if (formLoginPassword.value.length === 0) {
                listOfErrors.appendChild(createMenuItem('Password is invalid')).
                classList.toggle('error-message');
            } else {
                listOfErrors.appendChild(createMenuItem('Password is not empty'));
            }
        }
}
