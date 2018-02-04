import loadView from './messages.jsx';

//	CSS
import './messages.scss';

export default class Messages {
	constructor(message, type, container) {
		this.container = container;
		this.message = message;
		this.type = `${type} message`;
		loadView.apply(this);
		this.init();
	}

	init() {
		this.container.appendChild(this.view);
		setTimeout((() => {
			this.destroy();
		}), 1000);
	}

	destroy() {
		this.container.removeChild(this.view);
	}
}
