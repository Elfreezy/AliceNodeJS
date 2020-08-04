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


// -------
function findIndexOfKeyword(obj, str) {
	let fileKeywords = obj.keywords
	for (let index in fileKeywords) {
		if (deleteLastLettersNoun(fileKeywords[index].keyword) === deleteLastLettersNoun(str)) return index;
	}
	return -1;
}


// @param {String} keyword
function deleteLastLettersNoun(arg) {
	const str = arg.toLowerCase()
	const pattern = [/(а|ев|ов|ие|ье|е|иями|ями|ами|еи|ии|и|ией|ей|ой|ий|й|иям|ям|ием|ем|ам|ом|о|у|ах|иях|ях|ы|ь|ию|ью|ю|ия|ья|я)$/g, '']
	return str.replace(pattern[0], pattern[1]);
}


module.exports = {
	readFile: readFile,
	getArrayOfValues: getArrayOfValues,
	findIndexOfKeyword: findIndexOfKeyword,
	deleteLastLettersNoun: deleteLastLettersNoun,
}
