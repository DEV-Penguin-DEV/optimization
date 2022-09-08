function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

function setCookie(name, value, options = {}) {

  options = {
    path: '/'
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  var updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (var optionKey in options) {
    updatedCookie += "; " + optionKey;
    var optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
};

(function(){

  var intro = document.querySelector(".intro");
  if (intro){
    var key = "hide_intro";

    var hideIntro = getCookie(key);
    if (!hideIntro) {
      intro.classList.add("active");
    };

    var button = intro.querySelector(".intro__button");

    button.addEventListener("click", function(event){
      event.preventDefault();
      intro.classList.add("hide");
      setCookie(key, 'true', {'max-age': 2592000});
      setTimeout(function(){
        intro.classList.remove("active");
      },700)
    }, true);

  };

})();

