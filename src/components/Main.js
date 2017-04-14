require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';

// 获取图片片相关数据
let imageDatas = require('../data/imageDatas.json');

// 遍历数组，将图片信息转换成URL信息
imageDatas = imageDatas.map((item) => {
	item.imageURL = 'images/' + item.fileName;
	return item;
});


class GalleryByReactApp extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
