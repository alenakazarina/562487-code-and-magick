'use strict';

//  wizards data
var WIZARDS_COUNT = 4;
var FirstName = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var SecondName = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var CoatColor = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EyesColor = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
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
  wizardElement.querySelector('.setup-similar-label').textContent = getName(FirstName, SecondName);
  wizardElement.querySelector('.wizard-coat').style.fill = getRandom(CoatColor);
  wizardElement.querySelector('.wizard-eyes').style.fill = getRandom(EyesColor);
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

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');
renderWizards();
userDialog.querySelector('.setup-similar').classList.remove('hidden');
