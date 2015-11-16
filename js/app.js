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

//
// ReactDOM.render(
//   React.createElement(SideBar),
//   document.getElementById('sidebar')
// );

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
  ).forceUpdate();
};

if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Edge') === -1 || navigator.userAgent.indexOf('Firefox') > -1) {
  window.onpopstate();
}
