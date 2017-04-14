require('normalize.css/normalize.css');
require('styles/App.less');

import React from 'react';
import ReactDOM from 'react-dom';
import ImgFigure from './imgPos';
import ControllerUnits from './controllerUnits.js';
import {getRangeRandom, get30DegRandom} from './function'

// 获取图片片相关数据
var imageDatas = require('../data/imageDatas.json');

// 遍历数组，将图片信息转换成URL信息(报错)
imageDatas = imageDatas.map((item) => {
  item.imageURL = 'images/' + item.fileName;
  return item;
})
// imageDatas = (function genImageUrl (imageDataArr) {
// 	for (let i = 0; i < imageDataArr.length; i++){
// 		imageDataArr[i].imageURL = '../images/' + imageDataArr[i].fileName;
// 	}
// 	return imageDataArr;
// })(imageDatas);



class GalleryByReactApp extends React.Component {
	// 存储图片排布的可取值范围
	constructor(props) {
		super(props);
		this.Constant = {
			centerPos: {
				left: 0,
				top: 0
			},
			hPosRange: {	// 左右取值范围
				leftSecX: [0, 0],
				rightSecX: [0, 0],
				y: [0, 0]
			},
			vPosRange: {	// 上侧取值范围
				x: [0, 0],
				topY: [0, 0]
			}
		};
		// 初始化state,即图片的left,top
		this.state = {
			imgsArrangeArr : [
				// {
				// 	pos: {left: 0,top: 0},
				// 	rotate: 0,	// 图片的旋转角度
				// 	isInverse: false,	// 设置图片是否翻转的状态
				// 	isCenter: false	// 默认图片不居中
				// }
			]
		}
	}

	/*
	 * 翻转居中的图片 
	 * @param index 当前呗执行inverse操作的图片对用图片信息数组的index值
	 * @return {function} 闭包函数,return一个真正待被执行的函数
	 */
	inverse (index) {
		return function () {
			let imgsArrangeArr = this.state.imgsArrangeArr;
			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;	  // 翻转到另一面

			this.setState({
				imgsArrangeArr: imgsArrangeArr
			});
		}.bind(this);	
	}

	/*
	 * 当非居中的图片被点击时，用rearrange函数，居中对用的index图片
	 * @param index,需要被居中的图片信息数组中的index
	 * @return {function} 闭包函数
	 */
	center (index) {
		return function () {
			this.rearrange(index)
		}
	}

	// 封装函数，排布图片，并选择居中的图片
	/*
   	 * 重新布局所有图片
	 * @param centerIndex 指定居中排布哪个图片
     */
    rearrange (centerIndex) {
    	let imgsArrangeArr = this.state.imgsArrangeArr,
    		Constant = this.Constant,

    		centerPos = Constant.centerPos,		// 中间图片的位置

    		// 左右两边图片的取值范围
    		hPosRange = Constant.hPosRange,
    		hPosRangeLeftSecX = hPosRange.leftSecX,
    		hPosRangeRightSecX = hPosRange.rightSecX,
    		hPosRangeY = hPosRange.y,
    		// 上部图片的取值范围
    		vPosRange = Constant.vPosRange,
    		vPosRangeX = vPosRange.x,
    		vPosRangeTopY = vPosRange.topY;

		// 布局中间图片
		let imgsArrangeCenterArr = [];
		imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);  // 拿到中间图片后把中间图片的状态信息从数组里删除

		// 居中centerIndex的图片
		imgsArrangeCenterArr[0] = {
			pos: centerPos,
			rotate: 0,
			isCenter: true
		}

		// 布局上部的图片
		let imgsArrangeTopArr = [];		// 存储在上侧的图片状态信息
		let topImgNum = Math.floor(Math.random() * 2);	// 取0张或者1张
			// 取出要布局上侧图片的位置信息
		let topImgSpliceIndex = 0;	 // 从第一张图片开始读取图片
		topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
		imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
			// 循环布置上部图片
		imgsArrangeTopArr.forEach( function (value,index) {
			imgsArrangeTopArr[index] = {
				pos: {
					left: getRangeRandom(vPosRangeX[0], vPosRangeX[1]),		// 调用上面的在区间内取随机数的函数
					top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1])
				},
				rotate: get30DegRandom(),
				isCenter: false
			}
		})

		// 布局左右侧的图片
		for(let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++){
			// 前半部分布局左边，右半部分布局右边
			let hPosRangeLOrRX = null;
			if(i < k) {
				hPosRangeLOrRX = hPosRangeLeftSecX;
			} else {
				hPosRangeLOrRX = hPosRangeRightSecX;
			}

			imgsArrangeArr[i] = {
				pos: {
					left: getRangeRandom(hPosRangeLOrRX[0], hPosRangeLOrRX[1]),
					top: getRangeRandom(hPosRangeY[0], hPosRangeY[1])
				},
				rotate: get30DegRandom(),
				isCenter: false
			}
		}

		// 取出的上部图片重新放回
		if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
			imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
		}
		// 取出的中间图片放回
		imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

		// 触发component的重新渲染
		this.setState({ 
			imgsArrangeArr: imgsArrangeArr 
		})
    }

    // react component加载后的回调函数：componentDidMount
    // 组件加载以后，为每张图片计算其位置的范围(初始化Constant)
    componentDidMount() {
    	// 首先拿到舞台大小
    	let stageDOM = ReactDOM.findDOMNode(this.refs.stage);
    	let stageW = stageDOM.scrollWidth;
    	let stageH = stageDOM.scrollHeight;
    	let halfStageW = Math.floor(stageW / 2);
    	let halfStageH = Math.floor(stageH / 2);
    	// 拿到一张图片的大小
    	let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
    		imgW = imgFigureDOM.scrollWidth,
    		imgH = imgFigureDOM.scrollHeight,
    		halfImgH = Math.floor(imgH / 2),
    		halfImgW = Math.floor(imgW / 2);

		// 中央图片的状态信息
		this.Constant.centerPos = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		}

		// 左右两部分的取值范围
		this.Constant.hPosRange.leftSecX[0] = -halfImgW;
		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

		this.Constant.hPosRange.y[0] = -halfImgH; 
		this.Constant.hPosRange.y[1] = stageH - halfImgH;

		// 上部分的取值范围
		this.Constant.vPosRange.x[0] = halfStageW - imgW;
		this.Constant.vPosRange.x[1] = halfStageW;
		this.Constant.vPosRange.topY[0] = -halfImgH;
		this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;

		this.rearrange(0);
    }


	// react 进行渲染的入口
	render() {	
		let controllerUnits = [];	// 控制条
		let imgFigures = [];	// 图片数组

		imageDatas.forEach(function (item,index) {
			// 图片的初始位置
			if (!this.state.imgsArrangeArr[index]) {
				this.state.imgsArrangeArr[index] = {
					pos: {
						left: 0,
						top: 0
					},
					rotate: 0,
					isInverse: false,
					isCenter: false
				}
			}
			// 图片
			imgFigures.push(<ImgFigure key={index} data={item} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index).bind(this)}/>)

			// 底部控制组件
			controllerUnits.push(<ControllerUnits key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index).bind(this)}/>)


		}.bind(this))

		return (
			<section className="stage" ref="stage">
				<section className="img-sec">
					{imgFigures}
				</section>
				<nav className="controller-nav">
					{controllerUnits}
				</nav>
			</section>
		);
	}
}


export default GalleryByReactApp;
