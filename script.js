document.addEventListener("click", toggleselectedClass);

function toggleselectedClass(event) {
  var paragraph = event.target.closest("p");
  if (paragraph) {
    paragraph.classList.toggle("selected");
  }
}

// Главная функция

function formatHTML() {
  splitSessions();
  // throw new Error("Скрипт прерван");
  wrapChapters();
  // cleanText();
  // yourEmotes();
  // colorizePlayers(playerColorMap);
  // addCommaOrDot();
  // addColonToEnd();
  // combineFunctions();
  // chapterCollapse();
  // addIdToChapter();
  // emoteToSpeech();
  // sayToEmote();
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

  // Разбиваем таймштамп на части
  const [, month, day, time] = timestampWithColon.match(/^(\d+)\/(\d+)\s(.+)$/);
  const [hour, minute, secondMillis] = time.split(":");
  const [second, millis = "000"] = secondMillis.split(".");

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

  return isoTimestamp;
}

function importTxt(text) {
  const logLines = text.split("\n");
  const chatlog = document.querySelector("#chatlog");

  for (const line of logLines) {
    if (/\d/.test(line)) {
      const timestampMatch = line.match(/^(\S+\s\S+)/);
      const timestamp = timestampMatch ? timestampMatch[1] : "";
      const loglineBody = line.replace(timestamp, "");

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
  const paragraphs = document.querySelectorAll("p.logline.say");
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
        paragraph.textContent = "ПУСТОЙ АБЗАЦ";
      }

      prevTimestamp = currentTimestamp;
    }
  });
}


