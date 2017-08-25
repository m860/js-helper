let formatterConfig = {
	money: (value: Number, fixed: Number = 2)=> {
		let fixedValue = value.toFixed(fixed);
		if (fixed === 0) {
			fixedValue += '.';
			return fixedValue.replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace('.', '');
		}
		return value.toFixed(fixed).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	},
	toFixed: (value: Number, fixed: Number = 0)=> {
		return value.toFixed(fixed);
	}
};

/**
 * 扩展FormatterConfig配置
 *
 * @example <caption>simple</caption>
 * extendFormatterConfig({
 * 	prefix$:function(value){
 * 		return '$'+value;
 * 	}
 * })
 *
 * const formattedValue=format(1,'prefix$');	// output `$1`
 *
 * @example <caption>pass parameter</caption>
 * extendFormatterConfig({
 * 	prefix:function(value,prefix){
 * 		return prefix+value;
 * 	}
 * })
 *
 * const formattedValue=format(1,['prefix','$'])	// output `$1`
 *
 * */
export function extendFormatterConfig(config: ?Object = {}): void {
	Object.assign(formatterConfig, config);
}

/**
 * 数据格式化
 *
 * @example <caption>format money</caption>
 * const formattedValue=format(10000,'money')	//output 1,000.00
 * */
export function format(value: any, formatter: ?String|?Function|?Array, placeholder: ?String = "N/A"): String {
	if (!value) {
		return placeholder;
	}
	const typeName = formatter.constructor.name;
	switch (typeName) {
		case "Function":
			return formatter(value);
		case "Array":
			const name = formatter[0];
			const params = formatter.slice(1);
			if (!formatterConfig[name]) {
				throw new Error(`formatter ${name} is not defined`);
			}
			try {
				return formatterConfig[name](value, ...params);
			}
			catch (ex) {
				return placeholder;
			}
		default:
			if (!formatterConfig[formatter]) {
				throw new Error(`formatter ${formatter} is not defined`);
			}
			try {
				return formatterConfig[formatter](value);
			}
			catch (ex) {
				return placeholder;
			}
	}
}