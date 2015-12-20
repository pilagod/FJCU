/**
 *  app.js - Main
 */

var React = require('react'),
    ReactDOM = require('react-dom'),
    Navbar = require('./component/Navbar.react.js'),
    ProductApp = require('./app/ProductApp/ProductApp.react.js'),
    OrderApp = require('./app/OrderApp/OrderApp.react.js'),
    SearchApp = require('./app/SearchApp/SearchApp.react.js');

var main = document.querySelector('#main > .container');

var app = {
  "ProductApp": ProductApp,
  "OrderApp": OrderApp,
  "SearchApp": SearchApp
};

var currentTime = new Date();
var onlineTime = new Date("December 21, 2015 11:59:59");

if (currentTime < onlineTime) {
  alert("現在網站還在測試階段，所有下訂訂單皆視為無效。");
}

ReactDOM.render(
  React.createElement(Navbar),
  document.getElementById('navbar')
);

history.pushState({app: "ProductApp"}, "ProductApp", "");

window.onpopstate = function (event) {
  // console.log("onpopstate", history.state);
  ReactDOM.unmountComponentAtNode(main);
  ReactDOM.render(
    React.createElement(app[history.state.app]),
    main
  );
  /* For Chrome, Safari, Opera */
  document.body.scrollTop = 0;
  /* For Firefox, IE */
  document.documentElement.scrollTop = 0;
};

if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Edge') === -1 || navigator.userAgent.indexOf('Firefox') > -1) {
  window.onpopstate();
}
