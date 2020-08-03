//  payload: {state: number}
// number:
// 1 - факт
// 2 - вопрос
// 3 - ключевые слова

exports.welcome = () => {
	return {
	response: {
      text: 'Вас приветсвует школа AF. Я вам расскажу интересные вещи, которыми мы занимаемся. Хотите продолжить?',
      tts: '<speaker audio="alice-music-harp-1.opus">Вас приветсвует школа AF. Я вам расскажу интересные вещи, которыми мы занимаемся. Хотите продолжить?',
      buttons: [
      	{title: 'Да', payload: {state: 0},hide: true}
      ],
      end_session: false
    },
    version: '1.0'
	};
}


exports.firstUserAnswer = () => {
	return {
	response: {
      text: 'Хотите погрузиться в мир дизайна и искусства или зададите конкретный вопрос?',
      tts: 'Хотите погрузиться в мир дизайна и искусства или зададите конкретный вопрос?',
      buttons: [
      	{title: 'Факт', payload: {state: 1}, hide: true},
      	{title: 'Вопрос', payload: {state: 2}, hide: true}
      ],
      end_session: false
    },
    version: '1.0'
	};
}


// @param {String} fact
exports.giveFact = (fact) => {
	return {
	response: {
      text: fact,
      tts: fact,
      buttons: [
      	{title: 'Продолжить', payload: {state: 1}, hide: true},
      	{title: 'Задать вопрос', payload: {state: 2}, hide: true}
      ],
      end_session: false
    },
    version: '1.0'
	};
}


exports.offerKeywords = () => {
	return {
	response: {
      text: 'Начиная со слов "хочу узнать о", используйте ключевое слово. Хотите узнать пару таких?',
      tts: 'Начиная со слов "хочу узнать о", используйте ключевое слово. Хотите узнать пару таких?',
      buttons: [
      	{title: 'Ключевые слова', payload: {state: 3}, hide: true},
      ],
      end_session: false
    },
    version: '1.0'
	};
}


// @param {String} fact
exports.giveKeywords = (keywords) => {
	return {
	response: {
      text: keywords,
      tts: keywords,
      buttons: [
      	{title: 'Узнать факт', payload: {state: 1}, hide: true},
      	{title: 'Задать вопрос', payload: {state: 2}, hide: true}
      ],
      end_session: false
    },
    version: '1.0'
	};
}

// @param {String} fact
exports.getAnswerForKeywoard = (answer) => {
	return {
	response: {
      text: answer,
      tts: answer,
      buttons: [
      	{title: 'Продолжить', payload: {state: 1}, hide: true},
      	{title: 'Задать вопрос', payload: {state: 2}, hide: true}
      ],
      end_session: false
    },
    version: '1.0'
	};
}


// exports.test = () => {
// 	const fileData = fs.readFileSync('metadata.json', 'utf8')
// 	data = JSON.parse(fileData);

// 	let fileKeywords = Object.values(data.keywords)
// 	let arrayKeywords = []
// 	fileKeywords.map(({keyword, answer}) => {
// 		console.log(keyword)
// 		// arrayKeywords.push(entry.keyword)
// 	})
// 	return arrayKeywords;
// }