/*
*   Модуль работы с репликами Алисы
*   payload.state {1 - факт, 2 - вопрос, 3 - ключевые слова}
*/

const gfn = require('./gfn.js')


exports.welcome = () => {
	const answer = gfn.getRandomElement(['Хочу', 'Продолжить'])
	return {
		text: 'Вас приветсвует школа AF. Я вам расскажу интересные вещи, которыми мы занимаемся. Хотите продолжить?',
    tts: '<speaker audio="alice-music-harp-1.opus">Вас приветсвует школа AF. Я вам расскажу интересные вещи, которыми мы занимаемся. Хотите продолжить?',
    buttons: [
      {title: answer, payload: {state: 0},hide: true}
    ],
    end_session: false
	};
}


exports.firstUserAnswer = (sessionState) => {
  sessionState.value = 10
	return {
		text: 'Хотите погрузиться в мир дизайна и искусства или зададите вопрос о школе?',
    tts: 'Хотите погрузиться в мир дизайна и искусства или зададите вопрос о школе?',
    buttons: [
      {title: 'Факт', payload: {state: 1}, hide: true},
      {title: 'Вопрос', payload: {state: 2}, hide: true}
    ],
    end_session: false
	};
}


// @param {String} fact
exports.giveFact = (fact, sessionState) => {
  sessionState.value = 20
	return {
		text: fact.text,
    tts: '<speaker audio="alice-sounds-game-ping-1.opus">' + fact.text,
    card: {
      type: 'BigImage',
      image_id: fact.image_id,
      title: fact.title,
      description: fact.text
    },
    buttons: [
     	{title: 'Продолжить', payload: {state: 1}, hide: true},
     	{title: 'Задать вопрос', payload: {state: 2}, hide: true}
    ],
    end_session: false
  };
}


exports.offerKeywords = () => {
	return {
		text: 'Начиная со слов "хочу узнать о", используйте ключевое слово.',
    tts: 'Начиная со слов "хочу узнать о", используйте ключевое слово.',
    buttons: [
      {title: 'Интересные факты', payload: {state: 1}, hide: true},
      {title: 'Ключевые слова', payload: {state: 3}, hide: true},
    ],
    end_session: false
	};
}


// @param {String} fact
exports.giveKeywords = (keywords) => {
	return {
		text: keywords,
    tts: keywords,
    buttons: [
      {title: 'Задать вопрос', payload: {state: 2}, hide: true},
    	{title: 'Узнать еще', payload: {state: 3}, hide: true}
   	],
    end_session: false
	};
}


// @param {String} fact
exports.getAnswerForKeywoard = (item) => {
	return {
		text: item.answer,
    tts: item.tts,
    buttons: [
      {title: 'Узнать факт', payload: {state: 1}, hide: true},
      {title: 'Задать вопрос', payload: {state: 2}, hide: true}
    ],
    end_session: false
	};
}


exports.goodbye = () => {
	const answer = gfn.getRandomElement(['Пока', 'До встречи', 'До свидания', 'Удачи'])
	return {
		text: answer,
    tts: answer,
    end_session: true
	};
}