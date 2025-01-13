//Функция проверки длины строки
function stringLength(string, maxLength) {
  return string.length <= maxLength;
}
console.log(stringLength('Привет, мир!', 15)); // Вывод результата в консоль

//Функция проверки палиндрома
function palindromeCheck(string) {
  const cleanedStr = string.replaceAll(' ', '').toLowerCase();
  let reversedStr = '';
  for (let i = cleanedStr.length - 1; i >= 0; i--) {
    reversedStr += cleanedStr[i];
  }
  return cleanedStr === reversedStr;
}
console.log(palindromeCheck('А роза упала на лапу Азора')); // Вывод результата в консоль
console.log(palindromeCheck('ДовОд')); // Вывод результата в консоль
console.log(palindromeCheck('Привет')); // Вывод результата в консоль

