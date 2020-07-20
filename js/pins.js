'use strict';

window.pins = (function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  var MAX_PINS = 5;
  var MAP__PINS = document.querySelector('.map__pins');

  var showPins = function (data) {
    for (var i = 0; i < MAX_PINS; i++) {
      var pin = pinTemplate.cloneNode(true);
      pin.setAttribute('style', 'left: ' + data[i].location.x + 'px; top: ' + data[i].location.y + 'px;');

      var pinImg = pin.querySelector('img');
      pinImg.setAttribute('src', data[i].author.avatar);
      pinImg.setAttribute('alt', data[i].offer.title);

      window.mapPins = document.querySelectorAll('.map__pin');
      fragment.appendChild(pin);
    }
    MAP__PINS.appendChild(fragment);
    window.mapPins = document.querySelectorAll('.map__pin');
  };

  return {
    showPins: showPins
  };
})();
