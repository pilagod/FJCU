/**
 *  ProductColorSelector.react.js - Select Product Color
 */

var React = require('react'),
    ReactPropTypes = React.PropTypes,
    classNames = require('classnames'),
    AppAction = require('../../action/AppAction.js');

var ProductColorSelector = React.createClass({

  propTypes: {
    colorSelected: ReactPropTypes.object.isRequired,
    colorTable: ReactPropTypes.object.isRequired
  },

  componentDidMount: function () {
    AppAction.productUpdate(this.props.colorSelected);
  },

  render: function () {
    var colorSelector = [];

    for (var key in this.props.colorTable) {
      var style = { backgroundColor: this.props.colorTable[key].color },
          className = classNames("colorSelect", {
            "focus": this.props.colorTable[key].color === this.props.colorSelected.color
          });
      colorSelector.push((
        <div key={key} className={className} onClick={this._colorSelectOnClick.bind(this, this.props.colorTable[key])}>
          <div style={style}></div>
        </div>
      ));
    }

    return (
      <div id="productColor">
        {colorSelector}
      </div>
    )
  },

  /*************************/
  /*   Html Event Handler  */
  /*************************/

  _colorSelectOnClick: function (productInfo) {
    AppAction.productUpdate(productInfo);
  }
});

module.exports = ProductColorSelector;
