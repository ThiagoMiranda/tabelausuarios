import UserTableContainer from './containers/UserTable';
import { request } from './commons/request';
import EventDispatcher, { evtDispatcher } from './commons/EventDispatcher';

/**
 * Inter table
 *
 */
export default class InterTable extends EventDispatcher {
	users = {};
	defaultOptions = {
		perPage: 10
	};

	constructor(options) {
		super();
		this.options = {...this.defaultOptions, ...options};
		this.getUsers();
		this.initUserTable(this.options.element);
		this.bindEvents();
	}

	async getUsers() {
		this.users = await request(this.options.endpoint);
		evtDispatcher.trigger({ type: 'users:loaded', users: this.users });
	}

	initUserTable() {
		this.template = new UserTableContainer(this.options.element, this.options.perPage);
		//this.modal = new Modal(this.options.element);
	}

	bindEvents = () => {
		evtDispatcher.on('item:edit', event => {
			console.log(event);
		});
		evtDispatcher.on('item:delete', event => {
			console.log(event);
		});
	}
}

