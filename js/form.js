'use strict';

window.form = (function () {
  var MAP = document.querySelector('.map');
  var locationInput = document.querySelector('#address');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var accomodationType = document.querySelector('#type');
  var accomodationPrice = document.querySelector('#price');
  var MAP_OVERLAY = MAP.querySelector('.map__overlay');
  var MAP_WIDTH = MAP_OVERLAY.offsetWidth;
  var MAP_HEIGHT = MAP_OVERLAY.offsetHeight;
  var form = document.querySelector('.ad-form');
  var resetButton = document.querySelector('.ad-form__reset');
  var MAIN_PIN = MAP.querySelector('.map__pin--main');

  locationInput.value = MAP_WIDTH / 2 + ', ' + MAP_HEIGHT / 2;

  var resetForm = function () {
    form.reset();
    locationInput.value = (MAIN_PIN.style.left.replace('px', '')) + ', ' + (MAIN_PIN.style.top.replace('px', ''));
  };

  var onSuccess = function () {
    window.map.endProgram();
    window.messages.onSuccess();
    resetForm();
  };

  var onError = function () {
    window.messages.onError();
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.postData(new FormData(form), onSuccess, onError);
  });

  resetButton.addEventListener('click', function (evt) {
    form.resetForm();
  });

  return {
    onRoomNumberChange: function () {
      if (roomNumber.value === '1') {
        capacity.innerHTML = '';
        window.form.addOption(1);
      } else if (roomNumber.value === '2') {
        capacity.innerHTML = '';
        window.form.addOption(1);
        window.form.addOption(2);
      } else if (roomNumber.value === '3') {
        capacity.innerHTML = '';
        window.form.addOption(1);
        window.form.addOption(2);
        window.form.addOption(3);
      } else if (roomNumber.value === '100') {
        capacity.innerHTML = '';
        window.form.addOption(0);
      }
    },

    addOption: function (optionValue) {
      var option = document.createElement('option');
      option.value = optionValue;
      option.textContent = 'для ' + optionValue + ' гостей';
      if (optionValue === 0) {
        option.textContent = 'не для гостей';
      }
      capacity.appendChild(option);
    },

    onAccomodationTypeChange: function () {
      if (accomodationType.value === 'bungalo') {
        accomodationPrice.setAttribute('placeholder', '0');
        accomodationPrice.setAttribute('min', '0');
      } else if (accomodationType.value === 'flat') {
        accomodationPrice.setAttribute('placeholder', '1000');
        accomodationPrice.setAttribute('min', '1000');
      } else if (accomodationType.value === 'house') {
        accomodationPrice.setAttribute('placeholder', '5000');
        accomodationPrice.setAttribute('min', '5000');
      } else if (accomodationType.value === 'palace') {
        accomodationPrice.setAttribute('placeholder', '10000');
        accomodationPrice.setAttribute('min', '10000');
      }
    }
  };
})();
