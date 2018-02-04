import { paginator, filter, reduceObject } from '../../../src/js/commons/helpers';

let cars, carsFlattened = [];
describe('Helpers file', () => {
	beforeAll(() => {
		cars = [{
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
		}];

		carsFlattened = [
			'1 up volkswagen 2016',
			'2 onix chevrolet 2014',
			'3 ka ford 2018'
		];
	});

	it('Should generate a array length === 3', () => {
		const pageArray = paginator(0, 10);

		expect(pageArray.length).toBe(4);
		expect(pageArray[pageArray.length - 2]).toBe('...');
	});

	it('Expect to return only the queried object', () => {
		const filteredCars = filter(carsFlattened, 'on');

		expect(filteredCars.length).toBe(1);
		expect(filteredCars[0]).toBe(1);
	});

	it('Should reduce object to flattened array', () => {
		const flattened = reduceObject(cars);

		expect(flattened.length).toBe(3);
	});

});

