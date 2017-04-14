import React from 'react';

// --------- 添加图片组件 ----------
class ImgFigure extends React.Component{
	/*
	 * ImgFigure的点击函数
	 * 如果图片已经居中，那么翻转
	 * 否则将图片居中
	 */
	figureClick (e) {
		e.stopPropagation();
		e.preventDefault();

		if (this.props.arrange.isCenter) {
			this.props.inverse();	// 调用该Imgfigure的inverse函数
		} else {
			this.props.center();	// 调用center函数
		}

	}

	render() {
		let styleObj = {};	
		// 如果props中有pos属性则赋值
		if (this.props.arrange.pos) {
			styleObj = this.props.arrange.pos;
		}

		// 如果图片有旋转角度，添加旋转变换
		if (this.props.arrange.rotate) {
			['MozTransform','msTransform','WebkitTransform','OTransform','transform'].map((item) => {
				styleObj[item] = 'rotate(' + this.props.arrange.rotate + 'deg';
			})
		}

		// 居中图片z-index 高于旁边的图片，低于控制组件的z-index
		if (this.props.arrange.isCenter) {
			styleObj.zIndex = 11;
		}

		// 用类名控制图片的翻转
		let ImgFigureClassName = 'img-figure';
		ImgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : "";

		return(
			<figure className={ImgFigureClassName} style={styleObj} onClick={this.figureClick.bind(this)}>
				<img src={this.props.data.imageURL} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
					<div className='img-back' onClick={this.figureClick.bind(this)}>
						<p>{this.props.data.desc}</p>
					</div>
				</figcaption>
			</figure>
		);

	}
}

export default ImgFigure;

