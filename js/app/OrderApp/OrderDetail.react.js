/**
 *  OrderDetail.react.js - All ProductItems of Order
 */

var React = require('react'),
    ReactPropTypes = React.PropTypes,
    classNames = require('classnames'),
    OrderItem = require('./OrderItem.react.js');

var OrderDetail = React.createClass({

  propTypes: {
    orderConfirm: ReactPropTypes.number.isRequired,
    productInfo: ReactPropTypes.object.isRequired,
    productItems: ReactPropTypes.object.isRequired,
    orderType: ReactPropTypes.number.isRequired
  },

  render: function () {
    var productItemKey, amountAvailable, originalAmountAvailable,
        amountTable = this.props.productInfo.amountTable;
    var editClassName = classNames({'hidden': (this.props.orderConfirm === 1)});
    var totalNum = 0, total = 0, totalDiscount = 0, totalAfterDiscount = 0, totalShippingFee = 0,
        productItems = this.props.productItems,
        shippingFee = null,
        orderItems = [],
        orderHeader = (
          <div id="orderDetailHeader" className="table-row">
            <div className="table-cell"><span>商品圖片</span></div>
            <div className="table-cell"><span>商品名稱</span></div>
            <div className="table-cell"><span>顏色-尺寸</span></div>
            <div className="table-cell"><span>數量</span></div>
            <div className="table-cell"><span>總價</span></div>
            <div className={classNames("table-cell", editClassName)}><span>刪除</span></div>
          </div>
        ),
        orderFooter;

    for (var key in productItems) {
      productItemKey = productItems[key].productItemKey;
      amountAvailable = amountTable[productItemKey].amountAvailable;
      originalAmountAvailable = amountTable[productItemKey].originalAmountAvailable;

      totalNum += productItems[key].num;
      total += productItems[key].total;

      orderItems.push(
        <OrderItem
          key={key}
          orderConfirm={this.props.orderConfirm}
          productItem={productItems[key]}
          totalAmount={this.props.productInfo.totalAmount}
          amountAvailable={amountAvailable}
          originalAmountAvailable={originalAmountAvailable}/>
      );
    }


    if (this.props.orderType === 1) {
      if (totalNum === 1) {
        totalShippingFee = 100;
      } else if (totalNum <= 5) {
        totalShippingFee = 150;
      } else if (totalNum <= 10) {
        totalShippingFee = 200;
      } else {
        totalShippingFee = 250;
      }
      shippingFee = (
        <div>
          <span>郵費：</span>
          <div className="item-total">
            <span>NT$</span>
            <span>{totalShippingFee}</span>
          </div>
        </div>
      )
    }

    totalDiscount = Math.floor(totalNum / 2) * (this.props.productInfo.discount * 2);
    totalAfterDiscount = total - totalDiscount + totalShippingFee;

    orderFooter = (
      <div id="orderDetailFooter" className="flex flex-vertical-center">
        <div className="flex-align-right">
          <div id="orderDetailInfo">
            <div>
              <span>共 {totalNum} 件商品，金額：</span>
              <div className="item-total">
                <span>NT$</span>
                <span>{total}</span>
              </div>
            </div>
            <div>
              <span>折扣：</span>
              <div className="item-total">
                <span>NT$</span>
                <span>{totalDiscount}</span>
              </div>
            </div>
            {shippingFee}
          </div>
          <div id="orderDetailTotal">
            <div>
              <span>總計：</span>
              <div className="item-total">
                <span>NT$</span>
                <span>{totalAfterDiscount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <section id="orderDetail">
        <div className="table">
          {orderHeader}
          {orderItems}
        </div>
        {orderFooter}
      </section>
    )
  },
});

module.exports = OrderDetail;
