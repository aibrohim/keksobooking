'use strict';

window.mainPin = (function () {
  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      // if (mainPin.offsetLeft <= -32) {
      //   shift = {
      //     x: 0,
      //     y: startCoords.y - moveEvt.clientY
      //   };
      // }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';

      if (mainPin.offsetLeft <= -32) {
        mainPin.style.left = (mainPin.offsetLeft + shift.x) + 'px';
      } else if (mainPin.offsetLeft >= 1168) {
        mainPin.style.left = (mainPin.offsetLeft + shift.x) + 'px';
      } else if (mainPin.offsetTop <= 130) {
        mainPin.style.top = (mainPin.offsetTop + shift.y) + 'px';
      } else if (mainPin.offsetTop >= 630) {
        mainPin.style.top = (mainPin.offsetTop + shift.y) + 'px';
      } else if (mainPin.offsetTop >= 630 && mainPin.offsetLeft <= -32) {
        mainPin.style.top = (mainPin.offsetTop + shift.y) + 'px';
        mainPin.style.left = (mainPin.offsetLeft + shift.x) + 'px';
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
