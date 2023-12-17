const enterKeyCode = 13;

function toggleImportantClass(event) {
  var paragraph = event.target.closest("p");
  if (paragraph) {
    paragraph.classList.toggle("important");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");

  document.addEventListener("click", toggleImportantClass);
  const dates = document.querySelectorAll(".date");
  dates.forEach((date) => {
    date.addEventListener("click", toggleContent);
  });
});

function chapterCollapse() {
  // Сворачиваем главы
  /* console.log("Начало функции chapterCollapse"); */

  const chapterElements = document.querySelectorAll(".chapter");

  // Удаляем классы expanded и collapsed у всех элементов
  chapterElements.forEach((chapterElement) => {
    chapterElement.classList.remove("expanded", "collapsed");
  });

  if (chapterElements.length === 1) {
    /* console.log("Есть только одна глава, разворачиваем"); */
    chapterElements[0].classList.add("expanded");
  } else {
    /* console.log("Больше одной главы, сворачиваем все кроме первой"); */
    chapterElements.forEach((chapterElement, index) => {
      if (index !== 0) {
        chapterElement.classList.add("collapsed");
      }
    });
  }

  /* console.log("А первой добавляется expanded"); */
  chapterElements[0].classList.add("expanded");
  const dates = document.querySelectorAll(".date");
  dates.forEach((date) => {
    date.addEventListener("click", toggleContent);
  });

  /* console.log("Функция chapterCollapse успешно выполнена"); */
}

// Главная функция

function formatLog() {
  let chatlogHTML = document.getElementById("chatlog").innerHTML;
  // console.log("Запускаю допфункции");
  formatTimestamps();
  transferNightLines(document.body);
  cleanText();
  yourEmotes();
/*   playersList(); */
  colorizePlayers(playerColorMap);
  addCommaOrDot();
  addColonToEnd();
  combineFunctions();
  chapterCollapse();
  addIdToChapter();
  //correctSpelling();
  emoteToSpeech();
  sayToEmote();
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
    renderChatLog(text);
  } else {
    console.error("Файл не найден");
  }
}

function debug() {
  chatlog.classList.toggle("debug");
  removeConsecutiveTimes();
}

function removeConsecutiveTimes() {
  // Получаем все элементы с классом "chapter"
  var chapters = document.querySelectorAll(".chapter");

  // Проходимся по каждому элементу
  chapters.forEach(function (chapter) {
    // Получаем все элементы .time внутри текущего элемента .chapter
    var times = chapter.querySelectorAll(".time");

    // Переменная для хранения индекса последнего элемента .time
    var lastIndex = -1;

    // Проходимся по каждому элементу .time
    times.forEach(function (time, index) {
      // Проверяем, идет ли текущий .time после предыдущего
      if (index === lastIndex + 1) {
        // Удаляем предыдущий .time
        times[lastIndex].remove();
      }

      // Обновляем индекс последнего .time
      lastIndex = index;
    });
  });

  // Теперь обрабатываем случай, когда .time находится внутри .night-transfered
  var nightTransferedTimes = document.querySelectorAll(
    ".night-transfered .time"
  );

  // Переменная для хранения индекса последнего элемента .time внутри .night-transfered
  var lastNightTransferedIndex = -1;

  // Проходимся по каждому элементу .time внутри .night-transfered
  nightTransferedTimes.forEach(function (time, index) {
    // Проверяем, идет ли текущий .time после предыдущего внутри .night-transfered
    if (index === lastNightTransferedIndex + 1) {
      // Удаляем предыдущий .time
      nightTransferedTimes[lastNightTransferedIndex].remove();
    }

    // Обновляем индекс последнего .time внутри .night-transfered
    lastNightTransferedIndex = index;
  });
}

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
      // Можно также скопировать дополнительные атрибуты, например, классы или стили,
      // если они необходимы для правильного отображения
      chapterCollapse();
    } else {
      console.error("#chatlog не найден в загруженном HTML");
    }
  } else {
    console.error("Файл не найден");
  }
}

