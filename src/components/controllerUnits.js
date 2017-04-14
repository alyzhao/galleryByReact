import React from 'react';

class ControllerUnits extends React.Component {

	// 底部控制点,点击事件
	handleClick (e) {
		e.stopPropagation();
		e.preventDefault();

		if (!this.props.arrange.isCenter) {
			this.props.center();
		} else {
			this.props.inverse();
		}
	}

	render() {
		let ControllerUnitsClassName = 'controller-unit';
		ControllerUnitsClassName += (this.props.arrange.isCenter) ? ' is-center' : '';
		ControllerUnitsClassName += (this.props.arrange.isInverse) ? ' is-inverse' : '';

		return (
			<span className={ControllerUnitsClassName} onClick={this.handleClick.bind(this)}></span>
		);
	}
}

export default ControllerUnits;

