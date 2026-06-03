/**
 * Универсальная функция для смены постеров при клике на эпизоды в iframe.
 * Запоминает выбор для каждой страницы отдельно.
 * 
 * @param {Object} config - Объект настроек.
 * @param {string} config.iframeId - ID iframe, в котором находится плеер.
 * @param {string} config.imgSelector - CSS-селектор картинки, которую нужно менять.
 * @param {Array<Object>} config.ranges - Массив диапазонов эпизодов и соответствующих постеров.
 * @param {number} config.ranges[].start - Номер начального эпизода в диапазоне (включительно).
 * @param {number} config.ranges[].end - Номер конечного эпизода в диапазоне (включительно).
 * @param {string} config.ranges[].imgSrc - Путь к изображению для данного диапазона.
 */
function initPosterImages(config) {
    const iframe = document.getElementById(config.iframeId);
    const targetImg = document.querySelector(config.imgSelector);

    if (!iframe) {
        console.error(`Iframe с ID "${config.iframeId}" не найден.`);
        return;
    }
    if (!targetImg) {
        console.error(`Картинка по селектору "${config.imgSelector}" не найдена.`);
        return;
    }

    // Уникальный ключ для localStorage, чтобы на разных страницах были разные картинки
    // Если URL меняется через параметры (например, ?id=1), заменить pathname на href
    const storageKey = 'selectedImg_' + window.location.pathname;

    function setupClickListeners() {
        // 1. Установка начального изображения при загрузке страницы
        const initialImg = localStorage.getItem(storageKey);
        if (initialImg) {
            targetImg.src = initialImg;
        }

        // 2. Функция для навешивания кликов на диапазон эпизодов
        function setImgForRange(start, end, imgSrc) {
            for (let i = start; i <= end; i++) {
                let targetElement = iframe.contentWindow.document.querySelector(
                    `#player_playlist > pjsdiv > pjsdiv:nth-child(${i})`
                );
                
                if (targetElement) {
                    targetElement.addEventListener('click', function() {
                        // Сравниваем текущий src с тем, что хотим поставить
                        if (targetImg.getAttribute('src') !== imgSrc) {
                            targetImg.src = imgSrc;
                            // Сохраняем выбор в localStorage
                            localStorage.setItem(storageKey, imgSrc);
                        }
                    });
                }
            }
        }

        // 3. Применяем все переданные диапазоны из конфига
        config.ranges.forEach(range => {
            setImgForRange(range.start, range.end, range.imgSrc);
        });
    }

    // Функция ожидания загрузки контента внутри iframe
    function checkAndSetup() {
        try {
            // Проверяем, появился ли первый элемент плейлиста
            const playlistExists = iframe.contentWindow.document.querySelector("#player_playlist > pjsdiv > pjsdiv:nth-child(1)");
            if (playlistExists) {
                setupClickListeners();
            } else {
                setTimeout(checkAndSetup, 100);
            }
        } catch (e) {
            // Если iframe еще не загрузился или возникает ошибка доступа, продолжаем ждать
            setTimeout(checkAndSetup, 100);
        }
    }

    checkAndSetup();
}