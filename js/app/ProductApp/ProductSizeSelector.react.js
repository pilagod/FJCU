/**
 *  ProductSizeSelector.react.js - Select Product Size
 */

var React = require('react'),
    ReactPropTypes = React.PropTypes,
    classNames = require('classnames'),
    AppAction = require('../../action/AppAction.js');

var ProductSizeSelector = React.createClass({

  propTypes: {
    sizeSelected: ReactPropTypes.object.isRequired,
    sizeTable: ReactPropTypes.object.isRequired
  },

  componentDidMount: function () {
    AppAction.productUpdate(this.props.izeSelected);
  },

  render: function () {
    var sizeSelector = [];

    for (var key in this.props.sizeTable) {
      var className = classNames("sizeSelect", {
        "focus": this.props.sizeTable[key].size === this.props.sizeSelected.size
      });
      sizeSelector.push((
        <div key={key} className={className} onClick={this._sizeSelectOnClick.bind(this, this.props.sizeTable[key])}>
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
