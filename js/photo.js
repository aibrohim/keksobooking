'use strict';

window.photo = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var homeImageChooser = document.querySelector('#images');
  var homeImagePreviewContainer = document.querySelector('.ad-form__photo');

  var putAvatar = function (reader) {
    var preview = avatarPreview;
    preview.src = reader.result;
  };

  var putHomeImage = function (reader) {
    var previewContainer = homeImagePreviewContainer;
    var preview = document.createElement('img');
    preview.src = reader.result;
    preview.width = 40;
    preview.height = 44;
    previewContainer.appendChild(preview);
  };

  var uploadImage = function (chooser, putImage) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        putImage(reader);
      });

      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', function () {
    uploadImage(avatarChooser, putAvatar);
  });

  homeImageChooser.addEventListener('change', function () {
    uploadImage(homeImageChooser, putHomeImage);
  });
})();
