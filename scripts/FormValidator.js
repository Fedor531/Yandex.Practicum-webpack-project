class FormValidator {
  constructor(form, submitButton, errorMessages) {
    this.form = form
    this.submitButton = submitButton
    this.errorMessages = errorMessages
    this.setEventListeners()
  }

   isValidate(input) {

    input.setCustomValidity('');

    if (input.validity.valueMissing) {
      input.setCustomValidity(errorMessages.empty);
      return false
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(errorMessages.wrongLength);
      return false
    }

    if (input.validity.typeMismatch && input.type === 'url') {
      input.setCustomValidity(errorMessages.wrongUrl);
      return false
    }

    return input.checkValidity();
  }

  checkInputValidity(input) {
    const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
    this.isValidate(input);
    errorElem.textContent = input.validationMessage;
    this.setSubmitButtonState()
  }

  setSubmitButtonState() {
    if (this.form.checkValidity()) {
      this.submitButton.removeAttribute('disabled');
      this.submitButton.classList.add('popup__button_is-active')
    } else {
      this.submitButton.setAttribute('disabled', 'disabled');
      this.submitButton.classList.remove('popup__button_is-active')
    }
  }

  deleteError() {
    const [...errorElems] = this.form.querySelectorAll('.error');
    errorElems.forEach(function (item) {
      item.textContent = ''
    })
  }

  setEventListeners() {
    this.form.addEventListener('input', (event) => this.checkInputValidity(event.target))
  }
}
