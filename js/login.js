/*VARIABLES*/ 
var formLoginEmail = document.getElementById('form-login-email');
var formLoginPassword = document.getElementById('form-login-password');
var errorLoginContainer = document.getElementById('error-log-container');
var formLoginButton = document.getElementById('login-button');
var listOfErrors = document.getElementById('list-of-errors');
// var loginEmailErrorMessage = '';
// var loginPasswordErrorMessage = '';
// var domErrorMessage = '';
// var newListItem = document.createElement('li');


/*EVENT LISTENERS*/
formLoginButton.addEventListener('click', submitLoginForm);

/*FUNCTIONS*/
/*First we create a function that creates new li items on a list to add error messages on to the errors log div*/ 
function createMenuItem(error) {
    let newListItem = document.createElement('li');
    newListItem.textContent = error;
    return newListItem;
}
/*the function performs a validation for the fields and the DOM elements as
well*/
function submitLoginForm(e) {    
    e.preventDefault();
    errorLoginContainer.classList.toggle('hidden');
    if (formLoginEmail.value.length === 0) {
        console.log('E-mail is invalid');        
        listOfErrors.appendChild(createMenuItem('E-mail is invalid'));        
    } else {
        listOfErrors.appendChild(createMenuItem('E-mail is not empty'));
        console.log('E-mail is not empty'); 
    }
    if (formLoginPassword.value.length === 0) {
        listOfErrors.appendChild(createMenuItem('Password is invalid'));
        console.log('Password is invalid');      
        
    } else {
        listOfErrors.appendChild(createMenuItem('Password is not empty')); 
        console.log('Password is not empty');
    }
}
