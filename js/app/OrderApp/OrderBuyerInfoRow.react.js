var React = require('react'),
    ReactPropTypes = React.PropTypes,
    assign = require('object-assign'),
    classNames = require('classnames'),
    AppAction = require('../../action/AppAction.js');

var OrderBuyerInfoRow = React.createClass({
  propTypes: {
    infoName: ReactPropTypes.string.isRequired,
    infoDisplayName: ReactPropTypes.string.isRequired,
    infoValue: ReactPropTypes.string,
    infoStyle: ReactPropTypes.object,
    orderConfirm: ReactPropTypes.number.isRequired,
    regexp: ReactPropTypes.object.isRequired
  },
  render: function () {
    var editClassName = classNames({'hidden': (this.props.orderConfirm === 1)}),
        infoClassName = classNames({'hidden': (this.props.orderConfirm !== 1)});
    var passClassName = classNames('fa', 'fa-check-circle', 'fa-lg', {'pass': this.props.infoValue}, editClassName);

    return (
      <div>
        <h3>{this.props.infoDisplayName}：</h3>
        <input type="text" style={this.props.infoStyle} className={editClassName} onChange={this._inputTextOnChange} defaultValue={this.props.infoValue}></input>
        <i className={passClassName}></i>
        <span className={infoClassName}>
          <h3>{this.props.infoValue}</h3>
        </span>
      </div>
    )
  },

  _inputTextOnChange: function (event) {
    var update = {};
    if (this.props.regexp.test(event.target.value)) {
      update[this.props.infoName] = event.target.value;
      AppAction.buyerInfoUpdate(update);
    } else {
      update[this.props.infoName] = null;
      AppAction.buyerInfoUpdate(update);
    }
  }
});

module.exports = OrderBuyerInfoRow;
