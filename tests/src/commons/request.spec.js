import { request } from '../../../src/js/commons/request';

const url = 'https://api.myjson.com/bins/zc8d3';
let fetch;

describe('Request helper', () => {

	beforeEach(() => {
		fetch = request(url);
	})

	it('request should return a promise', () => {
		expect(fetch).toEqual(jasmine.any(Promise));
	});

	it('request must return object and success:true', (done) => {
		fetch.then((data) => {
			expect(data).toEqual(jasmine.any(Object));
			expect(data.success).toBeTruthy();
			done();
		});
	});

});

