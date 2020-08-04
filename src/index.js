/*
*
*/

const micro = require('micro')
const replies = require('./replies.js')
const reader = require('./reader.js')

const FILEDATA = reader.readFile('metadata.json')
const ARRAYKEYWORDS = reader.getArrayOfValues(FILEDATA, 'keywords', 'keyword')

const server = micro(async (req, res) => {
	if (req.method !== 'POST') {
		return 'Server is running';
	}
	const {request, session} = await micro.json(req) // Почитать про async, await
	response = session.new
    ? replies.welcome()
    : createUserAnswer(request)

    return {
    	response,
    	version: '1.0'
    };
})


const createUserAnswer = (request) => {
	response = isEmpty(request.nlu.intents)
	? checkUnknownMessage(request)
	: checkIntents(request)
	return response;
}


// @param {Number} state
const checkButtonState = (state) => {
	switch(state) {
		case 0:
			return replies.firstUserAnswer();
		case 1:
			fact = 'Интересный факт'
			return replies.giveFact(fact);
		case 2:
			return replies.offerKeywords();
		case 3:
			return replies.giveKeywords(ARRAYKEYWORDS.join(', '));
	}
}


// Базовые интенты игнорируют аудио ответ
function checkIntents(request) {
	intents = request.nlu.intents
	if (isEmpty(intents)) {
		return replies.firstUserAnswer()
	}
	
	let intent = Object.keys(intents)[0]
	switch(intent) {
		case 'sad1':
			return checkButtonState(3);
		case 'asd123':
			let value = intents.asd123.slots.what.value
			let index = reader.findIndexOfKeyword(FILEDATA, value)
			let answer = FILEDATA['keywords'][index]['answer']
			return replies.getAnswerForKeywoard(answer);
		case 'goodbye':
			return replies.goodbye();
		case 'YANDEX.CONFIRM':
			return checkUnknownMessage(request);
	}
}


// В эту ф-цию попадают msg не имеющие интентов
function checkUnknownMessage(request) {
	let response = isEmpty(request.payload)
	? replies.firstUserAnswer()
	: checkButtonState(request.payload.state)
	return response
}


// Проверка на свойства в объекте
function isEmpty(obj) {
	for (let key in obj) {
		return false;
	}
	return true;
}


const PORT = 3000
server.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))

