/**
 * Created by jean.h.ma on 10/08/2017.
 */
import {extendFormatterConfig,format} from '../src/data'

describe("test data format", ()=> {

	test('extend formatter config',()=>{
		extendFormatterConfig({
			prefix$:(value)=>{
				return `$${value}`;
			}
		});
		const value="1";
		const fmt=format(value,"prefix$");
		expect(fmt).toBe(`$${value}`);
	});



	test('format `null` output placeholder string `N/A`',()=>{
		const fmt=format(null,'money');
		expect(fmt).toBe('N/A');
	});

	test('format `undefined` output placeholder string `N/A`',()=>{
		const fmt=format(undefined,'money');
		expect(fmt).toBe('N/A');
	});

	test('format a value that is a valid Number to `money` output a correct money string',()=>{
		const value=100000;
		const fmt=format(value,'money');
		expect(fmt).toBe('100,000.00');
	});

	test('format a value that is a invalid Number to `money` output placeholder string `N/A`',()=>{
		const fmt=format('abc','money');
		expect(fmt).toBe('N/A');
	})

	test('output specify placeholder string `--` when the value is `undefined` or `null`',()=>{
		const fmt=format(null,'money','--');
		expect(fmt).toBe('--');
	})

	test('output a integer',()=>{
		const fmt=format(1.11,['toFixed',0]);
		expect(fmt).toBe("1");
	});

	test('output a decimal',()=>{
		const fmt=format(1,['toFixed',1]);
		expect(fmt).toBe('1.0');
	});

	test('output two decimal places',()=>{
		const fmt=format(1.11111,['toFixed',2]);
		expect(fmt).toBe("1.11");
	})

})