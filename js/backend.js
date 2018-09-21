'use strict';

(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      var URL = 'https://js.dump.academy/code-and-magick/data';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Ошибка при загрузке магов ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
      });
      xhr.timeout = 5000;
      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      var URL = 'https://js.dump.academy/code-and-magick';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad();
        } else {
          onError('Ошибка при установке мага ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
      });
      xhr.timeout = 5000;
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
