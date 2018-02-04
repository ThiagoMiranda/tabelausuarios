import loadView from './table.jsx';
import Item from './item';
import { evtDispatcher } from '../../commons/EventDispatcher';

//	CSS
import './table.scss';

export default class Table {

	items = {};
	usersReduced = {};

	state = {
		editActive: false
	}

	constructor(users, container) {
		this.container = container;
		loadView.apply(this);
		this.init(users);
	}

	init(users) {
		this.container.appendChild(this.view);
		this.bindEvents();
		this.renderItems(users);
	}

	bindEvents = () => {
		evtDispatcher.on('users:updated', event => this.renderItems(event.users));
	}

	renderItems = (users) => {
		//	Limpando a tabela
		while (this.table.lastChild) this.table.removeChild(this.table.lastChild);
		this.tbody = document.createElement('tbody');
		this.items = users.map(user => {
			return new Item(user, this.tbody);
		});
		this.table.appendChild(this.tbody);
	}

	destroy() {
		this.container.removeChild(this.view);
	}
}

