/**
*  OrderItem.react.js - Item in Order
*/

var React = require('react'),
    ReactPropTypes = React.PropTypes,
    AppAction = require('../../action/AppAction.js');

var OrderItem = React.createClass({

  propTypes: {
    productItem: ReactPropTypes.object.isRequired
  },

  render: function () {
    var productItem = this.props.productItem;
    return (
      <div className="table-row">
        <div className="table-cell">
          <img src={productItem.image} alt={productItem.productName}></img>
        </div>
        <div className="table-cell">
          <span>{productItem.productName}</span>
        </div>
        <div className="table-cell">
          <span>{productItem.colorName + "-" + productItem.size}</span>
        </div>
        <div className="table-cell">
          <div className="flex flex-horizontal-center">
            <div className="buyCountSub" onClick={this._buyCountSubOnClick.bind(this, productItem.id)}></div>
            <input className="buyCount" type="text" maxLength="2" onChange={this._buyCountOnChange.bind(this, productItem.id)} defaultValue={productItem.num}></input>
            <div className="buyCountAdd" onClick={this._buyCountAddOnClick.bind(this, productItem.id)}></div>
          </div>
        </div>
        <div className="table-cell">
          <span>{"NT$" + productItem.total}</span>
        </div>
        <div className="table-cell">
          <i className="fa fa-trash-o" onClick={this._deleteOnClick.bind(this, productItem.id)}></i>
        </div>
      </div>
    )
  },

  /*************************/
  /*   Html Event Handler  */
  /*************************/

  _buyCountSubOnClick: function (id, event) {
    var buyCount = event.target.nextSibling,
        currentNum = (isNaN(buyCount.value) || buyCount.value === "") ? 2 : buyCount.value;

    if (parseInt(currentNum) > 1) {
      var updateNum = parseInt(currentNum) - 1;
      buyCount.value = updateNum;
      AppAction.productItemUpdate(id, {
        num: updateNum,
        total: updateNum * this.props.productItem.price
      });
    }
  },

  _buyCountAddOnClick: function (id, event) {
    var buyCount = event.target.previousSibling,
        currentNum = (isNaN(buyCount.value) || buyCount.value === "") ? 0 : buyCount.value;

    var updateNum = parseInt(currentNum) + 1;
    buyCount.value = updateNum;
    AppAction.productItemUpdate(id, {
      num: updateNum,
      total: updateNum * this.props.productItem.price
    });
  },

  _buyCountOnChange: function (id, event) {
    var buyCount = event.target,
        updateNum = isNaN(buyCount.value) ? 1 : buyCount.value;

    buyCount.value = updateNum;
    AppAction.productItemUpdate(id, {
      num: parseInt(updateNum),
      total: parseInt(updateNum) * this.props.productItem.price
    });
  },

  _deleteOnClick: function (id) {
    AppAction.productItemDelete(id);
  }
});

module.exports = OrderItem;
