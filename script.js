fetch("WoWChatLog.txt")
  .then((response) => response.text())
  .then((text) => {
    const chapters = divideChapters(text);
    const chatlog = document.getElementById("chatlog");
    for (const chapterTitle in chapters) {
      const chapter = document.createElement("div");
      chapter.classList.add("chapter");
      const chapterHeader = document.createElement("h2");
      chapterHeader.classList.add("date");
      chapterHeader.textContent = chapterTitle;
      chapter.appendChild(chapterHeader);
      const chapterContent = document.createElement("div");
      chapterContent.classList.add("content");
      chapter.appendChild(chapterContent);
      chapters[chapterTitle].forEach((line) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = line;
        chapterContent.appendChild(paragraph);
      });
      chatlog.appendChild(chapter);
    }
    makeItOhuenno(); // Перенесли вызов функции сюда
  })
  .catch((error) => console.error(error));



function makeItOhuenno() {
  console.log("Запускаю допфункции");
  removeTimestamps();
  cleanText();
  playersList();
  colorizePlayers();
  // mergePlayerReplies();

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

dates.forEach(date => {
  date.addEventListener("click", toggleContent);
});


/* // Разворачиваем первую главу

console.log("Разворачиваю первую главу")

window.addEventListener('DOMContentLoaded', function() {
  const firstChapter = document.querySelector('.chapter');
  firstChapter.classList.remove('collapsed');
  firstChapter.classList.add('expanded');
});

console.log("Развернул первую главу") */

// Объединение чатбоксов

$(document).ready(function() {
    var prevPlayer = "";
    var prevSpeech = "";
    $(".logline").each(function() {
        var currentPlayer = $(this).find(".player").text();
        var currentSpeech = $(this).find(".speech").text();
        if (currentPlayer == prevPlayer) {
            $(this).prev().find(".speech").append(" " + currentSpeech);
            $(this).remove();
        } else {
            prevPlayer = currentPlayer;
            prevSpeech = currentSpeech;
        }
    });
});

}

// ДАЛЬШЕ ИДУТ ОПРЕДЕЛЕНИЯ
// ДАЛЬШЕ ИДУТ ОПРЕДЕЛЕНИЯ
// ДАЛЬШЕ ИДУТ ОПРЕДЕЛЕНИЯ

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
  var chatlog = document.getElementById("chatlog");
  var chatlogHTML = chatlog.innerHTML;
  chatlog.innerHTML = chatlogHTML.replace(
    /\d{1,2}\/\d{1,2}\s\d{1,2}:\d{1,2}:\d{1,2}\.\d{1,3}\s+/g,
    '<p class="logline">'
  );
}

// Чистка от мусора

function cleanText() {
  console.log("Чистка от мусора");
  var chatlog = document.getElementById("chatlog");
  var chatlogHTML = chatlog.innerHTML;

  chatlogHTML = chatlogHTML.replace(
    /(<p class="logline">(\d|\(|Защитное|Магическое|Силовое|Ловкое|Вам|GUID|Статус|Персонаж|Добро|Поздравляем|Разделение|Вы|Специальное|Начислено|ОШИБКА|Сломанные|Отношение|Ваша|\W+ шеп|\W+ создает:|Вы шеп|Вы выполн|Вы получ|Способн|Кастомн|щит|Ткан|Entered building|Game Object|Получено задание|Stopped|Done!|Вы|Смена|\(d+d|&?dd|Разыгрываются).+\n<\/p>|\|Hchannel:(RAID|PARTY|GUILD)\|h|\|h)/gm,
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

  chatlogHTML = chatlogHTML.replace(
    /([—–-]\s(.+?)\s[—–-])/gm,
    "<span class='emote'>— $2 —</span>"
  );

  // chatlogHTML = chatlogHTML.replace(/<p( class="logline"|)><\/p>/gm, ""); // Пустые абзацы

  // chatlogHTML = chatlogHTML.replace(/<p( class="logline"|)><\/p>/gm, ""); // Пустые абзацы

  chatlog.innerHTML = chatlogHTML; // Завершающая строка, не потри случайно
}

// Склейка чатбоксов

/* function mergePlayerReplies() {
  // Получаем элемент content из DOM-дерева
  const content = document.getElementsByClassName("content")[0];
  // Объявляем переменные для хранения информации о предыдущем игроке и его высказывании
  let lastPlayer = null;
  let lastSpeech = null;
  // Проходимся в цикле по всем дочерним элементам content
  for (let i = 0; i < content.children.length; i++) {
    // Получаем текущий дочерний элемент
    const child = content.children[i];
    // Проверяем, является ли дочерний элемент сообщением игрока (имеет ли класс "logline")
    const isReplica = child.classList.contains("logline");
    // Если элемент является сообщением игрока, получаем имя игрока
    const player = isReplica
      ? child.querySelector(".player").textContent
      : null;

    // Выводим в консоль информацию о текущем элементе
    console.log(
      `Checking replica ${i}: isReplica = ${isReplica}, player = ${player}`
    );

    // Если текущий элемент является сообщением игрока, и имя игрока совпадает с предыдущим игроком
    if (isReplica && player === lastPlayer) {
      // Выводим в консоль информацию о слиянии текущего элемента
      console.log(`Merging replica ${i}...`);
      // Удаляем текущий элемент из DOM-дерева
      child.remove();
      // Добавляем текст текущего элемента к тексту предыдущего элемента
      lastSpeech.textContent +=
        " " + child.querySelector(".speech").textContent;
    } else {
      // Выводим в консоль информацию о том, что текущий элемент не был объединен
      console.log(`Not merging replica ${i}...`);
      // Запоминаем имя игрока и его высказывание в качестве последних
      lastPlayer = player;
      lastSpeech = isReplica ? child.querySelector(".speech") : null;
    }
  }
  // Выводим в консоль информацию о завершении слияния
  console.log("Merge complete.");
} */

// Раскраска ников

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

      // Если имя игрока еще не было добавлено в список
      if (!players.includes(playerName)) {
        // Добавляем имя игрока в список имен
        players.push(playerName);

        // Создаем новый элемент списка li для имени игрока
        let playerItem = document.createElement("li");

        // Устанавливаем текст элемента списка равным имени игрока
        playerItem.textContent = playerName;
        playerItem.className = "player";

        // Добавляем элемент списка в список игроков
        playerList.appendChild(playerItem);
      }
    });

    // Если были найдены имена игроков внутри .chapter
    if (playerNames.length > 0) {
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
