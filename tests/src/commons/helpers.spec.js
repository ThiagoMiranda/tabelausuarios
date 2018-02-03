import { generateUniqueId, isHTMLElement, formatFileSize } from '../../../src/js/commons/helpers';

describe('Helpers file', () => {
	it('Should generate a unique ID', () => {
		const id1 = generateUniqueId();
		const id2 = generateUniqueId();

		expect(id1.length).toBe(36);
		expect(id1).not.toBe(id2);
	});

	it('Should see if it\'s a HTML element or not', () => {
		const htmlElement = document.createElement('div');
		const notHtmlElement = {};

		expect(isHTMLElement(htmlElement)).toBeTruthy();
		expect(isHTMLElement(notHtmlElement)).toBeFalsy();
	});

	it('Should return formated fileSize', () => {
		const sizeInBytes = 2e+8;
		const otherSizeInBytes = 2.0052e+10;

		expect(formatFileSize(sizeInBytes, 2)).toBe('200 MB');
		expect(formatFileSize(otherSizeInBytes, 2)).toBe('20.05 GB');
	});

});

