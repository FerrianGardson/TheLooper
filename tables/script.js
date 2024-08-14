// Настройки

console.log("Добавил закладку, 05-06-2024");
// toggleSelectionCSS();
let combineDelay = 5 * 1000;
let hoursBetweenSessions = 0.5;
let showtimestamps = false;
let searchWithinCollapsed = false;
// let chapterCollapseStatus = searchWithinCollapsed
//   ? ".chapter"
//   : ".chapter:not(.collapsed)";
let removeCollapsedFlag = false;
let showTimestampsFlag = false;

// Главные функции

function formatHTML() {
  cleanText();
  splitSessions();
  wrapChapters();
  updateAll();
  chapterReverse();
  postClear();
}

function updateAll() {
  console.log("!!! updateAll started");
  removeActorsAndSymbols();
  playerList();
  addTimeToChapter();
  calculateTotalDuration();
  combineFunctions();
  gatherUniquePlayersAndInsert();
  removeDoublesAtTotalActors();
  synchronizePlayerColors();
  fullNames();
  addPunctuation();
  // removeChaptersIfFewPlayers();
  // recombineFunctions();
  console.log("updateAll finished");
}

function addPunctuation() {
  addSpaceToEmotePlayers();
  addColumnToPlayers();
  addCommaAndDotToPlayerList();
}

function combineFunctions() {
  console.log("combineFunctions started");
  combineSay("say");
  combineSay("emote");
  combineSay("virt");
  sayToEmote();
  emoteToSay();
  virtToSay();
  removeDashes();
  findLoglinesAndConvertToTranscript();
  console.log("combineFunctions finished");
}

// Тире

let dash = document.createElement("span");
dash.classList.add("dash");
dash.textContent = " — ";
dash = dash.outerHTML;

// Пробел
let space = document.createElement("span");
space.classList.add("space");
space.textContent = " ";

// Игроки
let playerData = [
  ["Фэрриан", "rogue", "Фэрриан Гардсон"],
  ["Малет", "shaman", "Малет Трант"],
  ["Роуз", "hunter", "Арчибальд Роуз"],
  ["Аммель", "mage", "Рэдрик Аммель"],
  ["Маларон", "priest", "Мал’арон Берёзовый Лист"],
  ["Ананита", "hunter", "Ананита Астор"],
  ["Сырорезка", "yellow", "Сырорезка"],
  ["Пипперколс", "mage", "Пипперколс"],
  ["Санриэль", "mage", "Санриэль Рассветный Луч"],
  ["Дерек", "hunter", "Дерек Кларк"],
  ["Кэролай", "priest", "Кэролай Эстер"],
  ["Сахаджи", "shaman", "Сахаджи"],
  ["Думитру", "druid", "Думитру"],
  ["Каторжник", "warrior", "Рой Редвуд"],
  ["Хофманн", "warrior", "Карл Хофманн"],
  ["Кариночка", "demon-hunter", "Карина"],
  ["Пачек", "warrior", "Офелия Пачек"],
  ["Шенн", "shaman", "Шенн Вельт"],
  ["Ангорд", "warrior", "Ангорд Ганар"],
  ["Гермейнхауртер", "warrior", "Гермейнроутер Семестос"],
  ["Кирке", "warrior", "Гюнтер Кирке"],
  ["Ашира", "priest", "Ашира Фраймс"],
  ["Паулина", "priest", "Паулина Санчес"],
  ["Сью", "red", "Сью Блэкрич"],
  ["Хейвинд", "red", "Сью Блэкрич"],
  ["Хейвинд", "red", "Сью Блэкрич"],
  ["Хейвинд", "red", "Сью Блэкрич"],
];

// Неписи
let npcData = [
  ["Рыцарь-лейтенант Сиглим Сталекрут", "yellow", "Сиглим Сталекрут"],
  ["Дробитель", "death-knight", "Дробитель"],
  ["Сэр Сэмьюэл Лексон", "demon-hunter", "Сэр Сэмьюэл Дж. Лексон"],
  ["Рядовой Равенхольт", "shaman"],
  ["Гнолл"],
  ["Баззерс"],
  ["Поганок"],
  ["Мухоморий"],
  ["Крыса"],
  ["Медведь"],
  ["Фг"],
  ["Стражник"],
  ["Богачка"],
  ["Богач"],
  ["Рыбак"],
  ["Бедняк"],
  ["Рыболов"],
  ["Повар"],
  ["Бармен"],
  ["Разнорабочий"],
  ["Мурлок"],
  ["Жрица"],
  ["Извозчик"],
  ["Ветроплет"],
  ["Пирожок"],
  ["Надсмотрщик"],
  ["Вызыватель"],
  ["Горнорабочий"],
  ["Надзиратель"],
  ["Шахтер"],
  ["Сторож"],
  ["Головорез"],
  ["Стрелок"],
  ["Почтальон"],
  ["Дундосик"],
  ["Инженер"],
  ["Заступник"],
  ["Дозорный"],
  ["Хильда"],
  ["Охранитель"],
  ["Охотник"],
  ["Хобгоблин"],
  ["Посетительница"],
  ["Посетитель"],
  ["Кожевник"],
  ["Нешрешшс"],
  ["Охотница"],
  ["Лекарь"],
  ["Священник"],
  ["Дробитель"],
  ["Нищий"],
  ["Медведь"],
  ["Мадибус"],
  ["Тейлзер"],
  ["Ребенок"],
  ["Ребёнок"],
  ["Ваггат"],
  ["Пехотинец"],
  ["Сорорестраза"],
  ["Всадник"],
  ["Ямщик"],
  ["Кучер"],
  ["Ворген"],
  ["Незнакомец"],
  ["Охотник"],
  ["Мордоворот"],
  ["Глашатай"],
];

// Цвета
let randomColors = [
  "demon-hunter",
  "warlock",
  "monk",
  "shaman",
  "death-knight",
  "druid",
  "priest",
  "mage",
  "paladin",
  "warrior",
  "hunter",
  "rogue",
  "yellow",
  "red",
  "green",
  "blue",
  "ocean-blue",
  "light-blue",
  "orange",
  "purple",
  "purple-2",
  "purple-3",
  "random-1",
  "random-2",
  "random-3",
  "random-4",
  "random-5",
  "random-6",
  "random-7",
  "random-8",
  "random-9",
  "random-10",
  "random-11",
  "random-12",
  "random-13",
  "random-14",
  "random-15",
  "random-16",
  "random-17",
  "random-18",
  "random-19",
];

// Код

async function handleTxtFile(file) {
  chatlog.innerHTML = "";

  let text = await file.text();

  importTxt(text);
}

async function handleHtmlFile(file) {
  let htmlText = await file.text();

  let parser = new DOMParser();
  let htmlDocument = parser.parseFromString(htmlText, "text/html");
  let newChatlog = htmlDocument.getElementById("chatlog");

  if (newChatlog) {
    chatlog.innerHTML = newChatlog.innerHTML;
  } else {
    // console.error("Элемент #chatlog не найден в HTML файле");
  }
}

fileInputTxt = document.getElementById("file-input-txt");
fileInputTxt.addEventListener("change", handleFileInput);

function handleFileInput(event) {
  let file = event.target.files[0];

  if (file) {
    if (file.name.endsWith(".txt")) {
      handleTxtFile(file);
    } else if (file.name.endsWith(".html")) {
      handleHtmlFile(file);
    } else {
      // console.error("Неподдерживаемый тип файла");
    }
  } else {
    // console.error("Файл не найден");
  }
}

function convertTimestamp(timestamp) {
  let [date, time] = timestamp.split(" ");
  let [month, day] = date.split("/");
  let [hoursMinutesSeconds, milliseconds] = time.split(".");
  let [hours, minutes, seconds] = hoursMinutesSeconds.split(":");

  let isoTimestamp = `${new Date().getFullYear()}-${month.padStart(
    2,
    "0"
  )}-${day.padStart(2, "0")}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

  return isoTimestamp;
}

function importTxt(text) {
  let logLines = text.split("\n");
  let chatlog = document.querySelector("#chatlog");
  for (let line of logLines) {
    if (!/^\d+\/\d+\s+\d{2}:\d{2}:\d{2}\.\d{3}\s+/.test(line)) continue; // Пропускаем строки, не соответствующие формату временной метки
    let timestampMatch = line.match(/^(\S+\s\S+)/);
    let timestamp = timestampMatch ? timestampMatch[1] : "";
    let loglineBody = line.replace(timestamp, "").trim();
    if (timestamp) {
      let p = document.createElement("p");
      p.setAttribute("timestamp", convertTimestamp(timestamp));
      p.className = "logline";
      p.textContent = loglineBody;
      chatlog.appendChild(p);
      if (showTimestampsFlag == true) {
        console.log("timestamp: ", timestamp);
      }
    }
  }
  formatHTML();
}

function splitSessions() {
  let paragraphs = document.querySelectorAll("p.logline");
  let prevTimestamp = null;
  paragraphs.forEach((paragraph) => {
    let timestamp = paragraph.getAttribute("timestamp");
    if (timestamp) {
      let currentTimestamp = new Date(timestamp);
      if (prevTimestamp) {
        let timeDifference = currentTimestamp - prevTimestamp;
        if (
          timeDifference > hoursBetweenSessions * 60 * 60 * 1000 ||
          timeDifference < 0
        ) {
          //   "if (timeDifference > 1 * 60 * 60 * 1000 || timeDifference < 0) {"
          // );
          let dateHeader = document.createElement("h2");
          dateHeader.className = "date";
          let formattedDate = getFormattedDate(timestamp);
          dateHeader.innerHTML = `<span class="title">Запись</span> <span class="day">${formattedDate}</span>`;
          paragraph.parentNode.insertBefore(dateHeader, paragraph);
        }
      } else {
        let dateHeader = document.createElement("h2");
        dateHeader.className = "date";
        let formattedDate = getFormattedDate(timestamp);
        dateHeader.innerHTML = `<span class="title">Запись</span> <span class="day">${formattedDate}</span>`;
        paragraph.parentNode.insertBefore(dateHeader, paragraph);
      }
      if (!paragraph.textContent.trim()) {
        paragraph.remove();
        return;
      }
      prevTimestamp = currentTimestamp;
    }
  });
}

function getFormattedDate(timestamp) {
  let date = new Date(timestamp);
  let monthNames = [
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
  let formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]}, `;
  return formattedDate;
}

