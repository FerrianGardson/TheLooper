document.addEventListener("click", toggleselectedClass);

function toggleselectedClass(event) {
  var paragraph = event.target.closest("p");
  if (paragraph) {
    paragraph.classList.toggle("selected");
  }
}
// Главная функция

function formatHTML() {
  cleanText();
  splitSessions();
  wrapChapters();
  colorizePlayers(playerColorMap);
  addCommaOrDot();
  addColonToEnd();
  combineFunctions();
  emoteToSpeech();
  sayToEmote();
  virt();
  throw new Error("Скрипт прерван");
}

function correctSpelling() {
  // Находим все элементы <p> с классом "logline"
  var loglineElements = document.querySelectorAll("p.logline");
  // Проходим по каждому элементу
  loglineElements.forEach(function (loglineElement) {
    // Находим все элементы <span> внутри текущего элемента
    var spanElements = loglineElement.querySelectorAll("span");
    // Проходим по каждому элементу <span>
    spanElements.forEach(function (spanElement) {
      // Получаем текстовое содержимое элемента
      var textContent = spanElement.textContent;
      // Вот с помощью этой малышки – Похлопал по оптике
      /* textContent = textContent.replace(
 /([а-я](?:["»]|))\s–\s*([А-Я])/g,
 "$1, — $2"
 ); */
      //textContent = textContent.replace(/кот/g, "кошка");
      // Присваиваем обновленное текстовое содержимое обратно элементу
      spanElement.textContent = textContent;
    });
  });
}
// Загрузка файла
// Получаем элементы DOM
const fileInputTxt = document.getElementById("file-input-txt");
const fileInputHtml = document.getElementById("file-input-html");
const chatlog = document.getElementById("chatlog");
// Добавляем слушатель события на изменение input файла (TXT)
fileInputTxt.addEventListener("change", handleFileInputTxt);
// Добавляем слушатель события на изменение input файла (HTML)
fileInputHtml.addEventListener("change", handleFileInputHtml);
// Функции
async function handleFileInputTxt(event) {
  // Очищаем содержимое div.chatlog перед загрузкой нового файла
  chatlog.innerHTML = "";
  // Получаем файл из события
  const file = event.target.files[0];
  // Проверяем, что файл существует
  if (file) {
    // Читаем содержимое файла как текст
    const text = await file.text();
    // Рендерим чатлог с текстовым содержимым файла
    importTxt(text);
  } else {
    console.error("Файл не найден");
  }
}

function convertTimestamp(timestamp) {
  // Заменяем точку на двоеточие
  const timestampWithColon = timestamp.replace(".", ":");
  console.log("timestampWithColon:", timestampWithColon);

  // Разбиваем таймштамп на части
  const [, month, day, time] = timestampWithColon.match(/^(\d+)\/(\d+)\s(.+)$/);
  console.log("month:", month);
  console.log("day:", day);
  console.log("time:", time);

  const [hour, minute, secondMillis] = time.split(":");
  console.log("hour:", hour);
  console.log("minute:", minute);
  console.log("secondMillis:", secondMillis);

  const [second, millis = "000"] = secondMillis.split(".");
  console.log("second:", second);
  console.log("millis:", millis);

  // Формируем стандартный таймштамп
  const isoTimestamp = new Date(
    new Date().getFullYear(),
    month - 1,
    day,
    hour,
    minute,
    second,
    millis
  ).toISOString();
  console.log("isoTimestamp:", isoTimestamp);

  return isoTimestamp;
}


function importTxt(text) {
  const logLines = text.split("\n");
  const chatlog = document.querySelector("#chatlog");
  for (const line of logLines) {
    if (/\d/.test(line)) {
      const timestampMatch = line.match(/^(\S+\s\S+)/);
      const timestamp = timestampMatch ? timestampMatch[1] : "";
      const loglineBody = line.replace(timestamp, "").trim(); // Добавлен trim()
      if (timestamp) {
        const p = document.createElement("p");
        p.setAttribute("timestamp", convertTimestamp(timestamp));
        p.className = "logline";
        p.textContent = loglineBody;
        chatlog.appendChild(p);
      }
    }
  }
  formatHTML();
}

function splitSessions() {
  const paragraphs = document.querySelectorAll("p.logline");
  let prevTimestamp = null;
  paragraphs.forEach((paragraph) => {
    const timestamp = paragraph.getAttribute("timestamp");
    if (timestamp) {
      const currentTimestamp = new Date(timestamp);
      if (prevTimestamp) {
        const timeDifference = currentTimestamp - prevTimestamp;
        if (timeDifference > 1 * 60 * 60 * 1000) {
          const dateHeader = document.createElement("h2");
          dateHeader.className = "date";
          dateHeader.textContent = getFormattedDate(timestamp);
          paragraph.parentNode.insertBefore(dateHeader, paragraph);
        }
      } else {
        const dateHeader = document.createElement("h2");
        dateHeader.className = "date";
        dateHeader.textContent = getFormattedDate(timestamp);
        paragraph.parentNode.insertBefore(dateHeader, paragraph);
      }
      // Добавляем содержимое пустого абзаца, если таковой имеется
      if (!paragraph.textContent.trim()) {
        paragraph.remove(); // Удаляем пустой абзац
        return; // Прекращаем обработку текущего абзаца
      }
      prevTimestamp = currentTimestamp;
    }
  });
}

