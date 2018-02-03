import Template from '../../../src/js/template/template';
import SambaUploader from '../../../src/js/SambaUploader';

let template;

describe('Template Class', () => {
	beforeAll(() => {
		template = new Template(document.createElement('div'));
	});

	it('Must be template Class', () => {
		expect(template).toEqual(jasmine.any(Template));
	});

});

