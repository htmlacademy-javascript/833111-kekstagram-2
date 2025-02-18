//Функция проверки длины строки
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}
window.console.log(checkStringLength('Привет, мир!', 15)); // Вывод результата в консоль

//Функция проверки палиндрома
function isPalindromeCheck(string) {
  const cleanedStr = string.replaceAll(' ', '').toLowerCase();
  let reversedStr = '';
  for (let i = cleanedStr.length - 1; i >= 0; i--) {
    reversedStr += cleanedStr[i];
  }
  return cleanedStr === reversedStr;
}
window.console.log(isPalindromeCheck('А роза упала на лапу Азора')); // Вывод результата в консоль
window.console.log(isPalindromeCheck('ДовОд')); // Вывод результата в консоль
window.console.log(isPalindromeCheck('Привет')); // Вывод результата в консоль


//Функция проверки длительности встречи
function checkingTimeMeeting (time) {
  const [hours, minutes] = time.split(':').map((num) => parseInt(num, 10));
  return hours * 60 + minutes;
}

function checkMeetingTime(startOfWorkDay, endOfWorkDay, startOfMeeting, meetingDuration) {
  const workDayStart = checkingTimeMeeting(startOfWorkDay);
  const workDayEnd = checkingTimeMeeting(endOfWorkDay);
  const meetingStart = checkingTimeMeeting(startOfMeeting);
  const meetingEnd = meetingStart + meetingDuration;

  return meetingStart >= workDayStart && meetingEnd <= workDayEnd;
}

window.console.log(checkMeetingTime('08:00', '17:30', '17:00', 90));