// ... (ваш остальной код)



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
    // console.log("div.chapter:", chapterDiv);
  }

  // Встраиваем массив chapters в #chatlog
  chatlog.innerHTML = "";
  chatlog.append(...chapters);
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

  chatlogHTML = chatlogHTML.replace(/[-–—]/g, "–"); // Однотипные дефисы

  chatlogHTML = chatlogHTML.replace(/([а-я]) — ([А-Я])/g, "$1: — $2"); // Двоеточие перед прямой речью

  chatlogHTML = chatlogHTML.replace(/\>\s/g, ">"); // Багфикс пробела в начале контейнера

  // chatlogHTML = chatlogHTML.replace(/\n<\//g, '</'); // Багфикс переноса

  chatlogHTML = chatlogHTML.replace(/<p><\/p>/g, ""); // Пустые абзацы
  chatlogHTML = chatlogHTML.replace(/\|\d\–\d\((.+?)\)/g, "$1"); // Кривые падежи

  chatlogHTML = chatlogHTML.replace(
    /\<p class="logline say"\>(.+)\s*?шепчет:\s*?(.*?)(|\n)\<\/p\>/g,
    '<p class="logline whisper"><span class="player">$1</span> шепчет: <span class="speech">$2</span></p>'
  ); // Шёпот игрока

  chatlogHTML = chatlogHTML.replace(
    /\<p class="logline say"\>Вы\sшепчете\s(.*?)\:\s(.*?)(|\n)\<\/p\>/g,
    '<p class="logline whisper">Вы шепчете <span class="player">$1</span>: <span class="speech">$2</span></p>'
  ); // Ваш шёпот

  chatlogHTML = chatlogHTML.replace(
    /<p class="logline say">(\d+|\>\>|[A-z]|&\?*|ZoneX:|Аукцион|Zone|%s|Игрок|Для|Всем|Текст|Эффект|щит|Телепорт|С|Получен|Характеристики|Маг.уст:|вами.|Spawn|Если|Начислен|Установлен|Удален|Сохранён|Облик|Статы|Существу|Сила:|Ловк:|Инта:|Физ.уст:|На|Рейд|\*|Перезагрузка|Удаляются|Физическая|Похоже,|Результат\:|Подключиться|Повторите|Используйте|Персонаж|Статус|Стандартная|Добро|&\?|Так|Вы|Вам|Вас|Ваша|Ваш|Теперь|Участники|Порог|Бой|Поверженные|Сбежали|Победители|Приглашение|Настройки|Ошибка|Местоположение|Разделение|Начислено|Камень|Результат|Получено|\[СЕРВЕР\]|Разыгрываются|Продление|Сломанные|Способности|Кастомный|Тканевые|Отношение|Смена|Не|Рядом|Объект|ОШИБКА|Задание|Всего|Поздравляем).*?\n<\/p>/gs,
    ""
  ); // Системные сообщения, начинаются с указанных слов

  chatlogHTML = chatlogHTML.replace(
    /<p.*?(GUID|Fly|\d+\–го уровня).*?\n*?<\/p>/g,
    ""
  ); // Системные сообщения, содержат указанные слова в середине

  chatlogHTML = chatlogHTML.replace(/\|H.*?(\[.*?\])\|h\s(.+?):/g, "$1 $2:"); // |Hchannel:PARTY|h[Лидер группы]|h Роуз: => [Лидер группы] Роуз:

  chatlogHTML = chatlogHTML.replace(
    /<p.*?(действие|приглашается|\(|атакует|получает|does not wish|к вам|ставит|добавлено|создает|засыпает|ложится|предлагает|умирает|отклоняет|установлено|получил|устанавливает вам|находится в|производит|ложится|похоже, навеселе|кажется, понемногу трезвеет|желает видеть вас|пытается помешать побегу|уже состоит в группе|проваливает попытку побега|\+ \d = \d|теряет все свои очки здоровья и выбывает из битвы|пропускает ход|выходит|выполняет действие|входит|присоединяется|выбрасывает|,\s\похоже,\s\навеселе|становится|покидает).*(\n|)<\/p>/gm,
    ""
  ); // Игрок %ООС-действие%

  chatlogHTML = chatlogHTML.replace(
    /\[(Рейд|Лидер рейда|Лидер группы|Группа|Гильдия)\]\s(.+?)\:\s(.+)/g,
    "<p class='logline ooc'><span class='ooc'>[ООС]</span> <span class='player'>$2</span> <span class='speech'>$3</span></p>"
  ); //ООС-каналы

  chatlogHTML = chatlogHTML.replace(
    /<p.+>\[Объявление рейду](.+?):(.+?)\n<\/p>/g,
    "<p class='logline announcment'><span class='player'>$1</span><span class='speech'>$2</span></p>"
  ); // Ролевые объявления

  chatlogHTML = chatlogHTML.replace(
    /<p class="logline say">(.+?)\s*?говорит:\s*[ —–-]\s*?(.+?)\n<\/p>/g,
    "<p class='logline say'><span class='player'>$1</span> <span class='speech'>$2</span></p>"
  ); // Речь, дефисы, а также облачает реплику в классы

  chatlogHTML = chatlogHTML.replace(
    /<p class="logline say">(.+?)\sкричит:\s*[ —–-]\s?(.*?)\n<\/p>/g,
    "<p class='logline yell'><span class='player'>$1</span> <span class='speech'>$2</span></p>"
  ); // Крик, дефисы, а также облачает реплику в классы

  chatlogHTML = chatlogHTML.replace(
    /<p class="logline say">((?:(?!говорит:|кричит).)*?)\n<\/p>/g,
    '<p class="logline emote">$1</p>'
  ); // Эмоуты

  chatlogHTML = chatlogHTML.replace(
    /<p class="logline emote">(\W+?)\s(.+?)<\/p>/g,
    '<p class="logline emote"><span class="player">$1</span><span class="emote"> $2</span></p>\n'
  ); // Авторы эмоутов

  chatlogHTML = chatlogHTML.replace(/\s*?,/g, ","); // Удаляем пробелы перед запятыми

  // chatlogHTML = chatlogHTML.replace(/<p.*?(\d+\–го уровня).*<\/p>/g, ""); // Воин 12-го уровня

  chatlogHTML = chatlogHTML.replace(/(\(|\[)Дарн.*?(\)|\])/g, "[дарнасский]"); // Дарнасский

  chatlogHTML = chatlogHTML.replace(/\s*?\|+/g, ""); // Двойные ||


  // Вывод для дебага
  document.getElementById("chatlog").innerHTML = chatlogHTML; // Вывод
  // debugger;
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
    // console.log(i);

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
      // console.log("Первая реплика", previousLogline);
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
      // console.log("Новый игрок");
      previousPlayer = currentPlayer;
      previousSpeech = currentSpeech;
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

    // console.log(i);

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
      // console.log(currentEmote);
    }

    if (!previousEmote) {
      previousEmote = currentEmote;
      previousPlayer = currentPlayer;
      previousLogline = currentLogline;
      //console.log("Первый эмоут", previousLogline);
      continue;
    }

    if (currentPlayer != previousPlayer) {
      previousPlayer = currentPlayer;
      previousEmote = currentEmote;
      previousLogline = currentLogline;
      //console.log("Новый игрок", currentPlayer);
      continue;
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

    chapter.insertBefore(playerList, chapter.firstChild);
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

function yourEmotes() {
  // Находим все элементы с классом "player" и текстом "Вы"
  const playerSpans = document.querySelectorAll(".player");
  playerSpans.forEach((playerSpan) => {
    if (playerSpan.textContent.trim() === "Вы") {
      // Создаем новый элемент span с классом "emote"
      const emoteSpan = document.createElement("span");
      emoteSpan.classList.add("emote");

      // Копируем содержимое из span.player в новый span.emote
      emoteSpan.textContent = playerSpan.textContent;

      // Заменяем span.player на span.emote
      playerSpan.parentNode.replaceChild(emoteSpan, playerSpan);
    }
  });
}

// Кнопки DM и OOC

function toggleVisibility(className) {
  const elements = document.getElementsByClassName(className);
  for (const element of elements) {
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }
  const button = document.querySelector(`button[data-target="${className}"]`);
  if (elements[0].style.display === "none") {
    button.textContent = `Show ${className.toUpperCase()}`;
  } else {
    button.textContent = `Show/hide ${className.toUpperCase()}`;
  }
}

// Функция для форматирования текста даты
function formatDate(dateText) {
  // Разделяем текст даты на число и месяц
  var parts = dateText.split(" ");

  // Получаем числовое значение даты
  var day = parts[2];

  // Получаем месяц и преобразуем его в нужный формат
  var month = getMonthAbbreviation(parts[3]);

  // Собираем идентификатор и добавляем его к классам элемента
  return month + day;
}

// Функция для получения аббревиатуры месяца
function getMonthAbbreviation(month) {
  // Маппинг полных названий месяцев на их аббревиатуры
  var monthMap = {
    января: "january",
    февраля: "february",
    марта: "march",
    апреля: "april",
    мая: "may",
    июня: "june",
    июля: "july",
    августа: "august",
    сентября: "september",
    октября: "october",
    ноября: "november",
    декабря: "december",
  };

  // Возвращаем аббревиатуру месяца или оставляем оригинальный текст, если аббревиатура не найдена
  return monthMap[month.toLowerCase()] || month;
}

// Функция для добавления идентификаторов к элементам с классом "chapter"
function addIdToChapter() {
  // Получаем все элементы с классом "chapter"
  var chapters = document.querySelectorAll(".chapter");

  // Проходимся по каждому элементу и добавляем id
  chapters.forEach(function (chapter) {
    // Получаем текст из элемента h2 с классом "date"
    var dateText = chapter.querySelector(".date").innerText;

    // Преобразуем текст даты в формат "DDMMMM" (например, "13ноября")
    var formattedDate = formatDate(dateText);

    // Собираем идентификатор и добавляем его к классам элемента
    chapter.id = formattedDate;
  });
}

function killNav() {
  var navElements = document.querySelectorAll(".nav");
  navElements.forEach(function (navElement) {
    navElement.parentNode.removeChild(navElement);
  });
}

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
      /([!?:.,])\s((?:–.+?(?:[!?:]|[!?:.,]\s–\s*|<\/span>)))/g,
      '$1 <span class="emote">$2</span>'
    );

    speech[i].innerHTML = updatedText;

    // Выводим обновленную версию текста
    //console.log(`Say ${i + 1} - Updated Emote: ${updatedText}`);

    // Если нужно обновить HTML-элемент, раскомментируйте следующую строку
  }
}

