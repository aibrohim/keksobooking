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

  var filterType = function (data) {
    if (selectType.value === 'any') {
      return data;
    } else {
      return data.slice().filter(function (element) {
        return element.offer.type === selectType.value;
      });
    }
  };

  var filterPrice = function (data) {
    if (selectPrice.value === 'any') {
      return data;
    } else {
      return data.slice().filter(function (element) {
        return element.offer.price >= pricesList[selectPrice.value].MIN && element.offer.price < pricesList[selectPrice.value].MAX;
      });
    }
  };

  var filterRooms = function (data) {
    if (selectRooms.value === 'any') {
      return data;
    } else {
      return data.slice().filter(function (element) {
        return element.offer.rooms === Number(selectRooms.value);
      });
    }
  };

  var filterGuests = function (data) {
    if (selectGuests.value === 'any') {
      return data;
    } else {
      return data.slice().filter(function (element) {
        return element.offer.guests === Number(selectGuests.value);
      });
    }
  };

  var filterFeatures = function (data) {
    for (var i = 0; i < features.length; i++) {
      if (features[i].checked === false) {
        data = data;
      } else {
        data = data.slice().filter(function (element) {
          return element.offer.features.includes(features[i].value);
        });
      }
    }

    return data;
  };

  return {
    filterType: filterType,
    filterPrice: filterPrice,
    filterRooms: filterRooms,
    filterGuests: filterGuests,
    filterFeatures: filterFeatures
  };
})();
