'use strict';

(function () {
  function onLoadError(err) {
    var similarList = document.querySelector('.setup-similar');
    var template = document.querySelector('#setup-error').content;
    var errorElem = template.querySelector('.setup-similar-error').cloneNode(true);
    errorElem.querySelector('.setup-error-message').textContent = err;
    similarList.appendChild(errorElem);
  }
  function onSaveError(err) {
    var setupForm = document.querySelector('.setup-wizard-form');
    var template = document.querySelector('#setup-error').content;
    var errorElem = template.querySelector('.setup-similar-error').cloneNode(true);
    errorElem.querySelector('.setup-error-message').textContent = err;
    errorElem.classList.add('setup-error-save');
    setupForm.appendChild(errorElem);
    setTimeout(function () {
      setupForm.removeChild(errorElem);
    }, 3000);
  }
  function onLoad(data) {
    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;
    var WIZARDS_COUNT = 4;
    var wizardsData = data;
    var coatColors = [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ];
    var eyesColors = [
      'black',
      'red',
      'blue',
      'yellow',
      'green'
    ];
    var fireballColors = [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848'
    ];
    function getRandom(items) {
      var index = Math.floor(Math.random() * items.length);
      return items[index];
    }
    function getWizard(wizard) {
      var template = document.querySelector('#similar-wizard-template').content;
      var wizardElement = template.querySelector('.setup-similar-item').cloneNode(true);
      wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
      wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
      wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
      return wizardElement;
    }
    function renderWizards() {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < WIZARDS_COUNT; i++) {
        var randomWizard = getRandom(wizardsData);
        var wizard = getWizard(randomWizard);
        fragment.appendChild(wizard);
      }
      var similarList = document.querySelector('.setup-similar-list');
      similarList.appendChild(fragment);
    }
    function removeWizards() {
      var similarList = document.querySelector('.setup-similar-list');
      var similarItems = document.querySelectorAll('.setup-similar-item');
      similarItems.forEach(function (item) {
        similarList.removeChild(item);
      });
    }
    function updateSetupPosition() {
      setup.style.left = '50%';
      setup.style.top = '80px';
    }
    //  handlers
    function onAvatarClick() {
      openSetup();
    }
    function onAvatarEnterPress(evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        openSetup();
      }
    }
    function onCloseButtonClick() {
      closeSetup();
    }
    function onCloseButtonEnterPress(evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        closeSetup();
      }
    }
    function onSetupEscPress(evt) {
      var inputFocused = document.querySelector('.setup-user-name:focus');
      if (evt.keyCode === ESC_KEYCODE && !inputFocused) {
        closeSetup();
      }
    }
    function onCoatClick(evt) {
      var color = getRandom(coatColors);
      var coatColorInput = document.querySelector('input[name=coat-color]');
      evt.target.style.fill = color;
      coatColorInput.value = color;
    }
    function onEyesClick(evt) {
      var color = getRandom(eyesColors);
      var eyesColorInput = document.querySelector('input[name=eyes-color]');
      evt.target.style.fill = color;
      eyesColorInput.value = color;
    }
    function onFireballClick(evt) {
      var color = getRandom(fireballColors);
      var fireballColorInput = document.querySelector('input[name=fireball-color]');
      evt.target.style.backgroundColor = color;
      fireballColorInput.value = color;
    }
    function onUserNameInputInvalid(evt) {
      var target = evt.target;
      if (target.validity.tooShort) {
        target.setCustomValidity('Имя должно состоять минимум из 2х символов');
      } else if (target.validity.tooLong) {
        target.setCustomValidity('Имя не должно превышать 25 символов');
      } else if (target.validity.valueMissing) {
        target.setCustomValidity('Обязательное поле ввода');
      } else {
        target.setCustomValidity('');
      }
    }
    function onSaveButtonClick(evt) {
      evt.preventDefault();
      submitForm();
    }
    function onSaveButtonEnterPress(evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        evt.preventDefault();
        submitForm();
      }
    }
    function submitForm() {
      var inputInvalid = setupForm.querySelector('.setup-user-name:invalid');
      var setupData = new FormData(setupForm);
      if (!inputInvalid) {
        window.backend.save(setupData, onSetupLoad, onSaveError);
      } else {
        userNameInput.focus();
      }
    }
    function onSetupFormSubmit(evt) {
      evt.preventDefault();
      submitForm();
    }
    function onSetupLoad() {
      closeSetup();
    }
    //  setup elements
    var setup = document.querySelector('.setup');
    var avatar = document.querySelector('.setup-open');
    var closeButton = document.querySelector('.setup-close');
    var saveButton = document.querySelector('.setup-submit');
    var userNameInput = document.querySelector('.setup-user-name');
    var setupForm = document.querySelector('.setup-wizard-form');
    var coat = document.querySelector('.setup-wizard .wizard-coat');
    var eyes = document.querySelector('.setup-wizard .wizard-eyes');
    var fireball = document.querySelector('.setup-fireball-wrap');
    //  listeners => before open setup
    avatar.addEventListener('click', onAvatarClick);
    avatar.addEventListener('keydown', onAvatarEnterPress);

    //  open setup user dialog
    function openSetup() {
      //  show setup + similar wizards
      setup.classList.remove('hidden');
      renderWizards();
      setup.querySelector('.setup-similar').classList.remove('hidden');
      //  listeners
      document.addEventListener('keydown', onSetupEscPress);
      closeButton.addEventListener('click', onCloseButtonClick);
      closeButton.addEventListener('keydown', onCloseButtonEnterPress);
      userNameInput.addEventListener('invalid', onUserNameInputInvalid);
      saveButton.addEventListener('click', onSaveButtonClick);
      saveButton.addEventListener('keydown', onSaveButtonEnterPress);
      coat.addEventListener('click', onCoatClick);
      eyes.addEventListener('click', onEyesClick);
      fireball.addEventListener('click', onFireballClick);
      setupForm.addEventListener('submit', onSetupFormSubmit);
    }

    //  close setup user dialog
    function closeSetup() {
      //  hide setup + remove similar wizards
      setup.classList.add('hidden');
      updateSetupPosition();
      removeWizards();
      //  remove all listeners after open setup
      document.removeEventListener('keydown', onSetupEscPress);
      closeButton.removeEventListener('click', onCloseButtonClick);
      closeButton.removeEventListener('keydown', onCloseButtonEnterPress);
      userNameInput.removeEventListener('invalid', onUserNameInputInvalid);
      saveButton.removeEventListener('click', onSaveButtonClick);
      saveButton.removeEventListener('keydown', onSaveButtonEnterPress);
      coat.removeEventListener('click', onCoatClick);
      eyes.removeEventListener('click', onEyesClick);
      fireball.removeEventListener('click', onFireballClick);
      setupForm.removeEventListener('submit', onSetupFormSubmit);
    }
  }
  window.backend.load(onLoad, onLoadError);
})();
