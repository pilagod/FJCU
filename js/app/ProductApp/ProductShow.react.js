/**
 *  ProductShow.react.js - Show Product Image
 */

var React = require('react'),
    ReactPropTypes = React.PropTypes;

var ProductShow = React.createClass({

  propTypes: {
    productSelected: ReactPropTypes.object.isRequired
  },

  render: function () {
    if (Object.keys(this.props.productSelected).length > 0) {
      var imageSrc = this.props.productSelected.image,
          imageAlt = this.props.productSelected.productName + "(" + this.props.productSelected.colorName + ")" ;
      return (
        <div id="productShow">
          <img src={imageSrc} alt={imageAlt}></img>
        </div>
      )
    } else {
      return (
        <div id="productShow"></div>
      )
    }
  }
});

module.exports = ProductShow;
