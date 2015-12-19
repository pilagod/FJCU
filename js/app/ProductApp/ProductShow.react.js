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
      var imageSrc, imageAlt;
      if (this.props.productSelected.colorName) {
        imageSrc = this.props.productSelected.image;
        imageAlt = this.props.productSelected.productName + "(" + this.props.productSelected.colorName + ")" ;
      }
      // <img src={imageSrc} alt={imageAlt}></img>
      return (
        <div id="productShow">
          <img src={imageSrc} alt={imageAlt} />
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
