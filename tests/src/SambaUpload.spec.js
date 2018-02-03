import SambaUploader from '../../src/js/SambaUploader';

let sambaUploader;

describe('Basic functions Samba Player', () => {
	beforeAll(() => {
		sambaUploader = new SambaUploader({
			sambaUploadKey: 'dd72c451cbba1218d11d77534528bebe'
		});

		spyOn(sambaUploader, 'on');
	});

	it('sambaUploader should be instance of SambaUploader', () => {
		expect(sambaUploader).toEqual(jasmine.any(SambaUploader));
	});

});

