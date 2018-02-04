import InterTable from '../../src/js/index';

let interTable;

describe('Basic functions InterTable', () => {
	beforeAll(() => {
		interTable = new InterTable({
			element: document.createElement('div'),
			endpoint: '/json/users.json',
			perPage: 10
		});
	});

	it('interTable should be instance of InterTable', () => {
		expect(interTable).toEqual(jasmine.any(InterTable));
	});

});

