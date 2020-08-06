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
// ToDo выводит только первые в ключевых словах
function getArrayOfValues(obj, key, value) {
	let fileData = Object.values(obj[key])
	let arr = []
	fileData.map((entry) => {
		arr.push(entry[value][0])
	})
	return arr;
}

// Возвращает ответ с большим количеством совпадений ключевых слов
function findFileQuestion(obj, arrValues) {
	let arrQuestions = Object.values(obj.questions)
	let indexMaxRepeate = 0
	let valueMaxRepeat = 0
	let countValues = arrQuestions.length

	for (let i = 0; i < countValues; i++) {
		let question = arrQuestions[i]
		let countRepeats = 0
		outer: for (let j = 0; j < arrValues.length; j++) {
			let value = arrValues[j]
			let arrayKeywords = question.keywords
			let countKeywords = arrayKeywords.length

			for (let k = 0; k < countKeywords; k++) {
				if (langWorker.wordParsing(value).normalize().word === arrayKeywords[k]) {
					countRepeats++
					continue outer;
				}
			}
		}

		let valueRepeat = (countRepeats / question.keywords.length) * (countRepeats / countValues)
		if (valueRepeat > valueMaxRepeat) {
			valueMaxRepeat = valueRepeat
			indexMaxRepeate = i
		}
	}
	return arrQuestions[indexMaxRepeate]
}


module.exports = {
	readFile: readFile,
	getArrayOfValues: getArrayOfValues,
	findFileQuestion: findFileQuestion,
}
