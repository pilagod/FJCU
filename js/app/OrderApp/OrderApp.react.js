/**
 *  OrderApp - OrderDetial + OrderBuyerInfo
 */

var React = require('react'),
    AppStore = require('../../store/AppStore.js'),
    OrderDetail = require('./OrderDetail.react.js');

var OrderApp = React.createClass({
  render: function () {
    return (
      <div id="OrderApp">
        <OrderDetail />
      </div>
    )
  }
});

module.exports = OrderApp;
