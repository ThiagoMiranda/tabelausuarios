import UserTableContainer from './containers/UserTable';
import { request } from './commons/request';
import EventDispatcher, { evtDispatcher } from './commons/EventDispatcher';
import LocalStorage from './commons/LocalStore';

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

		this.initUserTable(this.options.element);
		this.getUsers();
	}

	async getUsers() {
		this.users = LocalStorage.get('inter-users');
		if(this.users ===  null)
			this.users = await request(this.options.endpoint);
		evtDispatcher.trigger({ type: 'users:loaded', users: this.users });

		LocalStorage.set('inter-users', this.users);
	}

	initUserTable() {
		this.template = new UserTableContainer(this.options.element, this.options.perPage);
	}
}