function emoteToSpeech() {
  let emotes = "";
  // Собираем все p.logline.emote
  emotes = document.querySelectorAll("p.logline.emote");

  // Индексируем и обрабатываем каждый p.logline.emote
  for (let i = 0; i < emotes.length; i++) {
    // Получаем текст из HTML-элемента
    let emoteText = emotes[i].innerHTML;
    // console.log("Эмоут", emoteText);

    // Обрабатываем текст с помощью регулярного выражения (здесь просто пример)
    let updatedEmoteText = emoteText.replace(
      /(–\s(?:["«]|)\s*(?:\(.+\)\s|)[А-Я](?:.+?)(?:[,.!?] –|<\/span>))/g, // Баг: Если "- Имя" не в начале эмоута, всё равно подхватывает
      '<span class="speech">$1</span>'
    );

    // Выводим обновленную версию текста
    // console.log(`Emote ${i + 1} - Updated Emote: ${updatedEmoteText}`);

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

function removeEmptyChapters() {
  // Находим все элементы с классом "chapter"
  const chapterElements = document.querySelectorAll(".chapter");

  // Перебираем найденные элементы и удаляем те, у которых нет содержимого внутри элемента с классом "content"
  chapterElements.forEach((chapterElement) => {
    const contentElement = chapterElement.querySelector(".content");

    // Проверяем, если содержимое отсутствует или содержит только пробельные символы
    if (!contentElement || contentElement.innerHTML.trim() === "") {
      // Удаляем элемент
      chapterElement.remove();
    }
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
    // console.log( "Текущее состояние 'collapsed':", chapter.classList.contains("collapsed") );

    // Переключаем класс "collapsed"
    chapter.classList.toggle("collapsed");

    // Выводим в консоль лог состояния "collapsed" после переключения
    // console.log( "Новое состояние 'collapsed':", chapter.classList.contains("collapsed") );
  } else {
    console.error(
      "Не найден элемент с классом 'chapter' в родительской цепочке."
    );
  }
}

function combineFunctions() {
  combineSpeech();
  combineEmotes();
}

document
  .getElementById("keywordsInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      /* console.log("Нажат Enter в поле заполнения"); */
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
    const chapterId = this.id;
    console.log(`Chapter ID: ${chapterId}`);
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
  collapseChapters();
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

    // Удалить класс .expanded и добавить класс .collapsed у всех .chapter
    chapter.classList.remove("expanded");
    chapter.classList.add("collapsed");

    // Проверить, содержит ли .chapter дочерний элемент с классом .logline.selected
    if (chapter.querySelector(".logline.selected")) {
      // Если содержит, добавить класс .expanded
      chapter.classList.remove("collapsed");
      chapter.classList.add("expanded");
    }
  }
}

function scrollToNearestselected() {
  // Находим все элементы с классом .chapter.expanded > logline.selected
  const selectedElements = document.querySelectorAll(
    ".chapter.expanded .logline.selected"
  );

  // Если элементы не найдены, завершаем выполнение функции
  if (selectedElements.length === 0) {
    // console.log("Нет элементов для прокрутки");
    return;
  }

  // Находим текущее положение вертикальной прокрутки страницы
  const currentScrollPosition = window.scrollY || window.pageYOffset;

  // Инициализируем переменные для хранения информации о ближайшем элементе
  let nearestElement = null;
  let minDistance = Infinity;

  // Итерируемся по всем найденным элементам
  selectedElements.forEach((element) => {
    // Вычисляем расстояние от центра экрана до текущего элемента
    const rect = element.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const distance = Math.abs(window.innerHeight / 2 - elementCenter);

    // Если текущий элемент ближе к центру экрана, чем предыдущие, обновляем переменные
    if (distance < minDistance) {
      minDistance = distance;
      nearestElement = element;
    }
  });

  // Если ближайший элемент найден, прокручиваем страницу к нему
  if (nearestElement) {
    const elementRect = nearestElement.getBoundingClientRect();
    const elementCenter = elementRect.top + elementRect.height / 2;
    const scrollToY =
      elementCenter + currentScrollPosition - window.innerHeight / 2;

    window.scrollTo({
      top: scrollToY,
      behavior: "smooth", // Добавляем плавность прокрутки, если поддерживается браузером
    });
  }
}

function removeNonselectedParagraphs() {
  // console.log("removeNonselectedParagraphs");

  // Удаляем все элементы с классом .chapter.collapsed
  const collapsedChapters = document.querySelectorAll(".chapter.collapsed");
  collapsedChapters.forEach((chapter) => {
    chapter.remove();
  });

  // Удаляем абзацы без класса .selected
  const paragraphs = document.querySelectorAll("p:not(.selected)");
  paragraphs.forEach((paragraph) => {
    paragraph.remove();
  });
  removeCollapsed();
}

// Добавьте вызов setupToggleHandlers() в нужном месте, например, в конце вашего скрипта.

function oocToEmote() {
  // console.log("Начало выполнения функции oocToEmote");

  // Находим элементы с классом "logline ooc" в пределах ".chapter.expanded"
  var elements = document.querySelectorAll(".chapter.expanded .logline.ooc");
  // console.log(`Найдено ${elements.length} элементов с классом "logline ooc"`);

  // Проходимся по каждому найденному элементу
  elements.forEach(function (element) {
    // console.log("Обработка нового элемента");

    // Удаляем элемент span с классом "ooc"
    var oocElement = element.querySelector(".ooc");
    oocElement.parentNode.removeChild(oocElement);
    // console.log("Удален элемент span с классом 'ooc'");

    // Заменяем класс "ooc" на "emote" у родительского элемента
    element.classList.remove("ooc");
    element.classList.add("emote");
    // console.log("Класс 'ooc' заменен на 'emote'");

    // Получаем вложенный элемент с классом "speech" и меняем его класс
    var speechElement = element.querySelector(".speech");
    if (speechElement) {
      speechElement.classList.remove("speech");
      speechElement.classList.add("emote");
      // console.log("Класс 'speech' заменен на 'emote' для вложенного элемента");
    }
  });

  combineEmotes();
  emoteToSpeech();
  removeDashAtStart();

  // console.log("Завершение выполнения функции oocToEmote");
}

function removeDashAtStart() {
  // Собираем все p.logline.emote с span.speech
  var emotes = $("p.logline.emote:has(span.speech)");

  // Индексируем и обрабатываем каждый p.logline.emote с span.speech
  for (var i = 0; i < emotes.length; i++) {
    // Получаем текст из HTML-элемента
    var emoteText = emotes[i].innerHTML;

    // Если нужно обновить HTML-элемент, раскомментируйте следующую строку
    emotes[i].innerHTML = updatedEmoteText;
  }
}

// Удаления логлайна по Delete

/* document.addEventListener("keydown", function (event) {
  if (event.key === "Delete" || event.keyCode === 46) {
    console.log("Есть нажатие");

    // Получаем элемент под курсором
    const elementUnderCursor = document.elementFromPoint(
      event.clientX,
      event.clientY
    );
  }
}); */

document.addEventListener("keydown", function (event) {
  if (event.key === "Delete") {
    console.log("Есть нажатие");
    var elementsUnderCursor = document.querySelectorAll(":hover");
    elementsUnderCursor.forEach((element) => {
      if (element.classList.contains("logline")) {
        // Выводим в консоль сообщение о нажатии и удаляем элемент
        console.log("Клавиша Delete нажата. Элемент удален:", element);
        element.remove();
      } else if (element.classList.contains("date")) {
        // Если под курсором <h2 class="date">, удаляем родительский div.chapter
        const chapterDiv = element.closest("div.chapter");
        if (chapterDiv) {
          console.log(
            "Клавиша Delete нажата. Родительский div.chapter удален:",
            chapterDiv
          );
          chapterDiv.remove();
        }
      } else if (element.classList.contains("player")) {
        // Если под курсором <li class="player">, удаляем элемент
        console.log(
          "Клавиша Delete нажата. Элемент <li class='player'> удален:",
          element
        );
        element.remove();
      }
    });
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "[" || event.key === "х") {
    console.log("Есть нажатие на клавишу [");

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
      console.log("Выбран абзац");
      scrollSave(elementUnderCursor);

      let previousSiblings = elementUnderCursor.previousElementSibling;

      while (previousSiblings) {
        const siblingToRemove = previousSiblings;
        previousSiblings = previousSiblings.previousElementSibling;
        siblingToRemove.remove();
      }
    } else if (headingUnderCursor) {
      // Логика для <h2>
      console.log("Выбрана глава");
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
    console.log("Есть нажатие на клавишу ]");

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
      console.log("Выбран абзац");
      scrollSave(elementUnderCursor);

      let nextSiblings = elementUnderCursor.nextElementSibling;

      while (nextSiblings) {
        const siblingToRemove = nextSiblings;
        nextSiblings = nextSiblings.nextElementSibling;
        siblingToRemove.remove();
      }
    } else if (headingUnderCursor) {
      // Логика для <h2>
      console.log("Выбрана глава");
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
        console.log("Элементу присвоен класс selected:", elementUnderCursor);
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
      console.log(
        'Текущий <p class="selected"> под курсором:',
        currentselectedElement
      );
      scrollSave(currentselectedElement);

      // Находим следующий ближайший <p class="selected">
      let nextselectedElement = currentselectedElement.nextElementSibling;

      while (
        nextselectedElement &&
        !nextselectedElement.classList.contains("selected")
      ) {
        nextselectedElement = nextselectedElement.nextElementSibling;
      }

      console.log(
        'Следующий ближайший <p class="selected">:',
        nextselectedElement
      );

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

        console.log(
          'Обычные <p> между текущим и следующим ближайшим <p class="selected">:',
          elementsBetween
        );

        // Присваиваем класс 'selected' элементам, у которых его нет
        elementsBetween.forEach((element) => {
          if (!element.classList.contains("selected")) {
            element.classList.add("selected");
            console.log("Элементу присвоен класс selected:", element);
          }
        });
      } else {
        console.log('Нет следующего ближайшего <p class="selected">');
      }
    } else {
      console.log('Нет текущего <p class="selected"> под курсором');
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
  console.log("selectAll");
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
    console.log('Пустой элемент <p class="important"> удален:', element);
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

console.log("Скрипт загружен");

function removeEmptyLines() {
  // Получаем тело HTML
  var bodyHtml = document.body.innerHTML;

  // Удаляем пустые строки с использованием регулярного выражения
  var cleanedHtml = bodyHtml.replace(/^\s*[\r\n]/gm, "");

  // Устанавливаем очищенное HTML обратно в тело документа
  document.body.innerHTML = cleanedHtml;
}

// Вызываем функцию для удаления пустых строк
