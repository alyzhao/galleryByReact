import React from 'react';

// --------- 添加图片组件 ----------
class ImgFigure extends React.Component{

	render() {
		let styleObj = {};
		// 如果props中有pos属性则赋值
		if (this.props.arrange.pos) {
			styleObj = this.props.arrange.pos;
		}

		// 用类名控制图片的翻转
		let ImgFigureClassName = 'img-figure';

		return(
			<figure className={ImgFigureClassName} style={styleObj}>
				<img src={this.props.data.imageURL} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		);

	}
}

export default ImgFigure;

