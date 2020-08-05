/*
*
*/

const micro = require('micro')
const replies = require('./replies.js')
const reader = require('./reader.js')
const gfn = require('./gfn.js')


const FILEDATA = reader.readFile('metadata.json')


const server = micro(async (req, res) => {
	if (req.method !== 'POST') {
		return 'Server is running';
	}
	const {request, session, state} = await micro.json(req) // Почитать про async, await
	const sessionState = state && state.session || {}
	response = session.new
    ? replies.welcome()
    : createUserAnswer(request, sessionState)

    return {
    	response,
    	session_state: sessionState,
    	version: '1.0'
    };
})


const createUserAnswer = (request, sessionState) => {
	response = isEmpty(request.nlu.intents)
	? checkUnknownMessage(request, sessionState)
	: checkIntents(request, sessionState)
	return response;
}

// @param {Number} state
const checkButtonState = (state, sessionState) => {
	switch(state) {
		case 0:
			return replies.firstUserAnswer(sessionState);
		case 1:
			let fact = getNewFact(Object.entries(FILEDATA.facts), sessionState)
			return replies.giveFact(fact, sessionState);
		case 2:
			return replies.offerKeywords();
		case 3:
			let arrayKeywords = reader.getArrayOfValues(FILEDATA, 'keywords', 'keyword')
			arrayKeywords = gfn.getRandomArray(arrayKeywords, 5)
			return replies.giveKeywords(arrayKeywords.join(', '));
	}
}

// Получает массив фактов и их id
// Значит без рандома. Просто до первого непоказанного	<--- Пока так
// С рандомом. просто вернем массив непоказанных		<--- Как идея, но может долго выполняться
function getNewFact(arr, sessionState) {
	if (typeof sessionState.facts_id === 'undefined' || sessionState.facts_id.length >= arr.length) sessionState.facts_id = [];
	outer: for (let i = 0; i < arr.length; i++) {
		for (let j in sessionState.facts_id) {
			if (i == j) continue outer;
		}
		sessionState.facts_id.push(i)
		return arr[i][1];
	}
	return -1;
}

// Базовые интенты игнорируют аудио ответ
function checkIntents(request, sessionState) {
	intents = request.nlu.intents
	if (isEmpty(intents)) {
		return replies.firstUserAnswer(sessionState)
	}
	
	let intent = Object.keys(intents)[0]
	switch(intent) {
		case 'commands':
			let buttonKey = getButtonKey(intents.commands.slots.what.value)
			return checkButtonState(buttonKey, sessionState);
		case 'toKnow':
			let index = reader.findIndexOfKeyword(FILEDATA, intents.toKnow.slots.what.value)
			let item = FILEDATA['keywords'][index]
			return replies.getAnswerForKeywoard(item);
		case 'goodbye':
			return replies.goodbye();
		case 'YANDEX.CONFIRM':
			if (isEmpty(sessionState)) return checkUnknownMessage(request, sessionState);
			if (sessionState.value === 10) return replies.firstUserAnswer(sessionState);
			return checkButtonState(1, sessionState)
	}
}

// Изменить при масштабировании приложения
function getButtonKey(value) {
	let arr = value.split(' ')
	if (arr.length === 2) return 3;
	if (reader.deleteLastLettersNoun(arr[0]) === 'факт') return 1;
	return 2;
}

// В эту ф-цию попадают msg не имеющие интентов
// Будет производиться проверка session_state
function checkUnknownMessage(request, sessionState) {
	let response = isEmpty(request.payload)
	? replies.firstUserAnswer(sessionState)
	: checkButtonState(request.payload.state, sessionState)
	return response
}

// Проверка на свойства в объекте
function isEmpty(obj) {
	for (let key in obj) {
		return false;
	}
	return true;
}


const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))

