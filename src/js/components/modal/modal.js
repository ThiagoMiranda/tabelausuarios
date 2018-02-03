import loadView from './modal.jsx';
import { formatFileSize } from '../../commons/helpers';
import { evtDispatcher } from '../../commons/EventDispatcher';

//	CSS
import './modal.scss';

export default class Modal {

	constructor(user, message, container) {
		this.container = container;
		this.user = user;
		this.message = message;
		loadView.apply(this);
		this.init();
	}

	init() {
		this.container.appendChild(this.view);
	}

	confirm = (e) => {
		evtDispatcher.trigger({ type: 'modal:confirm', user: this.user });
		e.preventDefault();
	}

	dismiss = (e) => {
		evtDispatcher.trigger({ type: 'modal:dismiss', user: this.user });
		e.preventDefault();
	}

	destroy() {
		this.container.removeChild(this.view);
	}
}

