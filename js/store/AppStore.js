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

// Products Information
var _productId = 2,
    _orderInfo = {};  // orderId,

var _productInfo = {},
    _productItems = {},  // All Products in Orders
    _productItemInfo = {  // Product Item Properties (Fixed)
    },
    _productItemIdQueryTable = {

      /**
       *  Product 1
       */

      // Gray
      "1#9e9f99XS": 1,
      "1#9e9f99S": 2,
      "1#9e9f99M": 3,
      "1#9e9f99L": 4,
      "1#9e9f99XL": 5,

      // Blue
      "1#242733XS": 6,
      "1#242733S": 7,
      "1#242733M": 8,
      "1#242733L": 9,
      "1#242733XL": 10,

      // Red
      "1#6f0011XS": 11,
      "1#6f0011S": 12,
      "1#6f0011M": 13,
      "1#6f0011L": 14,
      "1#6f0011XL": 15,


      /**
       *  Product 2
       */

      // Yellow
      "2#EDCA00XS": 16,
      "2#EDCA00S": 17,
      "2#EDCA00M": 18,
      "2#EDCA00L": 19,
      "2#EDCA00XL": 20,

      // Navy
      "2#192750XS": 21,
      "2#192750S": 22,
      "2#192750M": 23,
      "2#192750L": 24,
      "2#192750XL": 25,

      // Wine
      "2#62262EXS": 26,
      "2#62262ES": 27,
      "2#62262EM": 28,
      "2#62262EL": 29,
      "2#62262EXL": 30,

      // Black
      "2#202228XS": 31,
      "2#202228S": 32,
      "2#202228M": 33,
      "2#202228L": 34,
      "2#202228XL": 35,

      // White
      "2#FAFAFAXS": 36,
      "2#FAFAFAS": 37,
      "2#FAFAFAM": 38,
      "2#FAFAFAL": 39,
      "2#FAFAFAXL": 40,

      // 2L
      "2#EDCA002L": 41,
      "2#1927502L": 42,
      "2#62262E2L": 43,
      "2#2022282L": 44,
      "2#FAFAFA2L": 45
    },
    _productSelected = {}; // {productId, productName, image, color, colorName, size, num, price, total} (productId, name are fixed)

var _searchBuyerInfo = {},
    _searchProductItems = {};

// Buyer Information
var _buyerInfo = {};

/**
 *  Product 1 color table
 */
/* red: rgb(111,0,17)  #6f0011 */
/* grey: rgb(158,159,153)  #9e9f99*/
/* navy: rgb(36,39,51)  #242733*/

/**
 *  Product 2 color table
 */
/* yellow: rgb(237, 202, 0) #EDCA00 http://imgur.com/8rEmlAc.png */
/* navy: rgb(25, 39, 80) #192750 http://imgur.com/zD8Dt2Z.png */
/* wine: rgb(98, 38, 46) #62262E http://imgur.com/3GqUBlw.png */
/* black: rgb(32, 34, 40) #202228 http://imgur.com/SlRGjZv.png */
/* white: rgb(250, 250, 250) #FAFAFA http://imgur.com/nGB1cyb.png */

/**
 *  Image Url
 */
/* Banner: http://imgur.com/ctfMw4O.png */
/* Page: {
 *   1: http://imgur.com/0FWT2h9.png
 *   2-1: http://imgur.com/OLLSZ76.png
 *   2-2: http://imgur.com/w3GtZ5a.png
 *   3: http://imgur.com/mGRTeyS.png
 *   4: http://imgur.com/3dyR6m6.png
 *   5: http://imgur.com/IC5OJML.png
 *   6: http://imgur.com/c2vtGHL.png
 * }
 */

_productInfo[1] = {
   productId: 1,
   productName: "創校90週年校慶園遊會紀念T",
   price: 580,
   discount: 30,
   totalAmount: 0,
   amountLimit: 20,
   amountTable: {},
   colorTable: {
     "#9e9f99": {color: "#9e9f99", colorName: "麻灰", image: "./img/GREY.png"},
     "#242733": {color: "#242733", colorName: "丈青", image: "./img/NAVY.png"},
     "#6f0011": {color: "#6f0011", colorName: "深紅", image: "./img/RED.png"}
   },
   sizeTable: {  // {size}
     "XS": {size: "XS"},
     "S": {size: "S"},
     "M": {size: "M"},
     "L": {size: "L"},
     "XL": {size: "XL"}
   }
};

