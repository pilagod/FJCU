/**
 *  InfoApp.react.js - ProductInfo + ProductDetail
 */

var React = require('react'),
    assign = require('object-assign'),
    AppStore = require('../../store/AppStore.js'),
    AppAction = require('../../action/AppAction.js'),
    AppConstant = require('../../constant/AppConstant.js'),
    ProductInfo = require('./ProductInfo.react.js'),
    ProductDetail = require('./ProductDetail.react.js');

var ProductApp = React.createClass({

  getInitialState: function () {
    return {
      productInfo: {},
      productSelected: AppStore.getProductSelected()
    }
  },

  componentWillMount: function () {
    this._initProductInfo();
  },

  componentDidMount: function () {
    AppStore.addChangeListener(AppConstant.PRODUCT_CHANGE_EVENT, this._onProductChange);
    AppStore.addChangeListener(AppConstant.PRODUCTINFO_CHANGE_EVENT, this._onProductInfoChange);
  },

  componentWillUnmount: function () {
    AppStore.removeChangeListener(AppConstant.PRODUCT_CHANGE_EVENT, this._onProductChange);
    AppStore.removeChangeListener(AppConstant.PRODUCTINFO_CHANGE_EVENT, this._onProductInfoChange);
  },

  render: function () {
    if (Object.keys(this.state.productInfo).length === 0) {
      return null;
    } else {
      return (
        <div id="ProductApp">
          <ProductInfo
            productInfo={this.state.productInfo}
            productSelected={this.state.productSelected}/>
          <ProductDetail />
        </div>
      )
    }
  },

  _initProductInfo: function () {
    AppStore.getProductInfo().then(function (productInfo) {
      if (Object.keys(productInfo).length === 0) {
        alert("載入資料發生錯誤，請稍候再重新整理看看。")
        return false;
      }
      this.setState({
        productInfo: productInfo
      });
      if (!this.state.productSelected.productId) {
        AppAction.productUpdate({
          productId: this.state.productInfo.productId,
          productName: this.state.productInfo.productName,
          price: this.state.productInfo.price
        });
      }
    }.bind(this));
  },

  /*************************/
  /*  View Change Handler  */
  /*************************/

  _onProductChange: function () {
    this.setState({
      productSelected: AppStore.getProductSelected()
    });
  },

  _onProductInfoChange: function () {
    AppStore.getProductInfo().then(function (productInfo) {
      this.setState({
        productInfo: productInfo
      });
    }.bind(this));
  }
});

module.exports = ProductApp;
