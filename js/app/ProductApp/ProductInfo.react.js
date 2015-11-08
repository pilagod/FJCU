/**
 *  ProductInfo.react.js - ProductShow + ProductSelector
 */

var React = require('react'),
    AppStore = require('../../store/AppStore.js'),
    AppConstant = require('../../constant/AppConstant.js'),
    ProductShow = require('./ProductShow.react.js'),
    ProductSelector = require('./ProductSelector.react.js');

function getProductSelected() {
  return {
    productSelected: AppStore.getProductSelected()
  };
}

var ProductInfo = React.createClass({
  getInitialState: function () {
    return getProductSelected();
  },

  componentWillMount: function () {
    AppStore.addChangeListener(AppConstant.PRODUCT_CHANGE_EVENT, this._onProductChange);
  },

  componentWillUnmount: function () {
    AppStore.removeChangeListener(AppConstant.PRODUCT_CHANGE_EVENT, this._onProductChange);
  },

  render: function () {
    return (
      <section id="productInfo">
        <ProductShow productSelected={this.state.productSelected}/>
        <ProductSelector productSelected={this.state.productSelected}/>
      </section>
    )
  },

  /*************************/
  /*  View Change Handler  */
  /*************************/

  _onProductChange: function () {
    this.setState(getProductSelected());
  }
});

module.exports = ProductInfo;
