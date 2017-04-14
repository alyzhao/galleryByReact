/* 
 * 获取区间一个随机值
 */
export function getRangeRandom (low,high) {
	return Math.floor(Math.random() * (high - low) + low);
}

/* 
 * 在[-30. 30]之间取随机值
 */
export function get30DegRandom () {
	return (Math.random() > 0.5 ? '' : '-' + Math.floor( Math.random() * 30 ));
}

