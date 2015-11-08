/**
 *  ProductInfo.react.js - ProductShow + ProductSelector
 */

var React = require('react'),
    ReactPropTypes = React.PropTypes,
    ProductShow = require('./ProductShow.react.js'),
    ProductSelector = require('./ProductSelector.react.js');

var ProductInfo = React.createClass({

  propTypes: {
    productInfo: ReactPropTypes.object.isRequired,
    productSelected: ReactPropTypes.object.isRequired
  },

  render: function () {
    return (
      <section id="productInfo">
        <ProductShow productSelected={this.props.productSelected} />
        <ProductSelector productSelected={this.props.productSelected} productInfo={this.props.productInfo}/>
      </section>
    )
  },
});

module.exports = ProductInfo;
