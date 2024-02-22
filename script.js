combineDelay = 2 * 1000;

playerData = [
  ["Фэрриан", "rogue", "Фэрриан Гардсон"],
  ["Малет", "shaman", "Малет Трант"],
  ["Роуз", "hunter", "Арчибальд Роуз"],
  ["Аммель", "mage", "Рэдрик Аммель"],
  ["Маларон", "priest", "Мал’арон Берёзовый Лист"],
  ["Ананита", "rogue", "Ананита Астор"],
  ["Сырорезка", "yellow", "Джули"],
  ["Санриэль", "mage", "Санриэль Рассветный Луч"],
  ["Дерек", "hunter", "Дерек Кларк"],
  ["Кэролай", "priest", "Кэролай Эстер"],
  ["Сахаджи", "shaman", "Сахаджи"],
  ["Думитру", "druid", "Думитру Феликс Цимитяну"],
  ["Каторжник", "warrior", "Рой Редвуд"],
  ["Кариночка", "demon-hunter", "Карина"],
];

randomColors = [
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

npcNames = {
  Гнолл: true,
  Баззерс: true,
  Охранник: true,
  Стражник: true,
  Богачка: true,
  Богач: true,
  Рыбак: true,
  Бедняк: true,
  Рыболов: true,
  Повар: true,
  Бармен: true,
  Разнорабочий: true,
  Богач: true,
  Богач: true,
  Богач: true,
  Богач: true,
  Богач: true,
  Богач: true,
  Богач: true,
  Богач: true,
  Богач: true,
  Богач: true,
  Богач: true,
  Богач: true,
  Богач: true,
  Богач: true,
  Богач: true,
  Богач: true,
};

function formatHTML() {
  cleanText();
  splitSessions();
  wrapChapters();
  scrollToStart();
  combineFunctions();
  emoteTosay();
  sayToEmote();
  chapterReverse();
  virt();
  updateTimeAndActors();
  findLoglinesAndConvertToTranscript();

  throw new Error("Скрипт прерван");
}

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
    console.error("Элемент #chatlog не найден в HTML файле");
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
      console.error("Неподдерживаемый тип файла");
    }
  } else {
    console.error("Файл не найден");
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
    if (/\d/.test(line)) {
      const timestampMatch = line.match(/^(\S+\s\S+)/);
      const timestamp = timestampMatch ? timestampMatch[1] : "";
      const loglineBody = line.replace(timestamp, "").trim();
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
        if (timeDifference > 1 * 60 * 60 * 1000 || timeDifference < 0) {
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
  chatlogHTML = document.getElementById("chatlog").innerHTML;
  chatlogHTML = chatlogHTML.replace(/кошка/g, "кот");
  chatlogHTML = chatlogHTML.replace(/<\/p>/g, "</p>\n");

  chatlogHTML = chatlogHTML.replace(
    /<p.*?>\s*((Аукцион|%s|ОШИБКА:|Было|Сегодня|Значок|Вы|Магическая|Удалено|Удалена|Номер|Игрок|Ставка|За|Существо|Кожаная|Персонаж|Сохранённый|Для|Всем|Текст|Эффект|щит|Телепорт|С\s|Получен|Характеристики|Маг.уст\:|вами.|Spawn|Если|Начислен|Установлен|Удален|Сохранён|Облик|Статы|Существу|Сила\:|Ловк\:|Инта\:|Физ.уст\:|На|Рейд|\*|Перезагрузка|Удаляются|Физическая|Похоже,|Подключиться|Повторите|Используйте|Персонаж|Статус|Стандартная|Добро|&\?|Так|Вы|Вам|Вас|Ваша|Ваш|Теперь|Участники|Порог|Бой|Поверженные|Сбежали|Победители|Приглашение|Настройки|Ошибка|Местоположение|Разделение|У|Ваше|Начислено|Камень|Получено|\[СЕРВЕР\]|Разыгрываются|Продление|Сломанные|Способности|Кастомный|Тканевые|Отношение|Смена|Не|Рядом|Объект|ОШИБКА|Задание|Всего|Поздравляем)\s.*?|(Результат\:|Персонаж))<\/p>\n/g,
    ""
  );
  chatlogHTML = chatlogHTML.replace(/\|H.*?(\[.*?\])\|h\s(.+?):/g, "$1 $2:");
  chatlogHTML = chatlogHTML.replace(
    /<p.*?>([A-Za-z]|\>|\&|\(|\d).*?<\/p>\n/g,
    ""
  );
  chatlogHTML = chatlogHTML.replace(
    /<p.*[А-Я][а-я-]+?\s(is|действие|получил|атакует,|кажется,|приглашается|\(|атакует|уже состоит|вступает|исключается|смотрит|преклоняет|рассказывает|is Away|получает|не имеет ауры|does not wish|к вам|смотрит на вас|кивает вам|смотрит на вас|ставит|добавлено|создает|засыпает|ложится|предлагает|умирает|отклоняет|установлено|получил|устанавливает вам|находится в|производит|ложится|похоже, навеселе|кажется, понемногу трезвеет|желает видеть вас|пытается помешать побегу|уже состоит в группе|проваливает попытку побега|\+ \d = \d|теряет все свои очки здоровья и выбывает из битвы|пропускает ход|выходит|выполняет действие|входит|присоединяется|выбрасывает|,\s\похоже,\s\навеселе|становится|покидает).*?<\/p>\n/g,
    ""
  );
  /*   document.getElementById("chatlog").innerHTML = chatlogHTML;   throw new Error("Скрипт прерван"); */

  chatlogHTML = chatlogHTML.replace(/<p.*?(GUID|Fly|\-го уровня).*?<\/p>/g, "");

  chatlogHTML = chatlogHTML.replace(/<p.*?>[А-я]+ шепчет:.*?<\/p>\n/g, "");
  chatlogHTML = chatlogHTML.replace(
    /(<p.*?"logline)">(.*)\sговорит:\s(.*?)<\/p>\n/g,
    '$1 say"><span class="player">$2</span><span class="say">$3</span></p>\n'
  );
  chatlogHTML = chatlogHTML.replace(
    /(<p.*?"logline)">(.*)\sкричит:\s(.*?)<\/p>\n/g,
    '$1 yell"><span class="player">$2</span><span class="say">$3</span></p>\n'
  );
  chatlogHTML = chatlogHTML.replace(
    /(<p.*?"logline)">([А-я]+)\s(.*?)<\/p>\n/g,
    '$1 emote"><span class="player">$2</span><span class="emote">$3</span></p>\n'
  );

  if (!keepGroup) {
    chatlogHTML = chatlogHTML.replace(
      /<p.*?>\[(Лидер группы|Группа)\].*?<\/p>\n/g,
      ""
    );
  }

  chatlogHTML = chatlogHTML.replace(
    /(<p.*?logline)">\[(?:Группа|Лидер группы)\]\s*([А-я]+):\s*(.*?)<\/p>/g,
    '$1 emote virt"><span class="player">$2</span><span class="emote">$3</span></p>'
  );
  chatlogHTML = chatlogHTML.replace(/<p.*?>\[(Гильдия)\].*?<\/p>\n/g, "");
  if (!keepRaid) {
    chatlogHTML = chatlogHTML.replace(
      /<p.*?>\[(Рейд|Лидер рейда)\].*?<\/p>\n/g,
      ""
    );
  }

  if (!keepRaidWarning) {
    chatlogHTML = chatlogHTML.replace(
      /<p.*?>\[(Объявление рейду)\].*?<\/p>\n/g,
      ""
    );
  }

  chatlogHTML = chatlogHTML.replace(
    /(<p.*?"logline)">(.*?):\s(.*?)<\/p>/g,
    '$1 story"><span class="player">$2</span><span class="say">$3</p>\n'
  );

  chatlogHTML = chatlogHTML.replace(/[—–-]\s/g, "— ");
  chatlogHTML = chatlogHTML.replace(/\|\d+\-\d+\((.*?)\)/g, "$1");
  chatlogHTML = chatlogHTML.replace(/\|[a-z]+/g, "");
  chatlogHTML = chatlogHTML.replace(/say">\s*[—–-]\s*/g, 'say">');
  chatlogHTML = chatlogHTML.replace(/&nbsp;/g, " ");
  document.getElementById("chatlog").innerHTML = chatlogHTML;
  document
    .querySelectorAll("#chatlog p:empty")
    .forEach((emptyParagraph) => emptyParagraph.remove());
}

function combineFunctions() {
  combineSay("emote");
  combineSay("say");
  combineSay("yell");
  combineSay("story");
}

function combineSay(spanType) {
  resetSay();

  var elements = document.querySelectorAll("div.chapter p.logline");
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

function emoteTosay() {
  let emotes = document.querySelectorAll("p.logline.emote");

  for (let i = 0; i < emotes.length; i++) {
    let emoteText = emotes[i].innerHTML;

    let updatedEmoteText = emoteText.replace(
      /(—\s((?:["«]|)\s*(?:\(.+\)\s|)[А-Я](?:.+?)[,.!?])(?: —|<\/span>))/g,
      '<span class="dash">— </span><span class="say">$2</span><span class="dash"> —</span>'
    );

    emotes[i].innerHTML = updatedEmoteText;
  }
}

function toggleCollapse(event) {
  const chapter = event.target.closest(".chapter");
  if (chapter) {
    chapter.classList.toggle("collapsed");
  } else {
    console.error(
      "Не найден элемент с классом 'chapter' в родительской цепочке."
    );
  }
}

function logFilter() {
  // Получаем значение из поля ввода и приводим его к нижнему регистру
  const keywordsInput = document.getElementById("keywordsInput").value.toLowerCase();
  
  // Выбираем все элементы, являющиеся дочерними элементами .content
  const elements = document.querySelectorAll(".content > *");
  
  // Перебираем каждый элемент
  elements.forEach((element) => {
    // Получаем текстовое содержимое элемента и приводим его к нижнему регистру
    const text = element.textContent.toLowerCase();

    // Проверяем, не пустое ли поле ввода
    if (keywordsInput.trim() !== "") {
      // Разделяем введенные ключевые слова по пробелу
      const keywords = keywordsInput.split(" ");
      
      // Перебираем каждое ключевое слово
      keywords.forEach((keyword) => {
        // Инициализируем переменную для хранения ключевого слова без символа "-"
        let removeWord = null;
        
        // Проверяем, начинается ли ключевое слово с символа "-"
        if (keyword.startsWith("-")) {
          // Если да, удаляем символ "-" и сохраняем оставшееся слово в переменную removeWord
          removeWord = keyword.substring(1);
        }
        
        // Проверяем, содержится ли ключевое слово или его "анти-слово" в тексте элемента
        const containsKeyword = text.includes(keyword) || (removeWord !== null && !text.includes(removeWord));

        // Если ключевое слово найдено, добавляем класс "selected" к элементу
        // Если "анти-слово" найдено, удаляем класс "selected" у элемента
        if (containsKeyword && removeWord === null) {
          element.classList.add("selected");
        } else if (removeWord !== null && !containsKeyword) {
          element.classList.remove("selected");
        }
      });
    } else {
      // Если поле ввода пустое, удаляем класс "selected" у элемента
      element.classList.remove("selected");
    }
  });
}


function trimChapter(chapterElement) {
  const paragraphs = chapterElement.find("p");
  const selectedParagraphs = paragraphs.filter(".selected");
  if (selectedParagraphs.length > 0) {
    const firstSelectedIndex = paragraphs.index(selectedParagraphs.first());
    const lastSelectedIndex = paragraphs.index(selectedParagraphs.last());
    paragraphs.slice(0, firstSelectedIndex).remove();
    paragraphs.slice(lastSelectedIndex + 1).remove();
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
  /*   removeCollapsed(); */
  removeEmptyLines();

  var pageTitle = document.querySelector("h2.date");
  var fileName = pageTitle
    ? translit(pageTitle.textContent.trim())
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
  scrollToSelect();
}

function removeCollapsed() {
  /*   var collapsedDivs = document.querySelectorAll("div.collapsed");
  collapsedDivs.forEach(function (div) {
    div.remove();
  }); */
}

function removePlayers() {
  var playersList = document.querySelectorAll("ul.players");
  playersList.forEach(function (player) {
    player.remove();
  });
}

var isReversed = false;
function chapterReverse() {
  var chatlog = document.getElementById("chatlog");
  var messages = Array.from(chatlog.children);
  messages.reverse();
  while (chatlog.firstChild) {
    chatlog.removeChild(chatlog.firstChild);
  }
  messages.forEach(function (message) {
    chatlog.appendChild(message);
  });
  let button = document.querySelector('[onclick="chapterReverse()"]');
  button.textContent = isReversed ? "Сначала старое" : "Сначала новое";
  isReversed = !isReversed;
}

function removeEmptyLines() {
  var bodyHtml = document.body.innerHTML;
  var cleanedHtml = bodyHtml.replace(/^\s*[\r\n]/gm, "");
  document.body.innerHTML = cleanedHtml;
}

function virt() {
  document.querySelectorAll("p.virt").forEach((element) => {
    element.innerHTML = element.innerHTML.replace(
      /(<span class="emote">)<span class="dash">— <\/span>/g,
      "$1"
    );
    element.innerHTML = element.innerHTML.replace(
      /<span class="dash">( —|— )<\/span><\/span>/g,
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

let selected = [];
let currentPosition = null;

function scrollToSelect() {
  if (!selected.length || currentPosition === null) {
    selected = Array.from(document.querySelectorAll("p.selected"));

    if (selected.length > 0) {
      selected[0].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      currentPosition = 0;
    }
  } else {
    const nextIndex = (currentPosition + 1) % selected.length;
    selected[nextIndex].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    currentPosition = nextIndex;
  }
}

function removeUnselectedLoglines() {
  var unselectedLoglines = document.querySelectorAll(
    "p.logline:not(.selected)"
  );

  unselectedLoglines.forEach(function (logline) {
    logline.remove();
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
  console.log(
    "Разница между вашим местным временем и UTC (в часах):",
    localDifference
  );
  console.log(
    "Разница между вашим местным временем и московским временем (в часах):",
    moscowDifference
  );
  console.log(
    "Разница между вашим местным временем и серверным временем (в часах):",
    serverDifference
  );
}

function processTimestamp() {
  const chapter = document.querySelector(".chapter");

  const timestampValue = chapter.getAttribute("timestamp");

  console.log("Введенный таймштамп:", timestampValue);

  const dateObject = new Date(timestampValue);
  const hours = ("0" + dateObject.getUTCHours()).slice(-2);
  const minutes = ("0" + dateObject.getUTCMinutes()).slice(-2);
  const formattedTimestamp = hours + ":" + minutes;

  console.log("Отформатированный таймштамп:", formattedTimestamp);
}

function calculateTotalDuration() {
  let totalHours = 0;
  let totalMinutes = 0;

  const durationTimeSpans = document.querySelectorAll(".durationtime");
  durationTimeSpans.forEach((span) => {
    const durationAttribute = span.getAttribute("duration");
    const [hours, minutes] = durationAttribute.split(":").map(Number);
    totalHours += hours;
    totalMinutes += minutes;
  });

  totalHours += Math.floor(totalMinutes / 60);
  totalMinutes %= 60;
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
  const monthIndex = timestamp.getMonth();
  const formattedDate = day + " " + monthNames[monthIndex];
  const hours = ("0" + timestamp.getUTCHours()).slice(-2);
  const minutes = ("0" + timestamp.getUTCMinutes()).slice(-2);
  const formattedTimestamp = formattedDate + " " + hours + ":" + minutes;
  let playerName = loglineElement.querySelector(".player").textContent.trim();
  playerName = playerName.slice(0, -1);
  loglineElement.setAttribute("timestamp", timestamp.toISOString());

  loglineElement.textContent = loglineElement.textContent.replace(
    /^.+([Зз]апись|\d\d[:.]\d\d)[,.!: ]/g,
    ""
  );

  const transcriptRecordHTML = `
    <div class="record">
      <p>Время<span>25 ОТП, ${formattedDate}, ${hours}:${minutes}</span></p>
      <p>Автор<span>${playerName}</span></p>
    </div>
    <span class="speech">${loglineElement.textContent.trim()}</span>
  `;

  const transcriptElement = document.createElement("div");
  transcriptElement.classList.add("transcript", "selected");
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
  } else if (event.key === "Delete") {
    deleteElementUnderCursor();
  } else if (!event.altKey && event.key === "ArrowLeft") {
    togglePaperClass();
  } else if (event.altKey && event.key === "ArrowLeft") {
    pasteText();
  } else if (["[", "х"].includes(event.key) && event.ctrlKey) {
    deleteBefore();
  } else if (["]", "ъ"].includes(event.key) && event.ctrlKey) {
    deleteAfter();
  } else if (event.key === "ArrowRight") {
    pasteImg();
  } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    moveElement(event);
  } else if (["m", "ь"].includes(event.key)) {
    const hoveredLogline = document.querySelector(".logline:hover");
    if (hoveredLogline) {
      convertLoglineToTranscript(hoveredLogline);
    }
  } else if (["[", "х"].includes(event.key) && event.altKey) {
    startWrap();
  } else if (["]", "ъ"].includes(event.key) && event.altKey) {
    finishWrap("spoiler");
  } else if (["[", "х"].includes(event.key)) {
    startWrap();
  } else if (["]", "ъ"].includes(event.key)) {
    finishWrap("paper");
  } else if (event.key === "/") {
    WrapToDiv();
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
    const loglineParent = element.closest(".logline");
    const paperParent = element.closest(".paper");
    const transcriptParent = element.closest(".transcript");
    const playerParent = element.closest(".player");
    const dateHeadingParent = element.closest("h2.date");

    if (loglineParent || paperParent || transcriptParent || playerParent) {
      const parentToRemove =
        loglineParent || paperParent || transcriptParent || playerParent;
      parentToRemove.remove();
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
  var contentContainers = document.querySelectorAll(".content");

  contentContainers.forEach(function (contentContainer) {
    var elementUnderCursor = contentContainer.querySelector(":hover");

    if (elementUnderCursor && contentContainer.contains(elementUnderCursor)) {
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

function deleteBefore() {
  const hoveredElements = document.querySelectorAll(".content > :hover");

  hoveredElements.forEach((element) => {
    let currentElement = element.previousElementSibling;
    while (currentElement) {
      const siblingToRemove = currentElement;
      currentElement = currentElement.previousElementSibling;
      siblingToRemove.remove();
    }
  });
  updateTimeAndActors();
}

function deleteAfter() {
  const hoveredElements = document.querySelectorAll(".content > :hover");

  hoveredElements.forEach((element) => {
    let currentElement = element.nextElementSibling;
    while (currentElement) {
      const siblingToRemove = currentElement;
      currentElement = currentElement.nextElementSibling;
      siblingToRemove.remove();
    }
  });
  updateTimeAndActors();
}

function startWrap() {
  const contentChild = document.querySelector(".content > :hover");
  if (contentChild) {
    document.querySelectorAll(".content .start_wrap").forEach((element) => {
      element.classList.remove("start_wrap");
    });

    contentChild.classList.add("start_wrap");
  }
}

function finishWrap(className) {
  const contentChild = document.querySelector(".content > :hover");
  if (contentChild) {
    document.querySelectorAll(".content .finish_wrap").forEach((element) => {
      element.classList.remove("finish_wrap");
      console.log("finish_wrap removed from element:", element);
    });

    contentChild.classList.add("finish_wrap");
    console.log("finish_wrap added to element:", contentChild);
    WrapToDiv();
  }
  function WrapToDiv() {
    const elementsUnderCursor = document.querySelectorAll(".content > :hover");

    for (const element of elementsUnderCursor) {
      const contentChild = element.closest("div.content");
      if (!contentChild) continue;

      const startWrap = contentChild.querySelector(".start_wrap");
      const finishWrap = contentChild.querySelector(".finish_wrap");
      startWrap.classList.remove("start_wrap");
      finishWrap.classList.remove("finish_wrap");

      if (!startWrap || !finishWrap) {
        console.log(
          "Не удалось найти элемент начала или конца обёртки. Отмена операции WrapToDiv."
        );
        return;
      }

      const siblings = Array.from(contentChild.children);
      let isWrapping = false;
      const spoilerDiv = document.createElement("div");
      spoilerDiv.classList.add(className);

      for (const sibling of siblings) {
        if (sibling === startWrap) {
          isWrapping = true;
          spoilerDiv.appendChild(startWrap.cloneNode(true));
          continue;
        }

        if (sibling === finishWrap) {
          spoilerDiv.appendChild(finishWrap.cloneNode(true));
          break;
        }

        if (isWrapping) {
          const clonedSibling = sibling.cloneNode(true);
          spoilerDiv.appendChild(clonedSibling);
          sibling.remove();
        }
      }

      startWrap.parentNode.insertBefore(spoilerDiv, startWrap.nextSibling);

      console.log("Элементы успешно обёрнуты в спойлер:", spoilerDiv);
      startWrap.remove();
      finishWrap.remove();

      if (className === "spoiler") {
        const spoilerDesc = document.createElement("h1");
        spoilerDesc.classList.add("spoiler_desc");
        spoilerDesc.textContent = "Наведитесь, чтобы раскрыть спойлер";
        spoilerDiv.parentNode.insertBefore(spoilerDesc, spoilerDiv.nextSibling);
      }

      break;
    }
  }
}

function pasteImg() {
  const elementsUnderCursor = document.querySelectorAll(":hover");

  for (const element of elementsUnderCursor) {
    const loglineElement = element.closest("p.logline");

    if (loglineElement) {
      const imgDiv = document.createElement("div");
      imgDiv.className = "paper img selected";

      const imgElement = document.createElement("img");
      imgElement.src = "POSTIMAGE";
      imgDiv.appendChild(imgElement);
      loglineElement.insertAdjacentElement("afterend", imgDiv);

      break;
    }
  }
}

function pasteText() {
  const elementsUnderCursor = document.querySelectorAll(":hover");

  for (const element of elementsUnderCursor) {
    const loglineElement = element.closest("p.logline");

    if (loglineElement) {
      const paperDiv = document.createElement("div");
      paperDiv.className = "paper selected";

      const textElement = document.createElement("p");
      textElement.textContent = "Текст для вставки";

      paperDiv.appendChild(textElement);
      loglineElement.insertAdjacentElement("beforebegin", paperDiv);

      break;
    }
  }
}

const uniquePlayers = new Set();
function createPlayerItem(playerName) {
  const playerItem = document.createElement("li");
  playerItem.textContent = playerName;
  playerItem.classList.add("player");
  return playerItem;
}

function playerList() {
  const contents = document.querySelectorAll(".content");
  contents.forEach((content) => {
    const players = content.querySelectorAll(talkingPlayer);
    const actorsDiv = document.createElement("div");
    const playerList = document.createElement("ul");
    const npcList = document.createElement("ul");
    playerList.classList.add("players");
    npcList.classList.add("npc");
    actorsDiv.classList.add("actors");
    content.parentNode.insertBefore(actorsDiv, content);

    players.forEach((player) => {
      const playerName = player.textContent.trim();
      const uniquePlayerNameParts = playerName.split(" ");

      if (
        uniquePlayerNameParts.length === 1 &&
        !npcNames[playerName] &&
        !uniquePlayers.has(playerName)
      ) {
        playerList.appendChild(createPlayerItem(playerName));
        uniquePlayers.add(playerName);
      } else if (!uniquePlayers.has(playerName)) {
        npcList.appendChild(createPlayerItem(playerName));
        uniquePlayers.add(playerName);
      }
    });
    actorsDiv.appendChild(playerList);
    actorsDiv.appendChild(npcList);
    uniquePlayers.clear();
  });
}

let colorIndex = 0;
function colorizePlayers() {
  const playerSpans = document.querySelectorAll(".actors .player");
  playerSpans.forEach((span) => {
    const playerName = span.textContent.trim();
    let colorClass;

    const playerInfo = playerData.find((player) => player[0] === playerName);
    if (playerInfo) {
      colorClass = playerInfo[1];
    } else {
      colorClass = randomColors[colorIndex % randomColors.length];
      colorIndex++;
    }

    span.classList.add(colorClass);
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
        contentPlayer.classList.add(secondClass);
      }
    });
  });
}

function addCommaAndDot() {
  const actorsDivs = document.querySelectorAll("div.actors");

  actorsDivs.forEach((actorsDiv) => {
    const actors = actorsDiv.querySelectorAll("li.player");
    const lastActorIndex = actors.length - 1;

    actors.forEach((actor, index) => {
      const commaSpan = document.createElement("span");
      commaSpan.classList.add("comma");
      commaSpan.textContent = ",";
      actor.appendChild(commaSpan);

      if (index === lastActorIndex) {
        commaSpan.remove();
        const dotSpan = document.createElement("span");
        dotSpan.classList.add("dot");
        dotSpan.textContent = ".";
        actor.appendChild(dotSpan);
      }
    });
  });
}

function FullNames() {
  const actorPlayers = document.querySelectorAll(".chapter .player");

  actorPlayers.forEach((actorPlayer) => {
    const playerName = actorPlayer.textContent.trim();

    const playerInfo = playerData.find((info) => info[0] === playerName);
    if (playerInfo) {
      actorPlayer.textContent = playerInfo[2];
    } else {
    }
  });
}

function ShortNames() {
  const actorPlayers = document.querySelectorAll(".chapter .player");

  actorPlayers.forEach((actorPlayer) => {
    const playerName = actorPlayer.textContent.trim();

    const playerInfo = playerData.find((info) => info[2] === playerName);
    if (playerInfo) {
      actorPlayer.textContent = playerInfo[0];
    } else {
    }
  });
}

function updateTimeAndActors() {
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
  colorIndex = 0;
  ShortNames();
  playerList();
  colorizePlayers();
  FullNames();
  addTimeToChapter();
  synchronizePlayerColors();
  addColumnToPlayers();
  addSpaceToEmotePlayers();
  addCommaAndDot();
}
