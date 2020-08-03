/*
*
*/

const micro = require('micro')
const replies = require('./replies.js')
const reader = require('./reader.js')

let FILEDATA = reader.readFile('metadata.json')


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
	? checkButtonState(request)
	: checkIntents(request)
	return response;
}


// @param {Number} state
const checkButtonState = (request) => {
	state = request.payload.state

	switch(state) {
		case 0:
			return replies.firstUserAnswer();
		case 1:
			fact = 'Интересный факт'
			return replies.giveFact(fact);
		case 2:
			return replies.offerKeywords();
		case 3:
			arrayKeywords = reader.getArrayOfValues(FILEDATA, 'keywords', 'keyword')
			return replies.giveKeywords(arrayKeywords.join(' | '));
	}
}


// Проверяет на наличие intent id == asd123
// Базовые интенты игнорируются
function checkIntents(request) {
	intents = request.nlu.intents
	if (typeof intents.asd123 !== 'undefined') {
		let answer = reader.findAnswerForKeyword(FILEDATA, intents.asd123.slots.what.value)
		return replies.getAnswerForKeywoard(answer);
	}
	return replies.firstUserAnswer()
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

