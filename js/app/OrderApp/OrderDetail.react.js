/**
 *  OrderDetail.react.js - All ProductItems of Order
 */

var React = require('react'),
    AppStore = require('../../store/AppStore.js'),
    AppConstant = require('../../constant/AppConstant.js'),
    OrderItem = require('./OrderItem.react.js');

function getOrderState() {
  return {
    productItems: AppStore.getOrderProductItem()
  }
}

var OrderDetail = React.createClass({

  getInitialState: function () {
    return getOrderState();
  },

  componentDidMount: function () {
    AppStore.addChangeListener(AppConstant.ORDER_CHANGE_EVENT, this._onOrderChange);
  },

  componentWillUnmount: function () {
    AppStore.removeChangeListener(AppConstant.ORDER_CHANGE_EVENT, this._onOrderChange);
  },

  render: function () {
    var productItems = this.state.productItems,
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

  _onOrderChange: function () {
    console.log(getOrderState());
    this.setState(getOrderState());
  }
});

module.exports = OrderDetail;
