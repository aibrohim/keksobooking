'use strict';

window.map = (function () {
  var MAP = document.querySelector('.map');
  var MAIN_PIN = MAP.querySelector('.map__pin--main');
  var AD_FORM = document.querySelector('.ad-form');
  var locationInput = document.querySelector('#address');
  var MAIN_PIN_WIDTH = MAIN_PIN.offsetWidth;
  var MAIN_PIN_HEIGHT = MAIN_PIN.offsetHeight + 20;
  var FIELDSETS = document.querySelectorAll('.ad-form fieldset');
  var FILTER_FORM = document.querySelectorAll('.map__filters > *');
  var selectType = document.querySelector('#housing-type');
  var mapFiltersForm = document.querySelector('.map__filters');
  var selectPrice = document.querySelector('#housing-price');
  var selectRooms = document.querySelector('#housing-rooms');
  var selectGuests = document.querySelector('#housing-guests');
  var featuresFieldset = document.querySelector('#housing-features');

  var resetMapFilterForm = function () {
    mapFiltersForm.reset();
  };

  var removePinsCard = function () {
    document.querySelectorAll('.map__pin').forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
    var activeCard = MAP.querySelector('.map__card');
    if (activeCard) {
      MAP.removeChild(activeCard);
      document.removeEventListener('keydown', window.card.onPopupEscPress);
    }
  };

  var loadedAds = [];

  var successHandler = function (data) {
    loadedAds = data;
    window.pins.showPins(data);
    window.card.openPopup(data);
    selectType.addEventListener('change', onDebouncedUpdatePins);
    selectPrice.addEventListener('change', onDebouncedUpdatePins);
    selectRooms.addEventListener('change', onDebouncedUpdatePins);
    selectGuests.addEventListener('change', onDebouncedUpdatePins);
    featuresFieldset.addEventListener('change', onDebouncedUpdatePins);
  };

  var updateData = function () {
    var filteredData = loadedAds.slice();
    if (selectType.value === selectPrice.value === selectRooms.value === selectGuests.value === 'any') {
      return;
    } else {
      filteredData = window.filter.filterType(filteredData);
      filteredData = window.filter.filterPrice(filteredData);
      filteredData = window.filter.filterRooms(filteredData);
      filteredData = window.filter.filterGuests(filteredData);
      filteredData = window.filter.filterFeatures(filteredData);
    }
    removePinsCard();
    window.pins.showPins(filteredData);
    window.card.openPopup(filteredData);
  };

  var onDebouncedUpdatePins = window.debounce(updateData);

  return {
    startProgram: function () {
      MAP.classList.remove('map--faded');
      window.backend.data(successHandler);
      AD_FORM.classList.remove('ad-form--disabled');
      locationInput.value = (MAIN_PIN.offsetLeft + (MAIN_PIN_WIDTH / 2)) + ', ' + (MAIN_PIN.offsetTop + (MAIN_PIN_HEIGHT));
      window.form.onRoomNumberChange();

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
      removePinsCard();
      resetMapFilterForm();

      window.form.resetForm();
      resetMapFilterForm();

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
