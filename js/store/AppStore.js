/**
 *  AppStore
 */

/*************************/
/*    Variable Defined   */
/*************************/

// Library Required
var assign = require('object-assign'),
    Promise = require('bluebird'),
    EventEmitter = require('events').EventEmitter,
    AppDispatcher = require('../dispatcher/AppDispatcher.js'),
    AppConstant = require('../constant/AppConstant.js');

// All Products Information
var _productId = 1;

var _productInfo = {},
    _productItems = {},  // All Products in Orders
    _productItemInfo = {  // Product Item Properties (Fixed)

    },
    _productItemIdQueryTable = {
      "0#6f0011XS": 1,
      "0#6f0011S": 2,
      "0#6f0011M": 3,
      "0#6f0011L": 4,
      "0#6f0011XL": 5,
      "0#9e9f99XS": 6,
      "0#9e9f99S": 7,
      "0#9e9f99M": 8,
      "0#9e9f99L": 9,
      "0#9e9f99XL": 10,
      "0#242733XS": 11,
      "0#242733S": 12,
      "0#242733M": 13,
      "0#242733L": 14,
      "0#242733XL": 15
    };


// Select Product Infomation
var _productSelected = {}; // {productId, productName, image, color, colorName, size, num, price, total} (productId, name are fixed)

// Buyer Information
var _buyerInfo = {};

/* red: rgb(111,0,17)  #6f0011 */
/* grey: rgb(158,159,153)  #9e9f99*/
/* navy: rgb(36,39,51)  #242733*/

_productInfo[_productId] = {
   productId: 0,
   productName: "輔大90週年校慶紀念T",
   price: 580,
   discount: 30,
   colorTable: {
     "#6f0011": {color: "#6f0011", colorName: "紅色", image: "./img/RED.png"},
     "#9e9f99": {color: "#9e9f99", colorName: "灰色", image: "./img/GREY.png" },
     "#242733": {color: "#242733", colorName: "海軍藍", image: "./img/NAVY.png" }
   },
   sizeTable: {  // {size}
     "XS": {size: "XS"},
     "S": {size: "S"},
     "M": {size: "M"},
     "L": {size: "L"},
     "XL": {size: "XL"}
   }
};

/**************************/
/*   Operations - Order   */
/**************************/

/**
 *  Get Product Order ID by Product Information
 *  @param {object} productInfo: {
 *    productId: {number},
 *    color: {string},
 *    size: {string}
 *  }
 *
 *  @return {number}
 */
function getProductItemId(productInfo) {
  var queryIndex = productInfo.productId + productInfo.color + productInfo.size;
  return _productItemIdQueryTable[queryIndex];
}

/**
 *  Add ProductItem to Order
 *  @param {string} id: product id
 *  @param {object} productInfo: _productSeleted
 */
function productItemAdd (productInfo) {
  if (productInfo.color && productInfo.size && productInfo.num) {
    var id = getProductItemId({
      productId: productInfo.productId,
      color: productInfo.color,
      size: productInfo.size
    });
    if (!_productItems[id]) {
      _productItems[id] = assign({}, {id: id}, productInfo);
    } else {
      _productItems[id] = assign({}, _productItems[id], {
        num: _productItems[id].num + productInfo.num,
        total: _productItems[id].total + productInfo.num * _productInfo[_productId].price
      });
    }
  }
}

/**
 *  Delete ProductItem from Order
 *  @param {number} id: product item id
 */
function productItemDelete(id) {
  delete _productItems[id];
}

/**
 *  Update ProductItem in Order
 *  @param {number} id: product item id
 *  @param {object} updates: properties updated
 */
function productItemUpdate(id, updates) {
  _productItems[id] = assign({}, _productItems[id], updates);
}

/**************************/
/*   Operations - Select  */
/**************************/

/**
 *  Update Product Property Selected (color, size)
 *  @param {object} update: {color | size} json object with updated property
 */
function productUpdate(updates) {
  _productSelected = assign({}, (_productSelected ? _productSelected : {}), updates);
}

/*************************/
/*    AppStore Object    */
/*************************/

