'use strict';

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINOUT = ['12: 00', '13: 00', '14: 00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var cardTemplate = document.querySelector('#card').content.querySelector('article');
var MAP = document.querySelector('.map');

var dictionary = {
  palace: 'Дворец',
  house: 'Дом',
  bungalo: 'Бунгало',
  flat: 'Квартира'
};

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

var announcements = function () {
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
};

var showPopup = function (objectItem) {
  var article = document.querySelector('.popup');
  var popup = cardTemplate.cloneNode(true);
  var POPUP_FEATURES = popup.querySelector('.popup__features');
  var POPUP_PHOTOS = popup.querySelector('.popup__photos');
  var popupClose = popup.querySelector('.popup__close');

  if (article) {
    article.remove();
  }

  popup.querySelector('.popup__title').textContent = objectItem.offer.title;
  popup.querySelector('.popup__text--address').textContent = objectItem.offer.address;
  popup.querySelector('.popup__text--price').textContent = objectItem.offer.price + '₽/ночь';
  popup.querySelector('.popup__type').textContent = dictionary[objectItem.offer.type];
  popup.querySelector('.popup__text--capacity').textContent = objectItem.offer.rooms + ' комнаты для ' + objectItem.offer.guests + ' гостей';
  popup.querySelector('.popup__text--time').textContent = 'Заезд после ' + objectItem.offer.checkin + ', выезд до ' + objectItem.offer.checkout;


  POPUP_FEATURES.innerHTML = '';

  objectItem.offer.features.forEach(function (n) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature');
    feature.classList.add('popup__feature--' + n);
    POPUP_FEATURES.appendChild(feature);
  });

  popup.querySelector('.popup__description').textContent = objectItem.offer.description;

  POPUP_PHOTOS.innerHTML = '';

  objectItem.offer.photos.forEach(function (n) {
    var photo = document.createElement('img');
    photo.setAttribute('src', n);
    photo.setAttribute('width', 45);
    photo.setAttribute('height', 40);
    photo.setAttribute('alt', 'Фотография жилья');
    photo.classList.add('popup__photo');
    POPUP_PHOTOS.appendChild(photo);
  });

  popup.querySelector('.popup__avatar').setAttribute('src', 'img/avatars/user' + objectItem.author.avatar + '.png');

  popupClose.addEventListener('click', function () {
    closePopup(popup);
  });

  document.addEventListener('keydown', onPopupEscPress);

  return MAP.insertBefore(popup, document.querySelector('.map__filters-container'));
};

var closePopup = function (popup) {
  popup.remove();

  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  var popup = document.querySelector('.popup');
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
};

var openPopup = function () {
  for (var i = 0; i < window.mapPins.length; i++) {
    if (!window.mapPins[i].classList.contains('map__pin--main')) {
      window.mapPins[i].addEventListener('click', (function (localI) {
        return function () {
          showPopup(announcements()[localI - 1]);
        };
      })(i));
    }
  }
};
