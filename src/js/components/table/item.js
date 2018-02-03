import loadView from './item.jsx';
import { formatFileSize } from '../../commons/helpers';
import { evtDispatcher } from '../../commons/EventDispatcher';

import Modal from '../../components/modal';

export default class Item {

	constructor(user, container) {
		//	Propriedades de controle
		this.user = user;
		this.container = container;
		loadView.apply(this);
		this.init(event);
	}

	init(event) {
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
		evtDispatcher.on('modal:confirm', event => {
			if(this.modal) {
				evtDispatcher.trigger({ type: 'user:delete', evt: event, user: this.user });
			}
		});

		evtDispatcher.on('modal:dismiss', event => {
			if(this.modal) {
				this.modal.destroy();
				this.modal = null;
			}

		});
	}

	//	Eventos Update e Delete
	editItem = (e) => {
		evtDispatcher.trigger({ type: 'user:edit', evt: e, user: this.user });
		e.preventDefault();
	}

	deleteItem = (e) => {
		this.modal = new Modal(this.user, `Deseja deletar o usuário ${this.user.first_name}` +
		`${this.user.last_name}?`, this.container);
		e.preventDefault();
	}

	destroy() {
		this.container.removeChild(this.view);
	}
}

