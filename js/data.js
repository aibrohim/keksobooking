'use strict';

window.data = (function () {
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKINOUT = ['12: 00', '13: 00', '14: 00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var getRandomElements = function (array) {
    var colElements = getRandomNumber(1, array.length);
    var oldMassive = array.slice();
    var resultArray = [];

    for (var i = 0; i < colElements; i++) {
      var currentRandomIndex = getRandomNumber(0, oldMassive.length - 1);
      resultArray.push(oldMassive.splice(currentRandomIndex, 1));
    }

    var finalArray = [];
    for (var j = 0; j < resultArray.length; j++) {
      finalArray.push(resultArray[j][0]);
    }
    return finalArray;
  };

  return {
    announcements: function () {
      var result = [];

      for (var i = 0; i < 8; i++) {
        result.push({
          'author': {
            'avatar': '0' + (i + 1)
          },
          'offer': {
            'title': 'salom1',
            'address': '600, 350',
            'price': Math.floor(Math.random() * 100) + '00',
            'type': TYPES[Math.floor(Math.random() * 4)],
            'rooms': Math.floor(Math.random() * 10) + 1,
            'guests': Math.floor(Math.random() * 10) + 1,
            'checkin': CHECKINOUT[Math.floor(Math.random() * 3)],
            'checkout': CHECKINOUT[Math.floor(Math.random() * 3)],
            'features': getRandomElements(FEATURES),
            'description': 'строка с описанием',
            'photos': getRandomElements(PHOTOS)
          },
          'location': {
            'x': Math.floor(Math.random() * 1200) + 1,
            'y': Math.floor(Math.random() * (630 - 130)) + 130
          }
        });
      }

      return result;
    }
  };
})();