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
      orderType: 0, // 0: 輔大書坊領貨, 1: 郵寄取貨
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
    var orderPaymentInfoClassName = classNames({
      'hidden': (this.state.orderType === 0)
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

    /* Banner: http://imgur.com/ctfMw4O.png */

    // console.log('order: ', this.state.orderInfo);

    return (
      <div id="OrderApp">
        {loadingBlock}
        <div className="banner">
          <img src="http://imgur.com/ctfMw4O.png" alt="store banner"></img>
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
              <span>【 如何繳費 】</span>
              <p>代碼訂單已寄至您的信箱，12/21(一) - 12/31(四)帽T預購期間，若您選擇『現場領貨』者，請在訂單成立起三日內，憑訂單代碼，至輔大書坊做繳費動作。若您選擇『郵遞寄貨』者，請在訂單成立起三日內，用您填寫的帳號轉帳至下方帳戶，謝謝。</p>
              <p>若逾期尚未繳費，訂單將撤銷，請您重新下訂。</p>
            </div>
            <div>
              <i className="fa fa-circle"></i>
              <span>【 取貨須知 】</span>
              <p>每款出貨時間不一，將會個別通知領貨。</p>
              <p>限量款黃色帽踢預計於2016年1月底提供領貨，復刻版帽踢預計於2016年3月底提供領貨。</p>
              <p>選擇<span style={{color: 'red'}}>實體店面取貨</span>者，等到貨品到貨時，將會寄出通知信通知您攜帶繳費代碼與發票直接到輔大書坊領貨。</p>
              <p>選擇<span style={{color: 'red'}}>郵遞寄貨</span>者，將等到所有貨物到齊時一次寄送，預計在2016年4月開始配送，若提早或延後將會寄信通知，恕不提供您更改訂單到現場領貨。</p>
            </div>
            <div>
              <i className="fa fa-circle"></i>
              <span>【 退換貨須知 】</span>
              <p>尺碼訂購錯誤、想更改顏色者，恕無法提供退換貨。 </p>
              <p>商品穿過或是經水洗滌，都視同驗收完成，恕無法進行退貨。</p>
              <p>由於此款商品為活動限量商品，若有商品瑕疵、尺碼領貨錯誤等失誤，請保留原包裝，我們將做退款處理。</p>
            </div>
            <div>
              <i className="fa fa-circle"></i>
              <span>【 匯款資訊 】</span>
              <p>戶名：輔大書坊</p>
              <p>銀行名稱：新莊農會</p>
              <p>分行號碼：904</p>
              <p>匯款帳號：09020000013164</p>
            </div>
          </article>
        </div>
        <div id="orderPaymentType" className={classNames({'hidden': this.state.orderConfirm === 1})}>
          <header className="flex flex-vertical-center">
            <i className="fa fa-archive fa-2x"></i>
            <h2>領貨方式</h2>
          </header>
          <article>
            <div>
              <input type="radio" name="orderType" value="0" defaultChecked onChange={this._orderPaymentTypeOnChanged}></input>
              <h3>輔大書坊領貨</h3>
            </div>
            <div>
              <input type="radio" name="orderType" value="1" onChange={this._orderPaymentTypeOnChanged}></input>
              <h3>郵寄取貨</h3>
            </div>
          </article>
        </div>
        <OrderDetail orderConfirm={this.state.orderConfirm} productItems={this.state.productItems} productInfo={this.state.productInfo} orderType={this.state.orderType}/>
        <OrderBuyerInfo orderConfirm={this.state.orderConfirm} buyerInfo={this.state.buyerInfo} orderType={this.state.orderType}/>
        <div id="orderPaymentInfo" className={orderPaymentInfoClassName}>
          <header className="flex flex-vertical-center">
            <i className="fa fa-file-text-o fa-lg"></i>
            <h2>購買說明</h2>
          </header>
          <article>
            <div>
              <div className="order-payment-info-title">
                <span>ATM匯款</span>
              </div>
              <div className="order-payment-info-content">
                <p>
                  訂單成立後，會寄「訂單成立通知信」給您，裏頭包含訂單代碼 / 訂單資訊和匯款帳號，<br/>
                  請您在訂單成立後三日內，匯款至以下帳戶：<br/>
                  銀行名稱：新莊農會<br/>
                  分行號碼：904<br/>
                  戶名：輔大書坊<br/>
                  匯款帳號：09020000013164<br/>
                  本團隊每日對帳，確定匯款後，會寄「繳費成功通知信」至您的信箱。<br/>
                </p>
              </div>
            </div>
            <div>
              <div className="order-payment-info-title">
                <span>郵寄費用</span>
              </div>
              <div className="order-payment-info-content">
                <table>
                  <tbody>
                    <tr>
                      <td>01件</td>
                      <td>：$100</td>
                    </tr>
                    <tr>
                      <td>02-05件</td>
                      <td>：$150</td>
                    </tr>
                    <tr>
                      <td>06-10件</td>
                      <td>：$200</td>
                    </tr>
                    <tr>
                      <td>10件以上</td>
                      <td>：$250</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </article>
        </div>
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

  _orderPaymentTypeOnChanged: function (event) {
    this.setState({orderType: parseInt(event.target.value)});
  },

  _orderActionBackOnClick: function () {
    history.pushState({app: "ProductApp"}, "ProductApp", "");
    window.onpopstate();
  },

  _orderActionNextOnClick: function () {

    this.setState({loading: true});

    var order, orderItems = [], productName, totalNum = 0, total = 0, totalDiscount = 0, totalAfterDiscount = 0, totalShippingFee = 0,
        buyerInfo = this.state.buyerInfo,
        productItems = this.state.productItems,
        amountTable = this.state.productInfo.amountTable;

    if (!buyerInfo.name || !buyerInfo.phone || !buyerInfo.email ||
       (this.state.orderType === 1 && (!buyerInfo.bankCode || !buyerInfo.accountLast || !buyerInfo.address))) {
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

    if (this.state.orderType === 1) {
      if (totalNum === 1) {
        totalShippingFee = 100;
      } else if (totalNum <= 5) {
        totalShippingFee = 150;
      } else if (totalNum <= 10) {
        totalShippingFee = 200;
      } else {
        totalShippingFee = 250;
      }
    }

    totalDiscount = Math.floor(totalNum / 2) * (this.state.productInfo.discount * 2);
    totalAfterDiscount = total - totalDiscount + totalShippingFee;

    order = {
      BuyerName: buyerInfo.name,
      BuyerPhone: buyerInfo.phone,
      BuyerEmail: buyerInfo.email,
      Item: orderItems,
      OriginalPrice: total,
      Discount: totalDiscount,
      ShippingFee: totalShippingFee,
      TotalPrice: totalAfterDiscount,
      IsMail: this.state.orderType === 0 ? false : true,
      BankCode: buyerInfo.bankCode,
      AccountLast: buyerInfo.accountLast,
      Address: buyerInfo.address,
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
      return true;
    }.bind(this));
  },

  _onOrderConfirm: function () {
    this.setState({
      orderConfirm: 1,
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