_productInfo[2] = {
   productId: 2,
   productName: "輔仁大學經典帽踢",
   price: 780,
   discount: 30,
   totalAmount: 0,
   amountLimit: 20,
   amountTable: {},
   colorTable: {
     "#EDCA00": {color: "#EDCA00", colorName: "年度限量黃", image: "./img/new yellow.png"},
     "#192750": {color: "#192750", colorName: "復刻藍", image: "./img/new navy.png"},
     "#62262E": {color: "#62262E", colorName: "復刻紅", image: "./img/new wine.png"},
     "#202228": {color: "#202228", colorName: "復刻黑", image: "./img/new black.png"},
     "#FAFAFA": {color: "#FAFAFA", colorName: "復刻白", image: "./img/new white.png"},
   },
   sizeTable: {  // {size}
     "XS": {size: "XS"},
     "S": {size: "S"},
     "M": {size: "M"},
     "L": {size: "L"},
     "XL": {size: "XL"},
     "2L": {size: "2L"}
   }
};


/**************************/
/*   Operations - Ajax    */
/**************************/

function makeRequest(method, url, data) {
  return new Promise(function (resolve, reject) {
    var httpRequest;
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
      httpRequest = new XMLHttpRequest();
      if (httpRequest.overrideMimeType) {
        httpRequest.overrideMimeType('text/xml');
      }
    } else if (window.ActiveXObject) { // IE
      try {
        httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
      }
      catch (e) {
        console.log(e);
        try {
          httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e) {
          console.log(e);
        }
      }
    }

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      reject(false);
    }

    httpRequest.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(this.responseText);
        } else {
          resolve(JSON.stringify({
            status: this.status,
            success: false
          }));
        }
      }
    };
    httpRequest.open(method, url, true);
    if (method === 'POST') {
      httpRequest.setRequestHeader('Content-Type', 'application/json');
    }
    httpRequest.send(data);
  });
}


/**************************/
/*   Operations - Order   */
/**************************/

/**
 *  Send New Order to Server
 *  @param {object} orderInfo: order information
 *
 *  @return {object} Promise
 */
function orderSend(orderInfo) {
  return makeRequest('POST', "http://fju90t.sp.ubun.tw/api/Order/new", JSON.stringify(orderInfo));
  // return makeRequest('POST', "/api/Order/new", JSON.stringify(orderInfo));
}

/**
 *  Update Order Information
 *  @param {object} orderInfo: order information
 */
function orderInfoUpdate(orderInfo) {
  _orderInfo = assign({}, orderInfo);
}

/**
 *  Search Order by Order Id
 *  @param {string} id: order id
 */
function orderSearch(id) {
  // console.log("http://fju90t.sp.ubun.tw/api/Order/" + id);
  return makeRequest('GET', "http://fju90t.sp.ubun.tw/api/Order/" + id, null);
  // return makeRequest('GET', "/api/Order/" + id, null);
}

/**
 *  Get ProductItem ID by Product Information
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
      _productItems[id] = assign({}, productInfo, {
        id: id,
        productItemKey: productInfo.productId + productInfo.color + productInfo.size
      });
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
 *  @param {object} updates: properties updated
 */
function productSelectedUpdate(updates) {
  _productSelected = assign({}, _productSelected, updates);
}

/**************************/
/* Operations - BuyerInfo */
/**************************/

/**
 *  Update Buyer's Information
 *  @param {object} update: information updated
 */
function buyerInfoUpdate(updates) {
  _buyerInfo = assign({}, _buyerInfo, updates);
}

/**************************/
/*Operations - ProductInfo*/
/**************************/

/**
 *  Update ProductInfo
 *  @param {object} update: productInfo updated
 */
