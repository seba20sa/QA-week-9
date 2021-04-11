/*VARIABLES*/ 
var formRegisterName = document.getElementById('form-register-name');
var formRegisterEmail = document.getElementById('form-register-email');
var formRegisterFirstPassword = document.getElementById('form-register-first-password');
var formRegisterSecondPassword = document.getElementById('form-register-second-password');
/*register*/
var registerErrorName = document.getElementById('register-error-name');
var registerErrorEmail = document.getElementById('register-error-email');
var registerErrorFirstPassword = document.getElementById('register-error-first-password');
var registerErrorSecondPassword = document.getElementById('register-error-second-password');
/*containers*/
var errorLoginContainer = document.getElementById('error-log-container');
var formRegisterSubmitButton = document.getElementById('submit-button');
var formRegisterResetButton = document.getElementById('reset-fields-button');
var listOfErrors = document.getElementById('list-of-errors');
/*counters*/
var formCounter = Array.from(document.getElementsByTagName('form'));
var labelsCounter = Array.from(document.getElementsByTagName('label'));
var inputsCounter = Array.from(document.getElementsByTagName('input'));
var buttonsCounter = Array.from(document.getElementsByTagName('button'));

/*LISTENERS*/
formRegisterSubmitButton.addEventListener('click', submitRegisterForm);
formRegisterResetButton.addEventListener('click', resetRegisterForm);

formRegisterName.addEventListener('focus', hideRegisterNameError);
formRegisterName.addEventListener('blur', checkRegisterNameError);

formRegisterEmail.addEventListener('focus', hideRegisterEmailError);
formRegisterEmail.addEventListener('blur', checkRegisterEmailError);

formRegisterFirstPassword.addEventListener('focus', hideRegisterFirstPasswordError);
formRegisterFirstPassword.addEventListener('blur', checkRegisterFirstPasswordError);

formRegisterSecondPassword.addEventListener('focus', hideRegisterSecondPasswordError);
formRegisterSecondPassword.addEventListener('blur', checkRegisterSecondPasswordError);

/*FUNCTIONS*/
/*First we create a function that creates new li items on a list to add error messages 
on to the errors log div*/
function createMenuItem(error) {
    let newListItem = document.createElement('li');
    newListItem.textContent = error;
    return newListItem;
}


/*toggle function that shows the error message and validates name*/
function hideRegisterNameError(e) {
    registerErrorName.className = 'hidden';
}
function checkRegisterNameError(e) {
    if ( formRegisterName.value.includes(' ') && formRegisterName.value.length >= 6) {
        registerErrorName.className = 'hidden';
    } else {
        registerErrorName.className = 'error-message-shown';
    }   
}
/*email*/
function hideRegisterEmailError(e) {
    registerErrorEmail.className = 'hidden';
}
function checkRegisterEmailError(e) {
    if ( formRegisterEmail.value.includes('@') && formRegisterEmail.value.includes('.com') ) {
        registerErrorEmail.className = 'hidden';
    } else {
        registerErrorEmail.className = 'error-message-shown';
    }   
}
/*first password*/
function hideRegisterFirstPasswordError(e) {
    registerErrorFirstPassword.className = 'hidden';
}
function checkRegisterFirstPasswordError(e) {
    if ( formRegisterFirstPassword.value.match(/^[0-9]+$/) 
        || formRegisterFirstPassword.value.match(/^[a-zA-Z]+$/) 
        || formRegisterFirstPassword.value.length < 8
        ) {
            registerErrorFirstPassword.className = 'error-message-shown';
    }  else  {
        registerErrorFirstPassword.className = 'hidden';
    }
}
/*second password*/
function hideRegisterSecondPasswordError(e) {
    registerErrorSecondPassword.className = 'hidden';
}
function checkRegisterSecondPasswordError(e) {
    if ( 
        formRegisterSecondPassword.value.match(/^[0-9]+$/) 
        || formRegisterSecondPassword.value.match(/^[a-zA-Z]+$/) 
        || formRegisterSecondPassword.value.length < 8
        || formRegisterFirstPassword.value !== formRegisterSecondPassword.value
        ) {
            registerErrorSecondPassword.className = 'error-message-shown';
    }  else  {
        registerErrorFirstPassword.className = 'hidden';
    }
}


/*the function performs a validation for the fields and the DOM elements as well*/
function submitRegisterForm(e) {    
    e.preventDefault();
    errorLoginContainer.classList.toggle('hidden');
    /*validation for elements*/
    if ( 
        formCounter.length === 1 && labelsCounter.length === 4 && inputsCounter.length === 4 
        && buttonsCounter.length === 3 
        && formRegisterName.value.length >= 6 && formRegisterName.value.includes(' ') 
        && formRegisterEmail.value.length !==0
        && formRegisterEmail.value.includes('@') && formRegisterEmail.value.includes('.com') 
        && !formRegisterFirstPassword.value.match(/^[0-9]+$/) 
        && !formRegisterFirstPassword.value.match(/^[a-zA-Z]+$/)
        && formRegisterFirstPassword.value.length >= 8 
        && formRegisterSecondPassword.value.length !== 0 
        && formRegisterFirstPassword.value === formRegisterSecondPassword.value
        ) {
            listOfErrors.appendChild(createMenuItem('Every validation has passed')); 
        } else {            
            if (formCounter.length === 0) {
                listOfErrors.appendChild(createMenuItem('There is no form in the DOM')).
                classList.toggle('error-message'); 
            } else {
                listOfErrors.appendChild(createMenuItem('There is a form in the DOM'))
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
            if (formRegisterName.value.length < 6 || !formRegisterName.value.includes(' ')) {
                listOfErrors.appendChild(createMenuItem('The Name input does not have the correct format')).
                classList.toggle('error-message');
            } else {
                listOfErrors.appendChild(createMenuItem('The Name input has the correct format')); 
            }            
            if (!formRegisterEmail.value.includes('@') || !formRegisterEmail.value.includes('.com')) {
                listOfErrors.appendChild(createMenuItem('The e-mail format is incorrect')).
                classList.toggle('error-message');
            } else {
                listOfErrors.appendChild(createMenuItem('The e-mail format is correct'))
            }
            if ( 
                formRegisterFirstPassword.value.match(/^[0-9]+$/) 
                || formRegisterFirstPassword.value.match(/^[a-zA-Z]+$/)
                || formRegisterFirstPassword.value.length < 8 
                ) {
                listOfErrors.appendChild(createMenuItem('The first password format is incorrect')).
                classList.toggle('error-message');
            } else {
                listOfErrors.appendChild(createMenuItem('The first password format is correct')); 
            }
            if (
                formRegisterSecondPassword.value.match(/^[0-9]+$/) 
                || formRegisterSecondPassword.value.match(/^[a-zA-Z]+$/)
                || formRegisterSecondPassword.value.length < 8
                || formRegisterFirstPassword.value !== formRegisterSecondPassword.value
            ) {
                listOfErrors.appendChild(createMenuItem('The second password format is invalid')).
                classList.toggle('error-message');
            } else {
                listOfErrors.appendChild(
                    createMenuItem('The second password format is correct and passwords match')
                ); 
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
    formCounter.reset();
}