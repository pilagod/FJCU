/**
 *  SearchApp -
 */

var React = require('react'),
    classNames = require('classnames'),
    AppStore = require('../../store/AppStore.js'),
    AppAction = require('../../action/AppAction.js'),
    AppConstant = require('../../constant/AppConstant.js'),
    OrderDetail = require('../OrderApp/OrderDetail.react.js'),
    OrderBuyerInfo = require('../OrderApp/OrderBuyerInfo.react.js');

var SearchApp = React.createClass({

  getInitialState: function () {
    return {
      orderInfo: {},
      productInfo: {},
      productItems: {},
      buyerInfo: {},
      orderConfirm: 1,
      orderType: 0,
      isSearch: false
    }
  },

  componentDidMount: function () {
    this._initProductInfo();
    AppStore.addChangeListener(AppConstant.ORDER_SEARCH_EVENT, this._onOrderSearch);
    AppStore.addChangeListener(AppConstant.ORDER_SEARCH_FAIL_EVENT, this._onOrderSearchFail);
  },

  componentWillUnmount: function () {
    AppStore.removeChangeListener(AppConstant.ORDER_SEARCH_EVENT, this._onOrderSearch);
    AppStore.removeChangeListener(AppConstant.ORDER_SEARCH_FAIL_EVENT, this._onOrderSearchFail);
  },

  render: function () {
    var orderStatus, orderDetail, orderBuyerInfo;

    if (this.state.isSearch) {
      orderDetail = <OrderDetail orderConfirm={this.state.orderConfirm} orderType={this.state.orderType} productItems={this.state.productItems} productInfo={this.state.productInfo}/>;
      orderBuyerInfo = <OrderBuyerInfo orderConfirm={this.state.orderConfirm} orderType={this.state.orderType} buyerInfo={this.state.buyerInfo}/>
      if (this.state.orderInfo.isCancel) {
        orderStatus = (
          <div id="orderStatus">
            <div>
              <div className="status-block is-cancel">
                <div className="status done">撤銷</div>
                <div className="status-desc">訂單狀態</div>
              </div>
            </div>
          </div>
        );
      } else {
        // console.log(this.state.orderInfo);
        // this.state.orderInfo.isPaid = false;
        // this.state.orderInfo.isReceived = true;
        var paidClassName = classNames('status', {
              'done': this.state.orderInfo.isPaid,
              'undone': !this.state.orderInfo.isPaid
            }),
            receivedClassName = classNames('status', {
              'done': this.state.orderInfo.isReceived,
              'undone': !this.state.orderInfo.isReceived
            });
        orderStatus = (
          <div id="orderStatus">
            <div>
              <div className="status-block">
                <div className={paidClassName}>繳費</div>
                <div className="status-desc">繳費狀態</div>
              </div>
              <div className="status-block">
                <div className={receivedClassName}>取貨</div>
                <div className="status-desc">取貨狀態</div>
              </div>
              <div>
                <div className={classNames('status-block', {'hidden': this.state.orderInfo.isPaid})}>
                  <div className="status" style={{color: 'red', fontSize: '1.2em'}}>{this.state.orderInfo.expiryDate}</div>
                  <div className="status-desc">繳費期限</div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div id="SearchApp">
        <div className="banner">
          <img src="img/store-banner.png" alt="store banner"></img>
        </div>
        <div id="searchBar">
          <span>訂單代號：</span>
          <input id="txtOrderId" type="text"></input>
          <span id="btnSearch" onClick={this._searchOnClick}>搜尋</span>
        </div>
        {orderStatus}
        {orderDetail}
        {orderBuyerInfo}
        <div id="orderPaymentInfo" className={classNames({'hidden': this.state.orderType === 0})}>
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
                  訂單成立後，會寄「訂單成立通知信」給您，裏頭包含訂單代碼、訂單資訊和匯款帳號<br/>
                  請您在訂單成立後三日內，匯款至以下帳戶：<br/>
                  銀行名稱：新莊區農會<br/>
                  分行名稱：營盤分部<br/>
                  戶名：輔大書坊<br/>
                  匯款帳號：09020000013164<br/>
                  本團隊每日對帳，確定匯款後，會寄「繳費成功通知信」至您的信箱。<br/>
                  如有任何問題，請直接私訊輔大帽踢粉專，謝謝您！
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
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

  _searchOnClick: function () {
    var orderId = document.getElementById('txtOrderId').value;
    AppAction.orderSearch(orderId);
  },

  /*************************/
  /*  View Change Handler  */
  /*************************/

  _onOrderSearch: function () {
    this.setState({
      orderInfo: AppStore.getOrderInfo(),
      productItems: AppStore.getSearchProductItem(),
      buyerInfo: AppStore.getSearchBuyerInfo(),
      orderType: AppStore.getOrderInfo().isMail ? 1 : 0,
      isSearch: true
    });
    AppAction.clearOrderSearch();
  },

  _onOrderSearchFail: function () {
    alert("訂單不存在！");
    this.setState({
      isSearch: false
    })
    AppAction.clearOrderSearch();
  }
});

module.exports = SearchApp;