function getFormattedDate(timestamp) {
  const date = new Date(timestamp);
  const monthNames = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const formattedDate = `Запись от ${date.getDate()} ${
    monthNames[date.getMonth()]
  }, ${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
  return formattedDate;
}

function padZero(number) {
  return number.toString().padStart(2, "0");
}

function getTimeDifference(timestamp1, timestamp2) {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);
  return Math.abs(date2 - date1);
}

function wrapParagraphsInContentDiv() {
  const paragraphs = document.querySelectorAll("p.logline.say, h2.date");
  let currentContentDiv = null;
  paragraphs.forEach((element) => {
    if (element.tagName.toLowerCase() === "h2") {
      // Если встретили h2.date, закрываем текущий div.content
      if (currentContentDiv) {
        insertContentDiv(currentContentDiv, element);
        currentContentDiv = null;
      }
    } else {
      if (!currentContentDiv) {
        // Создаем новый div.content, если еще не создан
        currentContentDiv = document.createElement("div");
        currentContentDiv.className = "content";
      }
      // Перемещаем элемент внутрь текущего div.content
      currentContentDiv.appendChild(element);
    }
  });
  // Если остался открытый div.content, вставляем его в конец
  if (currentContentDiv) {
    insertContentDiv(currentContentDiv, null);
  }
}

function insertContentDiv(contentDiv, nextElement) {
  const container = nextElement ? nextElement.parentNode : document.body;
  container.insertBefore(contentDiv, nextElement);
}

function wrapChapters() {
  // Получаем элемент с id #chatlog
  const chatlog = document.querySelector("#chatlog");
  // Проверяем, что #chatlog существует
  if (!chatlog) {
    console.error("Элемент #chatlog не найден.");
    return;
  }
  // Находим все элементы h2.date
  const dates = chatlog.querySelectorAll("h2.date");
  // Проверяем, что есть хотя бы один элемент h2.date
  if (!dates.length) {
    console.error("Не найдены элементы h2.date.");
    return;
  }
  // Создаем массив для хранения разделов
  const chapters = [];
  // Итерируемся по всем элементам h2.date
  for (const date of dates) {
    // Получаем следующий элемент (первый сосед)
    let nextElement = date.nextElementSibling;
    // Создаем массив для хранения элементов раздела
    const chapterElements = [date];
    // Запоминаем timestamp первого p в массиве
    let firstPTimestamp = null;
    // Цикл добавления элементов в раздел
    while (nextElement && nextElement.tagName === "P") {
      if (!firstPTimestamp) {
        // Запоминаем timestamp первого p
        firstPTimestamp = nextElement.getAttribute("timestamp");
      }
      chapterElements.push(nextElement);
      nextElement = nextElement.nextElementSibling;
    }
    // Создаем div.chapter и добавляем в него элементы раздела
    const chapterDiv = document.createElement("div");
    chapterDiv.classList.add("chapter");
    chapterDiv.setAttribute("timestamp", firstPTimestamp);
    chapterDiv.classList.add("collapsed");
    chapterDiv.append(...chapterElements);
    // Добавляем div.chapter в массив
    chapters.push(chapterDiv);
    // Выводим в консоль лог div.chapter
  }
  // Встраиваем массив chapters в #chatlog
  chatlog.innerHTML = "";
  chatlog.append(...chapters);
}

function collapseChapters() {
  const chapters = document.querySelectorAll("div.chapter");
  chapters.forEach((chapter) => {
    chapter.classList.add("collapsed");
  });
  scrollToStart();
}

function expandChapters() {
  const chapters = document.querySelectorAll("div.chapter");
  chapters.forEach((chapter) => {
    chapter.classList.remove("collapsed");
  });
}
let isCollapsed = true;

function toggleChapters() {
  if (isCollapsed) {
    expandChapters();
  } else {
    collapseChapters();
  }
  isCollapsed = !isCollapsed;
}
// КОНЕЦ
async function handleFileInputHtml(event) {
  // Очищаем содержимое div.chatlog перед загрузкой нового файла
  chatlog.innerHTML = "";
  // Получаем файл из события
  const file = event.target.files[0];
  // Проверяем, что файл существует
  if (file) {
    // Читаем содержимое файла как текст
    const htmlText = await file.text();
    // Извлекаем #chatlog из HTML и заменяем текущий #chatlog
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(htmlText, "text/html");
    const newChatlog = htmlDocument.getElementById("chatlog");
    if (newChatlog) {
      chatlog.innerHTML = newChatlog.innerHTML;
    } else {
      console.error("#chatlog не найден в загруженном HTML");
    }
  } else {
    console.error("Файл не найден");
  }
}

function renderChatLog(text) {
  // Разбиваем текст на главы (или что-то подобное)
  const chapters = divideChaptersByInterval(text);
  // Создаем элементы для каждой главы и добавляем их в чатлог
  for (const [chapterTitle, chapterLines] of Object.entries(chapters)) {
    const chapter = createChapterElement(chapterTitle, chapterLines);
    chatlog.appendChild(chapter);
  }
  // Дополнительные операции форматирования лога
  formatLog();
}
// Список игроков

function addCommaOrDot() {
  // Находим все элементы с классом "players"
  const playersContainers = document.querySelectorAll(".players");
  // Проходимся по каждому элементу с классом "players"
  playersContainers.forEach((container) => {
    // Находим элементы с классом "player" внутри текущего контейнера
    const players = container.querySelectorAll(".player");
    // Проходимся по каждому элементу
    players.forEach((player, index) => {
      // Добавляем запятую, если это не последний элемент
      if (index < players.length - 1) {
        player.textContent += ",";
      } else {
        // Или добавляем точку, если это последний элемент
        player.textContent += ".";
      }
    });
  });
}
// Двоеточие после ников

function addColonToEnd() {
  // Находим все элементы с классом "logline", исключая "emote" и "whisper"
  const loglines = document.querySelectorAll(
    ".logline:not(.emote):not(.whisper)"
  );
  // Проходимся по каждому элементу с классом "logline"
  loglines.forEach((logline) => {
    // Находим элементы с классом "player" внутри текущего элемента
    const players = logline.querySelectorAll(".player");
    // Проходимся по каждому элементу
    players.forEach((player) => {
      // Добавляем двоеточие в конце текста элемента
      player.textContent += ":";
    });
  });
}
// Чистка от мусора

function cleanText() {
  chatlogHTML = document.getElementById("chatlog").innerHTML; // Определение
  chatlogHTML = chatlogHTML.replace(/кошка/g, "кот"); // Пример
  chatlogHTML = chatlogHTML.replace(/<\/p>/g, "</p>\n"); // Перенос
  chatlogHTML = chatlogHTML.replace(
    /<p.*?>\s*(Вы|Аукцион|Zone|%s|Игрок|Ставка|За|Кожаная|Персонаж|Сохранённый|Для|Всем|Текст|Эффект|щит|Телепорт|С\s|Получен|Характеристики|Маг.уст\:|вами.|Spawn|Если|Начислен|Установлен|Удален|Сохранён|Облик|Статы|Существу|Сила\:|Ловк\:|Инта\:|Физ.уст\:|На|Рейд|\*|Перезагрузка|Удаляются|Физическая|Похоже,|Результат\:|Подключиться|Повторите|Используйте|Персонаж|Статус|Стандартная|Добро|&\?|Так|Вы|Вам|Вас|Ваша|Ваш|Теперь|Участники|Порог|Бой|Поверженные|Сбежали|Победители|Приглашение|Настройки|Ошибка|Местоположение|Разделение|Начислено|Камень|Результат|Получено|\[СЕРВЕР\]|Разыгрываются|Продление|Сломанные|Способности|Кастомный|Тканевые|Отношение|Смена|Не|Рядом|Объект|ОШИБКА|Задание|Всего|Поздравляем).*?<\/p>\n/g,
    ""
  ); // Системные сообщения, начинаются с указанных слов

  chatlogHTML = chatlogHTML.replace(/<p.*?>([A-z]|\>|\&).*?<\/p>\n/g, ""); // Системные сообщения, начинаются со служебных символов

  chatlogHTML = chatlogHTML.replace(
    /<p.*?\s(действие|приглашается|\(|атакует|рассказывает|получает|does not wish|к вам|смотрит на вас|кивает вам|смотрит на вас|ставит|добавлено|создает|засыпает|ложится|предлагает|умирает|отклоняет|установлено|получил|устанавливает вам|находится в|производит|ложится|похоже, навеселе|кажется, понемногу трезвеет|желает видеть вас|пытается помешать побегу|уже состоит в группе|проваливает попытку побега|\+ \d = \d|теряет все свои очки здоровья и выбывает из битвы|пропускает ход|выходит|выполняет действие|входит|присоединяется|выбрасывает|,\s\похоже,\s\навеселе|становится|покидает).*?<\/p>\n/g,
    ""
  ); // Игрок %ООС-действие%
  chatlogHTML = chatlogHTML.replace(/<p.*?(GUID|Fly|\-го уровня).*?<\/p>/g, ""); // Системные сообщения, содержат указанные слова в середине
  chatlogHTML = chatlogHTML.replace(/\|H.*?(\[.*?\])\|h\s(.+?):/g, "$1 $2:"); // |Hchannel:PARTY|h[Лидер группы]|h Роуз: => [Лидер группы] Роуз:

  chatlogHTML = chatlogHTML.replace(
    /<p.*?>\[(Рейд|Лидер рейда|Гильдия)\].*?<\/p>\n/g,
    ""
  ); //ООС-каналы (кроме группы)

  if (!keepOOC) {
    chatlogHTML = chatlogHTML.replace(
      /<p.*?>\[(Лидер группы|Группа)\].*?<\/p>\n/g,
      ""
    ); //ООС-каналы (группа)
  }

  

  chatlogHTML = chatlogHTML.replace(
    /(<p.*?logline)">\[(?:Группа|Лидер группы)\]\s([А-я]+):\s(.*?)<\/p>\n/g,
    '$1 emote virt"><span class="player">$2</span><span class="emote">$3</span></p>/n'
  ); // ООС в Эмоут

  chatlogHTML = chatlogHTML.replace(/<p.*?>[А-я]+ шепчет:.*?<\/p>\n/g, ""); // Шепчет:
  chatlogHTML = chatlogHTML.replace(
    /(<p.*?"logline)">(.*)\sговорит:\s(.*?)<\/p>\n/g,
    '$1 say"><span class="player">$2</span><span class="speech">$3</span></p>\n'
  ); // Говорит:
  chatlogHTML = chatlogHTML.replace(
    /(<p.*?"logline)">(.*)\sкричит:\s(.*?)<\/p>\n/g,
    '$1 yell"><span class="player">$2</span><span class="speech">$3</span></p>\n'
  ); // Кричит:
  chatlogHTML = chatlogHTML.replace(
    /(<p.*?"logline)">([А-я]+)\s(.*?)<\/p>\n/g,
    '$1 emote"><span class="player">$2</span><span class="emote">$3</span></p>\n'
  ); // Эмоут
  chatlogHTML = chatlogHTML.replace(/^\s*[—–-]\s*/g, ""); // Тире в начале
  chatlogHTML = chatlogHTML.replace(/\s[—–-]\s/g, " — "); // Тире в процессе
  chatlogHTML = chatlogHTML.replace(/\|\d+\-\d+\(([А-я]+)\)/g, "$1"); // смотрит на |3-3(Халвиэль)
  chatlogHTML = chatlogHTML.replace(/\|[a-z]+/g, ""); // HEX-код

  // Вывод для дебага
  document.getElementById("chatlog").innerHTML = chatlogHTML; // Вывод
  // debugger;

  document
    .querySelectorAll("#chatlog p:empty")
    .forEach((emptyParagraph) => emptyParagraph.remove()); // Удаление пустых абзацев
}
// Объединение чатбоксов

function combineSpeech() {
  var currentPlayer = "";
  var currentSpeech = "";
  var currentLogline = "";
  var previousPlayer = "";
  var previousSpeech = "";
  var previousLogline = "";
  var combinedSpeech = "";
  var currentPlayerElement = "";
  var currentSpeechElement = "";
  var elements = document.querySelectorAll("div.chapter p.logline");
  var length = elements.length;
  for (var i = 0; i < length; i++) {
    var element = elements[i];
    if (!element.classList.contains("say")) {
      currentPlayer = "";
      currentSpeech = "";
      currentLogline = "";
      previousPlayer = "";
      previousSpeech = "";
      previousLogline = "";
      continue;
    } else {
      currentLogline = element;
      currentPlayerElement = element.querySelector("span.player");
      currentPlayer = currentPlayerElement
        ? currentPlayerElement.textContent
        : "";
      currentSpeechElement = element.querySelector("span.speech");
      currentSpeech = currentSpeechElement
        ? currentSpeechElement.textContent
        : "";
    }
    if (!previousSpeech) {
      previousSpeech = currentSpeech;
      previousPlayer = currentPlayer;
      previousLogline = currentLogline;
      continue;
    }
    if (
      previousPlayer &&
      previousSpeech &&
      currentSpeech &&
      currentPlayer == previousPlayer
    ) {
      combinedSpeech = previousSpeech + " " + currentSpeech;
      currentSpeechElement.textContent = combinedSpeech;
      previousLogline.remove();
      previousLogline = currentLogline;
      previousSpeech = combinedSpeech;
      previousPlayer = currentPlayer;
      currentSpeechElement = "";
      currentPlayerElement = "";
      continue;
    }
    if (currentPlayer != previousPlayer) {
      previousPlayer = currentPlayer;
      previousSpeech = currentSpeech;
      previousLogline = currentLogline;
      continue;
    }
    continue;
  }
}

function combineYell() {
  var currentPlayer = "";
  var currentYell = "";
  var currentLogline = "";
  var previousPlayer = "";
  var previousYell = "";
  var previousLogline = "";
  var combinedYell = "";
  var currentPlayerElement = "";
  var currentYellElement = "";
  var elements = document.querySelectorAll("div.chapter p.logline");
  var length = elements.length;
  for (var i = 0; i < length; i++) {
    var element = elements[i];
    if (!element.classList.contains("yell")) {
      currentPlayer = "";
      currentYell = "";
      currentLogline = "";
      previousPlayer = "";
      previousYell = "";
      previousLogline = "";
      continue;
    } else {
      currentLogline = element;
      currentPlayerElement = element.querySelector("span.player");
      currentPlayer = currentPlayerElement
        ? currentPlayerElement.textContent
        : "";
      currentYellElement = element.querySelector("span.speech");
      currentYell = currentYellElement ? currentYellElement.textContent : "";
    }
    if (!previousYell) {
      previousYell = currentYell;
      previousPlayer = currentPlayer;
      previousLogline = currentLogline;
      continue;
    }
    if (
      previousPlayer &&
      previousYell &&
      currentYell &&
      currentPlayer == previousPlayer
    ) {
      combinedYell = previousYell + " " + currentYell;
      currentYellElement.textContent = combinedYell;
      previousLogline.remove();
      previousLogline = currentLogline;
      previousYell = combinedYell;
      previousPlayer = currentPlayer;
      currentYellElement = "";
      currentPlayerElement = "";
      continue;
    }
    if (currentPlayer != previousPlayer) {
      previousPlayer = currentPlayer;
      previousYell = currentYell;
      previousLogline = currentLogline;
      continue;
    }
    continue;
  }
}

function combineEmotes() {
  var currentPlayer = "";
  var currentEmote = "";
  var currentLogline = "";
  var previousPlayer = "";
  var previousEmote = "";
  var previousLogline = "";
  var combinedEmote = "";
  var currentPlayerElement = "";
  var currentEmoteElement = "";
  var elements = document.querySelectorAll("div.chapter p.logline");
  var length = elements.length;
  for (var i = 0; i < length; i++) {
    var element = elements[i];
    if (!element.classList.contains("emote")) {
      currentEmote = "";
      currentPlayer = "";
      previousPlayer = "";
      previousLogline = "";
      previousEmote = "";
      currentLogline = "";
      continue;
    } else {
      currentLogline = element;
      currentPlayerElement = element.querySelector("span.player");
      currentPlayer = currentPlayerElement
        ? currentPlayerElement.textContent
        : "";
      currentEmoteElement = element.querySelector("span.emote");
      currentEmote = currentEmoteElement ? currentEmoteElement.textContent : "";
    }
    if (!previousEmote) {
      previousEmote = currentEmote;
      previousPlayer = currentPlayer;
      previousLogline = currentLogline;
      //      continue;
    }
    if (currentPlayer != previousPlayer) {
      previousPlayer = currentPlayer;
      previousEmote = currentEmote;
      previousLogline = currentLogline;
      //      continue;
    }
    if (
      previousPlayer &&
      previousEmote &&
      currentEmote &&
      currentPlayer == previousPlayer
    ) {
      combinedEmote = previousEmote + " " + currentEmote;
      currentEmoteElement.textContent = combinedEmote;
      previousLogline.remove();
      previousLogline = currentLogline;
      previousEmote = combinedEmote;
      previousPlayer = currentPlayer;
      currentEmoteElement = "";
      currentPlayerElement = "";
      continue;
    }
    continue;
  }
}
// Список игроков

function colorizePlayers(playerColorMap) {
  const playerColors = {};
  const chapters = document.querySelectorAll(".chapter");
  chapters.forEach((chapter) => {
    const playerSpans = chapter.querySelectorAll(".logline.say .player");
    playerSpans.forEach((span, index) => {
      const playerName = span.textContent.trim();
      let colorClass;
      if (playerColorMap[playerName]) {
        colorClass = playerColorMap[playerName];
      } else {
        colorClass =
          playerColors[playerName] ||
          (playerColors[playerName] = getColorClass(index));
      }
      span.classList.remove(
        "red",
        "green",
        "blue-1",
        "blue-2",
        "blue-3",
        "yellow",
        "orange",
        "purple-1",
        "purple-2",
        "purple-3"
      );
      span.classList.add(colorClass);
    });
    const uniquePlayers = new Set(
      Array.from(playerSpans).map((span) => span.textContent.trim())
    );
    const playerList = document.createElement("ul");
    playerList.classList.add("players");
    Array.from(uniquePlayers).forEach((uniquePlayerName, index) => {
      const playerItem = document.createElement("li");
      playerItem.textContent = uniquePlayerName;
      playerItem.className = "player";
      const colorClass =
        playerColorMap[uniquePlayerName] ||
        playerColors[uniquePlayerName] ||
        getColorClass(index);
      playerItem.classList.remove(
        "red",
        "green",
        "blue-1",
        "blue-2",
        "blue-3",
        "yellow",
        "orange",
        "purple-1",
        "purple-2",
        "purple-3"
      );
      playerItem.classList.add(colorClass);
      playerList.appendChild(playerItem);
    });
    chapter.insertBefore(playerList, chapter.firstChild.nextSibling);
  });
  function getColorClass(index) {
    const colors = [
      "red",
      "green",
      "blue-1",
      "blue-2",
      "blue-3",
      "yellow",
      "orange",
      "purple-1",
      "purple-2",
      "purple-3",
    ];
    return colors[index % colors.length];
  }
}
// Пример использования функции с картой цветов
const playerColorMap = {
  Фэрриан: "blue-3",
  Роуз: "orange",
  Ананита: "green",
  Жуль: "red",
  Хейвинд: "red",
  Фуффис: "green",
  Киббл: "green",
  Лезинг: "orange",
  Сырорезка: "yellow",
  Санриэль: "yellow",
};

function sayToEmote() {
  let speech = "";
  // Собираем все p.logline.say
  speech = document.querySelectorAll("p.say");
  // Индексируем и обрабатываем каждый p.logline.say
  for (let i = 0; i < speech.length; i++) {
    // Получаем текст из HTML-элемента
    let sayText = speech[i].innerHTML;
    // Обрабатываем текст с помощью регулярного выражения
    let updatedText = sayText.replace(
      /([!?:.,])\s((?:—.+?(?:[!?:]|[!?:.,]\s—\s*|<\/span>)))/g,
      '$1 <span class="emote">$2</span>'
    );
    speech[i].innerHTML = updatedText;
    // Выводим обновленную версию текста
    //    // Если нужно обновить HTML-элемент, раскомментируйте следующую строку
  }
}

function emoteToSpeech() {
  // Получаем все элементы p.logline.emote
  let emotes = document.querySelectorAll("p.logline.emote");

  // Индексируем и обрабатываем каждый элемент p.logline.emote
  for (let i = 0; i < emotes.length; i++) {
    // Получаем текст из HTML-элемента
    let emoteText = emotes[i].innerHTML;

    // Обрабатываем текст с использованием регулярного выражения (пример)
    let updatedEmoteText = emoteText.replace(
      /(—\s(?:["«]|)\s*(?:\(.+\)\s|)[А-Я](?:.+?)(?:[,.!?] —|<\/span>))/g,
      '<span class="speech">$1</span>'
    );

    // Если нужно обновить HTML-элемент, раскомментируйте следующую строку
    emotes[i].innerHTML = updatedEmoteText;
  }

  // Находим все span.speech > span.emote
  var speechEmoteElements = document.querySelectorAll(
    "span.speech > span.emote"
  );

  // Заменяем символ "–" на "—"
  speechEmoteElements.forEach(function (element) {
    element.innerText = element.innerText.replace(/–/g, "—");
  });

  // Находим все span.emote > span.speech
  var emoteSpeechElements = document.querySelectorAll(
    "span.emote > span.speech"
  );

  // Заменяем символ "–" на "—"
  emoteSpeechElements.forEach(function (element) {
    element.innerText = element.innerText.replace(/–/g, "—");
  });
}

// Добавляем обработчик событий для всего #chatlog
chatlog.addEventListener("click", function (event) {
  // Проверяем, был ли клик на элементе с классом "date"
  if (event.target.classList.contains("date")) {
    toggleCollapse(event);
  }
});

function toggleCollapse(event) {
  // Получаем родителя (предполагаем, что он имеет класс "chapter")
  const chapter = event.target.closest(".chapter");
  if (chapter) {
    // Выводим в консоль лог текущего состояния "collapsed" до переключения
    // Переключаем класс "collapsed"
    chapter.classList.toggle("collapsed");
    // Выводим в консоль лог состояния "collapsed" после переключения
  } else {
    console.error(
      "Не найден элемент с классом 'chapter' в родительской цепочке."
    );
  }
}

function combineFunctions() {
  combineSpeech();
  combineEmotes();
  combineYell();
}
document
  .getElementById("keywordsInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      Filter();
    }
  });

function Filter() {
  // Получаем ключевые слова из поля ввода с учетом слов внутри кавычек
  let keywordsInput = document.getElementById("keywordsInput").value;
  // Используем регулярное выражение для поиска слов внутри кавычек с игнорированием регистра
  let regex = /«([^»]+?)»|([^,]+?)(?:,\s*|$)/gi;
  // Массив для хранения найденных ключевых слов
  let keywords = [];
  let match;
  while ((match = regex.exec(keywordsInput)) !== null) {
    // Выбираем найденное слово из подмассива, учитывая кавычки, и удаляем двойные пробелы
    let keyword = (match[1] || match[2]).replace(/\s+/g, " ");
    if (keyword) {
      keywords.push(keyword.trim().toLowerCase());
    }
  }
  // Выбираем все элементы div.chapter
  $("div.chapter").each(function () {
    const timestamp = $(this).attr("timestamp"); // Получаем значение атрибута timestamp
    scrollSave(this);
    // Для каждого параграфа внутри div.chapter
    $(this)
      .find("p")
      .each(function () {
        const text = $(this).text().toLowerCase().replace(/\s+/g, " ");
        const hasKeyword = keywords.some((keyword) => text.includes(keyword));
        const splitKeywords = keywords.map((keyword) => keyword.split("-"));
        const isRemoveKeyword = splitKeywords.some(
          (pair) => pair.length === 2 && text.includes(pair[1].trim())
        );
        if (hasKeyword && !isRemoveKeyword) {
          $(this).addClass("selected");
        } else if (isRemoveKeyword) {
          $(this).removeClass("selected");
        }
      });
    openselectedChapters();
    trimChapter($(this));
    scrollToSaved();
  });
  removeCollapsed();
}

function trimChapter(chapterElement) {
  const paragraphs = chapterElement.find("p"); // Получаем все параграфы внутри div.chapter
  const selectedParagraphs = paragraphs.filter(".selected"); // Выбираем только те, у которых есть класс selected
  if (selectedParagraphs.length > 0) {
    const firstSelectedIndex = paragraphs.index(selectedParagraphs.first());
    const lastSelectedIndex = paragraphs.index(selectedParagraphs.last());
    // Удаляем все параграфы перед первым выбранным
    paragraphs.slice(0, firstSelectedIndex).remove();
    // Удаляем все параграфы после последнего выбранного
    paragraphs.slice(lastSelectedIndex + 1).remove();
  }
}

function openselectedChapters() {
  // Найти все элементы с классом .chapter
  var chapters = document.querySelectorAll(".chapter");
  // Пройти по каждому .chapter с использованием цикла for и i
  for (var i = 0; i < chapters.length; i++) {
    var chapter = chapters[i];
    chapter.classList.add("collapsed");
    // Проверить, содержит ли .chapter дочерний элемент с классом .logline.selected
    if (chapter.querySelector(".logline.selected")) {
      // Если содержит, добавить класс .expanded
      chapter.classList.remove("collapsed");
    }
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Delete") {
    var elementsUnderCursor = document.querySelectorAll(":hover");
    elementsUnderCursor.forEach((element) => {
      if (element.classList.contains("logline")) {
        // Выводим в консоль сообщение о нажатии и удаляем элемент
        element.remove();
      } else if (element.classList.contains("date")) {
        // Если под курсором <h2 class="date">, удаляем родительский div.chapter
        const chapterDiv = element.closest("div.chapter");
        if (chapterDiv) {
          chapterDiv.remove();
        }
      } else if (element.classList.contains("player")) {
        // Если под курсором <li class="player">, удаляем элемент
        element.remove();
      }
    });
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "[" || event.key === "х") {
    // Находим все элементы под курсором
    var elementsUnderCursor = document.querySelectorAll(":hover");
    // Ищем первый элемент <p> среди элементов под курсором
    const elementUnderCursor = Array.from(elementsUnderCursor).find(
      (element) => element.tagName.toLowerCase() === "p"
    );
    // Ищем первый элемент <h2> среди элементов под курсором
    const headingUnderCursor = Array.from(elementsUnderCursor).find(
      (element) => element.tagName.toLowerCase() === "h2"
    );
    if (elementUnderCursor) {
      // Логика для <p>
      scrollSave(elementUnderCursor);
      let previousSiblings = elementUnderCursor.previousElementSibling;
      while (previousSiblings) {
        const siblingToRemove = previousSiblings;
        previousSiblings = previousSiblings.previousElementSibling;
        siblingToRemove.remove();
      }
    } else if (headingUnderCursor) {
      // Логика для <h2>
      scrollSave(headingUnderCursor);
      let previousSiblings =
        headingUnderCursor.parentNode.previousElementSibling;
      while (previousSiblings) {
        const siblingToRemove = previousSiblings;
        previousSiblings = previousSiblings.previousElementSibling;
        siblingToRemove.remove();
      }
    }
    scrollToSaved();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "]" || event.key === "ъ") {
    // Находим все элементы под курсором
    var elementsUnderCursor = document.querySelectorAll(":hover");
    // Ищем первый элемент <p> среди элементов под курсором
    const elementUnderCursor = Array.from(elementsUnderCursor).find(
      (element) => element.tagName.toLowerCase() === "p"
    );
    // Ищем первый элемент <h2> среди элементов под курсором
    const headingUnderCursor = Array.from(elementsUnderCursor).find(
      (element) => element.tagName.toLowerCase() === "h2"
    );
    if (elementUnderCursor) {
      // Логика для <p>
      scrollSave(elementUnderCursor);
      let nextSiblings = elementUnderCursor.nextElementSibling;
      while (nextSiblings) {
        const siblingToRemove = nextSiblings;
        nextSiblings = nextSiblings.nextElementSibling;
        siblingToRemove.remove();
      }
    } else if (headingUnderCursor) {
      // Логика для <h2>
      scrollSave(headingUnderCursor);
      let nextSiblings = headingUnderCursor.parentNode.nextElementSibling;
      while (nextSiblings) {
        const siblingToRemove = nextSiblings;
        nextSiblings = nextSiblings.nextElementSibling;
        siblingToRemove.remove();
      }
    }
    scrollToSaved();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.shiftKey) {
    // Находим все элементы под курсором
    var elementsUnderCursor = document.querySelectorAll(":hover");
    // Ищем первый элемент <p> среди элементов под курсором
    const elementUnderCursor = Array.from(elementsUnderCursor).find(
      (element) => element.tagName.toLowerCase() === "p"
    );
    // Проверяем, найден ли элемент <p> и присваиваем ему класс 'selected'
    if (elementUnderCursor) {
      // Проверяем, не имеет ли элемент уже класс 'selected'
      if (!elementUnderCursor.classList.contains("selected")) {
        elementUnderCursor.classList.add("selected");
      }
    }
  }
});
document.addEventListener("keydown", function (event) {
  if (event.altKey) {
    // Находим все элементы под курсором
    var elementsUnderCursor = document.querySelectorAll(":hover");
    document.querySelectorAll("p:empty").forEach((element) => element.remove());
    // Ищем первый элемент <p class="selected"> среди элементов под курсором
    const currentselectedElement = Array.from(elementsUnderCursor).find(
      (element) =>
        element.tagName.toLowerCase() === "p" &&
        element.classList.contains("selected")
    );
    if (currentselectedElement) {
      scrollSave(currentselectedElement);
      // Находим следующий ближайший <p class="selected">
      let nextselectedElement = currentselectedElement.nextElementSibling;
      while (
        nextselectedElement &&
        !nextselectedElement.classList.contains("selected")
      ) {
        nextselectedElement = nextselectedElement.nextElementSibling;
      }
      // Если найден следующий важный элемент
      if (nextselectedElement) {
        // Получаем все обычные <p> между текущим и следующим ближайшим <p class="selected">
        const elementsBetween = [];
        let currentElement = currentselectedElement.nextElementSibling;
        while (
          currentElement &&
          currentElement !== nextselectedElement &&
          currentElement.tagName.toLowerCase() === "p"
        ) {
          elementsBetween.push(currentElement);
          currentElement = currentElement.nextElementSibling;
        }
        // Присваиваем класс 'selected' элементам, у которых его нет
        elementsBetween.forEach((element) => {
          if (!element.classList.contains("selected")) {
            element.classList.add("selected");
          }
        });
      } else {
      }
    } else {
    }
    scrollToSaved();
  }
});

function scrollSave(element) {
  if (element && element.classList) {
    element.classList.add("scroll");
  }
}

function scrollToSaved() {
  document.querySelector(".scroll").scrollIntoView();
  window.scrollBy(
    0,
    -(document.querySelector(".nav")?.getBoundingClientRect()?.height || 0) - 32
  );
  document
    .querySelectorAll(".scroll")
    .forEach((element) => element.classList.remove("scroll"));
}

function scrollToStart() {
  window.scrollTo({
    top: 0,
  });
}

function exportHTML() {
  removeEmptyLines();
  isAllSellected = false;
  selectAll();
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," +
      encodeURIComponent(document.querySelector("html").innerHTML)
  );
  element.setAttribute("download", "exported.html");
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
var isAllSellected = false; // Переменная для отслеживания состояния

function selectAll() {
  // Находим все элементы <p> с классом logline
  var loglineElements = document.querySelectorAll("p.logline");
  // Переключаем состояние и присваиваем/удаляем класс select
  if (isAllSellected) {
    loglineElements.forEach(function (element) {
      element.classList.remove("selected");
    });
  } else {
    loglineElements.forEach(function (element) {
      element.classList.add("selected");
    });
  }
  // Инвертируем состояние
  isAllSellected = !isAllSellected;
}

function debug() {
  // Находим все пустые <p class="important">
  const emptyImportantParagraphs =
    document.querySelectorAll("p.important:empty");
  // Удаляем каждый найденный пустой элемент
  emptyImportantParagraphs.forEach((element) => {
    element.remove();
  });
  removeEmptyLines();
}

function removeCollapsed() {
  var collapsedDivs = document.querySelectorAll("div.collapsed");
  collapsedDivs.forEach(function (div) {
    div.remove();
  });
}

function removePlayers() {
  var playersList = document.querySelectorAll("ul.players");
  playersList.forEach(function (player) {
    player.remove();
  });
}

function chapterReverse() {
  // 2. Отсортировать в обратном порядке детей #chatlog
  var chatlog = document.getElementById("chatlog");
  var messages = Array.from(chatlog.children);
  // Сортировка в обратном порядке
  messages.reverse();
  // Удаление детей #chatlog
  while (chatlog.firstChild) {
    chatlog.removeChild(chatlog.firstChild);
  }
  // Вставка отсортированных сообщений
  messages.forEach(function (message) {
    chatlog.appendChild(message);
  });
}

function removeEmptyLines() {
  // Получаем тело HTML
  var bodyHtml = document.body.innerHTML;
  // Удаляем пустые строки с использованием регулярного выражения
  var cleanedHtml = bodyHtml.replace(/^\s*[\r\n]/gm, "");
  // Устанавливаем очищенное HTML обратно в тело документа
  document.body.innerHTML = cleanedHtml;
}
// Вызываем функцию для удаления пустых строк

let keepOOC = true;
let keepWhisper = false;

const keepOOCCheckbox = document.getElementById("keepOOCCheckbox");

// Обработчик изменения состояния чекбокса
keepOOCCheckbox.addEventListener("change", function () {
  // Обновляем значение переменной keepOOC в соответствии с состоянием чекбокса
  keepOOC = this.checked;
});

function virt() {
  // Получаем все элементы p.logline с классом virt
  const virtLoglines = document.querySelectorAll("p.logline.virt");

  // Итерируем по каждому элементу
  virtLoglines.forEach((logline) => {
    // Находим внутри элемента span.player и удаляем его
    const playerSpan = logline.querySelector("span.player");
    if (playerSpan) {
      playerSpan.remove();
    }
  });
}
