/* 
*	Модуль для работы с языковыми конструкциями
*	Используется библиотека Az
*/

const Az = require('az');

// Поменять путь до словарей
Az.Morph.init('./node_modules/az/dicts', function() {});


/* 
* Возвращает объект Az. Доступные методы:
* normalize - приводит к нормальной форме
* inflect - приводит слово к указанной форме
* pluralize - приводит слово к форме, согласующейся с указанным числом
* matches - проверяет, согласуется ли текущая форма слова с указанной
*/
function wordParsing(word) {
	const parses = Az.Morph(word);
	return parses[0];
}


// Сделать массив ключевых слов в одной форме

module.exports = {
	wordParsing: wordParsing,
}
