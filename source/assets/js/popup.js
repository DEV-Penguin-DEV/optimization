var shouldShow = true;
var delay = parseInt(popup.timeout_first) * 1000;
var index = parseInt(popup.popup_interval) || 0;
var last = parseInt(popup.popup_showed) || 0;
var timeout = parseInt(popup.timeout_hide);
var newIndex = index;
var now = Date.now();

function hexdec(hex, offset) {
  return parseInt(hex.substr(1 + offset * 2, 2), 16);
}

function hexToRGBA(hex, percent) {
  var a = Array();

  for (var i = 0; i < 3; i++) {
    a.push(hexdec(hex, i));
  }

  a.push((parseInt(percent) || 0) / 100);

  return a.join(', ');
}


function showPopup() {
  var timer;
  var popupElement = document.createElement(popup.link ? 'a' : 'div');
  var popupCloseButton = document.createElement('button');

  if (popup.new_tab) {
    popupElement.target = '_blank';
    popupElement.rel = 'noopener noreferrer';
  }

  popupElement.href = popup.link;
  popupElement.classList.add('xxx-popup');
  popupElement.onclick = function() {
    closePopup(popupElement, timer);
  };

  if (popup.image) {
    var popupImage = document.createElement('img');

    popupImage.src = popup.image;
    popupElement.append(popupImage);
    popupElement.classList.add('xxx-popup--img');
  } else {
    popupElement.innerHTML = popup.content;
    popupElement.style.backgroundColor = 'rgba(' + hexToRGBA(popup.back_color, popup.back_opacity) + ')';
    popupElement.style.color = popup.text_color;
    popupElement.style.borderColor = popup.border_color;
  }

  popupCloseButton.className = 'xxx-popup__close';
  popupCloseButton.innerText = 'Р—Р°РєСЂС‹С‚СЊ';

  popupCloseButton.onclick = function(e) {
    
  };

  popupElement.prepend(popupCloseButton);
  document.body.append(popupElement);

  setTimeout(function() {
    popupElement.classList.add('xxx-popup--active');
    document.body.click();
  }, 100);

  if (timeout) {
    timer = setInterval(function() {
      timeout--;
      popupCloseButton.innerText = '(До автозакрытия  ' + timeout + ' секунд.) Закрыть';
    }, 1000);

    popupCloseButton.innerText = '(До автозакрытия  ' + timeout + ' секунд.) Закрыть';

    setTimeout(function() {
      clearInterval(timer);
      closePopup(popupElement, timer);
    }, timeout * 1000);
  }


}

function closePopup(popupElement, timer) {
  popupElement.classList.remove('xxx-popup--active');
  setTimeout(function() {
    clearInterval(timer);
    popupElement.remove();
  }, 601);
}

if (last) {
  var intervals = (popup.timeout_intervals || '').split(',').map(str => parseInt(str.trim()));

  if (index >= intervals.length) {
    shouldShow = false;
  } else {
    delay = last + intervals[index] * 60 * 1000 - now;
    newIndex = index + 1;

    if (popup.timeout_repeat) {
      newIndex %= intervals.length;
    }
  }
}

if (shouldShow) {
  if (delay <= 0) {
    delay = parseInt(popup.timeout_delay) * 1000;
  }

  setTimeout(showPopup, delay - 100);
}