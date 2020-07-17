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
      locationInput.value = (MAIN_PIN.offsetLeft + (MAIN_PIN_WIDTH / 2)) + ', ' + (MAIN_PIN.offsetTop + (MAIN_PIN_HEIGHT));
      window.form.onRoomNumberChange();
      window.card.openPopup();

      FIELDSETS.forEach(function (fieldset) {
        fieldset.disabled = false;
      });

      FILTER_FORM.forEach(function (item) {
        item.disabled = false;
      });
    },
    endProgram: function () {
      var popup = document.querySelector('.popup');

      MAP.classList.add('map--faded');
      for (var i = 1; i < window.mapPins.length; i++) {
        window.pins.fragment.appendChild(window.mapPins[i]);
      }

      window.form.resetForm();

      AD_FORM.classList.add('ad-form--disabled');

      FIELDSETS.forEach(function (fieldset) {
        fieldset.disabled = true;
      });

      FILTER_FORM.forEach(function (item) {
        item.disabled = true;
      });
      MAIN_PIN.style.left = '570px';
      MAIN_PIN.style.top = '375px';
      locationInput.value = (MAIN_PIN.offsetLeft + (MAIN_PIN_WIDTH / 2)) + ', ' + (MAIN_PIN.offsetTop + (MAIN_PIN_HEIGHT));

      if (popup) {
        popup.remove();
      }
    }
  };
})();
