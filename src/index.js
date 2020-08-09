/*
*
*/

const micro = require('micro')

const replies = require('./replies.js')
const reader = require('./reader.js')
const gfn = require('./gfn.js')
const langWorker = require('./language_worker.js');


const FILEDATA = reader.readFile('metadata.json')


const server = micro(async (req, res) => {
	if (req.method !== 'POST') {
		return 'Server is running';
	}
	const {request, session, state} = await micro.json(req) // Почитать про async, await
	const sessionState = state && state.session || {}
	response = session.new
    ? replies.welcome(sessionState)
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

// Проверка все intents
function checkIntents(request, sessionState) {
	intents = request.nlu.intents
	if (isEmpty(intents)) {
		return replies.firstUserAnswer();
	}

	// проверка
	let intent = Object.keys(intents)[0]

	let help = intent === 'YANDEX.HELP' ? 'YANDEX.HELP': 'YANDEX.WHAT_CAN_YOU_DO'
	switch(intent) {
		case 'commands':
			return getCommand(intents.commands.slots.command.value, sessionState);
		case 'keywords':
			let slotItems = Object.values(intents.keywords.slots)

			let arrValues = []
			slotItems.forEach((entry) => {
				entry.value.split(' ').forEach((item) =>{
					arrValues.push(item)
				})
			})
			let item = reader.findFileQuestion(FILEDATA, arrValues).question
			return replies.getAnswerForKeywoard(item);
		case 'goodbye':
			return replies.goodbye();
		case 'YANDEX.CONFIRM':
			if (sessionState.value === 1) return checkButtonState(1, sessionState);
			if (sessionState.value === 2) return checkItem(sessionState);
			return replies.firstUserAnswer()
		case 'YANDEX.REJECT':
			if (sessionState.value === 1) return replies.offerKeywords(sessionState);
			if (sessionState.value === 2) return replies.offerKeywords(sessionState);
			return replies.goodbye()
		case help:
			return replies.getHelp()
	}
}

// В эту ф-цию попадают msg не имеющие интентов
// Будет производиться проверка session_state
function checkUnknownMessage(request, sessionState) {
	let response = isEmpty(request.payload)
	? checkTokens(request, sessionState)
	: checkButtonState(request.payload.state, sessionState)
	return response
}

// ToDo Изменить case 3 !!!!
// @param {Number} state
const checkButtonState = (state, sessionState) => {
	switch(state) {
		case 0:
			return replies.firstUserAnswer();
		case 1:
			let fact = getNewFact(Object.entries(FILEDATA.facts), sessionState)
			return replies.getFact(fact, sessionState);
		case 2:
			return replies.offerKeywords(sessionState);
		case 3:
			return replies.getHelp();
		case 4:
			return checkItem(sessionState);
	}
}

// Функция для распознования содержимого кнопки. Чтобы не забивать case
// Обнуляем содержимое кнопки
// Со временем поменять на проверку только id!!!
function checkItem(sessionState) {
	const item = sessionState.item
	if (item === '') return replies.firstUserAnswer();
	if (typeof item === 'number') {
		if (item === -1) return checkButtonState(3, sessionState);
		return replies.getAnswerForKeywoard(FILEDATA.questions[item]);
	}

	let arrValues = item.split(' ')
	sessionState.item = ''
	let question = reader.findFileQuestion(FILEDATA, arrValues).question
	return replies.getAnswerForKeywoard(question);
}

function checkTokens(request, sessionState) {
	const arrTokens = request.nlu.tokens
	const question = reader.findFileQuestion(FILEDATA, arrTokens)
	return replies.offerQuestion(question, sessionState)
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

// Изменить при масштабировании приложения
// Аналог функции reader.findIndexOfKeyword для commands
function getCommand(command, sessionState) {
	const commands = ['помощь', 'что ты умеешь', 'поговорим о', 'факт']
	let index = 0
	for (let i = 0; i < commands.length; i++) {
		if (commands[i] === command) {
			index = i 
			break;
		}
	}
	if (index === 2) return replies.offerKeywords(sessionState);
	if (index === 3) return checkButtonState(1, sessionState)
	return replies.getHelp();
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

