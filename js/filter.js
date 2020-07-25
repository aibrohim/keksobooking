'use strict';

window.filter = (function () {
  var pricesList = {
    middle: {
      MIN: 10000,
      MAX: 50000
    },
    low: {
      MIN: 0,
      MAX: 10000
    },
    high: {
      MIN: 50000,
      MAX: 10000000
    }
  };

  var selectType = document.querySelector('#housing-type');
  var selectPrice = document.querySelector('#housing-price');
  var selectRooms = document.querySelector('#housing-rooms');
  var selectGuests = document.querySelector('#housing-guests');
  var features = document.querySelectorAll('#housing-features > input');

  var filterType = function (el) {
    if (selectType.value === 'any') {
      return el;
    } else {
      return el.offer.type === selectType.value;
    }
  };

  var filterPrice = function (el) {
    if (selectPrice.value === 'any') {
      return el;
    } else {
      return el.offer.price >= pricesList[selectPrice.value].MIN && el.offer.price < pricesList[selectPrice.value].MAX;
    }
  };

  var filterRooms = function (el) {
    if (selectRooms.value === 'any') {
      return el;
    } else {
      return el.offer.rooms === Number(selectRooms.value);
    }
  };

  var filterGuests = function (el) {
    if (selectGuests.value === 'any') {
      return el;
    } else {
      return el.offer.guests === Number(selectGuests.value);
    }
  };

  var filterFeatures = function (el) {
    features.forEach(function (feature) {
      if (feature.checked === false) {
        el = el;
      } else {
        el = el.offer.features.includes(feature.value);
      }
    });

    return el;
  };

  return {
    filterType: filterType,
    filterPrice: filterPrice,
    filterRooms: filterRooms,
    filterGuests: filterGuests,
    filterFeatures: filterFeatures
  };
})();
