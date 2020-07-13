'use strict';

window.backend = (function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';

  return {
    data: function (onSuccess) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onSuccess(xhr.response);
      });

      xhr.open('GET', URL);
      xhr.send();
    },
  };
})();
