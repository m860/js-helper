'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.extendFormatterConfig = extendFormatterConfig;
exports.format = format;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var formatterConfig = {
	money: function money(value) {
		var fixed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

		var fixedValue = value.toFixed(fixed);
		if (fixed === 0) {
			fixedValue += '.';
			return fixedValue.replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace('.', '');
		}
		return value.toFixed(fixed).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	},
	toFixed: function toFixed(value) {
		var fixed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

		return value.toFixed(fixed);
	}
};

/**
 * 扩展FormatterConfig配置
 *
 * @example <caption>simple</caption>
 * import {dataFormat} from 'js-helper'
 * const {extendFormatterConfig,format}=dataFormat;
 * extendFormatterConfig({
 * 	prefix$:function(value){
 * 		return '$'+value;
 * 	}
 * })
 *
 * const formattedValue=format(1,'prefix$');	// output `$1`
 *
 * @example <caption>pass parameter</caption>
 * import {dataFormat} from 'js-helper'
 * const {extendFormatterConfig,format}=dataFormat;
 * extendFormatterConfig({
 * 	prefix:function(value,prefix){
 * 		return prefix+value;
 * 	}
 * })
 *
 * const formattedValue=format(1,['prefix','$'])	// output `$1`
 *
 * */
function extendFormatterConfig() {
	var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	Object.assign(formatterConfig, config);
}

/**
 * 数据格式化
 *
 * @example <caption>format money</caption>
 * import {dataFormat} from 'js-helper'
 * const formattedValue=dataFormat.format(10000,'money')	//output 1,000.00
 * */
function format(value, formatter) {
	var placeholder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "N/A";

	if (!value) {
		return placeholder;
	}
	var typeName = formatter.constructor.name;
	switch (typeName) {
		case "Function":
			return formatter(value);
		case "Array":
			var name = formatter[0];
			var params = formatter.slice(1);
			if (!formatterConfig[name]) {
				throw new Error('formatter ' + name + ' is not defined');
			}
			try {
				return formatterConfig[name].apply(formatterConfig, [value].concat(_toConsumableArray(params)));
			} catch (ex) {
				return placeholder;
			}
		default:
			if (!formatterConfig[formatter]) {
				throw new Error('formatter ' + formatter + ' is not defined');
			}
			try {
				return formatterConfig[formatter](value);
			} catch (ex) {
				return placeholder;
			}
	}
}