function productInfoUpdate(updates) {
  _productInfo[_productId] = assign({}, _productInfo[_productId], updates);
}

/**
 *  Update ProductInfo Amount Available
 *  @param {object} update: amountAvailable updated
 */
function productInfoAmountUpdate(productItemKey, updates) {
  _productInfo[_productId].amountTable[productItemKey] =
    assign({}, _productInfo[_productId].amountTable[productItemKey], updates);
}

/**************************/
/* Operations - ClearData */
/**************************/

/**
 *  Clear All Store Datra
 */
function clearAllStoreData() {
  _orderInfo = {};
  _productItems = {};
  _productSelected = {};
  _buyerInfo = {};
}

/**
 *  Clear ProductInfo Amount Table
 */
function clearProductInfoAmountTable() {
  _productInfo[_productId].amountTable = {};
}

/**
 *  Clear OrderSearchData
 */
function clearOrderSearchData () {
  _orderInfo = {};
  _searchBuyerInfo = {};
  _searchProductItems = {};
}

/*************************/
/*    AppStore Object    */
/*************************/

var AppStore = assign({}, EventEmitter.prototype, {

  /*************************/
  /*     Get Store Data    */
  /*************************/

  /**
   *  Get Order Information
   */
  getOrderInfo: function () {
    console.log(_orderInfo);
    return _orderInfo;
  },

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
   *  @return {object} Promise
   */
  getProductInfo: function () {
    var productId = this.getProductId();
    // console.log(productId);
    if (Object.keys(_productInfo[productId].amountTable).length === 0) {
      return makeRequest("GET", "http://fju90t.sp.ubun.tw/api/Product/" + productId, null).then(function (response) {
      // return makeRequest("GET", "/api/Product/" + productId, null).then(function (response) {
        var responseData = JSON.parse(response),
            items, amountAvailable;
        if (responseData.success) {
          items = responseData.data.Product.Item;
          for (var key in items) {
            var originalNum = 0;
            var item = _productItems[parseInt(key) + 1];
            if (item) {
              if (item.num && item.num > 0) {
                originalNum = item.num;
              }
            }
            amountAvailable = items[key].AmountMax - items[key].Amount;
            // amountAvailable = Math.floor(Math.random() * 20);
            _productInfo[productId].amountTable[Object.keys(_productItemIdQueryTable)[items[key].ID - 1]] = {
              id: items[key].ID,
              amountMax: items[key].AmountMax,
              // amountMax: 4,
              amountAvailable: amountAvailable - originalNum,
              originalAmountAvailable: amountAvailable,
              isSoldout: !(amountAvailable > 0)
            }
            // console.log(_productInfo[productId]);
            // console.log(amountAvailable, _productInfo[productId].amountTable[Object.keys(_productItemIdQueryTable)[items[key].ID - 1]]);
          }
          return _productInfo[productId];
        } else {
          alert(responseData.message);
          return {};
        }
      });
    } else {
      return new Promise.resolve(1).then(function () {
        return _productInfo[productId];
      });
    }
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

  /**
   *  Get SearchItems
   */
  getSearchProductItem: function () {
    return _searchProductItems;
  },

  /**
   *  Get SearchBuyerInfo
   */
  getSearchBuyerInfo: function () {
    return _searchBuyerInfo;
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

    case AppConstant.ORDER_SEND:
      orderSend(action.orderInfo).then(function (response) {
        console.log("response:", response);
        var responseData = JSON.parse(response);
        if (responseData.success) {
          var data = responseData.data;
          orderInfoUpdate({
            orderId: data.Order.Code,
            message: responseData.message,
            expiryDate: data.Order.ExpiryDate
          });
          AppStore.emitChange(AppConstant.ORDER_CONFIRM_EVENT);
        } else {
          orderInfoUpdatee({
            id: undefined,
            orderId: undefined,
            message: responseData.message || "訂單下訂失敗！",
          });
          AppStore.emitChange(AppConstant.ORDER_CONFIRM_FAIL_EVENT);
        }
      });
      break;

    case AppConstant.ORDER_SEARCH:
      orderSearch(action.id).then(function (response) {
        console.log("response:", response);
        var responseData = JSON.parse(response);
        if (responseData.success) {
          var data = responseData.data,
              searchProductItem;

          orderInfoUpdate({
            id: data.Order.ID,
            orderId: data.Order.Code,
            message: responseData.message,
            expiryDate: data.Order.ExpiryDate,
            isMail: data.Order.IsMail,
            isPaid: data.Order.IsPaid,
            isReceived: data.Order.IsReceived,
            isCancel: data.Order.IsCancel
          });

          _searchBuyerInfo = {
            name: data.Order.BuyerName,
            phone: data.Order.BuyerPhone,
            email: data.Order.BuyerEmail,
            bankCode: data.Order.BankCode,
            accountLast: data.Order.AccountLast,
            address: data.Order.Address
          };

          searchProductItem = assign({}, {
            productId: _productInfo[_productId].productId,
            productName: _productInfo[_productId].productName,
            price: _productInfo[_productId].price
          });

          data.Order.Item.map(function (item) {
            var productItemId = item.ProductItemID,
                productItemKey = Object.keys(_productItemIdQueryTable)[productItemId - 1],
                color = productItemKey.substring(productItemKey.indexOf('#'), productItemKey.indexOf('#') + 7),
                size = productItemKey.substring(productItemKey.indexOf('#') + 7);

            searchProductItem = assign({}, searchProductItem,
              _productInfo[_productId].colorTable[color],
              _productInfo[_productId].sizeTable[size],
              {
                  num: item.Amount,
                  total: item.Amount * _productInfo[_productId].price
              }
            );

            _searchProductItems[productItemId] = assign({}, searchProductItem, {
              id: productItemId,
              productItemKey: productItemKey
            });
          });

          AppStore.emitChange(AppConstant.ORDER_SEARCH_EVENT);

        } else {
          orderInfoUpdate({
            id: undefined,
            orderId: undefined,
            message: responseData.message || "訂單搜尋失敗！",
          });

          AppStore.emitChange(AppConstant.ORDER_SEARCH_FAIL_EVENT);
        }
      });
      break;

    /*************************/
    /*     Select Actions    */
    /*************************/

    case AppConstant.PRODUCT_UPDATE:
      productSelectedUpdate(action.productInfo);
      AppStore.emitChange(AppConstant.PRODUCT_CHANGE_EVENT);
      break;

    /*************************/
    /*  Notification Actions */
    /*************************/

    case AppConstant.SHOPPING_CART_NOTIFICATION_SHOW_EVENT:
      AppStore.emitChange(AppConstant.SHOPPING_CART_NOTIFICATION_SHOW_EVENT);
      break;

    /*************************/
    /*    BuyerInfo Actions  */
    /*************************/

    case AppConstant.BUYERINFO_UPDATE:
      buyerInfoUpdate(action.buyerInfo);
      AppStore.emitChange(AppConstant.BUYERINFO_CHANGE_EVENT);
      break;

    /*************************/
    /*   ProductInfo Action  */
    /*************************/

    case AppConstant.PRODUCTINFO_UPDATE:
      productInfoUpdate(action.productInfo);
      AppStore.emitChange(AppConstant.PRODUCTINFO_CHANGE_EVENT);
      break;

    case AppConstant.PRODUCTINFO_AMOUNT_UPDATE:
      productInfoAmountUpdate(action.productItemKey, action.amountInfo);
      AppStore.emitChange(AppConstant.PRODUCTINFO_CHANGE_EVENT);
      break;

    /*************************/
    /*   ProductInfo Action  */
    /*************************/

    case AppConstant.CLEAR_ALL:
      clearAllStoreData();
      AppStore.emitChange(AppConstant.CLEAR_ALL_EVENT);
      break;

    case AppConstant.CLEAR_PRODUCTINFO_AMOUNT_TABLE:
      clearProductInfoAmountTable();
      AppStore.emitChange(AppConstant.PRODUCTINFO_CHANGE_EVENT);
      break;

    case AppConstant.CLEAR_ORDER_SEARCH:
      clearOrderSearchData();
      break;

    default:
  }
});

module.exports = AppStore;
