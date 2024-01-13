






  chatlogHTML = chatlogHTML.replace(/\n+/g, "\n"); // Пустые строки















  function cleanTextOld() {
    chatlogHTML = chatlogHTML.replace(/[-–—]/g, "–"); // Однотипные дефисы
  
    chatlogHTML = chatlogHTML.replace(/([а-я]) — ([А-Я])/g, "$1: — $2"); // Двоеточие перед прямой речью
  
    chatlogHTML = chatlogHTML.replace(/\>\s/g, ">"); // Багфикс пробела в начале контейнера
  
    // chatlogHTML = chatlogHTML.replace(/\n<\//g, '</'); // Багфикс переноса
  
    chatlogHTML = chatlogHTML.replace(/<p><\/p>/g, ""); // Пустые абзацы
    chatlogHTML = chatlogHTML.replace(/\|\d\–\d\((.+?)\)/g, "$1"); // Кривые падежи
  
    chatlogHTML = chatlogHTML.replace(/\|H.*?(\[.*?\])\|h\s(.+?):/g, "$1 $2:"); // |Hchannel:PARTY|h[Лидер группы]|h Роуз: => [Лидер группы] Роуз:
  
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
  }