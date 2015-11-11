/**
 *  OrderApp - OrderDetial + OrderBuyerInfo
 */

var React = require('react'),
    assign = require('object-assign'),
    classNames = require('classnames'),
    AppStore = require('../../store/AppStore.js'),
    AppConstant = require('../../constant/AppConstant.js'),
    OrderDetail = require('./OrderDetail.react.js'),
    OrderBuyerInfo = require('./OrderBuyerInfo.react.js');

var OrderApp = React.createClass({

  getInitialState: function () {
    return {
      productInfo: {},
      productItems: AppStore.getOrderProductItem(),
      buyerInfo: AppStore.getBuyerInfo(),
      orderId: null,
      orderConfirm: 0, // 0: Initialize, 1: Success, 2: Fail
      loading: false
    };
  },

  componentWillMount: function () {
    this._initProductInfo();
  },

  componentDidMount: function () {
    // Order ProductItems Changed
    AppStore.addChangeListener(AppConstant.ORDER_CHANGE_EVENT, this._onOrderChange);
    // Order Confirm Status
    AppStore.addChangeListener(AppConstant.ORDER_CONFIRM_EVENT, this._onOrderConfirm);
    AppStore.addChangeListener(AppConstant.ORDER_CONFIRM_FAIL_EVENT, this._onOrderConfirmFail);
    // Buyer Information Changed
    AppStore.addChangeListener(AppConstant.BUYERINFO_CHANGE_EVENT, this._onBuyerInfoChange);
    // Product Information Changed
    AppStore.addChangeListener(AppConstant.PRODUCTINFO_CHANGE_EVENT, this._onProductInfoChange);
  },

  componentWillUnmount: function () {
    // Order ProductItems Changed
    AppStore.removeChangeListener(AppConstant.ORDER_CHANGE_EVENT, this._onOrderChange);
    // Order Confirm Status
    AppStore.removeChangeListener(AppConstant.ORDER_CONFIRM_EVENT, this._onOrderConfirm);
    AppStore.removeChangeListener(AppConstant.ORDER_CONFIRM_FAIL_EVENT, this._onOrderConfirmFail);
    // Buyer Information Changed
    AppStore.removeChangeListener(AppConstant.BUYERINFO_CHANGE_EVENT, this._onBuyerInfoChange);
    // Product Information Changed
    AppStore.removeChangeListener(AppConstant.PRODUCTINFO_CHANGE_EVENT, this._onProductInfoChange);
  },

  render: function () {

    if (Object.keys(this.state.productInfo).length === 0) {
      return null;
    }

    var isEmpty = (Object.keys(this.state.productItems).length === 0);

    var orderActionNextClassName = classNames({
      'hidden': (this.state.orderConfirm === 1),
      'active': !isEmpty
    });
    var orderActionNextOnClick = isEmpty ? null : this._orderActionNextOnClick;
    var orderAppHeader, orderProcess;

    var loadingBlock = null,
        loadingContent = null,
        loadingIconClassName = null;
    if (this.state.loading) {
      if (this.state.orderConfirm === 0) {
        loadingContent = "訂單處理中...";
        loadingIconClassName = "fa-spinner"
      } else if (this.state.orderConfirm === 1) {
        loadingContent = "訂單新增成功！";
        loadingIconClassName = "fa-check-circle";
      } else if (this.state.orderConfirm === 2) {
        loadingContent = "訂單新增失敗！";
        loadingIconClassName = "fa-times-circle";
      }
      loadingBlock = (
        <div id="loadingBlock" className="flex flex-vertical-center flex-horizontal-center">
          <div className="flex flex-vertical-center flex-horizontal-center flex-direction-column">
            <div className="loadingInfo">
              <h3>{loadingContent}</h3>
            </div>
            <i className={classNames('fa', loadingIconClassName, 'fa-3x')}></i>
          </div>
        </div>
      )
    }

    return (
      <div id="OrderApp">
        {loadingBlock}
        <header className={classNames({'hidden': (this.state.orderConfirm !== 1)})}>
          <span>訂單編號：</span>
          <h2 id="orderId">12121124124</h2>
        </header>
        <OrderDetail orderConfirm={this.state.orderConfirm} productItems={this.state.productItems} productInfo={this.state.productInfo}/>
        <OrderBuyerInfo orderConfirm={this.state.orderConfirm} buyerInfo={this.state.buyerInfo}/>
        <div id="orderAction" className="flex flex-vertical-center flex-horizontal-center">
          <div id="orderActionBack" className="active" onClick={this._orderActionBackOnClick}>
            <span>回上一頁</span>
          </div>
          <div id="orderActionNext" className={orderActionNextClassName} onClick={orderActionNextOnClick}>
            <span>訂單確認</span>
          </div>
        </div>
      </div>
    )
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
    }.bind(this));
  },

  /*************************/
  /*   Html Event Handler  */
  /*************************/

  _orderActionBackOnClick: function () {
    history.back();
  },

  _orderActionNextOnClick: function () {
    // Num為零跳過
    this.setState({loading: true});
  },

  /*************************/
  /*  View Change Handler  */
  /*************************/

  _onOrderChange: function () {
    this.setState({
      productItems: AppStore.getOrderProductItem()
    });
  },

  _onBuyerInfoChange: function () {
    this.setState({
      buyerInfo: AppStore.getBuyerInfo()
    });
  },

  _onProductInfoChange: function () {
    this.setState({
      productInfo: AppStore.getProductInfo()
    });
  },

  _onOrderConfirm: function () {
    this.setState({orderConfirm: 1});
    setTimeout(function () {
      this.setState({loading: false});
    }.bind(this), 1500);
  },

  _onOrderConfirmFail: function () {
    this.setState({orderConfirm: 2});
    setTimeout(function () {
      this.setState({loading: false});
      this.setState({orderConfirm: 0});
    }.bind(this), 1500);
  }
});

module.exports = OrderApp;
