'use strict';

window.card = (function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('article');

  var dictionary = {
    palace: 'Дворец',
    house: 'Дом',
    bungalo: 'Бунгало',
    flat: 'Квартира'
  };

  var MAP = document.querySelector('.map');

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

  var openPopup = function (data) {
    for (var i = 0; i < window.mapPins.length; i++) {
      if (!window.mapPins[i].classList.contains('map__pin--main')) {
        window.mapPins[i].addEventListener('click', (function (localI) {
          return function () {
            window.card.showPopup(data[localI - 1]);
          };
        })(i));
      }
    }
  };

  return {
    showPopup: function (objectItem) {
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

      popup.querySelector('.popup__avatar').setAttribute('src', objectItem.author.avatar);

      popupClose.addEventListener('click', function () {
        closePopup(popup);
      });

      document.addEventListener('keydown', onPopupEscPress);

      return MAP.insertBefore(popup, document.querySelector('.map__filters-container'));
    },

    openPopup: function () {
      window.backend.data(openPopup);
    }
  };
})();
