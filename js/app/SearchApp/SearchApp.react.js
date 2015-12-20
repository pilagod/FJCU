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
          <img src="http://imgur.com/ctfMw4O.png" alt="store banner"></img>
        </div>
        <div id="searchBar">
          <span>訂單代號：</span>
          <input id="txtOrderId" type="text"></input>
          <span id="btnSearch" onClick={this._searchOnClick}>搜尋</span>
        </div>
        {orderStatus}
        <div id="orderInfo" className={classNames({'hidden': !this.state.isSearch})}>
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
