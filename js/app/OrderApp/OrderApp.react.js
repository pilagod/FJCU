/**
 *  OrderApp - OrderDetial + OrderBuyerInfo
 */

var React = require('react'),
    assign = require('object-assign'),
    AppStore = require('../../store/AppStore.js'),
    AppConstant = require('../../constant/AppConstant.js'),
    OrderDetail = require('./OrderDetail.react.js'),
    OrderBuyerInfo = require('./OrderBuyerInfo.react.js');

function getOrderState() {
  return {
    productInfo: AppStore.getProductInfo(),
    productItems: AppStore.getOrderProductItem()
  }
}

function getBuyerInfo() {
  return {
    buyerInfo: AppStore.getBuyerInfo()
  }
}

var OrderApp = React.createClass({

  getInitialState: function () {
    return assign({}, getOrderState(), getBuyerInfo(), {
      orderConfirm: false
    });
  },

  componentDidMount: function () {
    AppStore.addChangeListener(AppConstant.ORDER_CHANGE_EVENT, this._onOrderChange);
    AppStore.addChangeListener(AppConstant.BUYERINFO_CHANGE_EVENT, this._onBuyerInfoChange);
  },

  componentWillUnmount: function () {
    AppStore.removeChangeListener(AppConstant.ORDER_CHANGE_EVENT, this._onOrderChange);
    AppStore.removeChangeListener(AppConstant.BUYERINFO_CHANGE_EVENT, this._onBuyerInfoChange);
  },

  render: function () {
    return (
      <div id="OrderApp">
        <OrderDetail orderConfirm={this.state.orderConfirm} productItems={this.state.productItems} productInfo={this.state.productInfo}/>
        <OrderBuyerInfo orderConfirm={this.state.orderConfirm} buyerInfo={this.state.buyerInfo}/>
        <div id="orderAction" className="flex flex-vertical-center flex-horizontal-center">
          <div id="orderActionBack" onClick={this._orderActionBackOnClick}>
            <span>回上一頁</span>
          </div>
          <div id="orderActionNext" onClick={this._orderActionNextOnClick}>
            <span>訂單確認</span>
          </div>
        </div>
      </div>
    )
  },

  _orderActionBackOnClick: function () {
    history.back();
  },

  _orderActionNextOnClick: function () {
  },

  _onOrderChange: function () {
    console.log(getOrderState());
    this.setState(getOrderState());
  },

  _onBuyerInfoChange: function () {
    this.setState(getBuyerInfo());
  }
});

module.exports = OrderApp;
