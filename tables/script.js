function formatHTML() {
  cleanText();
  splitSessions();
  wrapChapters();
  findLoglinesAndConvertToTranscript();
  updateAll();
  chapterReverse();
  //postClear();
}

function updateAll() {
  removeActorsAndSymbols();
  removePlayersWithDungeonMasterNames();
  playerList();
  // removeChaptersIfFewPlayers();
  processPlayerNames();
  addTimeToChapter();
  synchronizePlayerColors();
  calculateTotalDuration();
  gatherPlayersAndInsert();
  addSpaceToEmotePlayers();
  addColumnToPlayers();
  addCommaAndDotToPlayerList();
  combineFunctions();
  // recombineFunctions();
}

function combineFunctions() {
  console.log("CombineFunctions");
  combineSay("emote");
  combineSay("say");
  combineSay("virt");
  combineSay("yell");
  combineSay("story");
  sayToEmote();
  virtToSay();
  removeDashes();
  // thirdPerson("emote", "say");
  // thirdPerson("virt", "say");
  // emoteToSay();
  // thirdPerson("say", "emote");
  // thirdPerson("yell", "emote");
  console.log("End");
}

console.log("main, 03-03-2024");
toggleSelectionCSS();

let combineDelay = 5 * 1000;
let hoursBetweenSessions = 0.5;
let showtimestamps = false;

let searchWithinCollapsed = true;
let chapterCollapseStatus = searchWithinCollapsed
  ? ".chapter"
  : ".chapter:not(.collapsed)";

let dash = document.createElement("span");
dash.classList.add("dash");
dash.textContent = " — ";
dash = dash.outerHTML;

// Пробел
const space = document.createElement("span");
space.classList.add("space");
space.textContent = " ";

const playerData = [
  ["Фэрриан", "rogue", "Фэрриан Гардсон"],
  ["Малет", "shaman", "Малет Трант"],
  ["Роуз", "hunter", "Арчибальд Роуз"],
  ["Аммель", "mage", "Рэдрик Аммель"],
  ["Маларон", "priest", "Мал’арон Берёзовый Лист"],
  ["Ананита", "hunter", "Ананита Астор"],
  ["Сырорезка", "yellow", "Джули"],
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
];

const npcData = [
  ["Рыцарь-лейтенант Сиглим Сталекрут", "yellow", "Сиглим Сталекрут"],
  ["Дробитель", "death-knight", "Дробитель"],
  ["Сэр Сэмьюэл Лексон", "demon-hunter", "Сэр Сэмьюэл Дж. Лексон"],
  ["Фэрриан Гардсон", "rogue", "Фэрриан Гардсон"],
  ["Рядовой Равенхольт", "shaman"],
  ["Гнолл"],
  ["Баззерс"],
  ["Охранник"],
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
  ["Глашатай"],
  ["Глашатай"],
  ["Глашатай"],
  ["Глашатай"],
  ["Глашатай"],
  ["Глашатай"],
  ["Глашатай"],
  ["Глашатай"],
  ["Глашатай"],
  ["Глашатай"],
  ["Глашатай"],
];

