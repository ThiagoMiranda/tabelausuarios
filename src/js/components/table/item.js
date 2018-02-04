import loadView from './item.jsx';
import { evtDispatcher } from '../../commons/EventDispatcher';

import Modal from '../../components/modal';

export default class Item {

	constructor(user, container) {
		//	Propriedades de controle
		this.user = user;
		this.container = container;
		loadView.apply(this);
		this.init();
	}

	init() {
		this.bindEvents();
		this.initItemInfo();
		this.container.appendChild(this.view);
	}

	// Outra forma de fazer é passar o objeto diretamente como no form.jsx
	initItemInfo(event) {
		const {first_name, last_name, email, gender, ip_address} = this.user;

		this.name.innerHTML = `${first_name} ${last_name}`;
		this.email.innerHTML = email;
		this.gender.innerHTML = gender.toLowerCase() === 'male' ? 'Masculino' : 'Feminino';
		this.ip.innerHTML = ip_address;
	}

	bindEvents() {
		evtDispatcher.on('modal:confirm', this.confirm);
		evtDispatcher.on('modal:dismiss', this.dismiss);
	}

	confirm = (event) => {
		if (this.modal && event.user.id === this.user.id) {
			evtDispatcher.trigger({ type: 'user:delete', evt: event, user: this.user });
			this.modal.destroy();
			this.modal = null;
		}
	}

	dismiss = (event) => {
		if (this.modal && event.user.id === this.user.id) {
			this.modal.destroy();
			this.modal = null;
		}
	}

	//	Eventos Update e Delete
	editItem = (e) => {
		evtDispatcher.trigger({ type: 'user:edit', evt: e, user: this.user });
		e.preventDefault();
	}

	deleteItem = (e) => {
		this.modal = new Modal(this.user, `Deseja deletar o usuário ${this.user.first_name}` +
		` ${this.user.last_name}?`, this.container);
		e.preventDefault();
	}

	destroy() {
		this.container.removeChild(this.view);
		evtDispatcher.off('modal:confirm', this.confirm);
		evtDispatcher.off('modal:dismiss', this.dismiss);
	}
}

