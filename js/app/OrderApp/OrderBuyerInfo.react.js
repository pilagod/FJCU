/**
 *  OrderBuyerInfo.react.js - Buyer's Information
 */

var React = require('react'),
    ReactPropTypes = React.PropTypes,
    assign = require('object-assign'),
    classNames = require('classnames'),
    AppAction = require('../../action/AppAction.js'),
    OrderBuyerInfoRow = require('./OrderBuyerInfoRow.react.js');

var nameRegexp = /^[\u4e00-\u9fa5]{2,4}$/,
    phoneRegexp = /^09\d{8}$/,
    emailRegexp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
    addressRegexp = /^[-\u4e00-\u9fa50-9fF]{10,}$/,
    bankCodeRegexp = /^\d{3}$/,
    accountLastRegexp = /^\d{5}$/;

var OrderBuyerInfo = React.createClass({

  propTypes: {
    orderConfirm: ReactPropTypes.number.isRequired,
    buyerInfo: ReactPropTypes.object.isRequired,
    orderType: ReactPropTypes.number.isRequired
  },

  getInitialState: function () {
    return {
      orderTypeInfo: {
        '0':[
          { name: 'name', displayName: '中文全名', regexp: nameRegexp},
          { name: 'phone', displayName: '手機號碼', regexp: phoneRegexp },
          { name: 'email', displayName: '電子信箱', style: {width: '500px'}, regexp: emailRegexp }
        ],
        '1':[
          { name: 'name', displayName: '中文全名', regexp: nameRegexp},
          { name: 'phone', displayName: '手機號碼', regexp: phoneRegexp },
          { name: 'email', displayName: '電子信箱', style: {width: '500px'}, regexp: emailRegexp },
          { name: 'address', displayName: '寄送地址', style: {width: '500px'}, regexp: addressRegexp },
          { name: 'bankCode', displayName: '匯款帳號行號', style: {width: '100px'}, regexp: bankCodeRegexp },
          { name: 'accountLast', displayName: '匯款帳號後五碼', style: {width: '200px'}, regexp: accountLastRegexp }
        ]
      }
    }
  },

  render: function () {

    var orderBuyerInfoRows;

    orderBuyerInfoRows = this.state.orderTypeInfo[this.props.orderType].map(function (buyerInfo, index) {
      return (
        <OrderBuyerInfoRow
          key={index}
          infoName={buyerInfo.name}
          infoDisplayName={buyerInfo.displayName}
          infoValue={this.props.buyerInfo[buyerInfo.name]}
          infoStyle={buyerInfo.style}
          orderConfirm={this.props.orderConfirm}
          regexp={buyerInfo.regexp}
        />
      )
    }.bind(this));

    return (
      <section id="orderBuyerInfo">
        <header className="flex flex-vertical-center">
          <i className="fa fa-user fa-2x"></i>
          <h2>訂購人資訊</h2>
        </header>
        <article>
          {orderBuyerInfoRows}
        </article>
      </section>
    )
  }

  // <div>
  //   <h3>中文全名：</h3>
  //   <input type="text" className={editClassName} onChange={this._nameInputTextOnChange} defaultValue={this.props.buyerInfo.name}></input>
  //   <i className={namePassClassName}></i>
  //   <span className={infoClassName}>
  //     <h3>{this.props.buyerInfo.name}</h3>
  //   </span>
  // </div>
  // <div>
  //   <h3>手機號碼：</h3>
  //   <input type="text" className={editClassName} onChange={this._phoneInputTextOnChange} defaultValue={this.props.buyerInfo.phone}></input>
  //   <i className={phonePassClassName}></i>
  //   <span className={infoClassName}>
  //     <h3>{this.props.buyerInfo.phone}</h3>
  //   </span>
  // </div>
  // <div>
  //   <h3>電子信箱：</h3>
  //   <input type="text" className={editClassName} style={longInputTextStyle} onChange={this._emailInputTextOnChange} defaultValue={this.props.buyerInfo.email}></input>
  //   <i className={emailPassClassName}></i>
  //   <span className={infoClassName}>
  //     <h3>{this.props.buyerInfo.email}</h3>
  //   </span>
  // </div>
});

module.exports = OrderBuyerInfo;
