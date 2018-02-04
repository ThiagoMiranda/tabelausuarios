import loadView from './pagination.jsx';
import { paginator } from '../../commons/helpers';
import { evtDispatcher } from '../../commons/EventDispatcher';

//	CSS
import './pagination.scss';

export default class Pagination {

	state = {
		currentPage: 0,
		numberOfPages: 0,
		perPage: 0
	};

	constructor(numberOfPages, perPage, container) {
		this.container = container;

		//	Setando o estado
		this.state.perPage = perPage;
		this.state.numberOfPages = numberOfPages;

		loadView.apply(this, evtDispatcher);
		this.init();
	}

	init() {
		this.container.appendChild(this.view);
		this.bindEvents();
		this.renderNavigation();
	}

	bindEvents = () => {
		evtDispatcher.on('pagination:clicked', event => {
			this.state.currentPage = event.page;
			this.renderNavigation();
		});

		evtDispatcher.on('pagination:updated', event => {
			this.state.numberOfPages = event.numberOfPages;
			this.state.currentPage = 0;
			this.renderNavigation();
		});
	}

	renderNavigation() {
		const paginateArray = paginator(this.state.currentPage, this.state.numberOfPages);
		const paginateMap = `<li class="arrow-left ${this.state.currentPage === 0 ? 'hide' : ''}">` +
			'<i class="material-icons">keyboard_arrow_left</i></li>' +
			`${paginateArray.map(page => {
				const liClass = (page === this.state.currentPage + 1) ?
				'active page' : (page === '...') ? 'dots' : 'page';

				return `<li class="${liClass}"><a>${page}</a></li>`;
			}).join('')}` +
			`<li class="arrow-right ${this.state.currentPage === this.state.numberOfPages - 1 ?
				'hide' : ''}"><i class="material-icons">keyboard_arrow_right</i></li>`;

		this.paginationWrapper.innerHTML = paginateMap;
	}

	//	Eventos DOM
	paginationClick = (e) => {
		const liTarget = (e.target.tagName === 'LI') ? e.target : e.target.parentNode;
		const liClassList = liTarget.classList;
		let page;

		if (liClassList.contains('dots') || liClassList.contains('active')) return false;
		else if (liClassList.contains('page')) page = +liTarget.textContent - 1;
		else if (liClassList.contains('arrow-left')) page = this.state.currentPage - 1;
		else page = this.state.currentPage + 1;

		return evtDispatcher.trigger({ type: 'pagination:clicked', evt: e, page });
	}

	destroy() {
		this.container.removeChild(this.view);
	}
}
