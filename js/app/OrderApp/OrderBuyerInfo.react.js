/**
 *  OrderBuyerInfo.react.js - Buyer's Information
 */

var React = require('react'),
    ReactPropTypes = React.PropTypes,
    classNames = require('classnames'),
    AppAction = require('../../action/AppAction.js');

var nameRegexp = /^[\u4e00-\u9fa5]{2,4}$/,
    phoneRegexp = /^09\d{8}$/,
    emailRegexp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

var OrderBuyerInfo = React.createClass({

  propTypes: {
    orderConfirm: ReactPropTypes.bool.isRequired,
    buyerInfo: ReactPropTypes.object.isRequired
  },

  render: function () {
    var emailInputTextStyle = {
      width: "500px"
    };

    var namePassClassName = classNames('fa', 'fa-check-circle', 'fa-lg', {'pass': this.props.buyerInfo.name}),
        phonePassClassName = classNames('fa', 'fa-check-circle', 'fa-lg', {'pass': this.props.buyerInfo.phone}),
        emailPassClassName = classNames('fa', 'fa-check-circle', 'fa-lg', {'pass': this.props.buyerInfo.email});

    return (
      <section id="orderBuyerInfo">
        <header className="flex flex-vertical-center">
          <i className="fa fa-user fa-2x"></i>
          <h2>訂購人資訊</h2>
        </header>
        <article>
          <div>
            <h3>中文全名</h3>
            <input type="text" onChange={this._nameInputTextOnChange} defaultValue={this.props.buyerInfo.name}></input>
            <i className={namePassClassName}></i>
          </div>
          <div>
            <h3>手機號碼</h3>
            <input type="text" onChange={this._phoneInputTextOnChange} defaultValue={this.props.buyerInfo.phone}></input>
            <i className={phonePassClassName}></i>
          </div>
          <div>
            <h3>電子信箱</h3>
            <input type="text" style={emailInputTextStyle} onChange={this._emailInputTextOnChange} defaultValue={this.props.buyerInfo.email}></input>
            <i className={emailPassClassName}></i>
          </div>
        </article>
      </section>
    )
  },

  _nameInputTextOnChange: function (event) {
    if (nameRegexp.test(event.target.value)) {
      AppAction.buyerInfoUpdate({name: event.target.value});
    } else {
      AppAction.buyerInfoUpdate({name: null});
    }
  },

  _phoneInputTextOnChange: function (event) {
    if (phoneRegexp.test(event.target.value)) {
      AppAction.buyerInfoUpdate({phone: event.target.value});
    } else {
      AppAction.buyerInfoUpdate({phone: null});
    }
  },

  _emailInputTextOnChange: function (event) {
    if (emailRegexp.test(event.target.value)) {
      AppAction.buyerInfoUpdate({email: event.target.value});
    } else {
      AppAction.buyerInfoUpdate({email: null});
    }
  }
});

module.exports = OrderBuyerInfo;
