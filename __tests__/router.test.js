/**
 * @jest-environment jsdom
 */

import { pushToHistory, sum } from '../scripts/router.js';

describe('testing pushToHistory', () => {
	test('pushes entry to history ', () => {
		expect(pushToHistory('entry', 1).length).toBe(2);
	});
	test('pushes settings to history ', () => {
		expect(pushToHistory('settings', 2).length).toBe(3);
	});
	test('pushes neither entry nor setting to history ', () => {
		expect(pushToHistory('other', 4).length).toBe(4);
	});
})