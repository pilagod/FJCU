/**
 *  OrderApp - OrderDetial + OrderBuyerInfo
 */

var React = require('react'),
    AppStore = require('../../store/AppStore.js'),
    AppConstant = require('../../constant/AppConstant.js'),
    OrderDetail = require('./OrderDetail.react.js');

function getOrderState() {
  return {
    productInfo: AppStore.getProductInfo(),
    productItems: AppStore.getOrderProductItem()
  }
}

var OrderApp = React.createClass({

  getInitialState: function () {
    return getOrderState();
  },

  componentDidMount: function () {
    AppStore.addChangeListener(AppConstant.ORDER_CHANGE_EVENT, this._onOrderChange);
  },

  componentWillUnmount: function () {
    AppStore.removeChangeListener(AppConstant.ORDER_CHANGE_EVENT, this._onOrderChange);
  },

  render: function () {
    return (
      <div id="OrderApp">
        <OrderDetail productItems={this.state.productItems} productInfo={this.state.productInfo}/>
      </div>
    )
  },

  _onOrderChange: function () {
    console.log(getOrderState());
    this.setState(getOrderState());
  }
});

module.exports = OrderApp;