function renderChatLog(text) {
  // Разбиваем текст на главы (или что-то подобное)
  const chapters = divideChapters(text);

  // Создаем элементы для каждой главы и добавляем их в чатлог
  for (const [chapterTitle, chapterLines] of Object.entries(chapters)) {
    const chapter = createChapterElement(chapterTitle, chapterLines);
    chatlog.appendChild(chapter);
  }

  // Дополнительные операции форматирования лога
  formatLog();
}

// Создание глав

function createChapterElement(chapterTitle, chapterLines) {
  const chapter = document.createElement("div");
  chapter.classList.add("chapter", "expanded");

  const chapterHeader = document.createElement("h2");
  chapterHeader.classList.add("date");
  chapterHeader.textContent = chapterTitle;
  chapter.appendChild(chapterHeader);

  const chapterContent = document.createElement("div");
  chapterContent.classList.add("content");

  let nightLines = []; // Массив для хранения строк с таймштампами между 0:00 и 6:00
  let isNight = false;

  // ...

  chapterLines.forEach((line) => {
    const match = line.match(/^(\d+?)\/(\d+?)\s(\d+:\d+:\d+\.\d+?)\s/);
    if (match) {
      const month = parseInt(match[1]);
      const day = parseInt(match[2]);
      const time = match[3];
      let date = new Date();
      date.setUTCMonth(month - 1);
      date.setUTCDate(day);

      // Получаем часы из строки времени
      const hours = parseInt(time.split(":")[0]);

      if (hours < 6) {
        isNight = true;
      } else {
        isNight = false;
      }

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
      const monthName = monthNames[date.getUTCMonth()];
      const chapterTitle = `Запись от ${date.getUTCDate()} ${monthName}`;

      if (isNight) {
        nightLines.push(line);
      } else {
        chapterContent.appendChild(createParagraph(line));
      }
    } else if (isNight) {
      nightLines.push(line);
    } else {
      chapterContent.appendChild(createParagraph(line));
    }
  });

  // ...

  // Если есть строки с таймштампами между 0:00 и 6:00, добавляем их в контейнер .night
  if (nightLines.length > 0) {
    const nightContainer = document.createElement("div");
    nightContainer.classList.add("night");
    nightContainer.innerHTML = nightLines.join("");
    chapterContent.appendChild(nightContainer);
    // console.log("Night lines added to nightContainer:", nightLines); // Лог для отслеживания добавления строк в nightContainer
  }

  chapter.appendChild(chapterContent);

  return chapter;
}

// Вспомогательная функция для создания абзаца
function createParagraph(text) {
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  return paragraph;
}

// ФУНКЦИИ

// Разделение на главы

function divideChapters(text) {
  /* console.log("Разделение на главы");
   */ const logLines = text.trim().split("\n");
  const chapters = {};

  logLines.forEach((line) => {
    const match = line.match(/^(\d+?)\/(\d+?)\s/);
    if (match) {
      const month = parseInt(match[1]);
      const day = parseInt(match[2]);
      let date = new Date();
      date.setUTCMonth(month - 1);
      date.setUTCDate(day);

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
      const monthName = monthNames[date.getUTCMonth()];
      const chapterTitle = `Запись от ${date.getUTCDate()} ${monthName}`;

      if (!chapters[chapterTitle]) {
        chapters[chapterTitle] = [];
      }
      chapters[chapterTitle].push(line);
    }
  });

  // Изменили строку ниже: меняем порядок глав в объекте chapters
  const reversedChapters = Object.fromEntries(
    Object.entries(chapters).reverse()
  );

  return reversedChapters;
}

