/**
 *  ProductSizeSelector.react.js - Select Product Size
 */

var React = require('react'),
    ReactPropTypes = React.PropTypes,
    AppAction = require('../../action/AppAction.js');

var ProductSizeSelector = React.createClass({

  propTypes: {
    sizeSelected: ReactPropTypes.bool.isRequired,
    sizeTable: ReactPropTypes.array.isRequired
  },

  getInitialState: function () {
    return {
      sizeSelectActive: 0
    }
  },

  componentDidMount: function () {
    if (!this.props.sizeSelected) {
      this._sizeSelectOnClick(this.props.sizeTable[this.state.sizeSelectActive], this.state.sizeSelectActive);
    }
  },

  render: function () {
    var sizeSelector = this.props.sizeTable.map(function (sizeObject, index) {
      return (
        <div key={index} className="sizeSelect" onClick={this._sizeSelectOnClick.bind(this, sizeObject, index)}>
          <span>{sizeObject.size}</span>
        </div>
      )
    }.bind(this));
    return (
      <div id="productSize">
        {sizeSelector}
      </div>
    );
  },

  /*************************/
  /*   Html Event Handler  */
  /*************************/

  _sizeSelectOnClick: function (productInfo, index) {
    var sizeSelects = document.querySelectorAll('.sizeSelect');
    sizeSelects[this.state.sizeSelectActive].className = "sizeSelect";
    sizeSelects[index].className += " focus";
    this.setState({sizeSelectActive: index});
    AppAction.productUpdate(productInfo);
  }
});

module.exports = ProductSizeSelector;
