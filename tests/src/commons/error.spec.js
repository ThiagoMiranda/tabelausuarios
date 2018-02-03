import SambaUploaderError from '../../../src/js/commons/SambaUploaderError.js';

let sambaUploaderError;

describe('Error Class', () => {
	beforeAll(() => {
		sambaUploaderError = new SambaUploaderError();
	});

	it('sambaUploaderError should be instance of SambaUploaderError', () => {
		expect(sambaUploaderError).toEqual(jasmine.any(Object));
	});

});

