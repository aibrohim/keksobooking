'use strict';

window.backend = (function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var postURL = 'https://javascript.pages.academy/keksobooking';

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
    postData: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess();
        } else {
          onError();
        }
      });

      xhr.open('POST', postURL);
      xhr.send(data);
    }
  };
})();
