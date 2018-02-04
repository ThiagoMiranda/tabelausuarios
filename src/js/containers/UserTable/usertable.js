import loadView from './usertable.jsx';
import { filter, reduceObject } from '../../commons/helpers';
import { evtDispatcher } from '../../commons/EventDispatcher';
import LocalStorage from '../../commons/LocalStore';

import Table from '../../components/table';
import Pagination from '../../components/pagination';
import Form from '../../components/form';
import Messages from '../../components/messages';

//	CSS
import './usertable.scss';

export default class UserTable {

	items = {};
	usersReduced = {};

	state = {
		searchActivated: false,
		currentPage: 0,
		numberOfPages: 0,
		currentUsersFilter: [],
		editActive: false
	};

	constructor(container, perPage) {
		this.container = container;
		this.perPage = perPage;
		loadView.apply(this, evtDispatcher);
		this.init();
	}

	init() {
		this.container.appendChild(this.view);
		this.bindEvents();
	}

	bindEvents = () => {
		//	Eventos Users
		evtDispatcher.on('users:loaded', event => {
			this.users = event.users;
			this.usersReduced = reduceObject(this.users);
			this.state.numberOfPages = Math.ceil(this.users.length / this.perPage);
			this.table = new Table(this.generateUsersContent(this.users), this.view);
			this.pagination = new Pagination(this.state.numberOfPages, this.perPage, this.view);
		});

		//	Eventos Search
		evtDispatcher.on('search:change', event => {
			const searchedIds = filter(this.usersReduced, event.query);

			this.state.currentUsersFilter = this.users.filter(user => searchedIds.indexOf(user.id - 1) > -1);
			this.state.numberOfPages = Math.ceil(this.state.currentUsersFilter.length / this.perPage);
			this.state.currentPage = 0;
			const users = this.generateUsersContent(this.users.filter(user => searchedIds.indexOf(user.id - 1) > -1));

			evtDispatcher.trigger({ type: 'users:updated', event, users });
			evtDispatcher.trigger({ type: 'pagination:updated', event, numberOfPages: this.state.numberOfPages });
		});

		evtDispatcher.on('search:cleared', event => {
			this.state.currentUsersFilter = [];
			this.state.numberOfPages = Math.ceil(this.users.length / this.perPage);

			evtDispatcher.trigger({ type: 'users:updated', event, users: this.users });
			evtDispatcher.trigger({ type: 'pagination:updated', event, numberOfPages: this.state.numberOfPages });
		});

		//	Eventos Pagination
		evtDispatcher.on('pagination:clicked', event => {
			this.state.currentPage = event.page;
			const users = this.generateUsersContent(this.state.currentUsersFilter.length > 0 ?
				this.state.currentUsersFilter : this.users);

			evtDispatcher.trigger({ type: 'users:updated', event, users });
		});

		//	Eventos Edit/Update
		evtDispatcher.on('user:edit', event => {
			if (this.form) {
				this.form.destroy();
				this.form = null;
			}
			this.form = new Form(event.user, this.formView);
		});

		evtDispatcher.on('user:edited', event => {
			this.messages = new Messages(`Usuário ${event.user.first_name}` +
			` ${event.user.last_name} editado com sucesso!`, 'success', this.messagesWrapper);

			if (this.form) {
				this.form.destroy();
				this.form = null;
			}
			this.editUser(event.user);
		});

		evtDispatcher.on('user:delete', event => {
			this.messages = new Messages(`Usuário ${event.user.first_name}` +
			` ${event.user.last_name} deletado com sucesso!`, 'success', this.messagesWrapper);
			this.removeUser(event.user);
		});

		evtDispatcher.on('form:cancel', event => {
			if (this.form) this.form.destroy();
			this.form = null;
		});
	}

	generateUsersContent(users) {
		const currentUsers = users.slice(this.state.currentPage * this.perPage,
			this.state.currentPage * this.perPage + this.perPage);

		return currentUsers;
	}

	//	Eventos DOM
	searchClicked = (e) => {
		this.state.searchActivated = (!this.state.searchActivated);
		evtDispatcher.trigger({ type: 'search:clicked', evt: e });
		this.searchInput.classList.toggle('active', this.state.searchActivated);

		this.state.searchActivated && this.searchInput.focus();
	}

	searchChanged = (e) => {
		if (e.target.value.length > 2)
			evtDispatcher.trigger({ type: 'search:change', evt: e, query: e.target.value });
		else if (e.target.value.length === 0)
			evtDispatcher.trigger({ type: 'search:cleared', evt: e, query: e.target.value });
	}

	editUser = (user) => {
		const users = this.users.map(usr => {
			if (usr.id === user.id) usr = user;
			return usr;
		});

		this.table.destroy();
		this.pagination.destroy();
		evtDispatcher.trigger({ type: 'users:loaded', users: users });
		LocalStorage.set('inter-users', users);
	}

	removeUser = (user) => {
		const users = this.users.filter(usr => user.id !== usr.id);

		this.table.destroy();
		this.pagination.destroy();
		console.info(users)
		evtDispatcher.trigger({ type: 'users:loaded', users: users });
		LocalStorage.set('inter-users', users);
	}

	destroy() {
		this.container.removeChild(this.view);
	}
}

