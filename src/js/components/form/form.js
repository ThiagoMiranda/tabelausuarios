import loadView from './form.jsx';
import { paginator, filter, reduceObject } from '../../commons/helpers';
import { evtDispatcher } from '../../commons/EventDispatcher';

import Modal from '../../components/modal';

//	CSS
import './form.scss';


export default class Pagination {

	constructor(user, container) {
		this.container = container;
		this.user = user;
		loadView.apply(this);
		this.init();
	}

	init() {
		this.container.appendChild(this.view);
		this.name.focus();
		this.bindEvents();
	}

	bindEvents() {
		evtDispatcher.on('modal:confirm', event => {
			const {name, email, gender, ip_address} = this.form;
			this.user = {... this.user,
				first_name: name.value.split(' ')[0],
				last_name: name.value.split(' ').slice(1).join(' '),
				email: email.value,
				gender: gender.value,
				ip_address: ip_address.value
			};

			evtDispatcher.trigger({ type: 'user:edited', evt: event, user: this.user });
			this.modal.destroy();
			this.modal = null;
		});

		evtDispatcher.on('modal:dismiss', event => {
			this.modal.destroy();
			this.modal = null;
			this.cancel();
		});
	}

	submitForm = (e) => {
		this.modal = new Modal(this.user, `Deseja editar o usuário ${this.user.first_name}` +
		`${this.user.last_name}?`, this.container);
		e.preventDefault();
	}

	cancel = (e) => {
		evtDispatcher.trigger({ type: 'form:cancel' });
		e && e.preventDefault();
	}

	destroy() {
		this.container.removeChild(this.view);
	}
}
