/**
 * @example
 *
 * import {mobileDetection} from 'js-helper'
 * const isAndroid=mobileDetection.isAndroid();
 *
 * */
export default {
	/**
	 * 是否是android
	 * */
	isAndroid: (): Boolean=> {
		return navigator.userAgent.match(/Android/i);
	},
	/**
	 * 是否是黑莓
	 * */
	isBlackBerry: (): Boolean=> {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	/**
	 * 是否是ios
	 * */
	isIOS: (): Boolean=> {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	/**
	 * 是否是opera
	 * */
	isOpera: (): Boolean=> {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	/**
	 * 是否是windows
	 * */
	isWindows: (): Boolean=> {
		return navigator.userAgent.match(/IEMobile/i);
	},
	/**
	 * 是否是mobile
	 * */
	any: (): Boolean=> {
		return (this.isAndroid() || this.isBlackBerry() || this.isIOS() || this.isOpera() || this.isWindows());
	}
};