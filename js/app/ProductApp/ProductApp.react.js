/**
 *  InfoApp.react.js - ProductInfo + ProductDetail
 */

var React = require('react'),
    ProductInfo = require('./ProductInfo.react.js'),
    ProductDetail = require('./ProductDetail.react.js');

var ProductApp = React.createClass({

  componentDidMount: function () {
    console.log("ProductApp Mount");
  },

  componentWillUnmount: function () {
    console.log("ProductApp Unmount");
  },

  render: function () {
    return (
      <div id="ProductApp">
        <ProductInfo />
        <ProductDetail />
      </div>
    )
  }
});

module.exports = ProductApp;
