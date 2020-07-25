'use strict';

window.backend = (function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var POST_URL = 'https://javascript.pages.academy/keksobooking';
  var SUCCESS_STATUS = 200;

  return {
    loadData: function (onSuccess) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onSuccess(xhr.response);
      });

      xhr.open('GET', URL);
      xhr.send();
    },
    saveData: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_STATUS) {
          onSuccess();
        } else {
          onError();
        }
      });

      xhr.open('POST', POST_URL);
      xhr.send(data);
    }
  };
})();
