/*
*	GoodFunctions
*	Модуль для экспорта функций общего назначения
*/

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function getRandomElement(arr) {
  const index = getRandomInt(arr.length);
  return arr[index];
}

// maxArrayLength в for дает доп. рандом на длину выходного массива
// Если надо фиксированное значение, то поменять на arr.length
function getRandomArray(arr, maxArrayLength) {
	let numbersArray = []
	let newArray = []
	outer: for (let i = 0; i < maxArrayLength; i++) {
		let randomNumber = getRandomInt(arr.length)
		for (let j in numbersArray) {
			if (numbersArray[j] === randomNumber) continue outer;
		}
		numbersArray.push(randomNumber)
		newArray.push(arr[randomNumber])
	}
	return newArray;
}


module.exports = {
	getRandomInt: getRandomInt,
	getRandomElement: getRandomElement,
	getRandomArray: getRandomArray,
}