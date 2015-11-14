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
      orderDetail = <OrderDetail orderConfirm={this.state.orderConfirm} productItems={this.state.productItems} productInfo={this.state.productInfo}/>;
      orderBuyerInfo = <OrderBuyerInfo orderConfirm={this.state.orderConfirm} buyerInfo={this.state.buyerInfo}/>
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
        // this.state.orderInfo.isPaid = true;
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
            </div>
          </div>
        );
      }
    }

    return (
      <div id="SearchApp">
        <div id="searchBar">
          <span>訂單代號：</span>
          <input id="txtOrderId" type="text"></input>
          <span id="btnSearch" onClick={this._searchOnClick}>搜尋</span>
        </div>
        {orderStatus}
        {orderDetail}
        {orderBuyerInfo}
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

  _searchOnClick: function () {
    var orderId = document.getElementById('txtOrderId').value;
    AppAction.orderSearch(orderId);
  },

  _onOrderSearch: function () {
    this.setState({
      productItems: AppStore.getSearchProductItem(),
      buyerInfo: AppStore.getSearchBuyerInfo(),
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
