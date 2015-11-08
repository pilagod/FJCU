/**
 *  OrderDetail.react.js - All ProductItems of Order
 */

var React = require('react'),
    OrderItem = require('./OrderItem.react.js');

var OrderDetail = React.createClass({

  render: function () {
    var productItems = this.props.productItems,
        orderItems = [];

    for (var key in productItems) {
      orderItems.push(<OrderItem key={key} productItem={productItems[key]} />);
    }

    return (
      <section id="OrderDetail">
        <div className="table">
          {orderItems}
        </div>
      </section>
    )
  },
});

module.exports = OrderDetail;
