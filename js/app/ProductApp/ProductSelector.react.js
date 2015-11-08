/**
 *  ProductSelector.react.js - Select Product Property
 */

var React = require('react'),
    ReactPropTypes = React.PropTypes,
    AppStore = require('../../store/AppStore.js'),
    AppAction = require('../../action/AppAction.js'),
    ProductColorSelector = require('./ProductColorSelector.react.js'),
    ProductSizeSelector = require('./ProductSizeSelector.react.js'),
    ProductNumberSelector = require('./ProductNumberSelector.react.js');

function getProductInfo() {
  return {
    productInfo: AppStore.getProductInfo()
  }
}

var ProductSelect = React.createClass({

  propTypes: {
    productSelected: ReactPropTypes.object.isRequired
  },

  getInitialState: function () {
    return getProductInfo();
  },

  componentDidMount: function () {
    AppAction.productUpdate({
      productId: this.state.productInfo.productId,
      productName: this.state.productInfo.productName,
      price: this.state.productInfo.price
    });
  },

  render: function () {
    var productName = this.state.productInfo.productName;
        price = this.state.productInfo.price,
        num = this.props.productSelected.num || 1,
        colorSelected = this.props.productSelected.color ? true : false,
        sizeSelected = this.props.productSelected.size ? true : false;

    if (this.props.productSelected.colorName) {
      productName += "（" + this.props.productSelected.colorName;
      if (this.props.productSelected.size) {
        productName += "-" + this.props.productSelected.size;
      }
      productName += "）";
    }

    return (
      <div id="productSelect">
        <header>
          <h3>{productName}</h3>
          <div id="productPrice">
            <h1>{price}</h1>
          </div>
        </header>
        <ProductColorSelector colorSelected={colorSelected} colorTable={this.state.productInfo.colorTable} />
        <ProductSizeSelector sizeSelected={sizeSelected} sizeTable={this.state.productInfo.sizeTable} />
        <div id="discountInfo">
          <span>雙人組合折扣價$1,100!</span><br/>
          <span>偶數件數以此類推，確定金額會在購物車內顯示。</span>
        </div>
        <ProductNumberSelector num={num} price={price} />
      </div>
    )
  }
});

module.exports = ProductSelect;
