// ==UserScript==
// @name         X Empire Autoclicker
// @version      1.0
// @author       mudachyo
// @match        https://game.xempire.io/*
// @grant        none
// @icon         https://mudachyo.codes/assets/x-empire/x-empire.jpg
// @downloadURL  https://github.com/mudachyo/X-Empire/raw/main/x-empire-autoclicker.user.js
// @updateURL    https://github.com/mudachyo/X-Empire/raw/main/x-empire-autoclicker.user.js
// @homepage     https://github.com/mudachyo/X-Empire
// ==/UserScript==

const MIN_DELAY = 130; // Минимальная задержка между кликами
const MAX_DELAY = 260; // Максимальная задержка между кликами
const PAUSE_DURATION = 60000; // Длительность паузы в миллисекундах
const RELOAD_DELAY = 3000; // Задержка перед перезагрузкой в миллисекундах

function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function autoclicker() {
    var energyEl = document.querySelector("div[data-v-38760ab9][style='font-size: 13px;']");
    var energy = energyEl ? parseInt(energyEl.textContent) : null;

    if (energy !== null && energy <= 25) {
        console.log(`Энергия слишком низкая, пауза на минуту. Время паузы: ${PAUSE_DURATION} миллисекунд`);
        setTimeout(autoclicker, PAUSE_DURATION);
        return;
    }

    var el = document.evaluate("//div[contains(@class, 'tapContainer')]//div[@id='oreol']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (el) {
        var rect = el.getBoundingClientRect();
        var x = rect.left + Math.random() * rect.width / 2;
        var y = rect.top + Math.random() * rect.height / 2;
        var event = new PointerEvent('pointerdown', {
            clientX: x,
            clientY: y,
        });
        el.dispatchEvent(event);
    } else {
    }

    var goldTextEl = document.querySelector("h1.goldText[data-v-523ba038='']");
    if (goldTextEl && goldTextEl.textContent.includes("Use Telegram on your mobile!")) {
        setTimeout(() => {
            location.reload();
        }, RELOAD_DELAY);
    }

    setTimeout(autoclicker, getRandomDelay(MIN_DELAY, MAX_DELAY));
}

autoclicker();
