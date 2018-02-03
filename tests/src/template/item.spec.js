import Item from '../../../src/js/template/item';

let item;

describe('Item Class', () => {
	beforeAll(() => {
		item = new Item({}, document.createElement('div'));
	});

	it('Must be item Class', () => {
		expect(item).toEqual(jasmine.any(Item));
	});

});

