'use strict';
//  keyboard codes
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

//  wizards data
var WIZARDS_COUNT = 4;
var firstNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var secondNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
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

//  random data
function getRandom(items) {
  var index = Math.floor(Math.random() * items.length);
  return items[index];
}
function getName(names, surnames) {
  var firstName = getRandom(names);
  var secondName = getRandom(surnames);
  //  1.  if girl name
  //  2.  if girl surname
  if (firstName.endsWith('a') || firstName.endsWith('я')) {
    return firstName + ' ' + secondName;
  } else if (secondName.endsWith('Топольницкая')) {
    var surnamesShort = surnames.filter(function (surname) {
      return surname !== 'Топольницкая';
    });
    secondName = getRandom(surnamesShort);
  }
  return firstName + ' ' + secondName;
}

//  create DOM element
function getWizard() {
  var template = document.querySelector('#similar-wizard-template').content;
  var wizardElement = template.querySelector('.setup-similar-item').cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = getName(firstNames, secondNames);
  wizardElement.querySelector('.wizard-coat').style.fill = getRandom(coatColors);
  wizardElement.querySelector('.wizard-eyes').style.fill = getRandom(eyesColors);
  return wizardElement;
}

//  fill similar list with wizards
function renderWizards() {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    var wizard = getWizard();
    fragment.appendChild(wizard);
  }
  var similarList = document.querySelector('.setup-similar-list');
  similarList.appendChild(fragment);
}

//  remove similar wizards for getting new ones next time
function removeWizards() {
  var similarList = document.querySelector('.setup-similar-list');
  var similarItems = document.querySelectorAll('.setup-similar-item');
  similarItems.forEach(function (item) {
    similarList.removeChild(item);
  });
}

//  check validity + submit
function submitForm() {
  var inputInvalid = setupForm.querySelector('.setup-user-name:invalid');
  if (!inputInvalid) {
    setupForm.submit();
  }
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
function onSaveButtonClick() {
  submitForm();
}
function onSaveButtonEnterPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    submitForm();
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
  //  listeners after open setup
  document.addEventListener('keydown', onSetupEscPress);
  closeButton.addEventListener('click', onCloseButtonClick);
  closeButton.addEventListener('keydown', onCloseButtonEnterPress);
  userNameInput.addEventListener('invalid', onUserNameInputInvalid);
  saveButton.addEventListener('click', onSaveButtonClick);
  saveButton.addEventListener('keydown', onSaveButtonEnterPress);
  coat.addEventListener('click', onCoatClick);
  eyes.addEventListener('click', onEyesClick);
  fireball.addEventListener('click', onFireballClick);
}

//  close setup user dialog
function closeSetup() {
  //  hide setup + remove similar wizards
  setup.classList.add('hidden');
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
}
