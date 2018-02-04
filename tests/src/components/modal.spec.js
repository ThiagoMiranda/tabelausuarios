import Messages from '../../../src/js/components/messages';

let messages, div = document.createElement('div'),
messageText = 'This operation was executed successfully';

describe('Messages Class', () => {
	beforeAll(() => {
		messages = new Messages(messageText, 'success',
		div);
	});

	it('Must be Messages Class', () => {
		expect(messages).toEqual(jasmine.any(Messages));
	});

	it('Text of the element should be from parameter', () => {
		const text = div.innerText;

		expect(text).toBe(messageText);
	});

	it('Type should be success', () => {
		const type = messages.type;

		expect(type).toBe('success message');
	});

});

