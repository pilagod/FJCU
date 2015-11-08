/**
 *  ProductNumberSelector.react.js - Select Product Number
 */

var React = require('react'),
    ReactPropTypes = React.PropTypes,
    AppAction = require('../../action/AppAction.js');

var ProductNumberSelector = React.createClass({

  propTypes: {
    num: ReactPropTypes.number.isRequired,
    price: ReactPropTypes.number.isRequired
  },

  componentDidMount: function () {
    AppAction.productUpdate({
      num: this.props.num,
      total: this.props.num * this.props.price
    });
  },

  render: function () {
    return (
      <div id="productNumber">
        <span>數量：</span>
        <div className="buyCountSub" onClick={this._buyCountSubOnClick}></div>
        <input className="buyCount" type="text" maxLength="2" onChange={this._buyCountOnChange} defaultValue={this.props.num}></input>
        <div className="buyCountAdd" onClick={this._buyCountAddOnClick}></div>
        <div id="shoppingCartAdd" onClick={this._shoppingCartAddOnClick}>
          <span>加入購物車</span>
        </div>
      </div>
    );
  },

  /*************************/
  /*   Html Event Handler  */
  /*************************/

  _buyCountSubOnClick: function (event) {
    var buyCount = event.target.nextSibling,
        currentNum = (isNaN(buyCount.value) || buyCount.value === "") ? 2 : buyCount.value;

    if (parseInt(currentNum) > 1) {
      var updateNum = parseInt(currentNum) - 1
      buyCount.value = updateNum;
      AppAction.productUpdate({
        num: updateNum,
        total: updateNum * this.props.price
      });
    }
  },

  _buyCountAddOnClick: function (event) {
    var buyCount = event.target.previousSibling,
        currentNum = (isNaN(buyCount.value) || buyCount.value === "") ? 0 : buyCount.value;

    var updateNum = parseInt(currentNum) + 1;
    buyCount.value = updateNum;
    AppAction.productUpdate({
      num: updateNum,
      total: updateNum * this.props.price
    });
  },

  _buyCountOnChange: function (event) {
    var buyCount = event.target,
        updateNum = isNaN(buyCount.value) ? 1 : buyCount.value;

    buyCount.value = updateNum;
    AppAction.productUpdate({
      num: parseInt(updateNum),
      total: parseInt(updateNum) * this.props.price
    });
  },

  _shoppingCartAddOnClick: function () {
    var currentNum = document.querySelector('#productNumber > .buyCount').value;
    if (currentNum === "") {
      alert("數量尚未填寫！");
    } else {
      AppAction.productItemAdd();
      AppAction.sendShoppingCartNotificationShowEvent();
    }
  }
});

module.exports = ProductNumberSelector;
