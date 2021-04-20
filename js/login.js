/*VARIABLES*/ 
var formLoginEmail = document.getElementById('form-login-email');
var formLoginPassword = document.getElementById('form-login-password');
var loginErrorEmail = document.getElementById('login-error-email');
var loginErrorPassword = document.getElementById('login-error-password');
var errorLoginContainer = document.getElementById('error-log-container');
var formLoginButton = document.getElementById('login-button');
var listOfErrors = document.getElementById('list-of-errors');
var listOfResults = document.getElementById('list-of-results');
var formCounter = Array.from(document.getElementsByTagName('form'));
var labelsCounter = Array.from(document.getElementsByTagName('label'));
var inputsCounter = Array.from(document.getElementsByTagName('input'));
var buttonsCounter = Array.from(document.getElementsByTagName('button'));
var cleanFormLink = document.getElementById('clean-form-link');
var allValidationsComplete = false;
/*EVENT LISTENERS*/
formLoginButton.addEventListener('click', submitLoginForm);
// formLoginButton.addEventListener('click', httpGetRequest);
formLoginButton.addEventListener('click', handleLogin);
cleanFormLink.addEventListener('click', cleanFormFunction);
formLoginEmail.addEventListener('focus', hideLoginEmailError);
formLoginEmail.addEventListener('blur', checkLoginEmail);
formLoginPassword.addEventListener('focus', hideLoginPasswordError);
formLoginPassword.addEventListener('blur', checkLoginPassword);

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
/*the function performs a validation for the fields and the DOM elements as well, also it checks if 
there is a previous error log from before if it is a prvious one it overwrites that one.*/
function submitLoginForm(e) {
    /*validates that there is not a previous list of error*/
    if (listOfErrors.innerHTML.trim() === "") {        
        e.preventDefault();
        errorLoginContainer.classList.toggle('hidden');
        if (
            formCounter.length === 1 && labelsCounter.length === 2 && inputsCounter.length === 2 
            && buttonsCounter.length === 2 && formLoginEmail.value.length !==0
            && formLoginEmail.value.includes('@') && formLoginEmail.value.includes('.com')  
            && !formLoginPassword.value.match(/^[0-9]+$/) 
            && !formLoginPassword.value.match(/^[a-zA-Z]+$/)
            && formLoginPassword.value.length >= 8 
            ) {
                allValidationsComplete = true;
                listOfErrors.appendChild(createMenuItem('Every validation has passed'));
                listOfResults.appendChild(createMenuItem('The email is: '+formLoginEmail.value));
                listOfResults.appendChild(createMenuItem('Password is: '+formLoginPassword.value));                 
            } else {
                if (formCounter.length === 0) {
                    listOfErrors.appendChild(createMenuItem('There is no form in the DOM')).
                    classList.toggle('error-message');                     
                } else {
                    listOfErrors.appendChild(createMenuItem('There is a form in the DOM'));
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
                    classList.toggle('error-message'); 
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
                    listOfResults.appendChild(createMenuItem('The email is: '+formLoginEmail.value)).
                    classList.toggle('error-message');
                } else {
                    listOfErrors.appendChild(createMenuItem('The e-mail format is correct'));
                    listOfResults.appendChild(createMenuItem('The email is: '+formLoginEmail.value));
                }
                if (
                    formLoginPassword.value.match(/^[0-9]+$/) 
                    || formLoginPassword.value.match(/^[a-zA-Z]+$/)
                    || formLoginPassword.value.length < 8
                ) {
                    listOfErrors.appendChild(createMenuItem('Password is invalid')).
                    classList.toggle('error-message');
                    listOfResults.appendChild(createMenuItem('Password is: '+formLoginPassword.value)).
                    classList.toggle('error-message');
                } else {
                    listOfErrors.appendChild(createMenuItem('Password has the correct format'));
                    listOfResults.appendChild(createMenuItem('Password is: '+formLoginPassword.value));
                }
            }    
    } else {
        alert('make sure you finish with the validations first')
        e.preventDefault();
    }
}
/*CLEAN FORM*/
function cleanFormFunction(e) {    
    listOfErrors.innerHTML = '';
    listOfResults.innerHTML = '';
    errorLoginContainer.classList.toggle('hidden');
}


// HANDLE LOGIN
async function handleLogin() {
    const data = {
        email: formLoginEmail.value,
        password: formLoginPassword.value
    }
    fetch('http://localhost:4000/login', {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(a => console.log(a))
        .catch(err => console.log(err))
}


