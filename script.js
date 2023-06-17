// Загрузка файла или клик по «Демо»

const fileInput = document.getElementById("file-input");
const chatlog = document.getElementById("chatlog");
const demoButton = document.getElementById("demo-button");

fileInput.addEventListener("change", handleFileInput);
demoButton.addEventListener("click", handleDemoButtonClick);

// Функции

async function handleFileInput(event) {
  const file = event.target.files[0];
  const text = await file.text();
  renderChatLog(text);
}

async function handleDemoButtonClick() {
  const response = await fetch("WoWChatLog.txt");
  const text = await response.text();
  renderChatLog(text);
}

function renderChatLog(text) {
  const chapters = divideChapters(text);
  chatlog.innerHTML = "";

  for (const [chapterTitle, chapterLines] of Object.entries(chapters)) {
    const chapter = createChapterElement(chapterTitle, chapterLines);
    chatlog.appendChild(chapter);
  }

  formatLog();
}

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

// НАЧАЛО ГЛАВНОЙ ФУНКЦИИ ОБРАБОТКИ

function formatLog() {
  console.log("Запускаю допфункции");
  removeTimestamps();
  cleanText();
  playersList();
  colorizePlayers();

  // Удаляем пустые абзацы

  const paragraphs = document.getElementsByTagName("p");

  for (let i = paragraphs.length - 1; i >= 0; i--) {
    if (paragraphs[i].textContent.trim() === "") {
      paragraphs[i].remove();
    }
  }

  // Скрываем DM и OOC по умолчанию
  const oocElements = document.getElementsByClassName("logline ooc");
  const dmElements = document.getElementsByClassName("logline dm");
  for (const element of oocElements) {
    element.style.display = "none";
  }
  for (const element of dmElements) {
    element.style.display = "none";
  }

  // Сворачивание

  const chapterElements = document.querySelectorAll(".chapter");

  chapterElements.forEach((chapterElement, index) => {
    if (index === 0) {
      chapterElement.classList.add("expanded");
    } else {
      chapterElement.classList.add("collapsed");
    }
  });

  function toggleContent(event) {
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

  const dates = document.querySelectorAll(".date");

  dates.forEach((date) => {
    date.addEventListener("click", toggleContent);
  });

  // Объединение чатбоксов

  $(document).ready(function () {
    var currentPlayer = "";
    var currentSpeech = "";
    $(".logline").each(function () {
      var player = $(this).find(".player").text().trim();
      var speech = $(this).find(".speech").text().trim();
      
      if (player === currentPlayer) {
        currentSpeech += " " + speech;
        $(this).prev().find(".speech").text(currentSpeech);
        $(this).remove();
      } else {
        currentPlayer = player;
        currentSpeech = speech;
      }
    });
  });
  
  
  
  

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

  addCommaOrDot();

  // Двоеточие после ников

  function addColonToEnd() {
    // Находим все элементы с классом "logline"
    const loglines = document.querySelectorAll(".logline");

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

  addColonToEnd();



  // КОНЕЦ ГЛАВНОЙ ФУНКЦИИ ОБРАБОТКИ
}

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
    '<p class="logline">'
  );
  chatlog.innerHTML = cleanedHTML;
}


// Чистка от мусора

function cleanText() {
  console.log("Чистка от мусора");
  var chatlog = document.getElementById("chatlog");
  var chatlogHTML = chatlog.innerHTML;

  chatlogHTML = chatlogHTML.replace(
    /(<p class="logline">(no|&\?+|\d|\(|Ваш|Защитное|Магическое|Силовое|Ловкое|Вам|GUID|Статус|Персонаж|Добро|Поздравляем|Разделение|Вы|Специальное|Начислено|ОШИБКА|Сломанные|Отношение|Ваша|\W+ шеп|\W+ создает:|Вы шеп|Вы выполн|Вы получ|Способн|Кастомн|щит|Ткан|Entered building|Game Object|Получено задание|Stopped|Done!|Вы|Смена|\(d+d|&?dd|Разыгрываются).+\n<\/p>|\|Hchannel:(RAID|PARTY|GUILD)\|h|\|h)/gm,
    ""
  ); // Неигровые сообщения

  chatlogHTML = chatlogHTML.replace(
    /\[(Рейд|Группа|Гильдия)\]\s(.+): /gm,
    "<p class='ooc'>[ООС] $2: "
  ); // Неигровые сообщения

  chatlogHTML = chatlogHTML.replace(
    /<p.+>\[Лидер (рейда|группы)\].+:/gm,
    "<p class='dm'>[ДМ]:"
  ); // Неигровые сообщения

  chatlogHTML = chatlogHTML.replace(
    /<p class="logline">(.+)\s(\d|выходит|выполняет действие|входит|присоединяется|выбрасывает|,\s\похоже,\s\навеселе|становится|покидает|предлагает вам).+\n<\/p>/gm,
    ""
  ); // Неролевые действия

  chatlogHTML = chatlogHTML.replace(
    /<p.+>\[Объявление рейду](.+):(.+)\n<\/p>/gm,
    '<p class="dm">$2</p>'
  ); // Говорит:, дефисы, а также облачает реплику в классы

  chatlogHTML = chatlogHTML.replace(
    /<p class="logline">(.+) кричит:\s?[—–-]?\s?(.+)\n<\/p>/gm,
    '<p class="logline yell"><span class="player">$1</span> <span class="speech">$2</span></p>'
  ); // Крик, дефисы, а также облачает реплику в классы

  chatlogHTML = chatlogHTML.replace(
    /<p class="logline">(.+) говорит:\s?[—–-]?\s?(.+)\n<\/p>/gm,
    '<p class="logline"><span class="player">$1</span> <span class="speech">$2</span></p>'
  ); // Речь, дефисы, а также облачает реплику в классы

  chatlogHTML = chatlogHTML.replace(/\|\d\-\d\((.+)\)\./gm, "$1"); // Кривые падежи в стандартных эмоутах

  chatlog.innerHTML = chatlogHTML; // Завершающая строка, не потри случайно
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


// Раскраска ников

function colorizePlayers() {
  console.log("Удаление пустых игроков");
  const playerList = document.querySelector("ul.players"); // получаем список игроков
  const emptyPlayers = [...playerList.querySelectorAll("li")].filter(
    (li) => !li.textContent.trim()
  ); // фильтруем пустые элементы li
  emptyPlayers.forEach((li) => li.remove()); // удаляем каждый из найденных пустых элементов li
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
    const playerName = playerSpans[i].textContent.trim().slice(1, -2);
    if (!playerColors[playerName]) {
      const color = colors[i % colors.length]; // получаем цвет из массива цветов, с повторением при необходимости
      playerColors[playerName] = color;
    }
    playerSpans[i].style.color = playerColors[playerName];
  }
  console.log("Ники раскрашены");
  return;
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