// Новая функция для перемещения .night из более свежей главы в более старую
function moveNightContent() {
  const chapters = document.querySelectorAll(".chapter");
  let fresherChapter = null;
  let olderChapter = null;

  chapters.forEach((chapter) => {
    const chapterTitleElement = chapter.querySelector(".date");
    if (chapterTitleElement) {
      const chapterTitle = chapterTitleElement.textContent;
      const match = chapterTitle.match(/(\d+?) ([а-я]+?)$/i);

      if (match) {
        const day = parseInt(match[1]);
        const month = getMonthIndex(match[2]);
        const chapterDate = new Date(0, month, day);

        if (!fresherChapter || chapterDate > fresherChapter.date) {
          olderChapter = fresherChapter;
          fresherChapter = { chapter, date: chapterDate };
        } else if (!olderChapter || chapterDate > olderChapter.date) {
          olderChapter = { chapter, date: chapterDate };
        }
      }
    }
  });

  if (fresherChapter && olderChapter) {
    const nightContainer = fresherChapter.chapter.querySelector(".night");
    if (nightContainer) {
      olderChapter.chapter
        .querySelector(".content")
        .appendChild(createParagraph(nightContainer.innerHTML));
    }
    fresherChapter.chapter.remove();
  }
}

// Вспомогательная функция для получения индекса месяца
function getMonthIndex(monthName) {
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
  return monthNames.indexOf(monthName.toLowerCase());
}

// Удаление таймштампов

function formatTimestamps() {
  /* console.log("Удаление таймштампов"); */
  const chatlog = document.getElementById("chatlog");
  const chatlogHTML = chatlog.innerHTML;
  const cleanedHTML = chatlogHTML.replace(
    /(\d{1,2}\/\d{1,2}\s\d{1,2}:\d{1,2}:\d{1,2}\.\d{1,3}\s+?)/g,
    '<p class="logline say">'
    /* <p class="time">$1</p> */
  );
  chatlog.innerHTML = cleanedHTML;
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
  //console.log("Чистка от мусора");

  let chatlogHTML = document.getElementById("chatlog").innerHTML; // Определение

  chatlogHTML = chatlogHTML.replace(/кошка/g, "кот"); // Пример

  chatlogHTML = chatlogHTML.replace(/\<p.*\>\s*\<\/p\>/g, ""); // Пустые абзацы

  chatlogHTML = chatlogHTML.replace(/[-–—]/g, "–"); // Однотипные дефисы

  chatlogHTML = chatlogHTML.replace(/\>\s/g, ">"); // Багфикс пробела в начале контейнера

  // chatlogHTML = chatlogHTML.replace(/\n<\//g, '</'); // Багфикс переноса

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
    /<p class="logline say">(\d+|\>\>|[A-z]|Zone|Используйте|Добро|&\?|Так|Вы|Вам|Вас|Ваша|Ваш|Теперь|Участники|Порог|Бой|Поверженные|Сбежали|Победители|Приглашение|Настройки|Ошибка|Местоположение|Разделение|Начислено|Камень|Результат|Получено|\[СЕРВЕР\]|Разыгрываются|Продление|Сломанные|Способности|Кастомный|Тканевые|щит|Отношение|Смена|Не|Рядом|Объект|ОШИБКА|Задание|Всего|Поздравляем).*?\n<\/p>/gs,
    ""
  ); // Системные сообщения, начинаются с указанных слов

  chatlogHTML = chatlogHTML.replace(
    /<p.*?(GUID|Fly|\d+\–го уровня).*?\n*?<\/p>/g,
    ""
  ); // Системные сообщения, содержат указанные слова в середине

  //chatlogHTML = chatlogHTML.replace(/<p.*?>[a-zA-Z].*?\n*?<\/p>/g, ""); // Начинаются с английского

  chatlogHTML = chatlogHTML.replace(/\|H.*?(\[.*?\])\|h\s(.+?):/g, "$1 $2:"); // |Hchannel:PARTY|h[Лидер группы]|h Роуз: => [Лидер группы] Роуз:

  chatlogHTML = chatlogHTML.replace(
    /<p.*?>(.+?)\s(действие|приглашается|создает|устанавливает вам|находится в|производит|ложится|похоже, навеселе|.*пивко неплохо дает в голову|кажется, понемногу трезвеет|желает видеть вас|пытается помешать побегу|уже состоит в группе|проваливает попытку побега|\+ \d = \d|теряет все свои очки здоровья и выбывает из битвы|пропускает ход|выходит|выполняет действие|входит|присоединяется|выбрасывает|,\s\похоже,\s\навеселе|становится|покидает|предлагает вам).*(\n|)<\/p>/gm,
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
    /<p class="logline say">(.+?) кричит:\s*?[—–-]?\s*?(.*?)\n<\/p>/g,
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

  chatlogHTML = chatlogHTML.replace(/\s*?\|+/g, ""); // Пример

  // Вывод для дебага
  document.getElementById("chatlog").innerHTML = chatlogHTML; // Вывод
  //debugger;
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
    const playerSpans = chapter.querySelectorAll(".player");

    playerSpans.forEach((span, index) => {
      const playerName = span.textContent.trim();
      let colorClass;

      if (playerColorMap[playerName]) {
        colorClass = playerColorMap[playerName];
      } else {
        colorClass = playerColors[playerName] || (playerColors[playerName] = getColorClass(index));
      }

      span.classList.remove("red", "green", "blue-1", "blue-2", "blue-3", "yellow", "orange", "purple-1", "purple-2", "purple-3");
      span.classList.add(colorClass);
    });

    const uniquePlayers = new Set(Array.from(playerSpans).map(span => span.textContent.trim()));

    const playerList = document.createElement("ul");
    playerList.classList.add("players");

    Array.from(uniquePlayers).forEach((uniquePlayerName, index) => {
      const playerItem = document.createElement("li");
      playerItem.textContent = uniquePlayerName;
      playerItem.className = "player";

      const colorClass = playerColorMap[uniquePlayerName] || playerColors[uniquePlayerName] || getColorClass(index);

      playerItem.classList.remove("red", "green", "blue-1", "blue-2", "blue-3", "yellow", "orange", "purple-1", "purple-2", "purple-3");
      playerItem.classList.add(colorClass);

      playerList.appendChild(playerItem);
    });

    chapter.insertBefore(playerList, chapter.firstChild);
  });

  function getColorClass(index) {
    const colors = ["red", "green", "blue-1", "blue-2", "blue-3", "yellow", "orange", "purple-1", "purple-2", "purple-3"];
    return colors[index % colors.length];
  }
}

