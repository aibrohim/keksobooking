'use strict';

window.map = (function () {
  var MAP__PINS = document.querySelector('.map__pins');
  var MAP = document.querySelector('.map');
  var MAIN_PIN = MAP.querySelector('.map__pin--main');
  var AD_FORM = document.querySelector('.ad-form');
  var locationInput = document.querySelector('#address');
  var MAIN_PIN_WIDTH = MAIN_PIN.offsetWidth;
  var MAIN_PIN_HEIGHT = MAIN_PIN.offsetHeight + 20;
  var FIELDSETS = document.querySelectorAll('.ad-form fieldset');
  var FILTER_FORM = document.querySelectorAll('.map__filters > *');

  return {
    startProgram: function () {
      MAP.classList.remove('map--faded');
      MAP__PINS.appendChild(window.pins.fragment);
      window.mapPins = document.querySelectorAll('.map__pin');
      AD_FORM.classList.remove('ad-form--disabled');
      locationInput.value = (570 + (MAIN_PIN_WIDTH / 2)) + ', ' + (375 + (MAIN_PIN_HEIGHT));
      window.form.onRoomNumberChange();
      window.card.openPopup();

      FIELDSETS.forEach(function (fieldset) {
        fieldset.disabled = false;
      });

      FILTER_FORM.forEach(function (item) {
        item.disabled = false;
      });
    }
  };
})();
