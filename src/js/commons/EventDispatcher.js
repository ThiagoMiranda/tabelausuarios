export default class EventDispatcher {
	constructor() {
		// [String:[Function]]
		this.handlers = {};

		// [String:Event]
		this.triggered = {};
	}

	on = (type, handler) => {
		if (type instanceof Array) {
			type.forEach(t => this.on(t, handler));
			return;
		}

		if (this.handlers[type] == null)
			this.handlers[type] = [];

		// registers the handler under the given type
		this.handlers[type].push(handler);

		// dispatches already triggered event
		if (this.triggered[type])
			this.dispatchHandlers(type, this.triggered[type]);
	}

	off = (type, handler) => {
		let handlers = this.handlers[type];

		if (handlers == null)
			return;

		let i = handlers.length;

		// searches for handler index
		while (i-- && handler !== handlers[i]);

		// unregisters the handler
		if (i > -1 && i < handlers.length)
			handlers.splice(i, 1);
	}

	trigger = (e, laterDispatch) => {
		const type = e.type;

		// registers event for a later dispatch or tries to remove it from list
		if (laterDispatch) {
			if (this.triggered[type] == null)
				this.triggered[type] = [];

			this.triggered[type] = e;
		} else if (this.triggered[type])
			delete this.triggered[type];

		return this.dispatchHandlers(type, e);
	}

	dispatchHandlers = (type, e) => {
		let handlers = this.handlers[type];
		let evtReturn = true;

		if (handlers == null)
			return evtReturn;

		// dispatches the registered handlers
		handlers.forEach(handler => {
			if (handler(e) === false)
				evtReturn = false;
		});

		return evtReturn;
	}
}

export const evtDispatcher = new EventDispatcher();

