/*
*   Модуль работы с репликами Алисы
*   payload.state {1 - giveFact, 2 - вопрос, 3 - ключевые слова}
*/

const gfn = require('./gfn.js')


exports.welcome = (sessionState) => {
  sessionState.value = 0
  sessionState.item = ''
	const answer = gfn.getRandomElement(['Хочу', 'Продолжить'])
	return {
		text: 'Вас приветсвует школа ArtFuture. Я отвечу на повросы касающиеся нашей школы и поделюсь интересными фактами из мира дизайна. Хотите продолжить?',
    tts: '<speaker audio="alice-music-harp-1.opus">Вас приветсвует школа ArtFuture. Я отвечу на повросы касающиеся нашей школы и поделюсь интересными фактами из мира дизайна. Хотите продолжить?',
    buttons: [
      {title: answer, hide: true}
    ],
    end_session: false
	};
}


exports.firstUserAnswer = () => {
  const button = gfn.getRandomElement(['Рассказать', 'Узнать', 'Вопрос', 'Информация'])
	return {
		text: 'Хотите погрузиться в мир дизайна и искусства или зададите вопрос о школе?',
    tts: 'Хотите погрузиться в мир дизайна и искусства или зададите вопрос о школе?',
    buttons: [
      {title: 'Факт', payload: {state: 1}, hide: true},
      {title: `${button} о школе`, payload: {state: 2}, hide: true}
    ],
    end_session: false
	};
}


// @param {String} fact
exports.getFact = (fact, sessionState) => {
  sessionState.value = 1
	return {
		text: fact.text,
    tts: `<speaker audio="alice-sounds-game-ping-1.opus">${fact.text}`,
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

// Почему яндекс игнорирует 'курсах' ?
exports.offerKeywords = (sessionState) => {
  sessionState.value = 2
  const keyword = gfn.getRandomElement(['факультетах',
    `факультете ${gfn.getRandomElement(['психологии', 'дизайна'])}`,
    `курсе ${gfn.getRandomElement(['графического дизайна', 'веб дизайна', 'декорирования интерьера'])}`])
  const question = gfn.getRandomElement(['Предлагаю поговорить о ', 'Рассказать о ', 'Узнайте о ', 'Может поговорим о ', 'Давай поговорим о '])
  const button = gfn.getRandomElement(['Давай', 'Хорошо', 'Да'])

  sessionState.item = keyword
	
  return {
		text: `${question} ${keyword}?`,
    tts: question + keyword,
    buttons: [
      {title: button, hide: true},
      {title: 'Другое', payload: {state: 2}, hide: true}
    ],
    end_session: false
	};
}


// @param {String} fact
exports.getAnswerForKeywoard = (item) => {
  const button = gfn.getRandomElement(['Следующее', 'Продолжить', 'Узнать больше'])
  return {
    text: item.answer,
    tts: item.tts,
    buttons: [
      {title: button, payload: {state: 2}, hide: true},
      {title: 'Помощь', hide: true}
    ],
    end_session: false
  };
}

// @param {String} fact
exports.getHelp = () => {
	return {
		text: 'Я отвечу на ваши вопросы о школе или расскажу интересный факт. Не знаете с чего начать? Воспользуйтесь командой «Поговорим о» или «Факт».',
    tts: 'Я отвечу на ваши вопросы о школе или расскажу интересный факт. Не знаете с чего начать? Воспользуйтесь командой поговорим о или факт.',
    buttons: [
      {title: 'Поговорим о', hide: true},
      {title: 'Факт', hide: true}
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