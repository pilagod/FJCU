/**
*  OrderItem.react.js - Item in Order
*/

var React = require('react'),
    ReactPropTypes = React.PropTypes,
    classNames = require('classnames'),
    AppAction = require('../../action/AppAction.js');

var OrderItem = React.createClass({

  propTypes: {
    productItemKey: ReactPropTypes.string.isRequired,
    orderConfirm: ReactPropTypes.number.isRequired,
    productItem: ReactPropTypes.object.isRequired,
    totalAmount: ReactPropTypes.number.isRequired,
    amountAvailable: ReactPropTypes.number.isRequired,
    originalAmountAvailable: ReactPropTypes.number.isRequired
  },

  render: function () {
    console.log(this.props.amountAvailable, this.props.totalAmount, this.props.productItem.num );
    var productItem = this.props.productItem;
    var productItemNumberCheck = (this.props.amountAvailable < 0);
    var warningClassName = classNames({
          'warning': productItemNumberCheck
        }),
        editClassName = classNames({
          'hidden': (this.props.orderConfirm === 1)
        }),
        infoClassName = classNames({
          'hidden': (this.props.orderConfirm !== 1)
        });

    return (
      <div className={classNames('table-row', warningClassName)}>
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
          <div className={classNames('flex', 'flex-horizontal-center', editClassName)}>
            <div className="buyCountSub" onClick={this._buyCountSubOnClick.bind(this, productItem.id)}></div>
            <input className="buyCount" type="text" maxLength="2" onChange={this._buyCountOnChange.bind(this, productItem.id)} defaultValue={productItem.num}></input>
            <div className="buyCountAdd" onClick={this._buyCountAddOnClick.bind(this, productItem.id)}></div>
          </div>
          <span className={infoClassName}>{productItem.num}</span>
        </div>
        <div className="table-cell">
          <span>{"NT$ " + productItem.total}</span>
        </div>
        <div className={classNames('table-cell', editClassName)}>
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
      AppAction.productInfoUpdate({totalAmount: this.props.totalAmount - 1});
      AppAction.productInfoAmountUpdate(this.props.productItemKey, {
        amountAvailable: this.props.amountAvailable + 1,
        isSoldout: (this.props.amountAvailable + 1 <= 0)
      });
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

    if (this.props.totalAmount + 1 > 20) {
      alert("每筆訂單最多20件！");
    } else {
      buyCount.value = updateNum;
      AppAction.productInfoUpdate({totalAmount: this.props.totalAmount + 1});
      AppAction.productInfoAmountUpdate(this.props.productItemKey, {
        amountAvailable: this.props.amountAvailable - 1,
        isSoldout: (this.props.amountAvailable - 1 <= 0)
      });
      AppAction.productItemUpdate(id, {
        num: updateNum,
        total: updateNum * this.props.productItem.price
      });
    }
  },

  _buyCountOnChange: function (id, event) {
    console.log(this.props.productItem.num);
    var buyCount = event.target,
        updateNum = isNaN(buyCount.value) ? 1 : buyCount.value,
        updateTotalNum = ((updateNum === "") ? 0 : parseInt(updateNum));
    if (this.props.totalAmount + (updateTotalNum - this.props.productItem.num) > 20) {
      alert("每筆訂單最多20件！");
      buyCount.value = this.props.productItem.num;
    } else {
      buyCount.value = updateNum;
      AppAction.productInfoUpdate({totalAmount: this.props.totalAmount + (updateTotalNum - this.props.productItem.num)});
      AppAction.productInfoAmountUpdate(this.props.productItemKey, {
        amountAvailable: this.props.amountAvailable + this.props.productItem.num - updateTotalNum,
        isSoldout: (this.props.amountAvailable + this.props.productItem.num - updateTotalNum <= 0)
      });
      AppAction.productItemUpdate(id, {
        num: parseInt(updateTotalNum),
        total: parseInt(updateTotalNum) * this.props.productItem.price
      });
    }
  },

  _deleteOnClick: function (id) {
    if (confirm("確定要刪除此產品？")) {
      AppAction.productItemDelete(id);
      AppAction.productInfoUpdate({totalAmount: this.props.totalAmount - this.props.productItem.num});
      AppAction.productInfoAmountUpdate(this.props.productItemKey, {
        amountAvailable: this.props.originalAmountAvailable,
        isSoldout: false
      })
    }
  }
});

module.exports = OrderItem;
