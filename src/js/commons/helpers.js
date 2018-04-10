/**
 *
 * @param {*} currentPage - página atual
 * @param {*} numberOfPages - número total de páginas
 */
export function paginator(currentPage, numberOfPages) {
	let delta = 2;
	let range = [];
	let rangeWithDots = [];
	let l;

	//	Começando do 1
	range.push(1);

	if (numberOfPages <= 1) return range;

	//	Iterando sobre o range de páginas
	for (let i = currentPage - delta; i <= currentPage + delta; i++)
		if (i < numberOfPages && i > 1) range.push(i);

	range.push(numberOfPages);

	//	Colocando ... se páginas > 2
	for (let i of range) {
		if (l) {
			if (i - l === 2) rangeWithDots.push(l + 1);
			else if (i - l !== 1) rangeWithDots.push('...');

		}
		rangeWithDots.push(i);
		l = i;
	}

	return rangeWithDots;
}

/**
 *
 * @param {*} initArray
 * @param {*} keys
 * @param {*} query
 */
export function filter(initArray, query) {
	//	Para otimização usar iteração async de array implementada no
	//	ES2018 https://github.com/tc39/proposal-async-iteration
	const filteredArray = initArray.reduce((rdc, text, index) => {
		if (text.indexOf(query) > -1) rdc.push(index);
		return rdc;
	}, []);

	return filteredArray;
}

/**
 * Otimizando a busca deixando os objetos como arrays de strings
 * ( solução para o problema descrito acima. Ideal seria buscar do server )
 *
 * @param {*} array - array inicial de objetos
 */
export function reduceQuestionsObject(array) {
	const reducedObj = array.reduce((rdc, obj) => {
		const reducedQuestionObj = {
			[obj['categories'].join(',')]: {
				[obj['keys'].join(',')]: {
					ask: obj.ask,
					answer: obj.answer
				}
			}
		};

		rdc.push(reducedQuestionObj);
		return rdc;
	}, []);

	return reducedObj;
}

export function searchByCategoryAndKeys(query, cat, questions) {
	const splittedQuery = query.split(' ');
	const filteredQuestions = questions.filter((question, key) => {
		const categoryKey = Object.keys(question)[0];

		if (cat.indexOf(categoryKey) > -1) {
			const keywordsKey = Object.keys(question[categoryKey])[0];
			const hasKeyword = splittedQuery.reduce((flag, item) => {
				flag = keywordsKey.indexOf(item) > -1;
				return flag;
			}, false);

			return hasKeyword;
		}
		return false;
	});
	const reducedQuestions = filteredQuestions.reduce((acc, obj) => {
		const categoryObj = obj[Object.keys(obj)[0]];
		const keyWordsObj = categoryObj[Object.keys(categoryObj)[0]]

		acc.push(keyWordsObj);
		return acc;
	}, []);

	return reducedQuestions;
}
