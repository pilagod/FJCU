/**
 *  ProductSelector.react.js - Select Product Property
 */

var React = require('react'),
    ReactPropTypes = React.PropTypes,
    AppAction = require('../../action/AppAction.js'),
    ProductColorSelector = require('./ProductColorSelector.react.js'),
    ProductSizeSelector = require('./ProductSizeSelector.react.js'),
    ProductNumberSelector = require('./ProductNumberSelector.react.js');

var ProductSelect = React.createClass({

  propTypes: {
    productInfo: ReactPropTypes.object.isRequired,
    productSelected: ReactPropTypes.object.isRequired
  },

  render: function () {
    var productId = this.props.productInfo.productId,
        productName = this.props.productInfo.productName;

    var colorTable = this.props.productInfo.colorTable,
        colorSelected = this.props.productSelected.color ?
                          colorTable[this.props.productSelected.color] :
                          colorTable[Object.keys(colorTable)[0]];

    var sizeTable = this.props.productInfo.sizeTable,
        sizeSelected = this.props.productSelected.size ?
                          sizeTable[this.props.productSelected.size] : {size: undefined};

    var amountTable = this.props.productInfo.amountTable,
        amountMax = this.props.productInfo.amountMax,
        amountAvailable = -1;

    if (sizeSelected.size) {
      amountAvailable = amountTable[productId + colorSelected.color + sizeSelected.size].amountAvailable;
    }


    if (this.props.productSelected.color) {
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
            <h1>{this.props.productInfo.price}</h1>
          </div>
        </header>
        <ProductColorSelector
          colorSelected={colorSelected}
          colorTable={colorTable} />
        <ProductSizeSelector
          productId={productId}
          amountTable={amountTable}
          colorSelected={colorSelected}
          sizeSelected={sizeSelected}
          sizeTable={sizeTable} />
        <div id="discountInfo">
          <span>雙人組合折扣價$1,100!</span><br/>
          <span>偶數件數以此類推，確定金額會在購物車內顯示。</span>
        </div>
        <ProductNumberSelector
          num={this.props.productSelected.num}
          price={this.props.productInfo.price}
          sizeSelected={sizeSelected}
          colorSelected={colorSelected}
          amountAvailable={amountAvailable < amountMax ? amountAvailable : amountMax}/>
      </div>
    )
  }
});

module.exports = ProductSelect;