function padZero(number) {
  return number.toString().padStart(2, "0");
}

function getTimeDifference(timestamp1, timestamp2) {
  let date1 = new Date(timestamp1);
  let date2 = new Date(timestamp2);
  return Math.abs(date2 - date1);
}

function insertContentDiv(contentDiv, nextElement) {
  let container = nextElement ? nextElement.parentNode : document.body;
  container.insertBefore(contentDiv, nextElement);
}

function wrapChapters() {
  let chatlog = document.querySelector("#chatlog");
  if (!chatlog) {
    console.error("Элемент #chatlog не найден.");
    return;
  }

  let dates = chatlog.querySelectorAll("h2.date");
  if (!dates.length) {
    console.error("Не найдены элементы h2.date.");
    return;
  }

  let chapters = [];

  for (let date of dates) {
    let nextElement = date.nextElementSibling;
    let chapterElements = [date];
    let firstPTimestamp = null;

    while (nextElement && nextElement.tagName === "P") {
      if (!firstPTimestamp) {
        firstPTimestamp = nextElement.getAttribute("timestamp");
      }
      chapterElements.push(nextElement);
      nextElement = nextElement.nextElementSibling;
    }

    let chapterDiv = document.createElement("div");
    chapterDiv.classList.add("chapter");
    chapterDiv.setAttribute("timestamp", firstPTimestamp);
    chapterDiv.classList.add("collapsed");
    chapterDiv.append(...chapterElements);
    chapters.push(chapterDiv);
  }

  chatlog.innerHTML = "";
  chatlog.append(...chapters);

  chapters = document.querySelectorAll("div.chapter");

  chapters.forEach((chapter) => {
    let contentContainer = document.createElement("div");
    contentContainer.classList.add("content");

    let paragraphs = chapter.querySelectorAll("p");

    paragraphs.forEach((paragraph) => {
      contentContainer.appendChild(paragraph);
    });

    chapter.appendChild(contentContainer);
  });
}

function collapseChapters() {
  let chapters = document.querySelectorAll("div.chapter");
  chapters.forEach((chapter) => {
    chapter.classList.add("collapsed");
  });
  scrollToStart();
}

function expandChapters() {
  let chapters = document.querySelectorAll("div.chapter");
  chapters.forEach((chapter) => {
    chapter.classList.remove("collapsed");
  });
}
isCollapsed = true;

function toggleChapters() {
  if (isCollapsed) {
    expandChapters();
  } else {
    collapseChapters();
  }

  isCollapsed = !isCollapsed;

  let button = document.querySelector('[onclick="toggleChapters()"]');
  button.textContent = isCollapsed ? "Развернуть" : "Свернуть";
}

function renderChatLog(text) {
  let chapters = divideChaptersByInterval(text);
  for (let [chapterTitle, chapterLines] of Object.entries(chapters)) {
    let chapter = createChapterElement(chapterTitle, chapterLines);
    chatlog.appendChild(chapter);
  }
  formatLog();
}

