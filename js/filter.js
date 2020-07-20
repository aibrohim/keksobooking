'use strict';

window.filter = (function () {
  var selectType = document.querySelector('#housing-type');

  var filterType = function (ads) {
    if (selectType.value === 'any') {
      return ads;
    } else {
      return ads.slice().filter(function (ad) {
        return ad.offer.type === selectType.value;
      });
    }
  };

  return {
    filterType: filterType
  };
})();