const randomColors = [
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

async function handleTxtFile(file) {
  chatlog.innerHTML = "";

  const text = await file.text();

  importTxt(text);
}

async function handleHtmlFile(file) {
  const htmlText = await file.text();

  const parser = new DOMParser();
  const htmlDocument = parser.parseFromString(htmlText, "text/html");
  const newChatlog = htmlDocument.getElementById("chatlog");

  if (newChatlog) {
    chatlog.innerHTML = newChatlog.innerHTML;
  } else {
    // console.error("Элемент #chatlog не найден в HTML файле");
  }
}

fileInputTxt = document.getElementById("file-input-txt");
fileInputTxt.addEventListener("change", handleFileInput);

function handleFileInput(event) {
  const file = event.target.files[0];

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
  const [date, time] = timestamp.split(" ");
  const [month, day] = date.split("/");
  const [hoursMinutesSeconds, milliseconds] = time.split(".");
  const [hours, minutes, seconds] = hoursMinutesSeconds.split(":");

  const isoTimestamp = `${new Date().getFullYear()}-${month.padStart(
    2,
    "0"
  )}-${day.padStart(2, "0")}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

  return isoTimestamp;
}

function importTxt(text) {
  const logLines = text.split("\n");
  const chatlog = document.querySelector("#chatlog");
  for (const line of logLines) {
    if (!/^\d+\/\d+\s+\d{2}:\d{2}:\d{2}\.\d{3}\s+/.test(line)) continue; // Пропускаем строки, не соответствующие формату временной метки
    const timestampMatch = line.match(/^(\S+\s\S+)/);
    const timestamp = timestampMatch ? timestampMatch[1] : "";
    const loglineBody = line.replace(timestamp, "").trim();
    if (timestamp) {
      const p = document.createElement("p");
      p.setAttribute("timestamp", convertTimestamp(timestamp));
      p.className = "logline";
      p.textContent = loglineBody;
      chatlog.appendChild(p);
      if (showtimestamps) {
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
        if (
          timeDifference > hoursBetweenSessions * 60 * 60 * 1000 ||
          timeDifference < 0
        ) {
          //   "if (timeDifference > 1 * 60 * 60 * 1000 || timeDifference < 0) {"
          // );
          const dateHeader = document.createElement("h2");
          dateHeader.className = "date";
          const formattedDate = getFormattedDate(timestamp);
          dateHeader.innerHTML = `<span class="title">Запись</span> <span class="day">${formattedDate}</span>`;
          paragraph.parentNode.insertBefore(dateHeader, paragraph);
        }
      } else {
        const dateHeader = document.createElement("h2");
        dateHeader.className = "date";
        const formattedDate = getFormattedDate(timestamp);
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
  const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]}, `;
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

function insertContentDiv(contentDiv, nextElement) {
  const container = nextElement ? nextElement.parentNode : document.body;
  container.insertBefore(contentDiv, nextElement);
}

function wrapChapters() {
  const chatlog = document.querySelector("#chatlog");
  if (!chatlog) {
    console.error("Элемент #chatlog не найден.");
    return;
  }

  const dates = chatlog.querySelectorAll("h2.date");
  if (!dates.length) {
    console.error("Не найдены элементы h2.date.");
    return;
  }

  let chapters = [];

  for (const date of dates) {
    let nextElement = date.nextElementSibling;
    const chapterElements = [date];
    let firstPTimestamp = null;

    while (nextElement && nextElement.tagName === "P") {
      if (!firstPTimestamp) {
        firstPTimestamp = nextElement.getAttribute("timestamp");
      }
      chapterElements.push(nextElement);
      nextElement = nextElement.nextElementSibling;
    }

    const chapterDiv = document.createElement("div");
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
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("content");

    const paragraphs = chapter.querySelectorAll("p");

    paragraphs.forEach((paragraph) => {
      contentContainer.appendChild(paragraph);
    });

    chapter.appendChild(contentContainer);
  });
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
  const chapters = divideChaptersByInterval(text);
  for (const [chapterTitle, chapterLines] of Object.entries(chapters)) {
    const chapter = createChapterElement(chapterTitle, chapterLines);
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
    /(<p.*?"logline)">(.*)\sговорит:\s(.*?)<\/p>\n/g,
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

  chatlogHTML = chatlogHTML.replace(/[—–-]\s/g, "— "); // Тире в процессе
  chatlogHTML = chatlogHTML.replace(/\|\d+\-\d+\((.*?)\)/g, "$1"); // смотрит на |3-3(Халвиэль)
  chatlogHTML = chatlogHTML.replace(/\|[a-z]+/g, ""); // HEX-код
  chatlogHTML = chatlogHTML.replace(/say">\s*[—–-]\s*/g, 'say">'); // Тире в начале
  // chatlogHTML = chatlogHTML.replace(/\[Объявление рейду\].*?\: /g, ""); // Объявления рейду
  chatlogHTML = chatlogHTML.replace(/&nbsp;/g, " "); // &nbsp;

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
      /([!?.,:])(\s—\s.*?[!?.,:](\s—\s|<\/span>))/g,
      '$1<span class="emote">$2</span>'
    );
    sayText = sayText.replace(
      /<\/span><span class="say">\s*[—–-]\s*/g,
      '</span><span class="say">'
    );
    say[i].innerHTML = sayText;
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
  const paragraphs = chapterElement.find("p");
  const selectedParagraphs = paragraphs.filter(".selected");
  if (selectedParagraphs.length > 0) {
    const firstindex = paragraphs.index(selectedParagraphs.first());
    const lastindex = paragraphs.index(selectedParagraphs.last());
    paragraphs.slice(0, firstindex).remove();
    paragraphs.slice(lastindex + 1).remove();
  }
  addTimeToChapter();
}

function removeShortChapters() {
  const chapters = document.querySelectorAll(".chapter");
  chapters.forEach((chapter) => {
    const durationTimeSpan = chapter.querySelector(".durationtime");
    if (durationTimeSpan) {
      const durationAttribute = durationTimeSpan.getAttribute("duration");
      const [hours, minutes] = durationAttribute.split(":").map(Number);
      const totalMinutes = hours * 60 + minutes;
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
  const targetElement = document.querySelector(".scroll");
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
  const existingTotalDuration = document.querySelector(
    "#chatlog .totalduration"
  );
  if (existingTotalDuration) {
    // console.log("Удаляем существующую общую продолжительность...");
    existingTotalDuration.remove();
  }

  const durationElements = document.querySelectorAll(
    "#chatlog span.durationtime"
  );

  let totalMinutes = 0;

  durationElements.forEach((element) => {
    const durationText = element.getAttribute("duration");
    // console.log(`Найдена продолжительность: ${durationText}`);
    const [hours, minutes] = durationText.split(":").map(Number);
    // console.log(`Часы: ${hours}, Минуты: ${minutes}`);
    totalMinutes += hours * 60 + minutes;
  });

  // console.log(`Общая продолжительность в минутах: ${totalMinutes}`);

  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  // console.log( `Общее количество часов: ${totalHours}, Оставшиеся минуты: ${remainingMinutes}` );

  const totalDurationHeading = document.createElement("h2");
  totalDurationHeading.textContent = `Всего наиграно ${totalHours}ч ${remainingMinutes}мин`;

  const totalDurationChapter = document.createElement("div");
  totalDurationChapter.classList.add("totalduration");
  totalDurationChapter.appendChild(totalDurationHeading);

  const chatlog = document.querySelector("#chatlog");
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
  const loglines = document.querySelectorAll("p.logline");
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

const keepGroupCheckbox = document.getElementById("keepGroupCheckbox");
let keepGroup = true;

keepGroupCheckbox.addEventListener("change", function () {
  keepGroup = this.checked;
});

const keepRaidCheckbox = document.getElementById("keepRaidCheckbox");
let keepRaid = false;

keepRaidCheckbox.addEventListener("change", function () {
  keepRaid = this.checked;
});

const keepRaidWarningCheckbox = document.getElementById(
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
  const chapters = document.querySelectorAll(".chapter:not(.collapsed)");

  chapters.forEach((chapter) => {
    // Внутри каждого .chapter находим все p.logline, которые не .selected
    const unselectedLoglines = chapter.querySelectorAll(
      "p.logline:not(.selected):not(.paper):not(.transcript)"
    );

    // Удаляем найденные ненужные строки
    unselectedLoglines.forEach((logline) => {
      logline.remove();
    });
  });
}

function addTimeToChapter() {
  const chapters = document.querySelectorAll(".chapter");
  chapters.forEach((chapter) => {
    const dateHeader = chapter.querySelector("h2.date");
    const firstParagraph = chapter.querySelector("p[timestamp]:first-of-type");
    const lastParagraph = chapter.querySelector("p[timestamp]:last-of-type");

    if (dateHeader && firstParagraph && lastParagraph) {
      dateHeader.querySelector(".starttime")?.remove();
      dateHeader.querySelector(".durationtime")?.remove();

      const startTime = new Date(firstParagraph.getAttribute("timestamp"));
      const endTime = new Date(lastParagraph.getAttribute("timestamp"));
      const formatTime = (time) => {
        const hours = String(time.getUTCHours()).padStart(2, "0");
        const minutes = String(time.getUTCMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
      };

      const startTimeString = formatTime(startTime);

      const durationTime = endTime - startTime;
      const durationHours = Math.floor(durationTime / (1000 * 60 * 60));
      const durationMinutes = Math.floor(
        (durationTime % (1000 * 60 * 60)) / (1000 * 60)
      );

      const startTimeSpan = document.createElement("span");
      startTimeSpan.classList.add("starttime");
      startTimeSpan.textContent = startTimeString;
      dateHeader.appendChild(startTimeSpan);

      const durationTimeSpan = document.createElement("span");
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
  const now = new Date();
  localOffset = now.getTimezoneOffset();
  localDifference = localOffset / 60;
  moscowDifference = localDifference + 3;
  serverDifference = localDifference + 1;
  // console.log( "Разница между вашим местным временем и UTC (в часах):", localDifference );
  // console.log( "Разница между вашим местным временем и московским временем (в часах):", moscowDifference );
  // console.log( "Разница между вашим местным временем и серверным временем (в часах):", serverDifference );
}

function processTimestamp() {
  const chapter = document.querySelector(".chapter");

  const timestampValue = chapter.getAttribute("timestamp");

  // console.log("Введенный таймштамп:", timestampValue);

  const dateObject = new Date(timestampValue);
  const hours = ("0" + dateObject.getUTCHours()).slice(-2);
  const minutes = ("0" + dateObject.getUTCMinutes()).slice(-2);
  const formattedTimestamp = hours + ":" + minutes;

  // console.log("Отформатированный таймштамп:", formattedTimestamp);
}

function convertLoglineToTranscript(loglineElement) {
  const timestamp = new Date(loglineElement.getAttribute("timestamp"));
  const day = timestamp.getDate();
  const monthNames = [
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
  const monthindex = timestamp.getMonth();
  const formattedDate = day + " " + monthNames[monthindex];
  const hours = ("0" + timestamp.getUTCHours()).slice(-2);
  const minutes = ("0" + timestamp.getUTCMinutes()).slice(-2);
  const formattedTimestamp = formattedDate + " " + hours + ":" + minutes;
  let playerName = loglineElement.querySelector(".player");
  loglineElement.setAttribute("timestamp", timestamp.toISOString());
  playerName.remove();
  loglineElement.textContent = loglineElement.textContent.replace(
    /^.+([Зз]апись|\d\d[:.]\d\d)[,.!: ]/g,
    ""
  );
  if (
    loglineElement.classList.contains("say") ||
    loglineElement.classList.contains("yell") ||
    loglineElement.classList.contains("virt")
  ) {
    playerName = playerName.textContent.slice(0, -2);
  } else {
    playerName = playerName.textContent.slice(0, -1);
  }

  const transcriptRecordHTML = `
    <div class="record">
      <p>Время<span>25 ОТП, ${formattedDate}, ${hours}:${minutes}</span></p>
      <p>Автор<span>${playerName}</span></p>
    </div>
    <span class="speech">${loglineElement.textContent.trim()}</span>
  `;

  const transcriptElement = document.createElement("div");
  transcriptElement.classList.add("transcript");
  transcriptElement.innerHTML = transcriptRecordHTML;

  transcriptElement.setAttribute("timestamp", timestamp.toISOString());

  loglineElement.replaceWith(transcriptElement);

  loglineElement.scrollIntoView({ behavior: "smooth", block: "center" });
}

function findLoglinesAndConvertToTranscript() {
  const loglineElements = document.querySelectorAll("p.logline.say");

  loglineElements.forEach((loglineElement) => {
    if (/запись/i.test(loglineElement.textContent)) {
      convertLoglineToTranscript(loglineElement);
    }
  });
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && event.target.id === "keywordsInput") {
    logFilter();
  } else if (!wrapping && event.key === "Delete") {
    deleteElementUnderCursor();
  } else if (event.key === "p" || event.key === "з") {
    togglePaperClass();
  } else if (event.key === "ArrowLeft") {
    pasteText();
  } else if (["[", "х"].includes(event.key) && event.ctrlKey) {
    deleteElements("before");
  } else if (["]", "ъ"].includes(event.key) && event.ctrlKey) {
    deleteElements("after");
  } else if (event.key === "ArrowRight") {
    pasteImg();
  } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    moveElement(event);
  } else if (["m", "ь"].includes(event.key)) {
    const hoveredLogline = document.querySelector(".logline:hover");
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
  const elementsUnderCursor = document.querySelectorAll(":hover");
  elementsUnderCursor.forEach((element) => {
    const loglineParent = element.closest(".logline");
    const paperParent = element.closest(".paper");
    const transcriptParent = element.closest(".transcript");
    const playerParent = element.closest(".player");
    const dateParent = element.closest(".chapter");

    if (
      dateParent &&
      (element.tagName === "H2" || element.matches("h2.date"))
    ) {
      dateParent.classList.toggle("collapsed");
    }

    if (loglineParent || paperParent || transcriptParent || playerParent) {
      element.classList.toggle("selected");
    }
  });
}

function deleteElementUnderCursor() {
  const elementsUnderCursor = document.querySelectorAll(":hover");
  elementsUnderCursor.forEach((element) => {
    const loglineParent = element.closest(".content > *");
    const dateHeadingParent = element.closest("h2.date");

    if (loglineParent) {
      loglineParent.remove();
    } else if (dateHeadingParent) {
      const chapterParent = dateHeadingParent.closest(".chapter");
      if (chapterParent) {
        chapterParent.remove();
      }
    }
  });
}

function togglePaperClass() {
  const elementsUnderCursor = document.querySelectorAll(":hover");
  elementsUnderCursor.forEach((element) => {
    if (element.tagName === "P") {
      element.classList.toggle("paper");
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

function deleteElements(position) {
  const hover = document.querySelectorAll(".content > :hover, h2.date:hover");

  hover.forEach((element) => {
    if (element.tagName.toLowerCase() === "h2") {
      const closestChapter = element.closest(".chapter");
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
      const contentContainer = element.closest(".content");
      if (!contentContainer) return;

      const targetElement = element;
      let currentElement;
      if (position === "before") {
        currentElement = targetElement.previousElementSibling;
      } else if (position === "after") {
        currentElement = targetElement.nextElementSibling;
      }

      while (currentElement) {
        const siblingToRemove = currentElement;
        if (position === "before") {
          currentElement = currentElement.previousElementSibling;
        } else if (position === "after") {
          currentElement = currentElement.nextElementSibling;
        }
        siblingToRemove.remove();
      }
    }
  });
}

function divideChapter() {
  console.log("divideChapter start");

  // Получаем все элементы, над которыми произведено наведение, внутри .content
  const hoveredElements = document.querySelectorAll(".content > :hover");

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
      const siblingToRemove = currentElement;
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
  const currentChapter = hoveredElements[0].closest(".chapter");
  if (!currentChapter) {
    console.error("Не найдена глава для наведенных элементов.");
    return;
  }

  // Создаем заголовок для новой главы, добавляя знак "+" к существующему заголовку
  const chapterHeader = currentChapter
    .querySelector("h2.date")
    .outerHTML.replace(/(<span class="title">.*?)(<\/span>)/, "$1 +$2");

  // Находим первый элемент класса "logline" в текущей главе
  const firstLogline = currentChapter.querySelector(".logline");
  const firstLoglineTimestamp = firstLogline
    ? firstLogline.getAttribute("timestamp")
    : "";

  // Формируем HTML для новой главы, включая заголовок и перемещенные элементы
  const newChapterHTML = `
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
  const contentChild = document.querySelector(".content .logline:hover");
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

  const contentChild = document.querySelector(".content .logline:hover");
  if (!contentChild) return;

  const content = contentChild.closest("div.content");
  if (!content) return;

  const startWrap = content.querySelector(".start_wrap");
  const finishWrap = content.querySelector(".finish_wrap");
  if (!startWrap) return;

  if (!finishWrap) {
    // Если завёртывание ещё не завершено, добавляем класс и завершаем функцию
    contentChild.classList.add("finish_wrap");
    return;
  }

  startWrap.classList.remove("start_wrap");
  finishWrap.classList.remove("finish_wrap");

  const wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add(className);

  let isWrapping = false;
  const siblings = Array.from(content.children);

  for (const sibling of siblings) {
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
      const clonedSibling = sibling.cloneNode(true);
      wrapperDiv.appendChild(clonedSibling);
      sibling.remove();
    }
  }

  // Вставляем новую обёртку после начального элемента
  startWrap.parentNode.insertBefore(wrapperDiv, startWrap.nextSibling);

  // Добавляем описание спойлера, если класс равен "spoiler"
  if (className === "spoiler") {
    const spoilerDesc = document.createElement("h1");
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
    const players = wrapperDiv.querySelectorAll(".player");
    for (let i = 1; i < players.length; i++) {
      players[i].remove();
    }
  }

  startWrap.remove();
  finishWrap.remove();
  wrapping = false; // Сбрасываем флаг обёртки
}

function pasteImg() {
  const elementUnderCursor = document.querySelector(".content :hover");

  if (elementUnderCursor) {
    const imgDiv = document.createElement("div");
    imgDiv.className = "paper img";

    const imgElement = document.createElement("img");
    imgElement.src = "POSTIMAGE";
    imgDiv.appendChild(imgElement);
    elementUnderCursor.insertAdjacentElement("beforebegin", imgDiv);
  }
}

function pasteText() {
  const elementUnderCursor = document.querySelector(".content :hover");

  if (elementUnderCursor) {
    const textDiv = document.createElement("div");
    textDiv.className = "paper";

    const textElement = document.createElement("p");
    textElement.textContent = "Текст для вставки";
    textDiv.appendChild(textElement);
    elementUnderCursor.insertAdjacentElement("beforebegin", textDiv);
  }
}

// function pasteText() {
//   const elementsUnderCursor = document.querySelectorAll(".content :hover");

//   for (const element of elementsUnderCursor) {
//     const loglineElement = element.closest("p.logline");

//     if (loglineElement) {
//       const paperDiv = document.createElement("div");
//       paperDiv.className = "paper selected";

//       const textElement = document.createElement("p");
//       textElement.textContent = "Текст для вставки";

//       paperDiv.appendChild(textElement);
//       loglineElement.insertAdjacentElement("beforebegin", paperDiv);

//       break;
//     }
//   }
// }

const uniquePlayers = new Set();
function createPlayerItem(playerName) {
  const playerItem = document.createElement("li");
  playerItem.textContent = playerName;
  playerItem.classList.add("player");
  return playerItem;
}

function playerList() {
  // Функция для добавления игрока в список игроков
  function addPlayer(name, playerList, uniquePlayers) {
    const listItem = document.createElement("li");
    listItem.textContent = name;
    listItem.classList.add("player");
    playerList.appendChild(listItem);
    uniquePlayers.add(name);
  }

  // Функция для добавления NPC в список NPC
  function addNPC(name, npcList, uniquePlayers) {
    const listItem = document.createElement("li");
    listItem.textContent = name;
    listItem.classList.add("player");
    npcList.appendChild(listItem);
    uniquePlayers.add(name);
  }

  // Находим все главы
  const chapters = document.querySelectorAll(".chapter");

  // Проходимся по каждой главе
  chapters.forEach((chapter) => {
    // Находим все контенты в главе
    const contents = chapter.querySelectorAll(".content");

    // Проходимся по каждому контенту
    contents.forEach((content) => {
      // Создаем обертку для актеров
      const actorsDiv = document.createElement("div");
      actorsDiv.classList.add("actors");
      chapter.insertBefore(actorsDiv, content);

      // Создаем список игроков и NPC
      const playerList = document.createElement("ul");
      playerList.classList.add("players");
      actorsDiv.appendChild(playerList);

      const npcList = document.createElement("ul");
      npcList.classList.add("npcs");
      actorsDiv.appendChild(npcList);

      // Создаем множество для хранения уникальных имен игроков и NPC
      const uniquePlayers = new Set();

      // Находим всех игроков в текущем контенте
      const playerSpans = content.querySelectorAll(talkingPlayer);

      // Проходимся по каждому игроку
      playerSpans.forEach((playerSpan) => {
        const name = playerSpan.textContent.trim();
        // Проверяем, не было ли уже добавлено такое имя
        if (!uniquePlayers.has(name)) {
          // Проверяем, является ли игрок игроком персонажа или NPC
          if (playerData.some((player) => player.includes(name))) {
            addPlayer(name, playerList, uniquePlayers);
          } else if (npcData.some((npc) => npc.includes(name))) {
            addNPC(name, npcList, uniquePlayers);
          } else if (!name.includes(" ") && !name.includes("-")) {
            // Если имя не содержит пробелы и тире, считаем его игроком
            addPlayer(name, playerList, uniquePlayers);
          } else {
            // В противном случае считаем его NPC
            addNPC(name, npcList, uniquePlayers);
          }
        }
      });
    });
  });
}

const talkingPlayer = ".say > .player, .yell > .player, .virt > .player";

function addColumnToPlayers() {
  const contents = document.querySelectorAll(".content");

  contents.forEach((content) => {
    const players = content.querySelectorAll(talkingPlayer);

    players.forEach((player) => {
      const columnSpan = document.createElement("span");
      columnSpan.classList.add("column");
      columnSpan.textContent = ": ";

      player.appendChild(columnSpan);
    });
  });
}

function addSpaceToEmotePlayers() {
  const contents = document.querySelectorAll(".content");

  contents.forEach((content) => {
    const emotePlayers = content.querySelectorAll(".emote > .player");

    emotePlayers.forEach((player) => {
      const spaceSpan = document.createElement("span");
      spaceSpan.classList.add("space");
      spaceSpan.textContent = " ";

      player.appendChild(spaceSpan);
    });
  });
}

function synchronizePlayerColors() {
  const chapters = document.querySelectorAll("div.chapter");

  const playerColorMap = new Map();

  chapters.forEach((chapter) => {
    const actorsPlayers = chapter.querySelectorAll(".actors li.player");

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

function addCommaAndDotToPlayerList() {
  const actorsDivs = document.querySelectorAll("div.actors");

  actorsDivs.forEach((actorsDiv) => {
    const actors = actorsDiv.querySelectorAll("li.player");
    const lastActorindex = actors.length - 1;

    actors.forEach((actor, index) => {
      const commaSpan = document.createElement("span");
      commaSpan.classList.add("comma");
      commaSpan.textContent = ",";
      actor.appendChild(commaSpan);

      if (index === lastActorindex) {
        commaSpan.remove();
        const dotSpan = document.createElement("span");
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

function gatherPlayersAndInsert() {
  const totalPlayers = document.querySelector(
    ".totalduration > .actors > .players"
  );
  if (totalPlayers) {
    totalPlayers.remove();
  }

  // Собираем все элементы .players > li со всей страницы
  const allPlayers = document.querySelectorAll(".players > li");

  // Проходимся по каждому элементу и удаляем все <span> из его содержимого
  allPlayers.forEach((player) => {
    player.innerHTML = player.innerHTML.replace(/<span[^>]*>.*?<\/span>/g, "");
  });
  const totalUniquePlayers = removeDuplicates(allPlayers);
  // Создаем элемент div.players
  const actorsUI = document.createElement("div");
  actorsUI.classList.add("actors");

  // Перебираем найденные игроки и добавляем их в ul.players

  totalUniquePlayers.forEach((player) => {
    actorsUI.appendChild(player);
  });

  // Находим элемент div.totalduration
  const totalDurationChapter = document.querySelector(
    "#chatlog .totalduration"
  );

  if (totalDurationChapter) {
    // Вставляем ul.players в начало div.totalduration
    totalDurationChapter.insertBefore(actorsUI, totalDurationChapter.lastChild);
  } else {
  }
}

function removeDuplicates(array) {
  // Создаем набор уникальных элементов для определения уникальности
  const uniquePlayers = new Set();

  // Добавляем элементы в набор
  array.forEach((player) => {
    const playerName = player.textContent.trim();
    const existingPlayer = Array.from(uniquePlayers).find(
      (item) => item.textContent.trim() === playerName
    );

    if (!existingPlayer) {
      uniquePlayers.add(player.cloneNode(true)); // Клонируем элемент и добавляем его в набор
    }
  });

  // Преобразуем набор обратно в массив элементов
  return Array.from(uniquePlayers);
}

const dungeonMasterMap = new Map([
  ["Фг", true],
  ["Кей", true],
  ["Минор", true],
  ["Эдита", true],
  ["Кей", true],
  ["Кей", true],
  ["Кей", true],
  ["Кей", true],
  ["Кей", true],
  ["Кей", true],
  ["Кей", true],
  ["Кей", true],
]);

// Функция для удаления всех игроков с именами ДМов
function removePlayersWithDungeonMasterNames() {
  const players = document.querySelectorAll(".player");
  players.forEach((player) => {
    const playerName = player.textContent.trim();
    if (dungeonMasterMap.has(playerName)) {
      player.remove();
    }
  });
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
      const chapters = document.querySelectorAll(chapterCollapseStatus);
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
      const lowerRemoveWord = removeWord.toLowerCase();

      // Выбираем все главы, которые не свернуты
      const chapters = document.querySelectorAll(chapterCollapseStatus);

      // Перебираем каждую главу
      chapters.forEach((chapter) => {
        // Выбираем все спаны с классом "logline" внутри контента главы
        const contentSpans = chapter.querySelectorAll(".content > .logline");

        // Перебираем каждый спан внутри контента
        contentSpans.forEach((span) => {
          // Получаем текст из спана и приводим его к нижнему регистру
          const textContent = span.textContent.toLowerCase();
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
  removeCollapsedChapters();
}

function searchVirt() {
  // Снимаем selected со всех классов
  const selectedElements = document.querySelectorAll(".selected");
  selectedElements.forEach((element) => {
    element.classList.remove("selected");
  });

  // Находим все элементы p.virt и добавляем им класс .selected
  const virtElements = document.querySelectorAll("p.virt");
  virtElements.forEach((element) => {
    element.classList.add("selected");
  });

  // Составляем список индексов всех элементов p.virt
  const indexes = Array.from(virtElements).map((element) => {
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
  const selectedElements = document.querySelectorAll(".selected");

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

function postClear() {
  // Создаем массив со значениями, которые мы хотим удалить
  const valuesToRemove = ["Существу", "Настой удачи", "Другое значение"];

  // Находим все элементы <p> с классом logline
  const loglines = document.querySelectorAll("p.logline");

  // Перебираем найденные элементы
  loglines.forEach((element) => {
    // Проверяем, содержит ли значение элемента одно из значений для удаления
    if (valuesToRemove.includes(element.textContent.trim())) {
      // Если содержит одно из указанных значений, удаляем элемент
      element.remove();
    }
  });
}

function toggleCollapse(event) {
  const chapter = event.target.closest(".chapter");
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
    if (!logline.classList.contains(spanClass)) {
      drop();
      continue;
    }

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

    update(logline, player, content);
  }
  removeRed();
}

function scrollToCenter(targetElement) {
  const scrollOptions = {
    top: targetElement.offsetTop - window.innerHeight / 2,
    // behavior: "smooth",
  };

  window.scrollTo(scrollOptions);
}

function processPlayerNames() {
  // Получаем все элементы span.player
  const playerSpans = document.querySelectorAll(
    ".say > .player, .actors .player"
  );

  // Проходимся по каждому элементу
  playerSpans.forEach((span) => {
    const playerName = span.textContent.trim(); // Получаем текстовое содержимое элемента
    let colorClass; // Переменная для цветового класса

    // Поиск информации о NPC по имени игрока в npcData
    const npcInfo = npcData.find((npc) => {
      return npc[0] === playerName || npc[2] === playerName;
    });

    if (npcInfo) {
      // Если есть второй столбец, берем второе значение, иначе первое
      const npcName = npcInfo[2] ? npcInfo[2] : npcInfo[0];
      span.textContent = npcName; // Заменяем текстовое содержимое на полное имя из npcData
      colorClass = npcInfo[1]; // Получаем цветовой класс из npcData
    } else {
      const randomIndex = colorindex % randomColors.length; // Получаем индекс цвета с помощью остатка от деления
      colorClass = randomColors[randomIndex]; // Выбираем случайный цвет из массива randomColors
      span.textContent = playerName; // Оставляем имя игрока без изменений
      colorindex++; // Увеличиваем индекс для следующего цвета
    }

    // Добавляем цветовой класс к элементу span.player
    span.classList.add(colorClass);
  });
}

function removeChaptersIfFewPlayers() {
  // Получаем все элементы .chapter
  const chapters = document.querySelectorAll(".chapter");

  // Проходимся по каждому элементу .chapter
  chapters.forEach((chapter) => {
    // Находим родительский элемент .ul.players
    const playerList = chapter.querySelector("ul.players");

    // Проверяем, есть ли список игроков в текущем .chapter
    if (playerList) {
      // Получаем всех игроков в текущем списке
      const players = playerList.querySelectorAll("li.player");

      // Проверяем количество игроков
      if (players.length < 2) {
        // Если игроков меньше двух, удаляем текущий элемент .chapter
        chapter.remove();
      }
    }
  });
}

function removeActorsAndSymbols() {
  const actorsDivs = document.querySelectorAll("div.actors");
  actorsDivs.forEach((actorsDiv) => {
    actorsDiv.remove();
  });

  const spans = document.querySelectorAll(
    "span.comma, span.dot, span.space, span.column"
  );
  spans.forEach((span) => {
    span.remove();
  });

  colorindex = 0;
}
