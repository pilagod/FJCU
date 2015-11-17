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

  componentDidMount: function () {
    this._initProductInfo();
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

  componentDidUpdate: function () {
    if (this.state.orderConfirm === 1) {
      var orderInfo = document.getElementById('orderInfo');
      if (navigator.userAgent.indexOf('Firefox') > -1) {
        scrollTo(document.documentElement, orderInfo.offsetTop, 800);
      } else {
        scrollTo(document.body, orderInfo.offsetTop, 800);
      }
    }
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
    var orderAppHeader, orderProcess, orderStep;

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

    if (this.state.orderConfirm === 1) {
      orderStep = <img className="step-img" src="img/OrderApp/step3.png"></img>;
    } else {
      orderStep = <img className="step-img" src="img/OrderApp/step2.png"></img>;
    }

    return (
      <div id="OrderApp">
        {loadingBlock}
        <div className="banner">
          <img src="img/store-banner.png" alt="store banner"></img>
          {orderStep}
        </div>
        <div id="orderInfo" className={classNames({'hidden': (this.state.orderConfirm !== 1)})}>
          <header>
            <div>
              <span>訂單代碼：</span>
              <h2>{this.state.orderInfo.orderId}</h2>
            </div>
            <div>
              <span>繳費期限：</span>
              <h2>{this.state.orderInfo.expiryDate}</h2>
            </div>
          </header>
          <article>
            <div>
              <i className="fa fa-circle"></i>
              <span>如何繳費：</span>
              <p>代碼訂單已寄至您的信箱，11/16(一) - 11/25(三)帽T預購期間，請在訂單成立起三日內，憑訂單代碼，至焯炤館1F大廳攤位做繳費動作。</p>
              <p>若逾期尚未繳費，訂單將撤銷，請您重新下訂。</p>
            </div>
            <div>
              <i className="fa fa-circle"></i>
              <span>如何取貨：</span>
              <p>請在12/05(六)輔大校慶園遊會當日，持訂單代碼至輔大帽T團隊攤位領貨。</p>
              <p>若本人不克前來領貨，請您託人代為領取，並攜帶可證明身份之證件。</p>
            </div>
            <div>
              <i className="fa fa-circle"></i>
              <span>退換貨須知：</span>
              <p>由於此款商品為活動限量商品，若有商品瑕疵、尺碼領貨錯誤，請保留原包裝，我們將退款給您，恕無法換貨。</p>
              <p>商品穿過或是經水洗滌，都視同驗收完成，恕無法進行退貨。</p>
            </div>
          </article>
        </div>
        <OrderDetail orderConfirm={this.state.orderConfirm} productItems={this.state.productItems} productInfo={this.state.productInfo}/>
        <OrderBuyerInfo orderConfirm={this.state.orderConfirm} buyerInfo={this.state.buyerInfo}/>
        <div id="orderAction" className="flex flex-vertical-center flex-horizontal-center">
          <div id="orderActionBack" className="active" onClick={this._orderActionBackOnClick}>
            <span className={classNames({'hidden': (this.state.orderConfirm === 1)})}>回首頁</span>
            <span className={classNames({'hidden': (this.state.orderConfirm !== 1)})}>訂購成功，回首頁。</span>
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
    history.pushState({app: "ProductApp"}, "ProductApp", "");
    window.onpopstate();
  },

  _orderActionNextOnClick: function () {

    this.setState({loading: true});

    var order, orderItems = [], productName, totalNum = 0, total = 0, totalDiscount = 0, totalAfterDiscount = 0,
        buyerInfo = this.state.buyerInfo,
        productItems = this.state.productItems,
        amountTable = this.state.productInfo.amountTable;

    if (!buyerInfo.name || !buyerInfo.phone || !buyerInfo.email) {
      alert("訂購人資訊尚未填寫完整！");
      this.setState({loading: false});
      return false;
    }

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
        // Amount: 101
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
      NoSendMail: false
    };

    if (buyerInfo.name === "測試員") {
      order.NoSendMail = true;
    }

    // console.log(order);

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
    // console.log("onOrderAppProductInfoChange");
    // console.log(this.state.productInfo);
    AppStore.getProductInfo().then(function (productInfo) {
      this.setState({
        productInfo: productInfo
      });
      // console.log("new product Info:", productInfo);
    }.bind(this));
  },

  _onOrderConfirm: function () {
    this.setState({orderConfirm: 1});
    this.setState({
      orderInfo: AppStore.getOrderInfo()
    });

    AppAction.clearAll();
    AppAction.clearProductInfoAmountTable();

    setTimeout(function () {
      this.setState({loading: false});
    }.bind(this), 2500);
  },

  _onOrderConfirmFail: function () {
    this.setState({orderConfirm: 2});
    this.setState({
      orderInfo: AppStore.getOrderInfo()
    });

    AppAction.clearProductInfoAmountTable();

    setTimeout(function () {
      this.setState({loading: false});
      this.setState({orderConfirm: 0});
    }.bind(this), 2500);
  },
});

function scrollTo(element, to, duration) {
  if (duration <= 0) {
    return;
  };
  var difference = to - element.scrollTop;
  var perTick = difference / duration * 10;

  setTimeout(function() {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop == to) {
      return;
    };
    scrollTo(element, to, duration - 10);
  }, 10);
}

module.exports = OrderApp;
