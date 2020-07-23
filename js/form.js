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

  locationInput.value = MAP_WIDTH / 2 + ', ' + MAP_HEIGHT / 2;

  var resetForm = function () {
    form.reset();
  };

  var onSuccess = function () {
    window.map.endProgram();
    window.messages.onSuccess();
  };

  var onError = function () {
    window.messages.onError();
    console.log('salom');
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.saveData(new FormData(form), onSuccess, onError);
  });

  resetButton.addEventListener('click', function () {
    window.map.endProgram();
  });

  return {
    reset: resetForm,

    onRoomNumberChange: function () {
      var roomNumberValue = roomNumber.value;
      var addOption = window.form.addOption;
      var roomCount = {
        ONE_ROOM: '1',
        TWO_ROOMS: '2',
        THREE_ROOMS: '3',
        HUNDRED_ROOMS: '100'
      };
      var guestCount = {
        ONE_GUEST: 1,
        TWO_GUESTS: 2,
        THREE_GUESTS: 3,
        NO_GUESTS: 0
      };
      switch (roomNumberValue) {
        case (roomCount.ONE_ROOM):
          capacity.innerHTML = '';
          addOption(guestCount.ONE_GUEST);
          break;
        case (roomCount.TWO_ROOMS):
          capacity.innerHTML = '';
          addOption(guestCount.ONE_GUEST);
          addOption(guestCount.TWO_GUESTS);
          break;
        case (roomCount.THREE_ROOMS):
          capacity.innerHTML = '';
          addOption(guestCount.ONE_GUEST);
          addOption(guestCount.TWO_GUESTS);
          addOption(guestCount.THREE_GUESTS);
          break;
        case (roomCount.HUNDRED_ROOMS):
          capacity.innerHTML = '';
          addOption(guestCount.NO_GUESTS);
          break;
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
      var accomodationTypeValue = accomodationType.value;
      switch (accomodationTypeValue) {
        case ('bungalo'):
          accomodationPrice.setAttribute('placeholder', '0');
          accomodationPrice.setAttribute('min', '0');
          break;
        case ('flat'):
          accomodationPrice.setAttribute('placeholder', '1000');
          accomodationPrice.setAttribute('min', '1000');
          break;
        case ('house'):
          accomodationPrice.setAttribute('placeholder', '5000');
          accomodationPrice.setAttribute('min', '5000');
          break;
        case ('palace'):
          accomodationPrice.setAttribute('placeholder', '10000');
          accomodationPrice.setAttribute('min', '10000');
          break;
      }
    }
  };
})();
