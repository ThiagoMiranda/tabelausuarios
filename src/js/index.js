import FAQContainer from './containers/faq';
import { request } from './commons/request';
import EventDispatcher, { evtDispatcher } from './commons/EventDispatcher';
import LocalStorage from './commons/LocalStore';

/**
 * Inter table
 *
 */
export default class FAQ extends EventDispatcher {
	users = {};
	defaultOptions = {
	};

	constructor(options) {
		super();
		this.options = {...this.defaultOptions, ...options};
		this.init();
	}

	init() {
		this.initUserTable(this.options.element);
		this.trigger({ type: 'loaded', interTable: this}, true);
		this.getFAQ();
	}

	async getFAQ() {
		this.faq = LocalStorage.get('faq');
		if (this.options.forceEndpoint || this.faq === null)
			this.faq = await request(this.options.endpoint);
		evtDispatcher.trigger({ type: 'faq:loaded', faq: this.faq });
		this.trigger({ type: 'faqFetched', faq: this.users, interFaq: this}, true);
		LocalStorage.set('faq', this.faq);
	}

	initUserTable() {
		this.template = new FAQContainer(this.options.element, this.options.perPage);
	}
}

