import * as path from 'path';
import Mocha from 'mocha';
import { glob } from 'glob';

export function run(): Promise<void> 
{
	// Create the mocha test
	const mocha = new Mocha({
		// ui: 'tdd', commented out because we want to use describe/it instead of suite/test methods
		color: true
	});

	const testsRoot = path.resolve(__dirname, '..');

	return new Promise(async (c, e) => {
		const jsFiles = await glob('**/**.test.js', {});

		// Add files to the test suite
		jsFiles.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

		// Run the mocha test
		try 
		{
			// Run the mocha test
			mocha.run(failures => 
			{
				if (failures > 0) 
				{
					e(new Error(`${failures} tests failed.`));
				} 
				else
				{
					c();
				}
			});
		} 
		catch (err) 
		{
			console.error(err);
			e(err);
		}
	});
}
