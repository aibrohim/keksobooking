'use strict';

window.messages = (function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var errorCloser = errorTemplate.querySelector('.error__button');

  var removeSuccesTemplate = function () {
    successTemplate.remove();

    document.removeEventListener('keydown', onSuccessEscPress);
  };

  var onSuccessEscPress = function (evt) {
    if (evt.key === 'Escape') {
      removeSuccesTemplate();
    }
  };

  var onErrorCloserClick = function () {
    errorCloser.addEventListener('click', function () {
      errorTemplate.remove();
    });
  };

  var removeErrorTemplate = function () {
    errorTemplate.remove();

    document.removeEventListener('keydown', onErrorEscPress);
  };

  var onErrorEscPress = function (evt) {
    if (evt.key === 'Escape') {
      removeErrorTemplate();
    }
  };

  return {
    onSuccess: function () {
      main.append(successTemplate);
      document.addEventListener('keydown', onSuccessEscPress);
      successTemplate.addEventListener('click', function () {
        removeSuccesTemplate();
      });
    },
    onError: function () {
      main.append(errorTemplate);
      onErrorCloserClick();
      document.addEventListener('keydown', onErrorEscPress);
      errorTemplate.addEventListener('click', function () {
        removeErrorTemplate();
      });
    }
  };
})();
