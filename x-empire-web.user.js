// ==UserScript==
// @name         X Empire Web
// @version      1.1
// @description  Запуск X Empire в браузере
// @author       mudachyo
// @match        https://web.telegram.org/*/*
// @match        https://game.xempire.io/*
// @grant        none
// @icon         https://mudachyo.codes/assets/x-empire/x-empire.jpg
// @downloadURL  https://github.com/mudachyo/X-Empire/raw/main/x-empire-web.user.js
// @updateURL    https://github.com/mudachyo/X-Empire/raw/main/x-empire-web.user.js
// @homepage     https://github.com/mudachyo/X-Empire
// ==/UserScript==

(function() {
    function updateIframeSrc() {
      const iframe = document.querySelector('iframe.payment-verification');

      if (iframe) {
        let src = iframe.src;

        if (src.includes('game.xempire.io') && !src.includes('tgWebAppPlatform=ios')) {
          if (src.includes('tgWebAppPlatform=weba')) {
            src = src.replace(/tgWebAppPlatform=weba/g, 'tgWebAppPlatform=ios');
          } else if (src.includes('tgWebAppPlatform=web')) {
            src = src.replace(/tgWebAppPlatform=web/g, 'tgWebAppPlatform=ios');
          }

          iframe.src = src;

          console.log('Ссылка обновлена:', src);
        }
      } else {
      }
    }

    setInterval(updateIframeSrc, 2000);
  })();