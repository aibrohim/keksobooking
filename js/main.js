'use strict';

window.main = (function () {
  var FIELDSETS = document.querySelectorAll('.ad-form fieldset');
  var FILTER_FORM = document.querySelectorAll('.map__filters > *');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var accomodationType = document.querySelector('#type');
  var MAIN_PIN = document.querySelector('.map__pin--main');

  FIELDSETS.forEach(function (fieldset) {
    fieldset.disabled = true;
  });

  FILTER_FORM.forEach(function (item) {
    item.disabled = true;
  });

  roomNumber.addEventListener('change', window.form.onRoomNumberChange);

  accomodationType.addEventListener('change', window.form.onAccomodationTypeChange);

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  var i = 0;

  MAIN_PIN.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      if (i > 0) {
        return;
      }

      i++;
      window.map.startProgram();
    }
  });

  MAIN_PIN.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.map.startProgram();
    }
  });
})();
