'use strict';

var MAP__PINS = document.querySelector('.map__pins');
var MAIN_PIN = document.querySelector('.map__pin--main');
var AD_FORM = document.querySelector('.ad-form');
var FILTER_FORM = document.querySelectorAll('.map__filters > *');
var FIELDSETS = document.querySelectorAll('.ad-form fieldset');
var MAP_OVERLAY = MAP.querySelector('.map__overlay');
var locationInput = document.querySelector('#address');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var MAP_WIDTH = MAP_OVERLAY.offsetWidth;
var MAP_HEIGHT = MAP_OVERLAY.offsetHeight;
var MAIN_PIN_WIDTH = MAIN_PIN.offsetWidth;
var MAIN_PIN_HEIGHT = MAIN_PIN.offsetHeight + 20;

var onRoomNumberChange = function () {
  if (roomNumber.value === '1') {
    capacity.innerHTML = '';
    addOption(1);
  } else if (roomNumber.value === '2') {
    capacity.innerHTML = '';
    addOption(1);
    addOption(2);
  } else if (roomNumber.value === '3') {
    capacity.innerHTML = '';
    addOption(1);
    addOption(2);
    addOption(3);
  } else if (roomNumber.value === '100') {
    capacity.innerHTML = '';
    addOption(0);
  }
};

var addOption = function (optionValue) {
  var option = document.createElement('option');
  option.value = optionValue;
  option.textContent = 'для ' + optionValue + ' гостей';
  if (optionValue === 0) {
    option.textContent = 'не для гостей';
  }
  capacity.appendChild(option);
};


var startProgram = function () {
  MAP.classList.remove('map--faded');
  MAP__PINS.appendChild(fragment);
  window.mapPins = document.querySelectorAll('.map__pin');
  AD_FORM.classList.remove('ad-form--disabled');
  locationInput.value = (570 + (MAIN_PIN_WIDTH / 2)) + ', ' + (375 + (MAIN_PIN_HEIGHT));
  onRoomNumberChange();
  openPopup();

  FIELDSETS.forEach(function (fieldset) {
    fieldset.disabled = false;
  });

  FILTER_FORM.forEach(function (item) {
    item.disabled = false;
  });
};

locationInput.value = MAP_WIDTH / 2 + ', ' + MAP_HEIGHT / 2;

FIELDSETS.forEach(function (fieldset) {
  fieldset.disabled = true;
});

FILTER_FORM.forEach(function (item) {
  item.disabled = true;
});

MAIN_PIN.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    startProgram();
  }
});

MAIN_PIN.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    startProgram();
  }
});

roomNumber.addEventListener('change', onRoomNumberChange);


