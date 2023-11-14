// Загрузка файла

const fileInput = document.getElementById("file-input");
const chatlog = document.getElementById("chatlog");

fileInput.addEventListener("change", handleFileInput);

// Функции

async function handleFileInput(event) {
  // Очищаем содержимое div.chatlog перед загрузкой нового файла
  chatlog.innerHTML = "";

  const file = event.target.files[0];
  const text = await file.text();
  renderChatLog(text);
}

function renderChatLog(text) {
  const chapters = divideChapters(text);

  for (const [chapterTitle, chapterLines] of Object.entries(chapters)) {
    const chapter = createChapterElement(chapterTitle, chapterLines);
    chatlog.appendChild(chapter);
  }

  formatLog();
}

// Ваши остальные функции и код...

function createChapterElement(chapterTitle, chapterLines) {
  const chapter = document.createElement("div");
  chapter.classList.add("chapter");

  const chapterHeader = document.createElement("h2");
  chapterHeader.classList.add("date");
  chapterHeader.textContent = chapterTitle;
  chapter.appendChild(chapterHeader);

  const chapterContent = document.createElement("div");
  chapterContent.classList.add("content");
  chapter.appendChild(chapterContent);

  chapterLines.forEach((line) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = line;
    chapterContent.appendChild(paragraph);
  });

  return chapter;
}

// ФУНКЦИИ

// Разделение на главы

function divideChapters(text) {
  console.log("Разделение на главы");
  const logLines = text.trim().split("\n");
  const chapters = {};
  logLines.forEach((line) => {
    const match = line.match(/^(\d+)\/(\d+)\s/);
    if (match) {
      const month = parseInt(match[1]);
      const day = parseInt(match[2]);
      const date = new Date(Date.UTC(2023, month - 1, day));
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
      const monthName = monthNames[date.getMonth()];
      const chapterTitle = `Запись от ${day} ${monthName}`;
      if (!chapters[chapterTitle]) {
        chapters[chapterTitle] = [];
      }
      chapters[chapterTitle].push(line);
    }
  });
  return chapters;
}

// Удаление таймштампов

function removeTimestamps() {
  console.log("Удаление таймштампов");
  const chatlog = document.getElementById("chatlog");
  const chatlogHTML = chatlog.innerHTML;
  const cleanedHTML = chatlogHTML.replace(
    /\d{1,2}\/\d{1,2}\s\d{1,2}:\d{1,2}:\d{1,2}\.\d{1,3}\s+/g,
    '<p class="logline say">'
  );
  chatlog.innerHTML = cleanedHTML;
}

// Список игроков

