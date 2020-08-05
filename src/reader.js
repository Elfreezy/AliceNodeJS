/*
*	Все функции работают с файлом metadata.json
*	DATAFILE - глобальный объект с json данными файла
*	Префикс file указывает на принадлежность данных к файлу с аналогичным ключем
*/
const fs = require('fs');
const path = require("path");

const langWorker = require('./language_worker.js');

// @param {String} fileName
function readFile(fileName) {
	const filePath = path.resolve(path.join(__dirname, fileName));
	const dataFile = fs.readFileSync(filePath, 'utf8')
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

function findIndexOfKeyword(obj, str) {
	let fileKeywords = obj.keywords
	for (let index in fileKeywords) {
		if (fileKeywords[index].keyword === langWorker.wordParsing(str).normalize().word) return index;
	}
	console.log(langWorker.wordParsing(str).normalize().word)
	return -1;
}

module.exports = {
	readFile: readFile,
	getArrayOfValues: getArrayOfValues,
	findIndexOfKeyword: findIndexOfKeyword,
}
