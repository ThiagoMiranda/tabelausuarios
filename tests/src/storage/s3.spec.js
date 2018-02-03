import S3Storage from '../../../src/js/storage/s3';

let s3Storage;

describe('Storage Class', () => {
	beforeAll(() => {
		s3Storage = new S3Storage();
	});

	it('Must be storage Class', () => {
		expect(s3Storage).toEqual(jasmine.any(Object));
	});

});

