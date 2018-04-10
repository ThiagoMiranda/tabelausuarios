import loadView from './answer.jsx';
import { evtDispatcher } from '../../commons/EventDispatcher';

export default class Answer {

	constructor(item, container) {
		//	Propriedades de controle
		this.item = item;
		this.container = container;
		loadView.apply(this, [this.item]);
		this.init();
	}

	init() {
		this.bindEvents();
		this.container.appendChild(this.view);
	}

	bindEvents() {
	}

	destroy() {
		this.container.removeChild(this.view);
	}
}