var AppStore = assign({}, EventEmitter.prototype, {

  // /**
  //  *  Get Product Information from Server
  //  *  @param {number} id: product id
  //  *
  //  *  @return {Promise}
  //  */
  // getProductItemInfo: function (id) {
  //   return new Promise(function (resolve, reject) {
  //     var httpRequest = new XMLHttpRequest();
  //     httpRequest.overrideMimeType('text/xml');
  //     httpRequest.onreadystatechange = function () {
  //       if (this.readyState === 4) {
  //         if (this.status === 200) {
  //           var productItems = JSON.parse(this.responseText);
  //           for (var i in productItems) {
  //             /**
  //              *  productItem: {
  //              *    id: {number},
  //              *    productId: {number},
  //              *    name: {string},
  //              *    image: {string},
  //              *    color: {string},
  //              *    size: {string},
  //              *    price: {number}
  //              *  }
  //              */
  //              var productItem = productItems[i],
  //                  queryIndex = productItem.productId + productItem.color + productItem.size;
  //
  //              _productItemInfo[productItem.id] = {
  //                productId: productItem.productId,
  //                name: productItem.name,
  //                image: productItem.image,
  //                color: productItem.color,
  //                size: productItem.size,
  //              }
  //              _productItemIdQueryTable[queryIndex] = productItem.id;
  //           }
  //           resolve(this.responseText);
  //         } else {
  //           reject('There was a problem with the request');
  //         }
  //       }
  //     };
  //     httpRequest.open('GET', 'url', true);
  //     httpRequest.send(null);
  //   });
  // },

  /*************************/
  /*     Get Store Data    */
  /*************************/

  /**
   *  Get Product Id
   *
   *  @return {number} _productId
   */
  getProductId: function () {
    return _productId;
  },

  /**
   *  Get Product Information
   *
   *  @return {object} _productInfo
   */
  getProductInfo: function () {
    return _productInfo[this.getProductId()];
  },

  /**
   *  Get All Products User Ordering
   *
   *  @return {object} _productItems
   */
  getOrderProductItem: function () {
    return _productItems;
  },

  /**
   *  Get All ProductItems Information
   *
   *  @return {object} _productItemInfo
   */
  getProductItemInfo: function () {
    return _productItemInfo;
  },

  /**
   *  Get Current Selected Product Information
   *
   *  @return {object} _productSelected
   */
  getProductSelected: function () {
    return _productSelected;
  },

  /**
   *  Get Buyer Information
   *
   *  @return {object} _buyerInfo
   */
  getBuyerInfo: function () {
    return _buyerInfo;
  },

  /*************************/
  /* ChangeEvent Interface */
  /*************************/

  /**
   *  Emit Change Event
   *  @param {string} event: change view event defined by app
   */
  emitChange: function (event) {
    this.emit(event);
  },

  /**
   *  Add Listener to Change Event
   *  @param {string} event: change event defined by app
   *  @param {function} callback: function fired when change event occurs
   */
  addChangeListener: function (event, callback) {
    this.on(event, callback);
  },

  /**
   *  Remove Listener to Change Event
   *  @param {string} event: change event defined by app
   *  @param {function} callback: function which already binded to change event
   */
  removeChangeListener: function (event, callback) {
    this.removeListener(event, callback);
  },
});


/*************************/
/*  Register Dispatcher  */
/*************************/

AppDispatcher.register(function (action) {

  switch (action.actionType) {

    /*************************/
    /*     Order Actions     */
    /*************************/

    case AppConstant.PRODUCT_ITEM_ADD:
      productItemAdd(AppStore.getProductSelected());
      AppStore.emitChange(AppConstant.ORDER_CHANGE_EVENT);
      break;

    case AppConstant.PRODUCT_ITEM_DELETE:
      productItemDelete(action.id);
      AppStore.emitChange(AppConstant.ORDER_CHANGE_EVENT);
      break;

    case AppConstant.PRODUCT_ITEM_UPDATE:
      productItemUpdate(action.id, action.productInfo);
      AppStore.emitChange(AppConstant.ORDER_CHANGE_EVENT);
      break;

    /*************************/
    /*     Select Actions    */
    /*************************/

    case AppConstant.PRODUCT_UPDATE:
      productUpdate(action.productInfo);
      AppStore.emitChange(AppConstant.PRODUCT_CHANGE_EVENT);
      break;

    /*************************/
    /*  Notification Actions */
    /*************************/

    case AppConstant.SHOPPING_CART_NOTIFICATION_SHOW_EVENT:
      AppStore.emitChange(AppConstant.SHOPPING_CART_NOTIFICATION_SHOW_EVENT);
      break;


    default:
  }
});

module.exports = AppStore;
