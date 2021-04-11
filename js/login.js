/*VARIABLES*/ 
var formLoginEmail = document.getElementById('form-login-email');
var formLoginPassword = document.getElementById('form-login-password');

var loginErrorEmail = document.getElementById('login-error-email');
var loginErrorPassword = document.getElementById('login-error-password');

var errorLoginContainer = document.getElementById('error-log-container');
var formLoginButton = document.getElementById('login-button');
var listOfErrors = document.getElementById('list-of-errors');
var formCounter = Array.from(document.getElementsByTagName('form'));
var labelsCounter = Array.from(document.getElementsByTagName('label'));
var inputsCounter = Array.from(document.getElementsByTagName('input'));
var buttonsCounter = Array.from(document.getElementsByTagName('button'));
// var LoginButtonCounter = 0;


/*EVENT LISTENERS*/
formLoginButton.addEventListener('click', submitLoginForm);

formLoginEmail.addEventListener('focus', hideLoginEmailError);
formLoginEmail.addEventListener('blur', checkLoginEmail);

formLoginPassword.addEventListener('focus', hideLoginPasswordError);
formLoginPassword.addEventListener('blur', checkLoginPassword);




/*event listener that bubles up from the field to the form*/


/*FUNCTIONS*/

/*First we create a function that creates new li items on a list to add error messages 
on to the errors log div*/
function createMenuItem(error) {
    let newListItem = document.createElement('li');
    newListItem.textContent = error;
    return newListItem;
}



/*function that toggles the error message class when switching from focus to blur*/
function hideLoginEmailError(e) {
    loginErrorEmail.className = 'hidden';
}
function checkLoginEmail(e) {
    if ( formLoginEmail.value.includes('@') && formLoginEmail.value.includes('.com') ) {
        loginErrorEmail.className = 'hidden';
    } else {
        loginErrorEmail.className = 'error-message-shown';
    }   
}

function hideLoginPasswordError(e) {
    loginErrorPassword.className = 'hidden';
}
function checkLoginPassword(e) {
    if ( formLoginPassword.value.match(/^[0-9]+$/) 
        || formLoginPassword.value.match(/^[a-zA-Z]+$/) 
        || formLoginPassword.value.length < 8
        ) {
        loginErrorPassword.className = 'error-message-shown';
    }  else  {
        loginErrorPassword.className = 'hidden';
    }
}
// console.log(LoginButtonCounter);
/*the function performs a validation for the fields and the DOM elements as well, also it checks if 
there is a previous error log from before if it is a prvious one it overwrites that one.*/
function submitLoginForm(e) {
    // LoginButtonCounter = LoginButtonCounter + 1;    
    e.preventDefault();
    errorLoginContainer.classList.toggle('hidden');
    
    
    /*validation for elements*/
    /*add extra validations for the fields to match the requirements and include the extra errors
    modify de if else so it only shows the correct error at a time*/
    if (
        formCounter.length === 1 && labelsCounter.length === 2 && inputsCounter.length === 2 
        && buttonsCounter.length === 2 && formLoginEmail.value.length !==0
        && formLoginEmail.value.includes('@') && formLoginEmail.value.includes('.com')  
        && !formLoginPassword.value.match(/^[0-9]+$/) && !formLoginPassword.value.match(/^[a-zA-Z]+$/)
        && formLoginPassword.value.length >= 8 
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
            if (
                formLoginEmail.value.length === 0 
                || !formLoginEmail.value.includes('@') 
                || !formLoginEmail.value.includes('.com')
            ) {
                listOfErrors.appendChild(createMenuItem('The e-mail format is incorrect')).
                classList.toggle('error-message');
            } else {
                listOfErrors.appendChild(createMenuItem('The e-mail format is correct'))
            }
            if (
                formLoginPassword.value.match(/^[0-9]+$/) 
                || formLoginPassword.value.match(/^[a-zA-Z]+$/)
                || formLoginPassword.value.length < 8
            ) {
                listOfErrors.appendChild(createMenuItem('Password is invalid')).
                classList.toggle('error-message');
            } else {
                listOfErrors.appendChild(createMenuItem('Password has the correct format'));
            }
        }
}
