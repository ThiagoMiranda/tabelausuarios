import loadView from './faq.jsx';
import { reduceQuestionsObject, searchByCategoryAndKeys } from '../../commons/helpers';
import { evtDispatcher } from '../../commons/EventDispatcher';
import Answer from '../../components/answer';

//	CSS
import './faq.scss';

export default class UserTable {

	items = [];
	questionsReduced = [];
	currentQuestions = [];

	state = {
		searchActivated: true,
		currentPage: 0,
		numberOfPages: 0,
		currentUsersFilter: [],
		editActive: false
	};

	constructor(container, perPage) {
		this.container = container;
		this.init();
	}

	init() {
		this.bindEvents();
	}

	bindEvents = () => {
		//	Eventos FAQ
		evtDispatcher.on('faq:loaded', event => {
			this.questionsReduced = reduceQuestionsObject(event.faq.questions);
			loadView.apply(this, [event.faq]);
			this.container.appendChild(this.view);
		});

		//	Eventos Search
		evtDispatcher.on('search:change', event => {
			this.currentQuestions = searchByCategoryAndKeys(event.query, this.categorySelect.value,
				this.questionsReduced);

			this.destroyItems();
			this.createItems(this.currentQuestions);
		});

		evtDispatcher.on('search:cleared', event => {
			this.destroyItems();
		});
	}

	searchChanged = (e) => {
		if (e.target.value.length > 1)
			evtDispatcher.trigger({ type: 'search:change', evt: e, query: e.target.value });
		else if (e.target.value.length === 0)
			evtDispatcher.trigger({ type: 'search:cleared', evt: e });
	}

	onSelectChange = (e) => {
		evtDispatcher.trigger({ type: 'search:change', evt: e, query: this.searchInput.value });
	}

	createItems = (items) => {
		this.items = items.map((item, key) => {
			return new Answer(item, this.results);
		});
	}

	destroyItems = () => {
		this.items.map(item => item.destroy());
		this.items = [];
	}

	destroy() {
		this.container.removeChild(this.view);
	}
}
