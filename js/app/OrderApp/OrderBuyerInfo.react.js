/**
 *  OrderBuyerInfo.react.js - Buyer's Information
 */

var React = require('react'),
    ReactPropTypes = React.PropTypes,
    classNames = require('classnames'),
    AppAction = require('../../action/AppAction.js');

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
    AppAction.buyerInfoUpdate({name: event.target.value});
  },

  _phoneInputTextOnChange: function (event) {
    AppAction.buyerInfoUpdate({phone: event.target.value});
  },

  _emailInputTextOnChange: function (event) {
    AppAction.buyerInfoUpdate({email: event.target.value});
  }
});

module.exports = OrderBuyerInfo;
