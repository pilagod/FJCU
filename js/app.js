/**
 *  app.js - Main
 */

var React = require('react'),
    ReactDOM = require('react-dom'),
    NavbarFunctionBlock = require('./component/NavbarFunctionBlock.react.js'),
    ProductApp = require('./app/ProductApp/ProductApp.react.js'),
    OrderApp = require('./app/OrderApp/OrderApp.react.js');

var main = document.querySelector('#main > .container-960');

var app = {
  "ProductApp": ProductApp,
  "OrderApp": OrderApp
}

ReactDOM.render(
  React.createElement(NavbarFunctionBlock),
  document.getElementById('navbarFunctionBlock')
);

history.pushState({app: "ProductApp"}, "ProductApp", "");

window.onpopstate = function (event) {
  console.log("onpopstate", history.state);
  ReactDOM.unmountComponentAtNode(main);
  ReactDOM.render(
    React.createElement(app[history.state.app]),
    main
  ).forceUpdate();
};

if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Edge') === -1 || navigator.userAgent.indexOf('Firefox') > -1) {
  window.onpopstate();
}
