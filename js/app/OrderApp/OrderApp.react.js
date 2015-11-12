/**
 *  OrderApp - OrderDetial + OrderBuyerInfo
 */

var React = require('react'),
    assign = require('object-assign'),
    classNames = require('classnames'),
    AppStore = require('../../store/AppStore.js'),
    AppAction = require('../../action/AppAction.js'),
    AppConstant = require('../../constant/AppConstant.js'),
    OrderDetail = require('./OrderDetail.react.js'),
    OrderBuyerInfo = require('./OrderBuyerInfo.react.js');

var orderTimeout;

var OrderApp = React.createClass({

  getInitialState: function () {
    return {
      productInfo: {},
      productItems: AppStore.getOrderProductItem(),
      buyerInfo: AppStore.getBuyerInfo(),
      orderInfo: {},
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
        // loadingContent = "訂單新增成功！";
        loadingContent = this.state.orderInfo.message;
        loadingIconClassName = "fa-check-circle";
      } else if (this.state.orderConfirm === 2) {
        // loadingContent = "訂單新增失敗！";
        loadingContent = this.state.orderInfo.message;
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
          <h2 id="orderId">{this.state.orderInfo.orderId}</h2>
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
    this.setState({loading: true});
    var order, orderItems = [], productName, totalNum = 0, total = 0, totalDiscount = 0, totalAfterDiscount = 0,
        buyerInfo = this.state.buyerInfo,
        productItems = this.state.productItems,
        amountTable = this.state.productInfo.amountTable;
    for (var key in productItems) {
      productName = productItems[key].productName + "（" + productItems[key].colorName + "-" + productItems[key].size + "）" ;
      if (productItems[key].num <= 0) {
        alert(productName + "數量不可為0！");
        this.setState({loading: false});
        return false;
      }
      if (amountTable[productItems[key].productItemKey].amountAvailable < 0) {
        alert(productName + "超過庫存上限！");
        this.setState({loading: false});
        return false;
      }
      totalNum += productItems[key].num;
      total += productItems[key].total;

      orderItems.push({
        ProductItemID: productItems[key].id,
        Amount: productItems[key].num
      });
    }

    totalDiscount = Math.floor(totalNum / 2) * (this.state.productInfo.discount * 2);
    totalAfterDiscount = total - totalDiscount;

    order = {
      BuyerName: buyerInfo.name,
      BuyerPhone: buyerInfo.phone,
      BuyerEmail: buyerInfo.email,
      Item: orderItems,
      OriginalPrice: total,
      Discount: totalDiscount,
      TotalPrice: totalAfterDiscount,
      NoSendMail: true
    };

    console.log(order);

    AppAction.orderSend(order);
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
    AppStore.getProductInfo().then(function (productInfo) {
      this.setState({
        productInfo: productInfo
      });
    }.bind(this));
  },

  _onOrderConfirm: function () {
    this.setState({orderConfirm: 1});
    this.setState({
      orderInfo: AppStore.getOrderInfo()
    });
    setTimeout(function () {
      this.setState({loading: false});
    }.bind(this), 3000);
  },

  _onOrderConfirmFail: function () {
    this.setState({orderConfirm: 2});
    this.setState({
      orderInfo: AppStore.getOrderInfo()
    });
    setTimeout(function () {
      this.setState({loading: false});
      this.setState({orderConfirm: 0});
    }.bind(this), 3000);
  }
});

module.exports = OrderApp;