// Пример использования функции с картой цветов
const playerColorMap = {
  "Фэрриан": "blue-3",
  "Ананита": "green",
  "Жуль": "red",
  "Хейвинд": "red",
  "Фуффис": "green",
  "Киббл": "green",
  "Лезинг": "orange"
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

/* function colorizePlayers() {
  const playerColors = {};
  const playerSpans = document.querySelectorAll(".player");

  playerSpans.forEach((span, i) => {
    const playerName = span.textContent.trim();
    const colorClass = playerColors[playerName] || (playerColors[playerName] = getColorClass(i));

    // Удаление предыдущих классов цвета и атрибута style
        span.removeAttribute("style");

    // Добавление нового класса цвета
    span.classList.add(colorClass);
  });

  const playerList = document.querySelector("ul.players");
  const emptyPlayers = Array.from(playerList.querySelectorAll("li")).filter(li => !li.textContent.trim());
  emptyPlayers.forEach(li => li.remove());

  function getColorClass(index) {
    const colors = ["red", "green", "blue-1", "blue-2", "blue-3", "yellow", "orange", "purple-1", "purple-2", "purple-3"];
    return colors[index % colors.length];
  }
}
 */




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
      /(–\s(?:["«]|)\s*(?:\(.+\)\s|)[А-Я](?:.+?)(?:[,.!?] –|<\/span>))/g,
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

function transferNightLines(rootElement) {
  function nightTransfer(chapters) {
    chapters.forEach(function (chapter, i) {
      const dateElement = chapter.querySelector(".date");
      let nightElement = chapter.querySelector(".night");

      if (!dateElement || !nightElement) {
        // Или нет date, или нет night.
        return;
      }
      const currentDate = dateElement.textContent.trim();
      nightElement.classList.remove("night");
      nightElement.classList.add("night-transfered");

      let nextChapter = chapters[i + 1];
      if (!nextChapter) {
        // Нет следующей главы.
        return;
      }
      const nextDateElement = nextChapter.querySelector(".date");
      const nextChapterContent = nextChapter.querySelector(".content");
      if (!nextDateElement || !nextChapterContent) {
        /* console.log(
 `Контейнер контента или дата не найдены в следующей главе. Строки для ночи не будут перемещены.`
 ); */
      }

      nextChapterContent.appendChild(nightElement);
      /* console.log(
 `Строки для ночи из главы с датой: «${currentDate}» добавлены в конец контента в следующей главе: «${nextDateElement.textContent.trim()}»`
 ); */
    });
  }
  let chatlogElement = document.getElementById("chatlog");
  nightTransfer(chatlogElement.querySelectorAll(".chapter"));
  removeEmptyChapters();
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

document.addEventListener("DOMContentLoaded", function () {
  let chatlogElement = document.getElementById("chatlog");
  transferNightLines(chatlogElement);
});

function toggleContent(event) {
  // Функция сворачивания
  /* console.log("Начало функции toggleContent"); */
  const chapter = event.target.closest(".chapter");
  const content = chapter.querySelector(".content");

  if (chapter.classList.contains("collapsed")) {
    chapter.classList.remove("collapsed");
    chapter.classList.add("expanded");
    content.style.maxHeight = content.scrollHeight + "px";
  } else {
    chapter.classList.remove("expanded");
    chapter.classList.add("collapsed");
    content.style.maxHeight = null;
  }

  /* console.log("Функция toggleContent успешно выполнена"); */
}

function combineFunctions() {
  // Удаляем пустые элементы
  $("div.chapter.expanded p.logline.emote:empty").remove();
  combineSpeech();
  combineEmotes();
}

function handleKeyPress(event) {
  if (event.keyCode === enterKeyCode) {
    // Ваш код для обработки нажатия Enter
    applyImportant();
  }
}

document
  .getElementById("keywordsInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      /* console.log("Нажат Enter в поле заполнения"); */
      applyImportant();
    }
  });

function applyImportant() {
  /* console.log("Выделение ключевых слов"); */

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

  /* console.log("Захваченные переменные:"); */
  // console.log(keywords);

  // Добавляем класс 'important' только для тех элементов, которые соответствуют текущему запросу
  $("p").each(function () {
    const text = $(this).text().toLowerCase().replace(/\s+/g, " ");
    const hasKeyword = keywords.some((keyword) => text.includes(keyword));

    // Разбиваем слова с минусом и проверяем, если второе слово со знаком минуса
    const splitKeywords = keywords.map((keyword) => keyword.split("-"));
    const isRemoveKeyword = splitKeywords.some(
      (pair) => pair.length === 2 && text.includes(pair[1].trim())
    );

    if (hasKeyword && !isRemoveKeyword) {
      /* console.log(`Adding class 'important' to text: ${text}`); */
      $(this).addClass("important");
    } else if (isRemoveKeyword) {
      /* console.log(`Removing class 'important' from text: ${text}`); */
      $(this).removeClass("important");
    }
  });

  openImportantChapters();
  scrollToNearestImportant();
}

function openImportantChapters() {
  // Найти все элементы с классом .chapter
  var chapters = document.querySelectorAll(".chapter");

  // Пройти по каждому .chapter с использованием цикла for и i
  for (var i = 0; i < chapters.length; i++) {
    var chapter = chapters[i];

    // Удалить класс .expanded и добавить класс .collapsed у всех .chapter
    chapter.classList.remove("expanded");
    chapter.classList.add("collapsed");

    // Проверить, содержит ли .chapter дочерний элемент с классом .logline.important
    if (chapter.querySelector(".logline.important")) {
      // Если содержит, добавить класс .expanded
      chapter.classList.remove("collapsed");
      chapter.classList.add("expanded");
    }

    // Вывести переменные на каждой итерации для отладки
    /* console.log("Iteration:", i);
 console.log("Chapter:", chapter);
 console.log("Classes after update:", chapter.className);
 console.log("--------------------------"); */
  }
}

function scrollToNearestImportant() {
  // Находим все элементы с классом .chapter.expanded > logline.important
  const importantElements = document.querySelectorAll(
    ".chapter.expanded .logline.important"
  );

  // Если элементы не найдены, завершаем выполнение функции
  if (importantElements.length === 0) {
    // console.log("Нет элементов для прокрутки");
    return;
  }

  // Находим текущее положение вертикальной прокрутки страницы
  const currentScrollPosition = window.scrollY || window.pageYOffset;

  // Инициализируем переменные для хранения информации о ближайшем элементе
  let nearestElement = null;
  let minDistance = Infinity;

  // Итерируемся по всем найденным элементам
  importantElements.forEach((element) => {
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

// Пример использования
scrollToNearestImportant();

function removeNonImportantParagraphs() {
  // console.log("removeNonImportantParagraphs");

  // Удаляем все элементы с классом .chapter.collapsed
  const collapsedChapters = document.querySelectorAll(".chapter.collapsed");
  collapsedChapters.forEach((chapter) => {
    chapter.remove();
  });

  // Удаляем абзацы без класса .important
  const paragraphs = document.querySelectorAll("p:not(.important)");
  paragraphs.forEach((paragraph) => {
    paragraph.remove();
  });
  removeCollapsed();
}

/* function addRecordClassToMIALoglines() {
 console.log("addRecordClassToMIALoglines");
 var loglines = document.querySelectorAll("p.logline");

 loglines.forEach(function (logline) {
 var speech = logline.querySelector("span.speech");
 if (speech && speech.textContent.includes("МИА")) {
 logline.classList.add("record");
 }
 });
} */

// Сворачивание

/* function setupChapterCollapse() {
 console.log("setupChapterCollapse");

 const chapterElements = document.querySelectorAll(".chapter");
 
 if (chapterElements.length === 1) {
 // Если есть только одна глава, делаем её expanded
 chapterElements[0].classList.add("expanded");
 console.log("Только одна глава, expanded");
 } else {
 // Иначе применяем collapsed для всех, кроме первой
 chapterElements.forEach((chapterElement, index) => {
 if (index === 0) {
 chapterElement.classList.add("expanded");
 console.log("Что-то пошло не так");
 } else {
 chapterElement.classList.add("collapsed");
 console.log("Что-то пошло не так №2");
 }
 });
 }
} */

/* function setupToggleHandlers() {
 console.log("setupToggleHandlers");
 const dates = document.querySelectorAll(".date");
 dates.forEach((date) => {
 date.addEventListener("click", toggleContent);
 });
} */

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

  removeEmptyParagraphs();
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

function removeEmptyParagraphs() {
  // Находим элементы с классом "chapter expanded"
  var chapters = document.querySelectorAll(".chapter.expanded");

  // Проходимся по каждому найденному элементу
  chapters.forEach(function (chapter) {
    // Находим все параграфы внутри элемента
    var paragraphs = chapter.querySelectorAll("p");

    // Проходимся по каждому параграфу и удаляем его, если он пустой
    paragraphs.forEach(function (paragraph) {
      if (paragraph.innerHTML.trim() === "") {
        paragraph.parentNode.removeChild(paragraph);
      }
    });
  });
}
