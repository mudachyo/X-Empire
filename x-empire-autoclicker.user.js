// ==UserScript==
// @name         X Empire Autoclicker
// @version      1.2
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

function findEnergyElement() {
    return document.querySelector("div[data-v-38760ab9][style='font-size: 13px;']");
}

function createInfoElement() {
    let infoEl = document.getElementById('autoclicker-info');
    if (!infoEl) {
        infoEl = document.createElement('div');
        infoEl.id = 'autoclicker-info';
        infoEl.style.position = 'fixed';
        infoEl.style.top = '10px';
        infoEl.style.left = '10px';
        infoEl.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        infoEl.style.color = 'white';
        infoEl.style.padding = '10px';
        infoEl.style.borderRadius = '5px';
        infoEl.style.zIndex = '9999';
        infoEl.style.cursor = 'move';
        infoEl.style.userSelect = 'none';
        infoEl.style.maxWidth = '200px';
        infoEl.style.wordWrap = 'break-word';
        infoEl.style.display = 'block'; 
        document.body.appendChild(infoEl);

        let isDragging = false;
        let dragOffsetX, dragOffsetY;

        function startDrag(e) {
            isDragging = true;
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            dragOffsetX = clientX - infoEl.offsetLeft;
            dragOffsetY = clientY - infoEl.offsetTop;
            e.preventDefault();
        }

        function drag(e) {
            if (isDragging) {
                const clientX = e.clientX || e.touches[0].clientX;
                const clientY = e.clientY || e.touches[0].clientY;
                infoEl.style.left = (clientX - dragOffsetX) + 'px';
                infoEl.style.top = (clientY - dragOffsetY) + 'px';
                e.preventDefault();
            }
        }

        function stopDrag() {
            isDragging = false;
        }

        infoEl.addEventListener('mousedown', startDrag);
        infoEl.addEventListener('touchstart', startDrag);

        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);

        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
    }
    return infoEl;
}

function updateInfoElement(message) {
    const infoEl = createInfoElement();
    infoEl.textContent = message;
    infoEl.style.display = 'block'; 
}

function startCountdown(duration) {
    const infoEl = createInfoElement();
    const endTime = Date.now() + duration;

    function updateCountdown() {
        const remainingTime = Math.max(0, endTime - Date.now());
        const seconds = Math.ceil(remainingTime / 1000);
        updateInfoElement(`Pause: ${seconds} sec.`);

        if (remainingTime > 0) {
            requestAnimationFrame(updateCountdown);
        } else {
            updateInfoElement('Autoclicker is working');
        }
    }

    updateCountdown();
}

function autoclicker() {
    var telegramImg = document.querySelector("img[data-v-523ba038][src^='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH1AQMAAAA6RJ5s']");
    if (telegramImg) {
        console.log("Telegram QR code detected. Reloading page in 3 seconds.");
        updateInfoElement("Reloading page in 3 seconds...");
        setTimeout(() => {
            location.reload();
        }, 3000);
        return;
    }

    var energyEl = findEnergyElement();
    
    if (!energyEl) {
        console.log("Energy element not found. Retrying in 1 second.");
        updateInfoElement("Searching for energy element...");
        setTimeout(autoclicker, 1000);
        return;
    }

    updateInfoElement("Autoclicker is working");

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
    }

    var energy = parseInt(energyEl.textContent);
    if (energy <= 25) {
        console.log(`Energy too low, pausing for a minute. Pause duration: ${PAUSE_DURATION} milliseconds`);
        startCountdown(PAUSE_DURATION);
        setTimeout(autoclicker, PAUSE_DURATION);
        return;
    }

    setTimeout(autoclicker, getRandomDelay(MIN_DELAY, MAX_DELAY));
}

setTimeout(() => {
    updateInfoElement("Autoclicker is starting...");
    setTimeout(autoclicker, 5000);
}, 0);
