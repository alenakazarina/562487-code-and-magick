'use strict';

(function () {
  function onSetupAvatarMouseDown(evt) {
    var dialog = document.querySelector('.setup');
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;
    function onMouseMove(moveEvt) {
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      dialog.style.left = dialog.offsetLeft - shift.x + 'px';
      dialog.style.top = dialog.offsetTop - shift.y + 'px';
    }
    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      function onDialogClickPreventDefault(clickEvt) {
        clickEvt.preventDefault();
        dialogHandler.removeEventListener('click', onDialogClickPreventDefault);
      }
      if (dragged) {
        dialogHandler.addEventListener('click', onDialogClickPreventDefault);
      }
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  var dialogHandler = document.querySelector('.upload');
  dialogHandler.addEventListener('mousedown', onSetupAvatarMouseDown);
})();
