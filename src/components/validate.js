export function enableValidation(validSettings) {
    const formList = document.querySelectorAll(validSettings.formSelector);
    formList.forEach((form) => { setEventListener(form, validSettings) });
}

function setEventListener(form, validSettings) {
    const inputList = form.querySelectorAll(validSettings.inputSelector);
    const submitButton = form.querySelector(validSettings.submitButtonSelector);
    checkFormValidity(form, submitButton);
    inputList.forEach(input => {
        input.addEventListener('input', () => {
            chekValid(input, form);
            checkFormValidity(form, submitButton);
        })
    });
};

function checkFormValidity(form,submitButton) {
    if (form.checkValidity()){
    enableButton(submitButton)
} else {
    disableButton(submitButton)
}
};

function enableButton(submitButton) {
    submitButton.disabled = false;
};

function disableButton(submitButton) {
    submitButton.disabled = true;
};

function chekValid(input) {
    if (input.validity.valid){
        hideError(input);
    } else {
        showError(input, input.validationMessage);
    }
};

function hideError(input) {
    const spanId = `error-${input.id}`;
    const errorField = document.getElementById(spanId);
    errorField.textContent = '';
};

function showError(input, errorMesage) {
    const spanId = `error-${input.id}`;
    const errorField = document.getElementById(spanId);
    errorField.textContent = errorMesage;
};

