export default class LocalStorage {
	static prefix = 'inter.';

	static set(key, value) {
		if (typeof value === "object") {
			value =  JSON.stringify(value);
		}

		window.localStorage.setItem(this.prefix + key, value);
	}

	static get(key, value) {
		return this.getFromLocalStorage(this.prefix + key) || defaultValue;
	}

	static getAll() {
		const data = {};
		for(let key in window.localStorage) {
			if(key.indexOf(previx) === 0) {
				data[key.replace(this.previx, '')] = this.getFromLocalStorage(key);
			}
		}
	}

	static getFromLocalStorage(key) {
		let value = window.localStorage.getItem(key);

		value = JSON.parse(value);
		return value;
	}

	static remove(key) {
		window.localStorage.removeItem(this.prefix + key);
	}
}
