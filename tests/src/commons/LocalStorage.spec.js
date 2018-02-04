import LocalStorage from '../../../src/js/commons/LocalStore';

let mp4, jpg, mp3, flv, srt, mkv, other;

describe('Local storage spec', () => {
	beforeAll(() => {
		LocalStorage.set('cars', [{
			id: 1,
			name: 'UP',
			brand: 'Volkswagen',
			year: 2016
		}, {
			id: 2,
			name: 'Onix',
			brand: 'Chevrolet',
			year: 2014
		}, {
			id: 3,
			name: 'KA',
			brand: 'Ford',
			year: 2018
		}]);
	});

	it('Should have length of 3', () => {
		const cars = LocalStorage.get('cars');

		expect(cars.length).toBe(3);
	});

	it('Expect to remove key', () => {
		LocalStorage.remove('cars');
		const cars = LocalStorage.get('cars');

		expect(cars).toBe(null);
	});

});

