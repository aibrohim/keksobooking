'use strict';

window.backend = (function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  var POST_URL = 'https://javascript.pages.academy/keksobooking';

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
        var STATUS = xhr.status;

        if (STATUS === 200) {
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
