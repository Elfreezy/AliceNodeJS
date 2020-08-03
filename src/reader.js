/*
*	Все функции работают с файлом metadata.json
*	DATAFILE - глобальный объект с json данными файла
*	Префикс file указывает на принадлежность данных к файлу с аналогичным ключем
*/
const fs = require('fs');

// @param {String} fileName
function readFile(fileName) {
	const dataFile = fs.readFileSync(fileName, 'utf8')
	return JSON.parse(dataFile);
}


// Достает из obj - {} массив значений с необходимым ключом
function getArrayOfValues(obj, key, value) {
	let fileData = Object.values(obj[key])
	let arr = []
	fileData.map((entry) => {
		arr.push(entry[value])
	})
	return arr;
}


// @param {String} keyword
// Возвращает keyword, полученный от Алисы, преобразует к виду fileRegKeywords
function getRegKeyword(obj, keyword) {
	const fileRegKeywords = Object.values(obj.regKeywords)
	for (let index = 0; index < fileRegKeywords.length; index++) {
		regKeyword = fileRegKeywords[index]
		if (keyword.includes(regKeyword)) return regKeyword;
	}
	return 'Ключевое слово не найдено';
}


// Возвращает ключ keyword из файла, аналогичный его regKeyword
function findIndexOfRegKeyword(obj, regKeyword) {
	let fileRegKeywords = obj.regKeywords
	for (let index in fileRegKeywords) {
		if (fileRegKeywords[index] === regKeyword) return index;
	}
	return -1;
}

// Возвращает строку answer соотв. keyword
function findAnswerForKeyword(obj, keyword) {
	let fileKeywords = obj.keywords
	let regKeyword = getRegKeyword(obj, keyword)

	let indexOfRegKeyword = findIndexOfRegKeyword(obj, regKeyword)
	if (indexOfRegKeyword === -1) return 'Index of keyword is not found';

	let fileKeyword = fileKeywords[indexOfRegKeyword]
	return fileKeyword.answer;
}


module.exports = {
	readFile: readFile,
	getArrayOfValues: getArrayOfValues,
	getRegKeyword: getRegKeyword,
	findIndexOfRegKeyword: findIndexOfRegKeyword,
	findAnswerForKeyword: findAnswerForKeyword,
}
