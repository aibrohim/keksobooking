'use strict';

window.pins = (function () {
  var MAX_PINS = 5;
  var MAP_PINS = document.querySelector('.map__pins');
  var adTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  var showPins = function (data) {
    for (var i = 0; i < data.length; i++) {
      if (i < MAX_PINS) {
        var pin = adTemplate.cloneNode(true);
        pin.setAttribute('style', 'left: ' + data[i].location.x + 'px; top: ' + data[i].location.y + 'px;');

        var pinImg = pin.querySelector('img');
        pinImg.setAttribute('src', data[i].author.avatar);
        pinImg.setAttribute('alt', data[i].offer.title);

        fragment.appendChild(pin);
      }
    }
    MAP_PINS.appendChild(fragment);
    window.mapPins = document.querySelectorAll('.map__pin');
  };

  return {
    fragment: fragment,
    show: showPins
  };
})();
