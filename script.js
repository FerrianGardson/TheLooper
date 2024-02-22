let combineDelay = 2 * 1000;

// Карта цветов
const nameColors = {
  Фэрриан: "blue-3",
  Малет: "blue",
  Роуз: "orange",
  Аммель: "orange",
  Маларон: "orange",
  Ананита: "green",
  Жуль: "red",
  Хейвинд: "red",
  Фуффис: "green",
  Киббл: "green",
  Лезинг: "orange",
  Сырорезка: "yellow",
  Санриэль: "yellow",
  Дерек: "red",
  Хильда: "blue",
  Кэролай: "red",
  Сахаджи: "yellow",
  Винтеза: "green",
  Сэнди: "yellow",
  Хьюз: "yellow",
};

// Карта фамилий
const surNames = {
  Фэрриан: "Фэрриан Гардсон",
  Сырорезка: "Джулианна Франческа Третья Златошпун",
  Аммель: "Рэдрик Аммель",
  Малет: "Малет Трант",
  Дезертир: "Герман Шульц",
  Ошберт: "Осберт Осбертсон",
  Роуз: "Арчибальд Роуз",
  Плут: "Винсент Сазерлэнд",
  Ананита: "Ананита Астор",
  Хофманн: "Карл Хофманн",
  Штрих: "Олдиус Лоне",
  Асмелт: "Асмелт Фьюри",
  Бель: "Бель Сеймур",
  Бернд: "Бернд Дженкинс",
  Мариам: "Мариам Метревели",
  Кристофер: "Кристофер Стротман",
  Эндэрд: "Киллиан Эндэрд",
  Готт: "Готт Айландер",
  Алрой: "Алрой Джонсон",
  Брандур: "Брандур Сталехват",
  Браен: "Браен Бёрк",
  Маларон: "Мал’арон Берёзовый Лист",
  Шенн: "Шенн Вельт",
  Джэф: "Джэфри Майер",
  Пачек: "Офелия Пачек",
  Иван: "Иван де Жильбер",
  Мидас: "Мидас Грейт",
  Хауэр: "Старшина Хауэр",
  Кейти: "Кейти Сазерлэнд",
  Каторжник: "Рой Редвуд",
  Кариночка: "Слепая",
  Дезертир: "Герман Шульц",
  Дезертир: "Герман Шульц",
  Дезертир: "Герман Шульц",
  Дезертир: "Герман Шульц",
  Дезертир: "Герман Шульц",
  // Добавьте другие сопоставления сюда
};

// Карта цветов
const randomColors = [
  "red",
  "green",
  "blue",
  "blue-1",
  "blue-2",
  "blue-3",
  "yellow",
  "orange",
  "purple",
  "purple-1",
  "purple-2",
  "purple-3",
  "white",
  "whisper",
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
  "random-20",
  "random-21",
  "random-22",
  "random-23",
  "random-24",
  "random-25",
  "random-26",
  "random-27",
  "random-28",
];

// Карта НПС
const npcNames = {
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

  // Добавьте другие имена NPC сюда
};

