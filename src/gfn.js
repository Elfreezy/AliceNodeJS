/*
*	GoodFunctions
*	Модуль для экспорта функций общего назначения
*/

function getRandomElement(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}


module.exports = {
	getRandomElement: getRandomElement,
}