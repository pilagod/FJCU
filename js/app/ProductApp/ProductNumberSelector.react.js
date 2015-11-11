/**
 *  ProductNumberSelector.react.js - Select Product Number
 */

var React = require('react'),
    ReactPropTypes = React.PropTypes,
    classNames = require('classnames'),
    AppAction = require('../../action/AppAction.js');

var ProductNumberSelector = React.createClass({

  propTypes: {
    num: ReactPropTypes.number,
    price: ReactPropTypes.number.isRequired,
    colorSelected: ReactPropTypes.object.isRequired,
    sizeSelected: ReactPropTypes.object.isRequired,
    amountAvailable: ReactPropTypes.number.isRequired
  },

  componentDidMount: function () {
    AppAction.productUpdate({
      num: this.props.num,
      total: this.props.num * this.props.price
    });
  },

  render: function () {
    var shoppingNumberCheck = (this.props.amountAvailable >= 0 && this.props.num > this.props.amountAvailable);
        shoppingCartAddActive = (this.props.colorSelected.color && this.props.sizeSelected.size && this.props.num > 0);
    var shoppingCartAddClassName = classNames({
          'active': shoppingCartAddActive && !shoppingNumberCheck
        });
    var shoppingCartAddMessageClassName = classNames({
          'active': shoppingNumberCheck
        });
    var shoppingCartAddOnClick = (shoppingCartAddActive && !shoppingNumberCheck) ? this._shoppingCartAddOnClick : null;

    return (
      <div id="productNumber">
        <span>數量：</span>
        <div className="buyCountSub" onClick={this._buyCountSubOnClick}></div>
        <input className="buyCount" type="text" maxLength="2" onChange={this._buyCountOnChange} defaultValue={this.props.num}></input>
        <div className="buyCountAdd" onClick={this._buyCountAddOnClick}></div>
        <div id="shoppingCartAdd" className={shoppingCartAddClassName} onClick={shoppingCartAddOnClick}>
          <span>加入購物車</span>
        </div>
        <div id="shoppingCartAddMessage" className={shoppingCartAddMessageClassName}>
          <span>超過訂購上限</span>
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
    console.log("update num", updateNum);
    AppAction.productUpdate({
      num: parseInt(updateNum),
      total: parseInt(updateNum) * this.props.price
    });
  },

  _shoppingCartAddOnClick: function () {
    AppAction.productItemAdd();
    AppAction.productUpdate({size: undefined});
    AppAction.sendShoppingCartNotificationShowEvent();
  }
});

module.exports = ProductNumberSelector;
