import md5 from 'blueimp-md5';

const cachedRequests = {};

/**
 * Request using promise
 *
 * @param {Object} url - Request URL
 * @param {String} method - Request method
 * @param {Object} body - Request body
 * @param {Object} headers - Request headers
 * @param {boolean} cacheRequest - Should the request be cached?
 */
export function request(url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'},
		cacheRequest = false) {

	return new Promise((resolve, reject) => {
		const key = url + method + JSON.stringify(body) + JSON.stringify(headers);
		const cacheKey = md5(key);
		let xhr = cachedRequests[cacheKey];

		// looks for a cached request
		if (xhr) {
			resolve(JSON.parse(xhr.response), xhr);
			return;
		}

		xhr = new XMLHttpRequest();

		// tries to cache the request or flush it otherwise
		if (cacheRequest)
			cachedRequests[cacheKey] = xhr;
		else delete cachedRequests[cacheKey];

		xhr.open(method, url);

		Object.keys(headers).forEach(key => {
			xhr.setRequestHeader(key, headers[key]);
		});

		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300)
				resolve(JSON.parse(xhr.response), xhr);
			else reject(xhr.statusText, xhr);
		};

		xhr.onerror = xhr.onabort = xhr.ontimeout = () => reject(xhr.statusText, xhr);
		xhr.send(body ? JSON.stringify(body) : null);
	});
}
