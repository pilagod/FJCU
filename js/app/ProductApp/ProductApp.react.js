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

function getProductState() {
  return {
    productInfo: AppStore.getProductInfo(),
    productSelected: AppStore.getProductSelected()
  }
}

var ProductApp = React.createClass({

  getInitialState: function () {
    return getProductState();
  },

  componentDidMount: function () {
    AppStore.addChangeListener(AppConstant.PRODUCT_CHANGE_EVENT, this._onProductChange);
    AppAction.productUpdate({
      productId: this.state.productInfo.productId,
      productName: this.state.productInfo.productName,
      price: this.state.productInfo.price
    });
  },

  componentWillUnmount: function () {
    AppStore.removeChangeListener(AppConstant.PRODUCT_CHANGE_EVENT, this._onProductChange);
  },

  render: function () {
    return (
      <div id="ProductApp">
        <ProductInfo productInfo={this.state.productInfo} productSelected={this.state.productSelected}/>
        <ProductDetail />
      </div>
    )
  },

  _onProductChange: function () {
    this.setState(getProductState());
  }
});

module.exports = ProductApp;
