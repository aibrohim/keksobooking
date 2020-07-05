'use strict';

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var fragment = document.createDocumentFragment();

announcements().forEach(function (element) {
  var pin = pinTemplate.cloneNode(true);
  pin.setAttribute('style', 'left: ' + element.location.x + 'px; top: ' + element.location.y + 'px;');

  var pinImg = pin.querySelector('img');
  pinImg.setAttribute('src', 'img/avatars/user' + element.author.avatar + '.png');
  pinImg.setAttribute('alt', element.offer.title);

  window.mapPins = document.querySelectorAll('.map__pin');
  fragment.appendChild(pin);
});
