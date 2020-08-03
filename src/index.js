const micro = require('micro')
const replies = require('./replies.js')
const fs = require('fs');

let FILEDATA = readFileKeywordsFacts('metadata.json')


const server = micro(async (req, res) => {
	if (req.method !== 'POST') {
		return 'Server is running';
	}
	const {request, session} = await micro.json(req) // Почитать про async, await
	response = session.new
    ? replies.welcome()
    : createUserAnswer(request)

    return response;
})


const createUserAnswer = (request) => {
	response = isEmpty(request.nlu.intents)
	? checkButtonState(request)
	: checkIntents(request)
	return response;
}

// Доставать ключи без значений и формировать массив keywords???
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
			keywords = getArrayOfKeywords().join(' | ')
			console.log(keywords)
			return replies.giveKeywords(keywords);
	}
}


// @param {String} fileName
function readFileKeywordsFacts(fileName) {
	const fileData = fs.readFileSync(fileName, 'utf8')
	return JSON.parse(fileData);
}



function getArrayOfKeywords() {
	let fileKeywords = Object.values(FILEDATA.keywords)
	let arrayKeywords = []
	fileKeywords.map(({keyword, answer}) => {
		arrayKeywords.push(keyword)
	})
	return arrayKeywords;
}


// @param {String} keyword
function checkKeyword(keyword) {
	const regKeywords = FILEDATA.regKeywords
	for (let index = 0; index < regKeywords.length; index++) {
		regKeyword = regKeywords[index]
		if (keyword.includes(regKeyword)) return replies.giveKeywords(regKeyword);
	}
	return replies.giveKeywords('Ничего не найдено');
}


// Проверка на свойства в объекте
function isEmpty(obj) {
	for (let key in obj) {
		return false;
	}
	return true;
}

// Проверяет на наличие intent id == asd123
// Базовые интенты игнорируются
function checkIntents(request) {
	intents = request.nlu.intents
	response = (typeof intents.asd123 !== 'undefined')
	? checkKeyword(intents.asd123.slots.what.value)
	: replies.firstUserAnswer()
	return response
}


const PORT = 3000
server.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))

