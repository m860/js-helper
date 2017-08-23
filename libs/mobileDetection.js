"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	/**
  * 是否是android
  * */
	isAndroid: function isAndroid() {
		return navigator.userAgent.match(/Android/i);
	},
	/**
  * 是否是黑莓
  * */
	isBlackBerry: function isBlackBerry() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	/**
  * 是否是ios
  * */
	isIOS: function isIOS() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	/**
  * 是否是opera
  * */
	isOpera: function isOpera() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	/**
  * 是否是windows
  * */
	isWindows: function isWindows() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	/**
  * 是否是mobile
  * */
	any: function any() {
		return undefined.isAndroid() || undefined.isBlackBerry() || undefined.isIOS() || undefined.isOpera() || undefined.isWindows();
	}
};