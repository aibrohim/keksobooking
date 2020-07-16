'use strict';

window.mainPin = (function () {
  var MAIN_PIN = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var MAIN_PIN_WIDTH = MAIN_PIN.offsetWidth;
  var MAIN_PIN_HEIGHT = MAIN_PIN.offsetHeight + 20;

  MAIN_PIN.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    addressInput.value = (MAIN_PIN.offsetLeft + (MAIN_PIN_WIDTH / 2)) + ', ' + (MAIN_PIN.offsetTop + (MAIN_PIN_HEIGHT));

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };


      MAIN_PIN.style.left = (MAIN_PIN.offsetLeft - shift.x) + 'px';
      MAIN_PIN.style.top = (MAIN_PIN.offsetTop - shift.y) + 'px';

      addressInput.value = (MAIN_PIN.offsetLeft + (MAIN_PIN_WIDTH / 2)) + ', ' + (MAIN_PIN.offsetTop + (MAIN_PIN_HEIGHT));

      if (MAIN_PIN.offsetLeft <= -32) {
        MAIN_PIN.style.left = (MAIN_PIN.offsetLeft + shift.x) + 'px';
      } else if (MAIN_PIN.offsetLeft >= 1168) {
        MAIN_PIN.style.left = (MAIN_PIN.offsetLeft + shift.x) + 'px';
      }

      if (MAIN_PIN.offsetTop <= 130) {
        MAIN_PIN.style.top = (MAIN_PIN.offsetTop + shift.y) + 'px';
      } else if (MAIN_PIN.offsetTop >= 630) {
        MAIN_PIN.style.top = (MAIN_PIN.offsetTop + shift.y) + 'px';
      }

      if (MAIN_PIN.offsetLeft <= -32 || MAIN_PIN.offsetLeft >= 1168 || MAIN_PIN.offsetTop <= 130 || MAIN_PIN.offsetTop >= 630) {
        return;
      }
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