function addCommaOrDot() {
  /*      */
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
  // Находим все элементы с классом "logline"
  const loglines = document.querySelectorAll(".logline:not(.emote)");

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
  console.log("Чистка от мусора");

  // Определение

  let chatlogHTML = document.getElementById("chatlog").innerHTML;

  chatlogHTML = chatlogHTML.replace(/\|\d\-\d\((.+)\)/gm, "$1"); // Кривые падежи в стандартных эмоутах

  document.getElementById("chatlog").innerHTML = chatlogHTML;

  chatlogHTML = chatlogHTML.replace(
    /<p.+>\[Лидер (рейда|группы)\].+:/gm,
    "<p class='logline dm'>[ДМ]:"
  );
  document.getElementById("chatlog").innerHTML = chatlogHTML; // Вывод

  chatlogHTML = chatlogHTML.replace(
    /<p.+>\[Объявление рейду](.+):(.+)\n<\/p>/gm,
    "<p class='logline announcment'><span class='player'>$1</span><span class='speech'>$2</span></p>"
  ); // Ролевые объявления
  document.getElementById("chatlog").innerHTML = chatlogHTML; // Вывод

  chatlogHTML = chatlogHTML.replace(
    /(<p class="logline say"><\/p>|<p><\/p>|item.+blp\n.|  \n)/gm,
    ""
  ); // Пустые абзацы

  chatlogHTML = chatlogHTML.replace(/ {2,}/g, " "); // Замена двойных и более пробелов на одиночные
  /*   chatlogHTML = chatlogHTML.replace(/([.,;!?]|[.]{3})([^ ])/g, "$1 $2"); // Многоточия */

  document.getElementById("chatlog").innerHTML = chatlogHTML; // Вывод

  chatlogHTML = chatlogHTML.replace(/[-–—]/gm, "–"); // Однотипные дефисы

  chatlogHTML = chatlogHTML.replace(
    /(<p class="logline say">(%s заслужил достижение|&\?137|Подключиться|Порог|Бой|Поверженные|Участники|Победители|Liquid|\[СЕРВЕР\]|&amp;\?\d+|&\?\d+|Map|X:|grid|GroundZ|ZoneX|no|&\?+|\d|\(|Так как вы бездействовали|Ваш|Защитное|Магическое|Силовое|Ловкое|Вам|GUID|Статус|Персонаж|Добро|Поздравляем|Разделение|Специальное|Начислено|ОШИБКА|Сломанные|Отношение|Ваша|\W+ шеп|\W+ создает:|Вы |Способн|Кастомн|щит|Ткан|Entered building|Game Object|Получено задание|Stopped|Done!|Смена|\(d+d|&?dd|Разыгрываются).+(\n|)<\/p>|\|Hchannel:(RAID|PARTY|GUILD)\|h|\|h)/gm,
    ""
  ); // ООС-сообщения
  document.getElementById("chatlog").innerHTML = chatlogHTML; // Вывод

  chatlogHTML = chatlogHTML.replace(/.*Результат:.*\n?/gm, "");
  document.getElementById("chatlog").innerHTML = chatlogHTML; // Вывод
  chatlogHTML = chatlogHTML.replace(
    /\[(Рейд|Лидер рейда|Лидер группы|Группа|Гильдия)\]\s(.+): /gm,
    "<p class='logline ooc'>[ООС] <span class='player'>$2</span> "
  );

  document.getElementById("chatlog").innerHTML = chatlogHTML; // Вывод

  document.getElementById("chatlog").innerHTML = chatlogHTML;
  chatlogHTML = chatlogHTML.replace(
    /<p class="logline say">(.+)\s(пытается помешать побегу|проваливает попытку побега|теряет все свои очки здоровья и выбывает из битвы|пропускает ход|выходит|выполняет действие|входит|присоединяется|выбрасывает|,\s\похоже,\s\навеселе|становится|покидает|предлагает вам).*(\n|)<\/p>/gm,
    ""
  ); // Игрок %ООС-действие%
  document.getElementById("chatlog").innerHTML = chatlogHTML; // Вывод

  document.getElementById("chatlog").innerHTML = chatlogHTML;
  chatlogHTML = chatlogHTML.replace(
    /<p class="logline say">((?:(?!говорит:|кричит).)*)\n<\/p>/gm,
    '<p class="logline emote">$1</p>'
  ); // Эмоуты
  document.getElementById("chatlog").innerHTML = chatlogHTML; // Вывод

  chatlogHTML = chatlogHTML.replace(
    /<p class="logline emote">(\W+?)\s(.+?)<\/p>/gm,
    '<p class="logline emote"><span class="player">$1 </span><span class="logline emote">$2</span></p>\n'
  ); // Авторы эмоутов
  document.getElementById("chatlog").innerHTML = chatlogHTML; // Вывод

  chatlogHTML = chatlogHTML.replace(
    /<p class="logline say">(.+?)\sговорит:\s?[—–-]?\s?(.+)\n<\/p>/gm,
    "<p class='logline say'><span class='player'>$1</span> <span class='speech'>$2</span></p>"
  ); // Речь, дефисы, а также облачает реплику в классы
  document.getElementById("chatlog").innerHTML = chatlogHTML; // Вывод

  chatlogHTML = chatlogHTML.replace(
    /<p class="logline say">(.+) кричит:\s?[—–-]?\s?(.+)\n<\/p>/gm,
    "<p class='logline yell'><span class='player'>$1</span> <span class='speech'>$2</span></p>"
  ); // Крик, дефисы, а также облачает реплику в классы
  document.getElementById("chatlog").innerHTML = chatlogHTML; // Вывод
}

// Объединение чатбоксов

function combineChatboxes() {
  console.log("Combining chatboxes...");

  var currentPlayer = "";
  var currentSpeech = "";

  var elements = $("p.logline");
  var length = elements.length;

  for (var i = 0; i < length; i++) {
    var element = elements[i];

    var playerElement = $(element).find("span.player");
    if (playerElement.length > 0) {
      var player = playerElement.text().trim();
      var speechElement = $(element).find("span.speech");
      var speech = speechElement.text().trim();

      if (player === currentPlayer) {
        currentSpeech += " " + speech;
        speechElement.text(currentSpeech); // Обновляем содержимое текущего элемента
        /*         console.log(
          "Merged with previous logline. Player: " +
            currentPlayer +
            ", Speech: " +
            currentSpeech
        ); */
        $(element).prev().remove(); // Удаляем предыдущий элемент
        /*         $(element).remove(); // Удаляем текущий элемент */
      } else {
        currentPlayer = player;
        currentSpeech = speech;
        /*         console.log(
          "New player, starting new logline. Player: " +
            currentPlayer +
            ", Speech: " +
            currentSpeech
        ); */
      }
    }

    var nextElement = $(element).next();
    if (nextElement.hasClass("logline emote") || i === length - 1) {
      currentPlayer = "";
      currentSpeech = "";
      console.log("Next element is an emote, exiting loop.");
    }
  }

  console.log("Chatbox combination complete.");
}

function combineEmotes() {
  var currentPlayer = "";
  var currentEmote = "";
  $("p.emote:has(span.player)").each(function () {
    var player = $(this).find("span.player").text().trim();
    var emote = $(this).find("span.emote").text().trim();

    if (player === currentPlayer) {
      currentEmote += " " + emote;
      $(this).prev().find("span.emote").append(emote);
      $(this).remove();
    } else {
      currentPlayer = player;
      currentEmote = emote;
    }
  });
}

// Список игроков

function playersList() {
  console.log("Список игроков");
  // Создаем пустой массив для хранения имен игроков
  let players = [];

  // Находим все .chapter на странице
  let chapters = document.querySelectorAll(".chapter");

  // Для каждого .chapter
  chapters.forEach((chapter) => {
    // Находим .date внутри .chapter
    let date = chapter.querySelector(".date");

    // Создаем новый список ul для игроков
    let playerList = document.createElement("ul");
    playerList.classList.add("players");

    // Находим все имена игроков внутри .chapter
    let playerNames = chapter.querySelectorAll(".player");

    // Для каждого имени игрока
    playerNames.forEach((name) => {
      // Получаем текст имени
      let playerName = name.textContent.trim();

      // Получаем стиль цвета игрока
      let playerColor = getComputedStyle(name).color;

      // Если имя игрока не является пустым
      if (playerName !== "") {
        // Если имя игрока еще не было добавлено в список
        if (!players.includes(playerName)) {
          // Добавляем имя игрока в список имен
          players.push(playerName);

          // Создаем новый элемент списка li для имени игрока
          let playerItem = document.createElement("li");

          // Устанавливаем текст элемента списка равным имени игрока
          playerItem.textContent = playerName;
          playerItem.className = "player";
          playerItem.style.color = playerColor; // Устанавливаем стиль цвета игрока

          // Добавляем элемент списка в список игроков
          playerList.appendChild(playerItem);
        }
      }
    });

    // Если были найдены имена игроков внутри .chapter
    if (playerList.childElementCount > 0) {
      // Добавляем список игроков под .date
      date.parentNode.insertBefore(playerList, date.nextSibling);
    }
    players = [];
  });
}

function colorizePlayers() {
  console.log("Раскраска ников");
  const playerColors = {};
  const playerSpans = document.querySelectorAll(".player");
  const colors = [
    "#43c59eff",
    "#5398beff",
    "#f18f01ff",
    "#4f4789ff",
    "#dd403aff",
    "#00AC48",
    "#0A74EC",
    "#6420FF",
    "#677799",
    "#AE5EFF",
    "#E6451B",
    "#FF9A02",
    "#FFD914",
  ];

  for (let i = 0; i < playerSpans.length; i++) {
    const playerName = playerSpans[i].textContent.trim();
    let color;

    if (playerName === "Сырорезка") {
      /*       console.log(`Найден игрок: ${playerName}`); */
      color = "#ffd914"; // Желтый цвет для Сырорезки
    } else {
      if (!playerColors[playerName]) {
        color = colors[i % colors.length]; // получаем цвет из массива цветов, с повторением при необходимости
        playerColors[playerName] = color;
      } else {
        color = playerColors[playerName];
      }
    }
    playerSpans[i].style.color = color;
    /*     console.log(`Имя игрока: ${playerName}, Цвет: ${color}`); */
  }

  console.log("Окраска ников завершена");

  console.log("Удаление пустых игроков");
  const playerList = document.querySelector("ul.players"); // получаем список игроков
  const emptyPlayers = [...playerList.querySelectorAll("li")].filter(
    (li) => !li.textContent.trim()
  ); // фильтруем пустые элементы li
  emptyPlayers.forEach((li) => li.remove()); // удаляем каждый из найденных пустых элементов li
  console.log("Удаление пустых игроков завершено");
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

// ГЛАВНАЯ ФУНКЦИЯ

function formatLog() {
  let chatlogHTML = document.getElementById("chatlog").innerHTML;
  console.log("Запускаю допфункции");
  removeTimestamps();
  cleanText();

  playersList();

  colorizePlayers();

  addCommaOrDot();

  addColonToEnd();

  combineEmotes();
  /*   combineChatboxes(); */
  wrapThirdSpeechInEmote();

/*   applyImportant(); */

  addRecordClassToMIALoglines();
  /*   toggleContent(); */
  /*   setupToggleHandlers(); */

  /*   // Скрываем DM и OOC по умолчанию
  console.log("Скрываем DM и OOC по умолчанию");
  const oocElements = document.getElementsByClassName("logline ooc");
  const dmElements = document.getElementsByClassName("logline dm");
  for (const element of oocElements) {
    element.style.display = "none";
  }
  for (const element of dmElements) {
    element.style.display = "none";
  } */

  // Сворачиваем главы
  console.log("Сворачиваем главы");

  const chapterElements = document.querySelectorAll(".chapter");

  if (chapterElements.length === 1) {
    console.log("Если есть только одна глава, делаем её expanded");
    chapterElements[0].classList.add("expanded");
  } else {
    console.log("Иначе применяем collapsed для всех глав, кроме первой");
    chapterElements.forEach((chapterElement, index) => {
      if (index !== 0) {
        chapterElement.classList.add("collapsed");
      }
    });
  }

  const dates = document.querySelectorAll(".date");

  dates.forEach((date) => {
    date.addEventListener("click", toggleContent);
  });
}

function wrapThirdSpeechInEmote() {
  var chatlogHTML = document.getElementById("chatlog").innerHTML;
  /*   chatlogHTML = chatlogHTML.replace(
    /((<span class="speech">.+[.,:?!])(\s[—–-]\s+([а-яА-Я\s].+?)[.,:?!]\s[—–-])(.+<\/span>))/gm,
    '<span class="speech">$2<span class="logline emote">$3</span>$5</span>'
  );
  chatlogHTML = chatlogHTML.replace(
    /((<span class="speech">.+[.,:?!])(\s[—–-]\s+([а-яА-Я\s].+)[.,:?!])(.+<\/span>))/gm,
    '<span class="speech">$2<span class="logline emote">$3</span>$5</span>'
  ); */
  document.getElementById("chatlog").innerHTML = chatlogHTML;
}

function handleKeyPress(event) {
  // Код клавиши Enter
  const enterKeyCode = 13;

  if (event.keyCode === enterKeyCode) {
    applyImportant();
  }
}


document
  .getElementById("keywordsInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      console.log("Нажат Enter в поле заполнения");
      applyImportant();
    }
  });

function applyImportant() {
  console.log("Выделение ключевых слов"); 

  // Получаем ключевые слова из поля ввода и разбиваем их по запятой
  let keywordsInput = document.getElementById("keywordsInput").value;
  let keywords = keywordsInput.split(",").map(keyword => keyword.trim());

  $("p").each(function () {
    const text = $(this).text();
    const hasKeyword = keywords.some((keyword) => text.includes(keyword));
    if (hasKeyword) {
      console.log("Adding class 'important'");
      $(this).addClass("important");
/*     } else {
      console.log("Removing class 'important'");
      $(this).removeClass("important"); */
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");
  function toggleImportantClass(event) {
    var paragraph = event.target.closest("p");
    if (paragraph) {
      paragraph.classList.toggle("important");
    }
  }

  document.addEventListener("click", toggleImportantClass);
});

function removeNonImportantParagraphs() {
  console.log("removeNonImportantParagraphs");
  removeImportantClass();

  // Удаляем абзацы без класса .important
  const paragraphs = document.querySelectorAll("p:not(.important)");
  paragraphs.forEach((paragraph) => {
    paragraph.remove();
  });

  // Удаляем все элементы с классом .chapter.collapsed
  const collapsedChapters = document.querySelectorAll(".chapter.collapsed");
  collapsedChapters.forEach((chapter) => {
    chapter.remove();
  });
}

function removeImportantClass() {
  console.log("removeImportantClass");
  var containers = document.querySelectorAll(".collapsed");

  containers.forEach(function (container) {
    var elements = container.querySelectorAll("p.important");
    elements.forEach(function (element) {
      element.classList.remove("important");
    });
  });
}

function addRecordClassToMIALoglines() {
  console.log("addRecordClassToMIALoglines");
  var loglines = document.querySelectorAll("p.logline");

  loglines.forEach(function (logline) {
    var speech = logline.querySelector("span.speech");
    if (speech && speech.textContent.includes("МИА")) {
      logline.classList.add("record");
    }
  });
}

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

function toggleContent(event) {
  console.log("toggleContent");
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
}

/* function setupToggleHandlers() {
  console.log("setupToggleHandlers");
  const dates = document.querySelectorAll(".date");
  dates.forEach((date) => {
    date.addEventListener("click", toggleContent);
  });
} */

// Добавьте вызов setupToggleHandlers() в нужном месте, например, в конце вашего скрипта.
