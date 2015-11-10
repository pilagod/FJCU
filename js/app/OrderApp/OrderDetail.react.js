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
    productItems: ReactPropTypes.object.isRequired
  },

  render: function () {
    var editClassName = classNames({'hidden': (this.props.orderConfirm === 1)});
    var totalNum = 0, total = 0, totalDiscount = 0, totalAfterDiscount = 0,
        productItems = this.props.productItems,
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
      totalNum += productItems[key].num;
      total += productItems[key].total;
      orderItems.push(<OrderItem key={key} orderConfirm={this.props.orderConfirm} productItem={productItems[key]} />);
    }

    totalDiscount = Math.floor(totalNum / 2) * (this.props.productInfo.discount * 2);
    totalAfterDiscount = total - totalDiscount;

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