function cleanText() {
  chatlogHTML = document.getElementById("chatlog").innerHTML; // Определение
  chatlogHTML = chatlogHTML.replace(/кошка/g, "кот"); // Пример
  chatlogHTML = chatlogHTML.replace(/<\/p>/g, "</p>\n"); // Перенос

  // Системные сообщения

  chatlogHTML = chatlogHTML.replace(
    /<p.*?>\s*((Аукцион|%s|ОШИБКА:|Результат:|Результат\:|Было|\!\!|Сегодня|Значок|Вы|Магическая|Удалено|Удалена|Номер|Игрок|Ставка|За|Существо|Кожаная|Персонаж|Сохранённый|Для|Всем|Текст|Эффект|щит|Телепорт|С\s|Получен|Характеристики|Маг.уст\:|вами.|Spawn|Если|Начислен|Установлен|Удален|Сохранён|Облик|Статы|Существу|Сила\:|Ловк\:|Инта\:|Физ.уст\:|На|Рейд|\*|Перезагрузка|Удаляются|Физическая|Похоже,|Подключиться|Повторите|Используйте|Персонаж|Статус|Стандартная|Добро|&\?|Так|Вы|Вам|Вас|Ваша|Ваш|Теперь|Участники|Порог|Бой|Поверженные|Сбежали|Победители|Приглашение|Настройки|Ошибка|Местоположение|Разделение|У|Ваше|Начислено|Камень|Получено|\[СЕРВЕР\]|Разыгрываются|Продление|Сломанные|Способности|Кастомный|Тканевые|Отношение|Смена|Не|Рядом|Объект|ОШИБКА|Задание|Всего|Поздравляем)\s.*?|(Результат\:|Персонаж))<\/p>\n/g,
    ""
  ); // Системные сообщения, начинаются с указанных слов и пробела

  chatlogHTML = chatlogHTML.replace(/\|H.*?(\[.*?\])\|h\s(.+?):/g, "$1 $2:"); // |Hchannel:PARTY|h[Лидер группы]|h Роуз: => [Лидер группы] Роуз:

  chatlogHTML = chatlogHTML.replace(
    /<p.*?>([A-Za-z]|\>|\&|\(|\d).*?<\/p>\n/g,
    ""
  ); // Системные сообщения, начинаются со служебных символов

  chatlogHTML = chatlogHTML.replace(
    /<p.*[А-Я][а-я-]+?\s(is|действие|отправлен|разжалован|разжалует|повышен|проводит проверку готовности.|показывает [А-я]+\, что готов\!|получил|атакует,|кажется,|приглашается|\(|атакует|уже состоит|вступает|исключается|смотрит|преклоняет|рассказывает|is Away|получает|не имеет ауры|does not wish|к вам|смотрит на вас|кивает вам|смотрит на вас|ставит|добавлено|создает|засыпает|ложится|предлагает|умирает|отклоняет|установлено|получил|устанавливает вам|находится в|производит|ложится|похоже, навеселе|кажется, понемногу трезвеет|желает видеть вас|пытается помешать побегу|уже состоит в группе|проваливает попытку побега|\+ \d = \d|теряет все свои очки здоровья и выбывает из битвы|пропускает ход|выходит|выполняет действие|входит|присоединяется|выбрасывает|,\s\похоже,\s\навеселе|становится|покидает).*?<\/p>\n/g,
    ""
  ); // Игрок %ООС-действие%

  /*   document.getElementById("chatlog").innerHTML = chatlogHTML; // Вывод
  throw new Error("Скрипт прерван"); */

  chatlogHTML = chatlogHTML.replace(/<p.*?(GUID|Fly|\-го уровня).*?<\/p>/g, ""); // Системные сообщения, содержат указанные слова в середине

  // Оформление

  chatlogHTML = chatlogHTML.replace(/<p.*?>[А-я]+ шепчет:.*?<\/p>\n/g, ""); // Шепчет:
  chatlogHTML = chatlogHTML.replace(
    /(<p.*?"logline)">(.*?)\sговорит:\s(.*?)<\/p>\n/g,
    '$1 say"><span class="player">$2</span><span class="say">$3</span></p>\n'
  ); // Говорит:

  chatlogHTML = chatlogHTML.replace(
    /(<p.*?"logline)">(.*)\sкричит:\s(.*?)<\/p>\n/g,
    '$1 yell"><span class="player">$2</span><span class="say">$3</span></p>\n'
  ); // Кричит:

  chatlogHTML = chatlogHTML.replace(
    /(<p.*?"logline)">([А-я]+)\s(.*?)<\/p>\n/g,
    '$1 emote"><span class="player">$2</span><span class="emote">$3</span></p>\n'
  ); // Эмоут

  // Вирт

  if (!keepGroup) {
    chatlogHTML = chatlogHTML.replace(
      /<p.*?>\[(Лидер группы|Группа)\].*?<\/p>\n/g,
      ""
    ); //ООС-каналы (группа)
  }

  chatlogHTML = chatlogHTML.replace(
    /(<p.*?logline)">\[(?:Группа|Лидер группы)\]\s*([А-я]+):\s*(.*?)<\/p>/g,
    '$1 virt"><span class="player">$2</span><span class="virt">$3</span></p>'
  ); // ООС в Эмоут

  chatlogHTML = chatlogHTML.replace(/<p.*?>\[(Гильдия)\].*?<\/p>\n/g, ""); //ООС-каналы (гильдия)

  if (!keepRaid) {
    chatlogHTML = chatlogHTML.replace(
      /<p.*?>\[(Рейд|Лидер рейда)\].*?<\/p>\n/g,
      ""
    ); //ООС-каналы (рейд)
  }

  if (!keepRaidWarning) {
    chatlogHTML = chatlogHTML.replace(
      /<p.*?>\[(Объявление рейду)\].*?<\/p>\n/g,
      ""
    ); //ООС-каналы (рейд)
  }

  //  chatlogHTML = chatlogHTML.replace(/(<p.*?"logline)">([А-я]+):\s(.*?)<\/p>/g,'$1 story"><span class="player">$2</span><span class="say">$3</p>\n'); // Стори
  chatlogHTML = chatlogHTML.replace(
    /(<p.*?"logline)">(.*?):\s(.*?)<\/p>/g,
    '$1 story"><span class="player">$2</span><span class="say">$3</p>\n'
  ); // Стори v2

  // Прочее

  chatlogHTML = chatlogHTML.replace(/[—–-] /g, "— "); // Тире в процессе
  chatlogHTML = chatlogHTML.replace(/\|\d+\-\d+\((.*?)\)/g, "$1"); // смотрит на |3-3(Халвиэль)
  chatlogHTML = chatlogHTML.replace(/\|[a-z]+/g, ""); // HEX-код
  chatlogHTML = chatlogHTML.replace(/say">\s*[—–-]\s*/g, 'say">'); // Тире в начале
  // chatlogHTML = chatlogHTML.replace(/\[Объявление рейду\].*?\: /g, ""); // Объявления рейду
  chatlogHTML = chatlogHTML.replace(/&nbsp;/g, " "); // &nbsp;
  chatlogHTML = chatlogHTML.replace(/\.\.+/g, "…"); // &nbsp;

  // Вывод для дебага
  document.getElementById("chatlog").innerHTML = chatlogHTML; // Вывод

  document
    .querySelectorAll("#chatlog p:empty")
    .forEach((emptyParagraph) => emptyParagraph.remove()); // Удаление пустых абзацев
}

function combineSay(spanType) {
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

  resetSay();

  var elements = document.querySelectorAll(".content > p.logline");
  var length = elements.length;

  for (var i = 0; i < length; i++) {
    var element = elements[i];

    if (!element.classList.contains(spanType)) {
      resetSay();
      continue;
    }
    saveCurrentValues(element, spanType);
    if (!currentSay) {
      continue;
    }
    if (!previousSay) {
      updatePreviousValues();
      continue;
    }

    if (currentPlayer != previousPlayer) {
      updatePreviousValues();
      continue;
    }

    dt = Math.abs(
      new Date(currentTimeStamp).getTime() -
        new Date(previousTimeStamp).getTime()
    );
    if (dt > combineDelay) {
      updatePreviousValues();
      continue;
    }
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
}

function sayToEmote() {
  let say = "";
  say = document.querySelectorAll("p.say, p.yell");
  for (let i = 0; i < say.length; i++) {
    let sayText = say[i].innerHTML;
    sayText = sayText.replace(
      /([!?.,:…])(\s—\s.*?[!?.,:…](\s—\s|<\/span>))/g,
      '$1<span class="emote">$2</span>'
    );
    // sayText = sayText.replace(
    //   /<\/span><span class="say">\s*[—–-]\s*/g,
    //   '</span><span class="say">'
    // );
    say[i].innerHTML = sayText;
  }
}

function virtToSay() {
  let emotes = document.querySelectorAll("p.logline.virt");

  for (let i = 0; i < emotes.length; i++) {
    let emoteText = emotes[i].innerHTML;

    let updatedEmoteText = emoteText.replace(
      /(—\s((?:["«]|)\s*(?:\(.+\)\s|)[А-Я](?:.+?)[…,.!?])(?: —|<\/span>))/g,
      '<span class="dash">— </span><span class="say">$2</span><span class="dash"> —</span>'
    );

    emotes[i].innerHTML = updatedEmoteText;
  }
}

function emoteToSay() {
  let emotes = document.querySelectorAll("p.logline.emote");

  for (let i = 0; i < emotes.length; i++) {
    let emoteText = emotes[i].innerHTML;

    let updatedEmoteText = emoteText.replace(
      /(—\s((?:["«]|)\s*(?:\(.+\)\s|)[А-Я](?:.+?)[…,.!?])(?: —|<\/span>))/g,
      '<span class="dash">— </span><span class="say">$2</span><span class="dash"> —</span>'
    );

    emotes[i].innerHTML = updatedEmoteText;
  }
}

function thirdPerson(firstClass, secondClass) {
  let emotes = document.querySelectorAll(`p.logline.${firstClass}`);

  for (let i = 0; i < emotes.length; i++) {
    let emoteText = emotes[i].innerHTML;

    let updatedEmoteText = emoteText.replace(
      /(—\s((?:["«]|)\s*(?:\(.+\)\s|)[А-Я](?:.+?)[…,.!?])(?: —|<\/span>))/g,
      `<span class="dash">— </span><span class="${secondClass}">$2</span><span class="dash"> —</span>`
    );

    emotes[i].innerHTML = updatedEmoteText;
  }
}

function trimChapter(chapterElement) {
  let paragraphs = chapterElement.find("p");
  let selectedParagraphs = paragraphs.filter(".selected");
  if (selectedParagraphs.length > 0) {
    let firstindex = paragraphs.index(selectedParagraphs.first());
    let lastindex = paragraphs.index(selectedParagraphs.last());
    paragraphs.slice(0, firstindex).remove();
    paragraphs.slice(lastindex + 1).remove();
  }
  addTimeToChapter();
}

function removeShortChapters() {
  let chapters = document.querySelectorAll(".chapter");
  chapters.forEach((chapter) => {
    let durationTimeSpan = chapter.querySelector(".durationtime");
    if (durationTimeSpan) {
      let durationAttribute = durationTimeSpan.getAttribute("duration");
      let [hours, minutes] = durationAttribute.split(":").map(Number);
      let totalMinutes = hours * 60 + minutes;
      if (totalMinutes < 60) {
        chapter.remove();
      }
    }
  });
}

function openselectedChapters() {
  var chapters = document.querySelectorAll(".chapter");
  for (var i = 0; i < chapters.length; i++) {
    var chapter = chapters[i];
    chapter.classList.add("collapsed");
    if (chapter.querySelector(".selected")) {
      chapter.classList.remove("collapsed");
    }
  }
}

function scrollSave(element) {
  if (element && element.classList) {
    element.classList.add("scroll");
  }
}

function scrollToSaved() {
  let targetElement = document.querySelector(".scroll");
  if (targetElement) {
    scrollToCenter(targetElement); // Изменение здесь
  }
  document
    .querySelectorAll(".scroll")
    .forEach((element) => element.classList.remove("scroll"));
}

function scrollToStart() {
  window.scrollTo({
    top: 0,
  });
}

function translit(word) {
  var answer = "";
  var converter = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ь: "",
    ы: "y",
    ъ: "",
    э: "e",
    ю: "yu",
    я: "ya",

    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "E",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "H",
    Ц: "C",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Sch",
    Ь: "",
    Ы: "Y",
    Ъ: "",
    Э: "E",
    Ю: "Yu",
    Я: "Ya",
  };

  for (var i = 0; i < word.length; ++i) {
    if (converter[word[i]] == undefined) {
      answer += word[i];
    } else {
      answer += converter[word[i]];
    }
  }

  return answer;
}

function exportHTML() {
  /*   removeCollapsedChapters(); */
  removeEmptyLines();

  // Сохраняем элементы для восстановления
  const paperControls = document.querySelector("div.paper.controls");
  const nav = document.querySelector("div.nav");
  const post = document.querySelector("div.post");

  // Создаем клонированные элементы, чтобы восстановить их позже
  const paperControlsClone = paperControls?.cloneNode(true);
  const navClone = nav?.cloneNode(true);

  // Удаляем элементы
  paperControls?.remove();
  nav?.remove();

  var pageTitle = document.querySelector("h2.date");
  var fileName = pageTitle
    ? translit(pageTitle.textContent.trim()).replace(/\s+/g, " ")
    : "exported";

  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," +
      encodeURIComponent(document.querySelector("html").innerHTML)
  );

  element.setAttribute("download", fileName + ".html");

  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);

  // Восстанавливаем элементы в конце функции
  if (paperControlsClone && navClone) {
    document.body.appendChild(navClone); // Вставляем nav обратно в тело документа
    post.prepend(paperControlsClone); // Вставляем paperControls обратно в nav
  }
}

var isAllSellected = false;
function selectAll() {
  var loglineElements = document.querySelectorAll("p.logline");
  if (isAllSellected) {
    loglineElements.forEach(function (element) {
      element.classList.remove("selected");
    });
  } else {
    loglineElements.forEach(function (element) {
      element.classList.add("selected");
    });
  }
  let button = document.querySelector('[onclick="selectAll()"]');
  button.textContent = isAllSellected ? "Выделить всё" : "Убрать всё";
  isAllSellected = !isAllSellected;
}

function debug() {
  combineFunctions();
}

function calculateTotalDuration() {
  // console.log("Начинаем подсчет общей продолжительности...");

  // Удаляем существующий элемент .totalduration, если он есть
  let existingTotalDuration = document.querySelector("#chatlog .totalduration");
  if (existingTotalDuration) {
    // console.log("Удаляем существующую общую продолжительность...");
    existingTotalDuration.remove();
  }

  let durationElements = document.querySelectorAll(
    "#chatlog span.durationtime"
  );

  let totalMinutes = 0;

  durationElements.forEach((element) => {
    let durationText = element.getAttribute("duration");
    // console.log(`Найдена продолжительность: ${durationText}`);
    let [hours, minutes] = durationText.split(":").map(Number);
    // console.log(`Часы: ${hours}, Минуты: ${minutes}`);
    totalMinutes += hours * 60 + minutes;
  });

  // console.log(`Общая продолжительность в минутах: ${totalMinutes}`);

  let totalHours = Math.floor(totalMinutes / 60);
  let remainingMinutes = totalMinutes % 60;

  // console.log( `Общее количество часов: ${totalHours}, Оставшиеся минуты: ${remainingMinutes}` );

  let totalDurationHeading = document.createElement("h2");
  totalDurationHeading.textContent = `Всего наиграно ${totalHours}ч ${remainingMinutes}мин`;

  let totalDurationChapter = document.createElement("div");
  totalDurationChapter.classList.add("totalduration");
  totalDurationChapter.appendChild(totalDurationHeading);

  let chatlog = document.querySelector("#chatlog");
  // console.log("Вставляем общую продолжительность в начало #chatlog...");
  chatlog.insertBefore(totalDurationChapter, chatlog.firstChild);

  // console.log( "Общая продолжительность успешно вычислена и добавлена на страницу." );
}

function removeCollapsedChapters() {
  var collapsedDivs = document.querySelectorAll(".chapter.collapsed");
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

var isReversed = true;

function chapterReverse() {
  let chapters = document.querySelectorAll(".chapter");
  let totalDuration = document.querySelector(".totalduration");
  // console.log("chapters: ", chapters);
  let reversedChapters = Array.from(chapters).reverse();
  chapters.forEach((chapter) => chapter.remove());
  // console.log("reversedChapters: ", reversedChapters);

  let reversedChaptersHTML = reversedChapters
    .map((chapter) => chapter.outerHTML)
    .join("");
  totalDuration.insertAdjacentHTML("afterend", reversedChaptersHTML);

  // Динамическое название кнопки
  let button = document.querySelector('[onclick="chapterReverse()"]');
  button.textContent = isReversed ? "Сначала старое" : "Сначала новое";
  isReversed = !isReversed;
}

// function chapterReverse() {
//   var chatlog = document.getElementById("chatlog");
//   var messages = Array.from(chatlog.children);
//   messages.reverse();
//   while (chatlog.firstChild) {
//     chatlog.removeChild(chatlog.firstChild);
//   }
//   messages.forEach(function (message) {
//     chatlog.appendChild(message);
//   });
// }

function removeEmptyLines() {
  var bodyHtml = document.body.innerHTML;
  var cleanedHtml = bodyHtml.replace(/^\s*[\r\n]/gm, "");
  document.body.innerHTML = cleanedHtml;
}
function removeDashes() {
  let loglines = document.querySelectorAll("p.logline");
  loglines.forEach((element, index) => {
    element.innerHTML = element.innerHTML.replace(
      /"><span class="dash">— <\/span>/g,
      '">'
    );
    element.innerHTML = element.innerHTML.replace(
      /<span class="dash"> —<\/span><\/span>/g,
      "</span>"
    );
  });
}

let keepGroupCheckbox = document.getElementById("keepGroupCheckbox");
let keepGroup = true;

keepGroupCheckbox.addEventListener("change", function () {
  keepGroup = this.checked;
});

let keepRaidCheckbox = document.getElementById("keepRaidCheckbox");
let keepRaid = false;

keepRaidCheckbox.addEventListener("change", function () {
  keepRaid = this.checked;
});

let keepRaidWarningCheckbox = document.getElementById(
  "keepRaidWarningCheckbox"
);
let keepRaidWarning = true;

keepRaidWarningCheckbox.addEventListener("change", function () {
  keepRaidWarning = this.checked;
});

function filterTrimEverything() {
  var chapters = document.querySelectorAll("div.chapter");

  if (chapters.length > 0) {
    chapters.forEach(function (chapter) {
      trimChapter($(chapter));
    });
  } else {
  }
}

function clearChatlog() {
  var chatlog = document.getElementById("chatlog");

  chatlog.innerHTML = "";
}

function rearrangeChapters() {
  // Находим все элементы .chapter
  var chapters = document.querySelectorAll(".chapter");

  chapters.forEach(function (chapter) {
    var hoveredElement = chapter.querySelector(".content > *:hover");

    if (hoveredElement) {
      // Находим ближайший родительский .chapter
      var closestChapter = hoveredElement.closest(".chapter");

      // Вставляем HTML-код после указанного элемента
      var newChapterHTML = `
        </div>
      </div>
      <div class="chapter">
        <div class="content">
      `;
      hoveredElement.insertAdjacentHTML("afterend", newChapterHTML);

      // Выводим сообщение о выполнении
      // console.log("HTML-код успешно вставлен после hoveredElement.");
    }
  });
}

function removeUnselectedLoglines() {
  // console.log("Удаляю ненужные строки");

  // Находим все .chapter, которые не .collapsed
  let chapters = document.querySelectorAll(".chapter:not(.collapsed)");

  chapters.forEach((chapter) => {
    // Внутри каждого .chapter находим все p.logline, которые не .selected
    let unselectedLoglines = chapter.querySelectorAll(
      "p.logline:not(.selected):not(.paper):not(.transcript)"
    );

    // Удаляем найденные ненужные строки
    unselectedLoglines.forEach((logline) => {
      logline.remove();
    });
  });
}

function addTimeToChapter() {
  let chapters = document.querySelectorAll(".chapter");
  chapters.forEach((chapter) => {
    let dateHeader = chapter.querySelector("h2.date");
    let firstParagraph = chapter.querySelector("p[timestamp]:first-of-type");
    let lastParagraph = chapter.querySelector("p[timestamp]:last-of-type");

    if (dateHeader && firstParagraph && lastParagraph) {
      dateHeader.querySelector(".starttime")?.remove();
      dateHeader.querySelector(".durationtime")?.remove();

      let startTime = new Date(firstParagraph.getAttribute("timestamp"));
      let endTime = new Date(lastParagraph.getAttribute("timestamp"));
      let formatTime = (time) => {
        let hours = String(time.getUTCHours()).padStart(2, "0");
        let minutes = String(time.getUTCMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
      };

      let startTimeString = formatTime(startTime);

      let durationTime = endTime - startTime;
      let durationHours = Math.floor(durationTime / (1000 * 60 * 60));
      let durationMinutes = Math.floor(
        (durationTime % (1000 * 60 * 60)) / (1000 * 60)
      );

      let startTimeSpan = document.createElement("span");
      startTimeSpan.classList.add("starttime");
      startTimeSpan.textContent = startTimeString;
      dateHeader.appendChild(startTimeSpan);

      let durationTimeSpan = document.createElement("span");
      durationTimeSpan.classList.add("durationtime");
      durationTimeSpan.textContent = ` (${durationHours}ч ${durationMinutes}мин)`;
      durationTimeSpan.setAttribute(
        "duration",
        `${durationHours}:${durationMinutes}`
      );
      dateHeader.appendChild(durationTimeSpan);
    }
  });
  calculateTotalDuration();
}

function calculateTimeDifference() {
  let now = new Date();
  localOffset = now.getTimezoneOffset();
  localDifference = localOffset / 60;
  moscowDifference = localDifference + 3;
  serverDifference = localDifference + 1;
  // console.log( "Разница между вашим местным временем и UTC (в часах):", localDifference );
  // console.log( "Разница между вашим местным временем и московским временем (в часах):", moscowDifference );
  // console.log( "Разница между вашим местным временем и серверным временем (в часах):", serverDifference );
}

function processTimestamp() {
  let chapter = document.querySelector(".chapter");

  let timestampValue = chapter.getAttribute("timestamp");

  // console.log("Введенный таймштамп:", timestampValue);

  let dateObject = new Date(timestampValue);
  let hours = ("0" + dateObject.getUTCHours()).slice(-2);
  let minutes = ("0" + dateObject.getUTCMinutes()).slice(-2);
  let formattedTimestamp = hours + ":" + minutes;

  // console.log("Отформатированный таймштамп:", formattedTimestamp);
}

function convertLoglineToTranscript(loglineElement) {
  let timestamp = new Date(loglineElement.getAttribute("timestamp"));
  let day = timestamp.getDate();
  let monthNames = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];
  let monthindex = timestamp.getMonth();
  let formattedDate = day + " " + monthNames[monthindex];
  let hours = ("0" + timestamp.getUTCHours()).slice(-2);
  let minutes = ("0" + timestamp.getUTCMinutes()).slice(-2);
  let formattedTimestamp = formattedDate + " " + hours + ":" + minutes;
  let playerName = loglineElement.querySelector(".player");
  loglineElement.setAttribute("timestamp", timestamp.toISOString());
  loglineElement.textContent = loglineElement.textContent.replace(
    /^.+([Зз]апись|\d\d[:.]\d\d)[,.!: ]/g,
    ""
  );
  // if (
  // loglineElement.classList.contains("say") ||
  // loglineElement.classList.contains("yell") ||
  // loglineElement.classList.contains("virt")
  // ) {
  // playerName = playerName.textContent.slice(0, -2);
  // } else {
  // playerName = playerName.textContent.slice(0, -1);
  // }

  let transcriptRecordHTML = `
    <div class="record">
      <p>Время<span>25 ОТП, ${formattedDate}, ${hours}:${minutes}</span></p>
      <p>Автор<span>${playerName.textContent}</span></p>
    </div>
    <span class="speech">${loglineElement.textContent.trim()}</span>
  `;

  let transcriptElement = document.createElement("div");
  transcriptElement.classList.add("transcript");
  transcriptElement.innerHTML = transcriptRecordHTML;

  transcriptElement.setAttribute("timestamp", timestamp.toISOString());

  loglineElement.replaceWith(transcriptElement);

  loglineElement.scrollIntoView({ behavior: "smooth", block: "center" });
}

function findLoglinesAndConvertToTranscript() {
  let loglineElements = document.querySelectorAll("p.logline.say");

  loglineElements.forEach((loglineElement) => {
    if (/запись/i.test(loglineElement.textContent)) {
      convertLoglineToTranscript(loglineElement);
    } else {
      console.log("Слово 'запись' не найдено в этом элементе.");
    }
  });
}


// Горячие клавиши
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && event.target.id === "keywordsInput") {
    logFilter();
  }

  // Возврат закладки
  else if (["b", "и"].includes(event.key) && event.altKey) {
    console.log("Возвращаюсь к закладке");
    expandChapters();
    scrollToBookmark();
  }

  // Поставить закладку
  else if (event.key === "b" || event.key === "и") {
    console.log("Ставлю закладку");
    placeBookmark();
  }

  // Прочее
  else if (!wrapping && event.key === "Delete") {
    removeHovered();
  } else if (event.key === "p" || event.key === "з") {
    togglePaperClass();
  } else if (event.key === "ArrowLeft") {
    pasteText();
  } else if (["[", "х"].includes(event.key) && event.ctrlKey) {
    removeEverything("before");
    updateAll();
  } else if (["]", "ъ"].includes(event.key) && event.ctrlKey) {
    removeEverything("after");
    updateAll();
  } else if (event.key === "ArrowRight") {
    pasteImg();
  } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    moveElement(event);
  } else if (["m", "ь"].includes(event.key)) {
    let hoveredLogline = document.querySelector(".logline:hover");
    if (hoveredLogline) {
      convertLoglineToTranscript(hoveredLogline);
    }
  } else if (["[", "х"].includes(event.key)) {
    startWrap();
  } else if (wrapping && ["]", "ъ"].includes(event.key)) {
    finishWrap("paper");
  } else if ([wrapping && "s", "ы"].includes(event.key)) {
    finishWrap("spoiler");
  } else if (wrapping && event.key === "Delete") {
    finishWrap("remove");
  } else if (wrapping && event.key === "Enter") {
    finishWrap("no-margin");
  } else if (event.key === "/") {
    divideChapter();
    updateAll();
  } else if (event.key === "*") {
  } else if (event.key === "d") {
    debug();
  } else if (event.key === "+") {
    console.log("RecombineFunctions");
    recombineFunction("say");
    recombineFunction("yell");
    recombineFunction("story");
    console.log("End");
  } else if (event.key === ",") {
    testing();
  }
});

document.addEventListener("click", function () {
  toggleSelectedClass();
});

function toggleSelectedClass() {
  let elementsUnderCursor = document.querySelectorAll(":hover");
  elementsUnderCursor.forEach((element) => {
    let loglineParent = element.closest(".logline");
    let paperParent = element.closest(".paper");
    let transcriptParent = element.closest(".transcript");
    let playerParent = element.closest(".player");
    let dateParent = element.closest(".chapter");

    if (
      dateParent &&
      (element.tagName === "H2" || element.matches("h2.date"))
    ) {
      dateParent.classList.toggle("collapsed");
      console.log("Переключаю главу");
    }

    if (loglineParent || paperParent || transcriptParent || playerParent) {
      element.classList.toggle("selected");
      console.log("Переключаю абзац");
    }
  });
}

function removeHovered() {
  let elementsUnderCursor = document.querySelectorAll(":hover");
  elementsUnderCursor.forEach((element) => {
    // Проверка на .player
    if (element.matches(".player")) {
      element.remove(); // Удаление .player
    } else {
      // Существующий код для других элементов:
      let loglineParent = element.closest(".content > *");
      let dateHeadingParent = element.closest("h2.date");

      if (loglineParent) {
        loglineParent.remove();
      } else if (dateHeadingParent) {
        let chapterParent = dateHeadingParent.closest(".chapter");
        if (chapterParent) {
          chapterParent.remove();
        }
      }
    }
  });
}

function togglePaperClass() {
  let elementsUnderCursor = document.querySelectorAll(":hover");
  elementsUnderCursor.forEach((element) => {
    if (element.tagName === "P") {
      element.classList.toggle("paper");
    }
  });
}

function placeBookmark() {
  let elementsUnderCursor = document.querySelectorAll(":hover");

  elementsUnderCursor.forEach((element) => {
    if (element.nextElementSibling) {
      let oldBookmarks = document.querySelectorAll(".bookmark");
      oldBookmarks.forEach(function (bookmarkElement) {
        bookmarkElement.remove();
      });

      const bookmarkElement = document.createElement("div");
      bookmarkElement.classList.add("bookmark");
      element.parentNode.insertBefore(
        bookmarkElement,
        element.nextElementSibling
      );
    }
  });
}

function moveElement(event) {
  var contentContainers = document.querySelectorAll(
    ".content:hover, .paper:hover"
  );

  contentContainers.forEach(function (contentContainer) {
    var elementUnderCursor = contentContainer.querySelector(":hover");

    if (elementUnderCursor) {
      var targetSibling =
        event.key === "ArrowUp"
          ? "previousElementSibling"
          : "nextElementSibling";
      var siblingElement = elementUnderCursor[targetSibling];

      if (siblingElement) {
        if (event.key === "ArrowUp") {
          contentContainer.insertBefore(elementUnderCursor, siblingElement);
        } else {
          var nextSibling = siblingElement.nextElementSibling;
          if (nextSibling) {
            contentContainer.insertBefore(elementUnderCursor, nextSibling);
          } else {
            contentContainer.appendChild(elementUnderCursor);
          }
        }
      }
    }
  });
}

function removeEverything(position) {
  let hover = document.querySelectorAll(".content > :hover, h2.date:hover");

  hover.forEach((element) => {
    if (element.tagName.toLowerCase() === "h2") {
      let closestChapter = element.closest(".chapter");
      if (closestChapter) {
        let sibling;
        if (position === "before") {
          sibling = closestChapter.previousElementSibling;
        } else if (position === "after") {
          sibling = closestChapter.nextElementSibling;
        }

        while (sibling && sibling.tagName !== "H2") {
          sibling.classList.add("remove");
          if (position === "before") {
            sibling = sibling.previousElementSibling;
          } else if (position === "after") {
            sibling = sibling.nextElementSibling;
          }
        }
      }
    } else {
      let contentContainer = element.closest(".content");
      if (!contentContainer) return;

      let targetElement = element;
      let currentElement;
      if (position === "before") {
        currentElement = targetElement.previousElementSibling;
      } else if (position === "after") {
        currentElement = targetElement.nextElementSibling;
      }

      while (currentElement) {
        let siblingToRemove = currentElement;
        if (position === "before") {
          currentElement = currentElement.previousElementSibling;
        } else if (position === "after") {
          currentElement = currentElement.nextElementSibling;
        }
        siblingToRemove.remove();
      }
    }
  });
  removeRed();
}

function divideChapter() {
  console.log("divideChapter start");

  // Получаем все элементы, над которыми произведено наведение, внутри .content
  let hoveredElements = document.querySelectorAll(".content > :hover");

  // Проверяем, есть ли наведенные элементы
  if (hoveredElements.length === 0) {
    console.error("Не найдено наведенных элементов.");
    return;
  }

  // Массив для хранения строк HTML, которые будут перемещены в новую главу
  let migratingLoglines = [];

  // Перебираем каждый наведенный элемент
  hoveredElements.forEach((element) => {
    // Проверяем, является ли элемент класса "logline"
    if (!element.classList.contains("logline")) {
      console.warn("Наведенный элемент не является логлайном.");
      return;
    }

    // Перемещаем все предыдущие элементы до первого наведенного элемента
    let currentElement = element.previousElementSibling;
    while (currentElement) {
      migratingLoglines.unshift(currentElement.outerHTML); // Добавляем HTML-строку в начало массива
      let siblingToRemove = currentElement;
      currentElement = currentElement.previousElementSibling;
      siblingToRemove.remove(); // Удаляем текущий элемент
    }
  });

  // Проверяем, найдены ли элементы для перемещения
  if (migratingLoglines.length === 0) {
    console.error("Не найдены логлайны для перемещения.");
    return;
  }

  // Находим родительскую главу для наведенных элементов
  let currentChapter = hoveredElements[0].closest(".chapter");
  if (!currentChapter) {
    console.error("Не найдена глава для наведенных элементов.");
    return;
  }

  // Создаем заголовок для новой главы, добавляя знак "+" к существующему заголовку
  let chapterHeader = currentChapter
    .querySelector("h2.date")
    .outerHTML.replace(/(<span class="title">.*?)(<\/span>)/, "$1 +$2");

  // Находим первый элемент класса "logline" в текущей главе
  let firstLogline = currentChapter.querySelector(".logline");
  let firstLoglineTimestamp = firstLogline
    ? firstLogline.getAttribute("timestamp")
    : "";

  // Формируем HTML для новой главы, включая заголовок и перемещенные элементы
  let newChapterHTML = `
    <div class="chapter" timestamp="${firstLoglineTimestamp}">
      ${chapterHeader}
      <div class="content">
        ${migratingLoglines.join("")}
      </div>
    </div>
  `;

  // Вставляем HTML новой главы перед текущей главой
  currentChapter.insertAdjacentHTML("beforebegin", newChapterHTML);

  // Очищаем массив, чтобы избежать повторного использования элементов
  migratingLoglines = [];

  console.log("divideChapter finish");
}

let wrapping = false;

function startWrap() {
  wrapping = true;
  let contentChild = document.querySelector(".content .logline:hover");
  if (contentChild) {
    document.querySelectorAll(".content .start_wrap").forEach((element) => {
      element.classList.remove("start_wrap");
    });

    contentChild.classList.add("start_wrap");
  }
}

function removeRed() {
  let toRemove = document.querySelectorAll(".remove");
  toRemove.forEach((element) => {
    element.remove();
  });
}

function finishWrap(className) {
  if (!wrapping) return; // Если обёртка не начата, выходим

  let contentChild = document.querySelector(".content .logline:hover");
  if (!contentChild) return;

  let content = contentChild.closest("div.content");
  if (!content) return;

  let startWrap = content.querySelector(".start_wrap");
  let finishWrap = content.querySelector(".finish_wrap");
  if (!startWrap) return;

  if (!finishWrap) {
    // Если завёртывание ещё не завершено, добавляем класс и завершаем функцию
    contentChild.classList.add("finish_wrap");
    return;
  }

  startWrap.classList.remove("start_wrap");
  finishWrap.classList.remove("finish_wrap");

  let wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add(className);

  let isWrapping = false;
  let siblings = Array.from(content.children);

  for (let sibling of siblings) {
    if (sibling === startWrap) {
      isWrapping = true;
      // Клонируем начальный элемент обёртки и добавляем его в новую обёртку
      wrapperDiv.appendChild(startWrap.cloneNode(true));
      continue;
    }

    if (sibling === finishWrap) {
      // Клонируем конечный элемент обёртки и добавляем его в новую обёртку
      wrapperDiv.appendChild(finishWrap.cloneNode(true));
      break;
    }

    if (isWrapping) {
      // Клонируем и добавляем соседние элементы между началом и концом обёртки
      let clonedSibling = sibling.cloneNode(true);
      wrapperDiv.appendChild(clonedSibling);
      sibling.remove();
    }
  }

  // Вставляем новую обёртку после начального элемента
  startWrap.parentNode.insertBefore(wrapperDiv, startWrap.nextSibling);

  // Добавляем описание спойлера, если класс равен "spoiler"
  if (className === "spoiler") {
    let spoilerDesc = document.createElement("h1");
    spoilerDesc.classList.add("spoiler_desc");
    spoilerDesc.textContent = "Наведитесь, чтобы раскрыть спойлер";
    wrapperDiv.parentNode.insertBefore(spoilerDesc, wrapperDiv.nextSibling);
  }

  // Удаляем элементы с классом "remove"
  if (className === "remove") {
    removeRed();
  }

  // Удаляем все кроме первого элемента с классом "player"
  if (className === "no-margin") {
    console.log("wrapperDiv: ", wrapperDiv);
    let players = wrapperDiv.querySelectorAll(".player");
    for (let i = 1; i < players.length; i++) {
      players[i].remove();
    }
  }

  startWrap.remove();
  finishWrap.remove();
  wrapping = false; // Сбрасываем флаг обёртки
}

function pasteImg() {
  let elementUnderCursor = document.querySelector(":hover");

  if (elementUnderCursor) {
    let imgDiv = document.createElement("div");
    imgDiv.className = "paper img";

    let imgElement = document.createElement("img");
    imgElement.src = "POSTIMAGE";
    imgDiv.appendChild(imgElement);

    // Определить тип элемента под курсором
    let isPaper = elementUnderCursor.classList.contains("paper");
    let isTranscript = elementUnderCursor.classList.contains("transcript");

    // Вставить картинку в начало .paper или .transcript
    if (isPaper || isTranscript) {
      elementUnderCursor.insertAdjacentElement("afterbegin", imgDiv);
    } else {
      // Вставить картинку перед .paper или .transcript
      elementUnderCursor.insertAdjacentElement("beforebegin", imgDiv);
    }
  }
}

function pasteText() {
  let elementUnderCursor = document.querySelector(":hover");

  if (elementUnderCursor) {
    let textDiv = document.createElement("div");
    textDiv.className = "paper";

    let textElement = document.createElement("p");
    textElement.textContent = "Текст для вставки";
    textDiv.appendChild(textElement);
    elementUnderCursor.insertAdjacentElement("beforebegin", textDiv);
  }
}

// function pasteText() {
//   let elementsUnderCursor = document.querySelectorAll(":hover");

//   for (let element of elementsUnderCursor) {
//     let loglineElement = element.closest("p.logline");

//     if (loglineElement) {
//       let paperDiv = document.createElement("div");
//       paperDiv.className = "paper selected";

//       let textElement = document.createElement("p");
//       textElement.textContent = "Текст для вставки";

//       paperDiv.appendChild(textElement);
//       loglineElement.insertAdjacentElement("beforebegin", paperDiv);

//       break;
//     }
//   }
// }

function createPlayerItem(playerName) {
  let playerItem = document.createElement("li");
  playerItem.textContent = playerName;
  playerItem.classList.add("player");
  return playerItem;
}

let talkingPlayer = ".say > .player, .yell > .player, .virt > .player";

function addColumnToPlayers() {
  let contents = document.querySelectorAll(".content");

  contents.forEach((content) => {
    let players = content.querySelectorAll(talkingPlayer);

    players.forEach((player) => {
      let columnSpan = document.createElement("span");
      columnSpan.classList.add("column");
      columnSpan.textContent = ": ";

      player.appendChild(columnSpan);
    });
  });
}

function addSpaceToEmotePlayers() {
  let contents = document.querySelectorAll(".content");

  contents.forEach((content) => {
    let emotePlayers = content.querySelectorAll(".emote > .player");

    emotePlayers.forEach((player) => {
      let spaceSpan = document.createElement("span");
      spaceSpan.classList.add("space");
      spaceSpan.textContent = " ";

      player.appendChild(spaceSpan);
    });
  });
}

function addCommaAndDotToPlayerList() {
  let actorsDivs = document.querySelectorAll("div.actors");

  actorsDivs.forEach((actorsDiv) => {
    let actors = actorsDiv.querySelectorAll(".player");
    let lastActorindex = actors.length - 1;

    actors.forEach((actor, index) => {
      let commaSpan = document.createElement("span");
      commaSpan.classList.add("comma");
      commaSpan.textContent = ",";
      actor.appendChild(commaSpan);

      if (index === lastActorindex) {
        commaSpan.remove();
        let dotSpan = document.createElement("span");
        dotSpan.classList.add("dot");
        dotSpan.textContent = ".";
        actor.appendChild(dotSpan);
      }
    });
  });
}

function toggleSelectionCSS() {
  var styleLink = document.querySelector("link.style.selection");
  if (styleLink) {
    styleLink.disabled = !styleLink.disabled;
  }
}

function logFilter() {
  let keywordsInput = document.getElementById("keywordsInput").value;
  let oldKeywordsInput = "";
  let keywordsArray = [];
  let removeWords = [];
  let addWords = [];
  let regex = /"([^"]+)"|([^,]+)/g;
  let match;

  console.log("keywordsInput: ", keywordsInput);

  // Если три содержит .virt, то запускается функция searchVirt
  if (keywordsInput.includes(".virt")) {
    searchVirt();
  }

  // Если пусто, то развыделяем всё
  if (keywordsInput.trim() === "") {
    const selectedElements = document.querySelectorAll(".selected");
    selectedElements.forEach((element) => {
      element.classList.remove("selected");
      oldKeywordsInput = "";
    });
    return;
  }

  // Если инпут прежний, делаем скролл
  if (keywordsInput === oldKeywordsInput) {
    scrollToNextSelected();
    return;
  }

  // Разделяем введенные значения по запятым с учетом слов в кавычках

  // Обрабатываем слова в кавычках, удаляя кавычки
  keywordsArray = keywordsArray.map((keyword) => {
    // Если слово заключено в кавычки, удаляем кавычки
    if (keyword.startsWith('"') && keyword.endsWith('"')) {
      return keyword.slice(1, -1); // Удаляем кавычки из слова
    } else {
      return keyword; // Возвращаем слово без изменений
    }
  });

  while ((match = regex.exec(keywordsInput)) !== null) {
    // Выбираем слово из кавычек, если оно есть, иначе выбираем слово без кавычек
    const word = match[1] || match[2];
    // Добавляем слово в массив ключевых слов
    keywordsArray.push(word.trim());
  }

  console.log("keywordsArray: ", keywordsArray);

  // Фильтруем массив ключевых слов, извлекая "анти-слова"
  addWords = keywordsArray.filter((keyword) => {
    // Если ключевое слово начинается с "-", считаем его "анти-словом"
    if (keyword.startsWith("-")) {
      removeWords.push(keyword.substring(1)); // Добавляем "анти-слово" в массив removeWords
      return false; // Возвращаем false, чтобы слово не попало в основной массив ключевых слов
    } else {
      return true;
    } // Возвращаем true для обычных ключевых слов
  });

  // Выводим основной массив ключевых слов в консоль
  console.log("Keywords:", addWords);

  if (addWords.length > 0) {
    // Перебираем каждое ключевое слово из массива addWords
    addWords.forEach((keyword) => {
      // Приводим ключевое слово к нижнему регистру
      const lowerKeyword = keyword.toLowerCase();
      // console.log("Keyword:", lowerKeyword);

      // Выбираем все главы, которые не свернуты
      const chapters = document.querySelectorAll(".chapter");
      // console.log("Chapters:", chapters);

      // Перебираем каждую главу
      chapters.forEach((chapter) => {
        // Выбираем все спаны с классом "logline" внутри контента главы
        const contentSpans = chapter.querySelectorAll(".content > .logline");
        // console.log("Content Spans:", contentSpans);

        // Перебираем каждый спан внутри контента
        contentSpans.forEach((span) => {
          // Получаем текст из спана и приводим его к нижнему регистру
          const textContent = span.textContent.toLowerCase();

          // Проверяем, содержит ли текст ключевое слово
          if (textContent.includes(lowerKeyword)) {
            // console.log("Keyword found in:", span);
            // Если содержит, добавляем класс "selected" к спану
            span.classList.add("selected");
          }
        });
      });
    });
    addWords = [];
  }

  // Сворачиваем все главы на случай, если там не окажется находок
  collapseChapters();

  // Выводим массив "анти-слов" в консоль
  // console.log("Remove words:", removeWords);

  if (removeWords.length > 0) {
    // Перебираем каждое "анти-слово" из массива removeWords
    removeWords.forEach((removeWord) => {
      // Приводим "анти-слово" к нижнему регистру
      let lowerRemoveWord = removeWord.toLowerCase();

      // Выбираем все главы, которые не свернуты
      let chapters = document.querySelectorAll(chapterCollapseStatus);

      // Перебираем каждую главу
      chapters.forEach((chapter) => {
        // Выбираем все спаны с классом "logline" внутри контента главы
        let contentSpans = chapter.querySelectorAll(".content > .logline");

        // Перебираем каждый спан внутри контента
        contentSpans.forEach((span) => {
          // Получаем текст из спана и приводим его к нижнему регистру
          let textContent = span.textContent.toLowerCase();
          // console.log("Span Text Content:", textContent);

          // Проверяем, содержит ли текст "анти-слово"
          if (textContent.includes(lowerRemoveWord)) {
            // Если содержит, удаляем класс "selected" у спана
            span.classList.remove("selected");
          }
        });
      });
    });
    removeWords = [];
  }
  oldKeywordsInput = keywordsInput;
  keywordsInput = "";
  // Разворачиваем все главы с найденными словами
  openselectedChapters();
  scrollToNextSelected();
  if ((removeCollapsedFlag = true)) {
    removeCollapsedChapters();
  }
}

function searchVirt() {
  // Снимаем selected со всех классов
  let selectedElements = document.querySelectorAll(".selected");
  selectedElements.forEach((element) => {
    element.classList.remove("selected");
  });

  // Находим все элементы p.virt и добавляем им класс .selected
  let virtElements = document.querySelectorAll("p.virt");
  virtElements.forEach((element) => {
    element.classList.add("selected");
  });

  // Составляем список индексов всех элементов p.virt
  let indexes = Array.from(virtElements).map((element) => {
    return Array.from(element.parentNode.children).indexOf(element);
  });

  // Скроллим к первому элементу p.virt
  if (indexes.length > 0) {
    scrollToCenter(virtElements[0]); // Изменение здесь
  } else {
  }
  openselectedChapters();
  removeCollapsedChapters();
  removeUnselectedLoglines();
}

let index = 0; // Начальный индекс
let selectedElements = document.querySelectorAll(".selected");

function scrollToNextSelected() {
  // Находим все элементы с классом "selected"
  let selectedElements = document.querySelectorAll(".selected");

  // Если нет выбранных элементов или их количество меньше двух, прерываем выполнение функции
  if (!selectedElements || selectedElements.length < 2) {
    return;
  }

  // Увеличиваем индекс на 1
  index++;

  // Если индекс достиг конца массива, обнуляем его
  if (index >= selectedElements.length) {
    index = 0;
  }

  // Прокручиваем к следующему элементу
  scrollToCenter(selectedElements[index]);
}

function scrollToBookmark() {
  // Находим все элементы с классом "bookmark"
  let selectedElements = document.querySelectorAll(".bookmark");

  // Если нет выбранных элементов, прерываем выполнение функции
  if (!selectedElements) {
    console.log("Не нашёл");
    return;
  }

  // Увеличиваем индекс на 1
  index++;

  // Если индекс достиг конца массива, обнуляем его
  if (index >= selectedElements.length) {
    index = 0;
    console.log("Обнуляю");
  }

  // Прокручиваем к следующему элементу
  scrollToCenter(selectedElements[index]);
}

function postClear() {
  // Создаем массив со значениями, которые мы хотим удалить
  let valuesToRemove = [
    "Вы получаете предмет:",
    "Существу",
    "Настой удачи",
    "похоже, навеселе",
    "кажется, понемногу трезвеет",
    "NPC",
    "Все готовы",
    "Полученный",
    "Другое значение",
    "Другое значение",
    "Другое значение",
    "Другое значение",
    "Другое значение",
    "Другое значение",
    "Другое значение",
  ];

  // Находим все элементы с классом "logline"
  let loglines = document.querySelectorAll(".logline");

  // Проходимся по каждому элементу
  loglines.forEach((logline) => {
    // Проверяем, содержит ли элемент хотя бы одно из значений для удаления
    if (valuesToRemove.some((value) => logline.textContent.includes(value))) {
      // Удаляем элемент, если текст соответствует хотя бы одному из значений
      logline.remove();
    }
  });
}

function toggleCollapse(event) {
  console.log("Переключаю 1");
  let chapter = event.target.closest(".chapter");
  if (chapter) {
    chapter.classList.toggle("collapsed");
  }
}

function testing() {}

function recombineFunction(spanClass) {
  function update(logline, player, content) {
    prevLogline = logline;
    prevPlayer = player;
    prevContent = content;
    // show();
  }

  function drop(logline) {
    prevPlayer = "";
    prevContent = "";
    prevLogline = logline;
  }

  // Закончились функции, пошла основная
  let loglines = document.querySelectorAll(`.content > .logline:not(.paper)`);
  console.log("loglines: ", loglines);

  // Переменные
  let player;
  let prevPlayer;
  let content;
  let prevContent;
  let prevLogline;
  let counter = 0;
  let combined = [];
  let combining;
  let starter;

  // Цикл
  for (let i = 0; i < loglines.length; i++) {
    let logline = loglines[i];

    // Пропускаем неподходящий тип реплик
    /*     if (!logline.classList.contains(spanClass)) {
      drop();
      continue;
    } */

    player = logline.querySelector("span.player");
    content = logline.querySelector("span.say");

    if (!prevPlayer || !prevLogline || !prevContent) {
      update(logline, player, content);
      continue;
    }

    // Игрок совпадает
    if (player.textContent === prevPlayer.textContent) {
      if (!combining) {
        starter = prevLogline;
        starter.classList.add("start_wrap", "selected");
        starter.classList.add("selected");
        combined.push(prevContent);
        combined.push(content);
        combining = true;
      } else {
        combined.push(content);
        prevLogline.classList.add("remove", "selected");
        logline.classList.add("remove", "selected");
        console.log("combined: ", combined);
        // prevLogline.remove();
      }

      console.log("starter: ", starter.textContent);
    }

    // Игрок изменился или случился конец списка
    if (
      (combining && prevPlayer.textContent != player.textContent) ||
      i === loglines.length - 1
    ) {
      combining = false;

      // Подцикл; Перебираем массив combined и добавляем каждый элемент в конец prevLogline
      combined.forEach((element, index) => {
        starter.appendChild(element);

        // Добавляем элемент span для пробела после элемента, кроме последнего
        if (index < combined.length - 1) {
          starter.appendChild(space.cloneNode(true));
        }
      });

      combined = [];
    }

    // Костыль для удаления пустых игроков
    document
      .querySelectorAll("p.logline.say:not(:has(span.say))")
      .forEach((element) => {
        element.remove();
      });

    // Костыль для удаления .start_wrap

    const startWrapElements = document.querySelectorAll(".start_wrap");
    startWrapElements.forEach((element) => {
      element.classList.remove("start_wrap");
    });

    update(logline, player, content);
  }
  removeRed();
}

function scrollToCenter(targetElement) {
  let scrollOptions = {
    top: targetElement.offsetTop - window.innerHeight / 2,
    // behavior: "smooth",
  };

  window.scrollTo(scrollOptions);
}

function removeActorsAndSymbols() {
  let actorsDivs = document.querySelectorAll("div.actors");
  actorsDivs.forEach((actorsDiv) => {
    actorsDiv.remove();
  });

  let spans = document.querySelectorAll(
    "span.comma, span.dot, span.space, span.column"
  );
  spans.forEach((span) => {
    span.remove();
  });

  colorindex = 0;
}

function removeChaptersIfFewPlayers() {
  // Получаем все элементы .chapter
  let chapters = document.querySelectorAll(".chapter");

  // Проходимся по каждому элементу .chapter
  chapters.forEach((chapter) => {
    // Находим родительский элемент .ul.players
    let playerList = chapter.querySelector("ul.players");

    // Проверяем, есть ли список игроков в текущем .chapter
    if (playerList) {
      // Получаем всех игроков в текущем списке
      let players = playerList.querySelectorAll("li.player");

      // Проверяем количество игроков
      if (players.length < 2) {
        // Если игроков меньше двух, удаляем текущий элемент .chapter
        chapter.remove();
      }
    }
  });
}

function fullNames() {
  let players = document.querySelectorAll(".player");
  // console.log("players", players);

  for (let player of players) {
    let playerName = player.textContent.trim();
    // console.log("playerName", playerName);

    // Проверка на наличие двоеточия в конце имени
    // let hasColon = false;
    // if (playerName.endsWith(":")) {
    //   hasColon = true;
    //   playerName = playerName.slice(0, -1); // Удаляем двоеточие
    // }

    let playerDataEntry = playerData.find((data) => data[0] === playerName);
    if (playerDataEntry) {
      player.textContent = playerDataEntry[2];
      // console.log("player.textContent", player.textContent);

      // Добавляем двоеточие обратно, если оно было
      // if (hasColon) {
      //   player.textContent += ": ";
      // }
      // else {
      //   player.textContent += " ";
      // }
    }
  }
  console.log("Фамилии заменены");
}

function playerList() {
  // Перебор всех элементов .chapter
  const chapters = document.querySelectorAll(".chapter");
  for (const chapter of chapters) {
    // Создание набора уникальных имен
    const uniquePlayerList = new Set();

    // Получение всех элементов .player в .content
    const players = chapter.querySelectorAll(talkingPlayer);

    // Добавление имен игроков в набор
    for (const player of players) {
      const playerName = player.textContent.trim();
      uniquePlayerList.add(playerName);
    }

    // Создание структуры .actors
    const actors = document.createElement("div");
    actors.classList.add("actors");

    // Разделение на игроков и NPC
    const playersList = document.createElement("div");
    playersList.classList.add("players");
    const npcsList = document.createElement("div");
    npcsList.classList.add("npcs");

    // Проверка имени игрока
    for (const playerName of uniquePlayerList) {
      const playerItem = document.createElement("div");
      playerItem.classList.add("player");
      playerItem.textContent = playerName;

      let isPlayer = playerData.some((player) => player[0] === playerName);
      let isNpc = !isPlayer && npcData.some((npc) => npc[0] === playerName);

      // Дополнение:
      if (!isPlayer && !isNpc) {
        if (!/\s|-/.test(playerName)) {
          isPlayer = true;
        } else {
          isNpc = true;
        }
      }

      if (isPlayer) {
        playersList.appendChild(playerItem);
      } else if (isNpc) {
        npcsList.appendChild(playerItem);
      } else {
        console.log(`${playerName} не найден ни в playerData, ни в npcData`);
      }
    }

    // Добавление списков в .actors
    actors.appendChild(playersList);
    actors.appendChild(npcsList);

    // Вставка .actors
    chapter.querySelector("h2.date").after(actors);
  }
  colorizeList("players");
  colorizeList("npcs");
}

function colorizeList(listType) {
  const elements = document.querySelectorAll(`.${listType} .player`);
  let colorIndex = 0;

  for (const element of elements) {
    const name = element.textContent.trim();
    const data = listType === "players" ? playerData : npcData; // Выбор данных по типу списка
    const info = data.find((item) => item[0] === name);

    if (info && info[1]) {
      element.classList.add(info[1]);
    } else {
      const randomColor = randomColors[colorIndex++];
      if (colorIndex === randomColors.length) {
        colorIndex = 0;
      }
      element.classList.add(randomColor);
    }
  }
}

function gatherUniquePlayersAndInsert() {
  const uniquePlayers = new Set();

  const allPlayers = document.querySelectorAll(".players .player");

  allPlayers.forEach((player) => {
    uniquePlayers.add(player.cloneNode(true));
  });

  console.log(`Найдено ${uniquePlayers.size} уникальных игроков`);

  const actors = document.createElement("div");
  actors.classList.add("actors");

  const players = document.createElement("div");
  players.classList.add("players");

  for (const player of uniquePlayers) {
    players.appendChild(player);
  }

  const totalDuration = document.querySelector(".totalduration");
  totalDuration.appendChild(actors);
  actors.appendChild(players);
}

function removeDoublesAtTotalActors() {
  // Получаем элемент .totalduration .players
  const playersElement = document.querySelector(".totalduration .players");

  // Если он существует
  if (playersElement) {
    // Создаем пустой массив для хранения уникальных игроков
    const uniquePlayers = [];

    // Получаем все элементы .player
    const allPlayers = playersElement.querySelectorAll(".player");

    // Перебираем каждого игрока
    allPlayers.forEach((player) => {
      const playerName = player.textContent.trim();

      // Проверяем, существует ли имя игрока в массиве
      const playerExists = uniquePlayers.some(
        (existingPlayer) => existingPlayer === playerName
      );

      // Если имя игрока не существует, добавляем его
      if (!playerExists) {
        uniquePlayers.push(playerName);
      }
    });

    // Очищаем содержимое .totalduration .players
    playersElement.innerHTML = "";

    // Вставляем элементы из uniquePlayers
    uniquePlayers.forEach((playerName) => {
      const newPlayer = document.createElement("div");
      newPlayer.classList.add("player");
      newPlayer.textContent = playerName;
      playersElement.appendChild(newPlayer);
    });
  }

  colorizeList("players");
}

function synchronizePlayerColors() {
  const chapters = document.querySelectorAll("div.chapter");

  const playerColorMap = new Map();

  chapters.forEach((chapter) => {
    const actorsPlayers = chapter.querySelectorAll(".actors .player");

    actorsPlayers.forEach((actorPlayer) => {
      const playerName = actorPlayer.textContent.trim();
      const secondClass = Array.from(actorPlayer.classList)[1];

      playerColorMap.set(playerName, secondClass);
    });

    const contentPlayers = chapter.querySelectorAll(".content .player");
    contentPlayers.forEach((contentPlayer) => {
      const playerName = contentPlayer.textContent.trim();

      const secondClass = playerColorMap.get(playerName);

      if (secondClass) {
        // Удаление всех имеющихся классов у игрока
        contentPlayer.className = "player " + secondClass;
      }
    });
  });
}

function recolorizePlayers() {
  colorizeList("players");
  colorizeList("npcs");
}

function dropSelected() {
  // Находим все элементы с классом "selected" и "start_wrap"
  const selectedElements = document.querySelectorAll(".selected");
  const startWrapElements = document.querySelectorAll(".start_wrap");

  // Создаем объединенный список элементов
  const allElements = [...selectedElements, ...startWrapElements];

  // Удаляем классы из всех найденных элементов
  allElements.forEach((element) => {
    element.classList.remove("selected", "start_wrap");
  });

  console.log('Классы "selected" и "start_wrap" удалены из элементов.');
}
