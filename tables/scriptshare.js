function combineFunctions() {
    combineSay("emote");
    combineSay("say");
    combineSay("yell");
    combineSay("story");
  }
  
  function combineSay(spanType) {
    // Инициализация переменных
    resetSay();
  
    // Получаем все элементы p.logline внутри div.chapter
    var elements = document.querySelectorAll("div.chapter p.logline");
    var length = elements.length;
  
    // Перебираем все найденные элементы
    for (var i = 0; i < length; i++) {
      var element = elements[i];
  
      // Проверяем, содержит ли текущий элемент класс "emote"
      if (!element.classList.contains(spanType)) {
        // Если нет, сбрасываем значения переменных
        resetSay();
        continue;
      }
      // Если содержит, сохраняем нужные значения
      saveCurrentValues(element, spanType);
      console.log(currentSay);
      if (!currentSay) {
        continue;
      }
      // Проверяем, есть ли предыдущее значение эмоута
      if (!previousSay) {
        updatePreviousValues();
        continue;
      }
  
      // Проверяем, одинаков ли текущий игрок с предыдущим
      if (currentPlayer != previousPlayer) {
        updatePreviousValues();
        continue;
      }
  
      dt = Math.abs(
        new Date(currentTimeStamp).getTime() -
          new Date(previousTimeStamp).getTime()
      );
      // Проверяем условие слияния эмоутов
      if (
        // Между сообщениями должно быть меньше X секунд для слияния
        dt > combineDelay
      ) {
        updatePreviousValues();
        continue;
      }
      // Если условие выполнено, объединяем эмоуты и удаляем предыдущий элемент
      combinedSay = previousSay + " " + currentSay;
      currentSayElement.textContent = combinedSay;
      previousLogline.remove();
      previousLogline = currentLogline;
      previousSay = combinedSay;
      previousPlayer = currentPlayer;
      previousTimeStamp = currentTimeStamp;
      currentSayElement = "";
      currentPlayerElement = "";
      continue;
    }
    function saveCurrentValues(element, spanType) {
      currentLogline = element;
      currentTimeStamp = element.getAttribute("timestamp");
      currentPlayerElement = element.querySelector("span.player");
      currentSayElement = element.querySelector(`span.${spanType}`);
      currentPlayer = currentPlayerElement
        ? currentPlayerElement.textContent
        : "";
      currentSay = currentSayElement ? currentSayElement.textContent : "";
    }
  
    function updatePreviousValues() {
      previousSay = currentSay;
      previousPlayer = currentPlayer;
      previousLogline = currentLogline;
      previousTimeStamp = currentTimeStamp;
    }
  
    function resetSay() {
      currentPlayer = "";
      currentSay = "";
      currentLogline = "";
      currentTimeStamp = "";
      previousPlayer = "";
      previousSay = "";
      previousLogline = "";
      previousTimeStamp = "";
      combinedSay = "";
      currentPlayerElement = "";
      currentSayElement = "";
    }
  }