function calculateTimeDifference() {
  const now = new Date(); // Получаем текущее местное время
  localOffset = now.getTimezoneOffset(); // Получаем смещение текущего часового пояса относительно UTC
  localDifference = localOffset / 60; // Переводим смещение в часы
  moscowDifference = localDifference + 3; // Разница между текущим поясом и московским временем (UTC+3)
  serverDifference = localDifference + 1; // Разница между текущим поясом и серверным временем (UTC+1)
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

calculateTimeDifference();

// Главная функция

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
  addTimeToChapter();
  findLoglinesAndConvertToTranscript();
  // $(".logline.story span.player").remove();

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
// Обработка .txt файлов
async function handleTxtFile(file) {
  // Очищаем содержимое div.chatlog перед загрузкой нового файла
  chatlog.innerHTML = "";

  // Читаем содержимое файла как текст
  const text = await file.text();

  // Рендерим чатлог с текстовым содержимым файла
  importTxt(text);
}

// Обработка .html файлов
async function handleHtmlFile(file) {
  // Получаем содержимое файла как текст
  const htmlText = await file.text();

  // Ищем элемент с id "chatlog" в HTML-тексте
  const parser = new DOMParser();
  const htmlDocument = parser.parseFromString(htmlText, "text/html");
  const newChatlog = htmlDocument.getElementById("chatlog");

  // Проверяем, что элемент с id "chatlog" найден в HTML-тексте
  if (newChatlog) {
    // Заменяем текущий chatlog новым элементом
    chatlog.innerHTML = newChatlog.innerHTML;
  } else {
    console.error("Элемент #chatlog не найден в HTML файле");
  }
}

// Загрузка файла
const fileInputTxt = document.getElementById("file-input-txt");
fileInputTxt.addEventListener("change", handleFileInput);

function handleFileInput(event) {
  const file = event.target.files[0];

  if (file) {
    // Проверяем тип файла
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
  //console.log("Ввели таймштамп:", timestamp);

  const [date, time] = timestamp.split(" ");
  const [month, day] = date.split("/");
  const [hoursMinutesSeconds, milliseconds] = time.split(".");
  const [hours, minutes, seconds] = hoursMinutesSeconds.split(":");

  // Форматируем дату и время в нужном формате
  const isoTimestamp = `${new Date().getFullYear()}-${month.padStart(
    2,
    "0"
  )}-${day.padStart(2, "0")}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

  //console.log("Получили таймштамп:", isoTimestamp);

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
  const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]}, `;
  return formattedDate;
}

// Старые таймштампы в h2.date
// ${padZero(date.getHours())}:${padZero(date.getMinutes())}

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
  let chapters = [];
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

  // Находим все элементы div.chapter
  chapters = document.querySelectorAll("div.chapter");

  // Перебираем каждый элемент div.chapter
  chapters.forEach((chapter) => {
    // Создаем новый элемент div.content
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("content");

    // Находим все элементы p внутри текущего div.chapter
    const paragraphs = chapter.querySelectorAll("p");

    // Перебираем каждый элемент p и перемещаем их в div.content
    paragraphs.forEach((paragraph) => {
      contentContainer.appendChild(paragraph);
    });

    // Вставляем div.content после последнего дочернего элемента div.chapter
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
let isCollapsed = true;

function toggleChapters() {
  if (isCollapsed) {
    //console.log("expandChapters();");
    expandChapters();
  } else {
    //console.log("collapseChapters();");
    collapseChapters();
  }

  isCollapsed = !isCollapsed;

  // Используйте querySelector для получения одиночного элемента
  let button = document.querySelector('[onclick="toggleChapters()"]');
  button.textContent = isCollapsed ? "Развернуть" : "Свернуть";
}

// КОНЕЦ

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

// Чистка от мусора

function cleanText() {
  chatlogHTML = document.getElementById("chatlog").innerHTML; // Определение
  chatlogHTML = chatlogHTML.replace(/кошка/g, "кот"); // Пример
  chatlogHTML = chatlogHTML.replace(/<\/p>/g, "</p>\n"); // Перенос

  // Системные сообщения

  chatlogHTML = chatlogHTML.replace(
    /<p.*?>\s*((Аукцион|%s|ОШИБКА:|Было|Сегодня|Значок|Вы|Магическая|Удалено|Удалена|Номер|Игрок|Ставка|За|Существо|Кожаная|Персонаж|Сохранённый|Для|Всем|Текст|Эффект|щит|Телепорт|С\s|Получен|Характеристики|Маг.уст\:|вами.|Spawn|Если|Начислен|Установлен|Удален|Сохранён|Облик|Статы|Существу|Сила\:|Ловк\:|Инта\:|Физ.уст\:|На|Рейд|\*|Перезагрузка|Удаляются|Физическая|Похоже,|Подключиться|Повторите|Используйте|Персонаж|Статус|Стандартная|Добро|&\?|Так|Вы|Вам|Вас|Ваша|Ваш|Теперь|Участники|Порог|Бой|Поверженные|Сбежали|Победители|Приглашение|Настройки|Ошибка|Местоположение|Разделение|У|Ваше|Начислено|Камень|Получено|\[СЕРВЕР\]|Разыгрываются|Продление|Сломанные|Способности|Кастомный|Тканевые|Отношение|Смена|Не|Рядом|Объект|ОШИБКА|Задание|Всего|Поздравляем)\s.*?|(Результат\:|Персонаж))<\/p>\n/g,
    ""
  ); // Системные сообщения, начинаются с указанных слов

  chatlogHTML = chatlogHTML.replace(/\|H.*?(\[.*?\])\|h\s(.+?):/g, "$1 $2:"); // |Hchannel:PARTY|h[Лидер группы]|h Роуз: => [Лидер группы] Роуз:

  chatlogHTML = chatlogHTML.replace(
    /<p.*?>([A-Za-z]|\>|\&|\(|\d).*?<\/p>\n/g,
    ""
  ); // Системные сообщения, начинаются со служебных символов

  chatlogHTML = chatlogHTML.replace(
    /<p.*[А-Я][а-я-]+?\s(is|действие|получил|атакует,|кажется,|приглашается|\(|атакует|уже состоит|вступает|исключается|смотрит|преклоняет|рассказывает|is Away|получает|не имеет ауры|does not wish|к вам|смотрит на вас|кивает вам|смотрит на вас|ставит|добавлено|создает|засыпает|ложится|предлагает|умирает|отклоняет|установлено|получил|устанавливает вам|находится в|производит|ложится|похоже, навеселе|кажется, понемногу трезвеет|желает видеть вас|пытается помешать побегу|уже состоит в группе|проваливает попытку побега|\+ \d = \d|теряет все свои очки здоровья и выбывает из битвы|пропускает ход|выходит|выполняет действие|входит|присоединяется|выбрасывает|,\s\похоже,\s\навеселе|становится|покидает).*?<\/p>\n/g,
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
    '$1 emote virt"><span class="player">$2</span><span class="emote">$3</span></p>'
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
  // debugger;

  document
    .querySelectorAll("#chatlog p:empty")
    .forEach((emptyParagraph) => emptyParagraph.remove()); // Удаление пустых абзацев
}
// Объединение чатбоксов

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
    //console.log(currentSay);
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

function sayToEmote() {
  let say = "";
  // Собираем все p.logline.say
  say = document.querySelectorAll("p.say, p.yell");
  // Индексируем и обрабатываем каждый p.logline.say
  for (let i = 0; i < say.length; i++) {
    // Получаем текст из HTML-элемента
    let sayText = say[i].innerHTML;
    // Обрабатываем текст с помощью регулярного выражения
    //sayText = sayText.replace(/([!?:.,])\s((?:—.+?(?:[!?:]|[!?:.,]\s—\s*|<\/span>)))/g,'$1 <span class="emote">$2</span>'); // Старая замена
    // sayText = sayText.replace(/([!?.,:])(\s—\s.*?[!?.,:]\s—\s)/g,'$1<span class="emote">$2</span>'); // Новая замена
    sayText = sayText.replace(
      /([!?.,:])(\s—\s.*?[!?.,:](\s—\s|<\/span>))/g,
      '$1<span class="emote">$2</span>'
    ); // Новая замена
    sayText = sayText.replace(
      /<\/span><span class="say">\s*[—–-]\s*/g,
      '</span><span class="say">'
    ); // Тире в начале
    say[i].innerHTML = sayText;
    // Выводим обновленную версию текста
    say[i].innerHTML = sayText;
  }
}

function emoteTosay() {
  // Получаем все элементы p.logline.emote
  let emotes = document.querySelectorAll("p.logline.emote");

  // Индексируем и обрабатываем каждый элемент p.logline.emote
  for (let i = 0; i < emotes.length; i++) {
    // Получаем текст из HTML-элемента
    let emoteText = emotes[i].innerHTML;

    // Обрабатываем текст с использованием регулярного выражения (пример)
    // let updatedEmoteText = emoteText.replace(/(—\s(?:["«]|)\s*(?:\(.+\)\s|)[А-Я](?:.+?)(?:[,.!?] —|<\/span>))/g,'<span class="say">$1</span>');
    let updatedEmoteText = emoteText.replace(
      /(—\s((?:["«]|)\s*(?:\(.+\)\s|)[А-Я](?:.+?)[,.!?])(?: —|<\/span>))/g,
      '<span class="dash">— </span><span class="say">$2</span><span class="dash"> —</span>'
    );

    // Если нужно обновить HTML-элемент, раскомментируйте следующую строку
    emotes[i].innerHTML = updatedEmoteText;
  }
}

function toggleCollapse(event) {
  // Получаем родителя (предполагаем, что он имеет класс "chapter")
  const chapter = event.target.closest(".chapter");
  if (chapter) {
    // Выводим в консоль лог текущего состояния "collapsed" до переключения
    // Переключаем класс "collapsed"
    chapter.classList.toggle("collapsed");
    //// console.log("Toggle Collapsed");
    // Выводим в консоль лог состояния "collapsed" после переключения
  } else {
    console.error(
      "Не найден элемент с классом 'chapter' в родительской цепочке."
    );
  }
}
let keywordsInput = null;
function logFilter() {
  // Получаем ключевые слова из поля ввода с учетом слов внутри кавычек
  previousInput = keywordsInput;
  keywordsInput = document.getElementById("keywordsInput").value;
  // Если ввод прежний, переходим к ближайшему следующему совпадению
  if (keywordsInput === previousInput) {
    scrollToSelect();
    return;
  }
  // Снимаем выделение
  document
    .querySelectorAll(".selected")
    .forEach((element) => element.classList.remove("selected"));
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
  $(".chapter").each(function () {
    $(this)
      .find("*")
      .each(function () {
        // Перебираем все элементы внутри .chapter
        const text = $(this).text().toLowerCase().replace(/\s+/g, " "); // Получаем текст элемента и приводим к нижнему регистру
        const hasKeyword = keywords.some((keyword) => text.includes(keyword)); // Проверяем, содержит ли текст хотя бы одно из ключевых слов
        const splitKeywords = keywords.map((keyword) => keyword.split("-")); // Разделяем ключевые слова по дефису
        const isRemoveKeyword = splitKeywords.some(
          (pair) => pair.length === 2 && text.includes(pair[1].trim())
        ); // Проверяем, содержит ли текст вторую часть ключевого слова (для удаления)
        if (hasKeyword && !isRemoveKeyword) {
          $(this).addClass("selected"); // Добавляем класс 'selected', если содержит ключевое слово и не содержит вторую часть ключевого слова
        } else if (isRemoveKeyword) {
          $(this).removeClass("selected"); // Удаляем класс 'selected', если содержит вторую часть ключевого слова
        }
      });
  });
  openselectedChapters();
  removeCollapsed();
  selected = [];
  scrollToSelect();
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
        //// console.log( `Удаляется chapter с длительностью ${hours} часов ${minutes} минут.` );
        chapter.remove();
      }
    }
  });
}

function openselectedChapters() {
  // Найти все элементы с классом .chapter
  var chapters = document.querySelectorAll(".chapter");
  // Пройти по каждому .chapter с использованием цикла for и i
  for (var i = 0; i < chapters.length; i++) {
    var chapter = chapters[i];
    chapter.classList.add("collapsed");
    // Проверить, содержит ли .chapter дочерний элемент с классом .logline.selected
    if (chapter.querySelector(".selected")) {
      // Если содержит, добавить класс .expanded
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

  // Получаем содержимое первого найденного h2.date
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

  // Используем название файла на основе содержимого h2.date
  element.setAttribute("download", fileName + ".html");

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
  let button = document.querySelector('[onclick="selectAll()"]');
  button.textContent = isAllSellected ? "Выделить всё" : "Убрать всё";
  isAllSellected = !isAllSellected;
}

function debug() {
  scrollToSelect();
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

var isReversed = false;
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
  let button = document.querySelector('[onclick="chapterReverse()"]');
  button.textContent = isReversed ? "Сначала старое" : "Сначала новое";
  isReversed = !isReversed;
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

function virt() {
  document.querySelectorAll("p.virt").forEach((element) => {
    // element.innerHTML = element.innerHTML.replace( /("player.*?)<span class="dash">— <\/span>/g, "$1" );
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

// Тумблер keepGroup

const keepGroupCheckbox = document.getElementById("keepGroupCheckbox");
let keepGroup = true;

// Обработчик изменения состояния чекбокса
keepGroupCheckbox.addEventListener("change", function () {
  // Обновляем значение переменной keepGroup в соответствии с состоянием чекбокса
  keepGroup = this.checked;
});

// Тумблер keepRaid

const keepRaidCheckbox = document.getElementById("keepRaidCheckbox");
let keepRaid = false;

// Обработчик изменения состояния чекбокса
keepRaidCheckbox.addEventListener("change", function () {
  // Обновляем значение переменной keepRaid в соответствии с состоянием чекбокса
  keepRaid = this.checked;
});

// Тумблер keepRaidWarning

const keepRaidWarningCheckbox = document.getElementById(
  "keepRaidWarningCheckbox"
);
let keepRaidWarning = true;

// Обработчик изменения состояния чекбокса
keepRaidWarningCheckbox.addEventListener("change", function () {
  // Обновляем значение переменной keepRaidWarning в соответствии с состоянием чекбокса
  keepRaidWarning = this.checked;
});

//

function filterTrimEverything() {
  // Найти все div с классом "chapter"
  var chapters = document.querySelectorAll("div.chapter");

  // Проверить, есть ли хотя бы один div с классом "chapter"
  if (chapters.length > 0) {
    // Пройтись по всем найденным div и применить trimChapter
    chapters.forEach(function (chapter) {
      trimChapter($(chapter));
    });
  } else {
    //// console.log('На странице нет div с классом "chapter".');
  }
}

// Конец

function clearChatlog() {
  // Получаем ссылку на элемент div#chatlog
  var chatlog = document.getElementById("chatlog");

  // Очищаем содержимое элемента
  chatlog.innerHTML = "";
}

// Конец

// Внешний массив
let selected = [];
// Переменная текущей позиции
let currentPosition = null;

function scrollToSelect() {
  // Если массив или позиция пустая
  if (!selected.length || currentPosition === null) {
    // Наполняем массив всеми p.selected со страницы
    selected = Array.from(document.querySelectorAll("p.selected"));

    // Если есть элементы в массиве, перемещаемся на первый индекс скроллом
    if (selected.length > 0) {
      selected[0].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // Запоминаем текущую позицию
      currentPosition = 0;
    }
  } else {
    // Перемещаемся на +1 от текущей позиции скроллом
    const nextIndex = (currentPosition + 1) % selected.length;
    selected[nextIndex].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    // Запоминаем новую позицию как текущую
    currentPosition = nextIndex;
  }
}

function removeUnselectedLoglines() {
  // Находим все элементы <p> с классом "logline" без класса "selected"
  var unselectedLoglines = document.querySelectorAll(
    "p.logline:not(.selected)"
  );

  // Проходимся по каждому найденному элементу и удаляем его
  unselectedLoglines.forEach(function (logline) {
    logline.remove();
  });
}

function addTimeToChapter() {
  const chapters = document.querySelectorAll(".chapter");
  chapters.forEach((chapter) => {
    const dateHeader = chapter.querySelector("h2.date");
    const firstParagraph = chapter.querySelector("p[timestamp]:first-of-type");
    const lastParagraph = chapter.querySelector("p:last-of-type");

    if (dateHeader && firstParagraph && lastParagraph) {
      // Удаляем .starttime и .durationtime, если они уже существуют
      dateHeader.querySelector(".starttime")?.remove();
      dateHeader.querySelector(".durationtime")?.remove();

      // Получаем временные метки начала и конца главы
      const startTime = new Date(firstParagraph.getAttribute("timestamp"));
      const endTime = new Date(lastParagraph.getAttribute("timestamp"));
      //console.log("На входе", firstParagraph.getAttribute("timestamp"));
      // Функция для форматирования времени в виде "ЧЧ:ММ"
      const formatTime = (time) => {
        const hours = String(time.getUTCHours()).padStart(2, "0");
        const minutes = String(time.getUTCMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
      };

      // Форматирование времени начала и конца главы
      const startTimeString = formatTime(startTime);
      const endTimeString = formatTime(endTime);

      // Вычисляем продолжительность главы в миллисекундах
      const durationTime = endTime - startTime;
      // Переводим продолжительность в часы и минуты
      const durationHours = Math.floor(durationTime / (1000 * 60 * 60));
      const durationMinutes = Math.floor(
        (durationTime % (1000 * 60 * 60)) / (1000 * 60)
      );

      // Создаем и добавляем элементы для отображения времени начала, конца и продолжительности главы
      const startTimeSpan = document.createElement("span");
      startTimeSpan.classList.add("starttime");
      startTimeSpan.textContent = startTimeString;
      dateHeader.appendChild(startTimeSpan);
      //console.log('На выходе', startTimeString);

      const endTimeSpan = document.createElement("span");
      endTimeSpan.classList.add("endtime");
      endTimeSpan.textContent = ` ${endTimeString}`;
      dateHeader.appendChild(endTimeSpan);

      const durationTimeSpan = document.createElement("span");
      durationTimeSpan.classList.add("durationtime");
      durationTimeSpan.textContent = ` (${durationHours}ч ${durationMinutes}мин)`;
      durationTimeSpan.setAttribute(
        "duration",
        `${durationHours}:${durationMinutes}`
      );
      dateHeader.appendChild(durationTimeSpan);

      // Удаляем .endtime
      endTimeSpan.remove();
    }
  });
  //removeShortChapters();
  calculateTotalDuration();
  playerList();
}

function processTimestamp() {
  // Получаем элемент с классом .chapter
  const chapter = document.querySelector(".chapter");

  // Получаем значение атрибута timestamp у элемента .chapter
  const timestampValue = chapter.getAttribute("timestamp");

  // Выводим значение timestamp в консоль
  console.log("Введенный таймштамп:", timestampValue);

  // Преобразуем timestamp в формат ЧЧ:ММ без учета часового пояса
  const dateObject = new Date(timestampValue);
  const hours = ("0" + dateObject.getUTCHours()).slice(-2); // Получаем часы в формате UTC
  const minutes = ("0" + dateObject.getUTCMinutes()).slice(-2); // Получаем минуты в формате UTC
  const formattedTimestamp = hours + ":" + minutes;

  // Выводим отформатированный timestamp в консоль
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

  //console.log(`Суммарно наиграно ${totalHours}ч ${totalMinutes}мин`);
}

// Транскрипция в МИА

// Превращает элемент .logline.say в .transcript
function convertLoglineToTranscript(loglineElement) {
  // Получаем таймштамп и преобразуем его в нужный формат времени
  const timestamp = new Date(loglineElement.getAttribute("timestamp"));
  // console.log("На входе", loglineElement.getAttribute("timestamp"));
  const day = timestamp.getDate(); // Получаем день месяца
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
  const monthIndex = timestamp.getMonth(); // Получаем индекс месяца
  const formattedDate = day + " " + monthNames[monthIndex]; // Форматируем день и месяц
  const hours = ("0" + timestamp.getUTCHours()).slice(-2); // Местное время, без префикса UTC
  const minutes = ("0" + timestamp.getUTCMinutes()).slice(-2); // Местное время, без префикса UTC
  const formattedTimestamp = formattedDate + " " + hours + ":" + minutes; // Собираем дату и время в одну строку
  // console.log("На выходе", formattedTimestamp);

  // Получаем имя вещателя
  const playerName = loglineElement.querySelector(".player").textContent.trim();

  // Сохраняем атрибут timestamp
  loglineElement.setAttribute("timestamp", timestamp.toISOString());

  // Обработка сообщения регуляркой
  loglineElement.textContent = loglineElement.textContent.replace(
    /^.+([Зз]апись|\d\d[:.]\d\d)[,.!: ]/g,
    ""
  );

  // Генерируем HTML-код для записи в транскрипт
  const transcriptRecordHTML = `
    <div class="record">
      <p>Время заметки<span>${formattedTimestamp}</span></p>
      <p>Автор заметки<span>${playerName}</span></p>
    </div>
    <span class="speech">${loglineElement.textContent.trim()}</span>
  `;

  // Создаем новый элемент .transcript
  const transcriptElement = document.createElement("div");
  transcriptElement.classList.add("transcript", "selected");
  transcriptElement.innerHTML = transcriptRecordHTML;

  // Сохраняем атрибут timestamp в новом элементе .transcript
  transcriptElement.setAttribute("timestamp", timestamp.toISOString());

  // Заменяем текущий элемент .logline.say элементом .transcript
  loglineElement.replaceWith(transcriptElement);

  //// console.log(`Запись создана для элемента:`, loglineElement);
  loglineElement.scrollIntoView({ behavior: "smooth", block: "center" });
}

// Ищет элементы p.logline по ключевым словам и вызывает функцию convertToTranscript
function findLoglinesAndConvertToTranscript() {
  // Получаем элементы p.logline, содержащие класс 'say'
  const loglineElements = document.querySelectorAll("p.logline.say");

  // Перебираем каждый элемент
  loglineElements.forEach((loglineElement) => {
    // Проверяем содержит ли текст слово "запись"
    if (/запись/i.test(loglineElement.textContent)) {
      // Превращаем элемент в транскрипт
      ////console.log("Найден элемент для конвертации:", loglineElement);
      convertLoglineToTranscript(loglineElement);
    }
  });
}

// Горячие клавиши

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

// Клики

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

    // Если кликнули на h2.date или его детей, переключаем класс collapsed у родительского .chapter
    if (
      dateParent &&
      (element.tagName === "H2" || element.matches("h2.date"))
    ) {
      dateParent.classList.toggle("collapsed");
    }

    // Если кликнули на другие элементы, переключаем класс selected
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
  addTimeToChapter();
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
  addTimeToChapter();
}

function startWrap() {
  const contentChild = document.querySelector(".content > :hover");
  if (contentChild) {
    // Удаляем класс start_wrap у всех потомков .content
    document.querySelectorAll(".content .start_wrap").forEach((element) => {
      element.classList.remove("start_wrap");
      //console.log("start_wrap removed from element:", element);
    });

    // Добавляем класс start_wrap для текущего элемента
    contentChild.classList.add("start_wrap");
    //console.log("start_wrap added to element:", contentChild);
  }
}

function finishWrap(className) {
  const contentChild = document.querySelector(".content > :hover");
  if (contentChild) {
    // Удаляем класс finish_wrap у всех потомков .content
    document.querySelectorAll(".content .finish_wrap").forEach((element) => {
      element.classList.remove("finish_wrap");
      console.log("finish_wrap removed from element:", element);
    });

    // Добавляем класс finish_wrap для текущего элемента
    contentChild.classList.add("finish_wrap");
    console.log("finish_wrap added to element:", contentChild);
    WrapToDiv();
  }
  function WrapToDiv() {
    // Получаем все элементы под курсором, которые являются потомками .content
    const elementsUnderCursor = document.querySelectorAll(".content > :hover");

    // Перебираем каждый найденный элемент
    for (const element of elementsUnderCursor) {
      // Находим ближайшего родителя .content для текущего элемента
      const contentChild = element.closest("div.content");
      // Если .content не найден, переходим к следующему элементу
      if (!contentChild) continue;

      // Находим элементы с классами .start_wrap и .finish_wrap внутри .content
      const startWrap = contentChild.querySelector(".start_wrap");
      const finishWrap = contentChild.querySelector(".finish_wrap");
      // Удаляем классы .start_wrap и .finish_wrap у найденных элементов
      startWrap.classList.remove("start_wrap");
      finishWrap.classList.remove("finish_wrap");

      // Проверяем, что оба элемента .start_wrap и .finish_wrap найдены
      if (!startWrap || !finishWrap) {
        // Если хотя бы один из них не найден, выводим сообщение об ошибке и прерываем выполнение функции
        console.log(
          "Не удалось найти элемент начала или конца обёртки. Отмена операции WrapToDiv."
        );
        return;
      }

      // Получаем всех потомков .content
      const siblings = Array.from(contentChild.children);
      // Флаг для отслеживания начала и конца обёртки
      let isWrapping = false;
      // Создаем элемент для обёртки всех элементов между start_wrap и finish_wrap
      const spoilerDiv = document.createElement("div");
      spoilerDiv.classList.add(className);

      // Перебираем всех потомков .content
      for (const sibling of siblings) {
        // Если текущий потомок - это элемент начала обёртки, начинаем обёртку
        if (sibling === startWrap) {
          isWrapping = true;
          // Добавляем элемент start_wrap в обёртку spoilerDiv
          spoilerDiv.appendChild(startWrap.cloneNode(true)); // Включаем start_wrap в спойлер
          continue;
        }

        // Если текущий потомок - это элемент конца обёртки, завершаем обёртку
        if (sibling === finishWrap) {
          // Добавляем элемент finish_wrap в обёртку spoilerDiv
          spoilerDiv.appendChild(finishWrap.cloneNode(true)); // Включаем finish_wrap в спойлер
          break;
        }

        // Если обёртка началась и не завершилась, добавляем потомков между start_wrap и finish_wrap в обёртку
        if (isWrapping) {
          // Клонируем текущего потомка и добавляем его в обёртку
          const clonedSibling = sibling.cloneNode(true);
          spoilerDiv.appendChild(clonedSibling);
          // Удаляем оригинальный элемент после его клонирования
          sibling.remove(); // Удаляем оригинальный элемент после клонирования
        }
      }

      // Вставляем обёртку spoilerDiv после элемента start_wrap
      startWrap.parentNode.insertBefore(spoilerDiv, startWrap.nextSibling);

      // Выводим сообщение об успешном обёртывании элементов
      console.log("Элементы успешно обёрнуты в спойлер:", spoilerDiv);
      // Прерываем цикл после первого обнаруженного элемента
      startWrap.remove();
      finishWrap.remove();

      if (className === "spoiler") {
        // Добавляем элемент h1 с текстом "Наведитесь, чтобы раскрыть спойлер"
        const spoilerDesc = document.createElement("h1");
        spoilerDesc.classList.add("spoiler_desc");
        spoilerDesc.textContent = "Наведитесь, чтобы раскрыть спойлер";
        // Вставляем spoilerDesc после элемента .spoiler
        spoilerDiv.parentNode.insertBefore(spoilerDesc, spoilerDiv.nextSibling);
      }

      break;
      // Удаляем startWrap и finishWrap
    }
  }
}

function pasteImg() {
  //console.log("Trying to paste image...");

  const elementsUnderCursor = document.querySelectorAll(":hover");

  for (const element of elementsUnderCursor) {
    const loglineElement = element.closest("p.logline");

    if (loglineElement) {
      //console.log("Found p.logline element, inserting image...");

      const imgDiv = document.createElement("div");
      imgDiv.className = "paper img selected";

      const imgElement = document.createElement("img");
      imgElement.src =
        "https://i.postimg.cc/K8TcrhbQ/Wo-WScrn-Shot-010724-050024.png"; // Замените на ваш способ получения ссылки на изображение

      imgDiv.appendChild(imgElement);
      loglineElement.insertAdjacentElement("afterend", imgDiv);

      //console.log("Image inserted successfully.");
      break; // Прекращаем перебор после первого соответствующего элемента
    }
  }
}

function pasteText() {
  //console.log("Trying to paste text...");

  const elementsUnderCursor = document.querySelectorAll(":hover");

  for (const element of elementsUnderCursor) {
    const loglineElement = element.closest("p.logline");

    if (loglineElement) {
      //console.log("Found p.logline element, inserting text...");

      const paperDiv = document.createElement("div");
      paperDiv.className = "paper selected";

      const textElement = document.createElement("p");
      textElement.textContent = "Текст для вставки";

      paperDiv.appendChild(textElement);
      loglineElement.insertAdjacentElement("beforebegin", paperDiv);

      //console.log("Text inserted successfully.");
      break; // Прекращаем перебор после первого соответствующего элемента
    }
  }
}

function playerList() {
  const contents = document.querySelectorAll(".content");

  const uniquePlayers = new Set(); // Для отслеживания уникальных имен игроков

  contents.forEach((content) => {
    const players = content.querySelectorAll(
      ".say > .player, .yell > .player, .virt > .player"
    );
    const playerList = document.createElement("ul");
    const npcList = document.createElement("ul");
    playerList.classList.add("players");
    npcList.classList.add("npc");

    players.forEach((player) => {
      const playerName = player.textContent.trim();
      const uniquePlayerNameParts = playerName.split(" ");

      if (
        uniquePlayerNameParts.length === 1 &&
        !npcNames[playerName] &&
        !uniquePlayers.has(playerName)
      ) {
        playerList.appendChild(createPlayerItem(playerName));
        uniquePlayers.add(playerName); // Добавляем имя игрока во множество уникальных имен
      } else if (!uniquePlayers.has(playerName)) {
        npcList.appendChild(createPlayerItem(playerName));
        uniquePlayers.add(playerName); // Добавляем имя игрока во множество уникальных имен
      }
    });

    const actorsDiv = document.createElement("div");
    actorsDiv.classList.add("actors");
    content.parentNode.insertBefore(actorsDiv, content);
    actorsDiv.appendChild(playerList);
    actorsDiv.appendChild(npcList);
  });
}

function createPlayerItem(playerName) {
  const playerItem = document.createElement("li");
  playerItem.textContent = playerName;
  playerItem.classList.add("player");
  return playerItem;
}
