//Функция проверки длины строки
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}
window.console.log(stringLength('Привет, мир!', 15)); // Вывод результата в консоль

//Функция проверки палиндрома
function isPalindromeCheck(string) {
  const cleanedStr = string.replaceAll(' ', '').toLowerCase();
  let reversedStr = '';
  for (let i = cleanedStr.length - 1; i >= 0; i--) {
    reversedStr += cleanedStr[i];
  }
  return cleanedStr === reversedStr;
}
window.console.log(palindromeCheck('А роза упала на лапу Азора')); // Вывод результата в консоль
window.console.log(palindromeCheck('ДовОд')); // Вывод результата в консоль
window.console.log(palindromeCheck('Привет')); // Вывод результата в консоль

