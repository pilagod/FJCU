/**
 *  ProductSizeSelector.react.js - Select Product Size
 */

var React = require('react'),
    ReactPropTypes = React.PropTypes,
    classNames = require('classnames'),
    AppAction = require('../../action/AppAction.js');

var ProductSizeSelector = React.createClass({

  propTypes: {
    productId: ReactPropTypes.number.isRequired,
    amountTable: ReactPropTypes.object.isRequired,
    colorSelected: ReactPropTypes.object.isRequired,
    sizeSelected: ReactPropTypes.object.isRequired,
    sizeTable: ReactPropTypes.object.isRequired
  },

  componentDidMount: function () {
    AppAction.productUpdate(this.props.sizeSelected);
  },

  render: function () {
    var productItemKey,
        productItemKeyPrefix = this.props.productId + this.props.colorSelected.color;
    var sizeSelector = [],
        sizeSelectClassNames = [],
        className, sizeSelectOnClick, amountAvailable, isSoldout;

    for (var key in this.props.sizeTable) {
      productItemKey = productItemKeyPrefix + this.props.sizeTable[key].size;
      amountAvailable = this.props.amountTable[productItemKey].amountAvailable;
      isSoldout = this.props.amountTable[productItemKey].soldout;

      className = classNames("sizeSelect", {
        "focus": this.props.sizeTable[key].size === this.props.sizeSelected.size,
        "soldout": isSoldout
      });

      sizeSelectOnClick = isSoldout ? null : this._sizeSelectOnClick.bind(this, this.props.sizeTable[key]);

      sizeSelector.push((
        <div key={key} className={className} onClick={sizeSelectOnClick}>
          <span>{this.props.sizeTable[key].size}</span>
        </div>
      ));
    }

    return (
      <div id="productSize">
        {sizeSelector}
      </div>
    );
  },

  /*************************/
  /*   Html Event Handler  */
  /*************************/

  _sizeSelectOnClick: function (productInfo) {
    AppAction.productUpdate(productInfo);
  }
});

module.exports = ProductSizeSelector;
