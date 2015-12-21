/**
 *  ProductSelector.react.js - Select Product Property
 */

var React = require('react'),
    ReactPropTypes = React.PropTypes,
    AppAction = require('../../action/AppAction.js'),
    ProductColorSelector = require('./ProductColorSelector.react.js'),
    ProductSizeSelector = require('./ProductSizeSelector.react.js'),
    ProductNumberSelector = require('./ProductNumberSelector.react.js');

var ProductSelector = React.createClass({

  propTypes: {
    productInfo: ReactPropTypes.object.isRequired,
    productSelected: ReactPropTypes.object.isRequired
  },

  render: function () {
    var productItemKey = "";
        productId = this.props.productInfo.productId,
        productName = this.props.productInfo.productName;

    var colorTable = this.props.productInfo.colorTable,
        colorSelected = this.props.productSelected.color ?
                          colorTable[this.props.productSelected.color] :
                          colorTable[Object.keys(colorTable)[0]];

    var sizeTable = this.props.productInfo.sizeTable,
        sizeSelected = this.props.productSelected.size ?
                          sizeTable[this.props.productSelected.size] : {size: undefined};

    var amountTable = this.props.productInfo.amountTable,
        amountAvailable = -1;

    if (sizeSelected.size) {
      productItemKey = productId + colorSelected.color + sizeSelected.size;
      amountAvailable = amountTable[productItemKey].amountAvailable;
    }

    if (this.props.productSelected.color) {
      productName += "(" + this.props.productSelected.colorName;
      // if (this.props.productSelected.size) {
      //   productName += "-" + this.props.productSelected.size;
      // }
      productName += ")";
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
          <span>2件合購價$1,500，確定金額會在結帳頁面顯示。</span>
        </div>
        <ProductNumberSelector
          productItemKey={productItemKey}
          num={this.props.productSelected.num}
          price={this.props.productInfo.price}
          sizeSelected={sizeSelected}
          colorSelected={colorSelected}
          totalAmount={this.props.productInfo.totalAmount}
          amountAvailable={amountAvailable}/>
      </div>
    )
  }
});

module.exports = ProductSelector;
