/**
 *  ProductColorSelector.react.js - Select Product Color
 */

var React = require('react'),
    ReactPropTypes = React.PropTypes,
    AppAction = require('../../action/AppAction.js');

var ProductColorSelector = React.createClass({

  propTypes: {
    colorSelected: ReactPropTypes.bool.isRequired,
    colorTable: ReactPropTypes.array.isRequired
  },

  getInitialState: function () {
    return {
      colorSelectActive: 0
    }
  },

  componentDidMount: function () {
    if (!this.props.colorSelected) {
      this._colorSelectOnClick(this.props.colorTable[this.state.colorSelectActive], this.state.colorSelectActive);
    }
  },

  render: function () {
    var colorSelector = this.props.colorTable.map(function (colorObject, index) {
      var style = { backgroundColor: colorObject.color };
      return (
        <div key={index} className="colorSelect" onClick={this._colorSelectOnClick.bind(this, colorObject, index)}>
          <div style={style}></div>
        </div>
      )
    }.bind(this));

    return (
      <div id="productColor">
        {colorSelector}
      </div>
    )
  },

  /*************************/
  /*   Html Event Handler  */
  /*************************/

  _colorSelectOnClick: function (productInfo, index) {
    var colorSelects = document.querySelectorAll('.colorSelect');
    colorSelects[this.state.colorSelectActive].className = "colorSelect";
    colorSelects[index].className += " focus";
    this.setState({colorSelectActive: index});
    AppAction.productUpdate(productInfo);
  }
});

module.exports = ProductColorSelector;
