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
var _productId = 1,
    _orderId = undefined;

var _productInfo = {},
    _productItems = {},  // All Products in Orders
    _productItemInfo = {  // Product Item Properties (Fixed)

    },
    _productItemIdQueryTable = {

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
      "1#6f0011XL": 15
    },
    _productSelected = {}; // {productId, productName, image, color, colorName, size, num, price, total} (productId, name are fixed)

// Buyer Information
var _buyerInfo = {
  name: "葉承儒",
  phone: "1234567890",
  email: "asdasd@asd.com"
};

/* red: rgb(111,0,17)  #6f0011 */
/* grey: rgb(158,159,153)  #9e9f99*/
/* navy: rgb(36,39,51)  #242733*/

_productInfo[_productId] = {
   productId: _productId,
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
          reject(false);
        }
      }
    };
    httpRequest.open(method, url, true);
    httpRequest.send(data);
  });
}


/**************************/
/*   Operations - Order   */
/**************************/

/**
 *  Get Order ID by sending ProductItems User Bought
 */
function getOrderId() {
  // Ajax to Server
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
 *  @param {object} updates: properties updated
 */
function productUpdate(updates) {
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
  _orderId = undefined;
  _productItems = {};
  _productSelected = {};
  _buyerInfo = {};
}

/*************************/
/*    AppStore Object    */
/*************************/

var AppStore = assign({}, EventEmitter.prototype, {

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
   *  @return {object} Promise
   */
  getProductInfo: function () {
    var productId = this.getProductId();
    if (Object.keys(_productInfo[productId].amountTable).length === 0) {
      return makeRequest("GET", "http://fju90t.sp.ubun.tw/api/Product/" + productId, null).then(function (response) {
        var responseData = JSON.parse(response),
            items, amountAvailable;
        if (responseData.success) {
          items = responseData.data.Order.Item;
          for (var key in items) {
            var originalNum = 0;
            if (_productItems[Object.keys(_productItemIdQueryTable)[items[key].ID - 1]]) {
              if (_productItems[Object.keys(_productItemIdQueryTable)[items[key].ID - 1]].num &&
                  _productItems[Object.keys(_productItemIdQueryTable)[items[key].ID - 1]].num > 0){
                originalNum = _productItems[Object.keys(_productItemIdQueryTable)[items[key].ID - 1]].num
              }
            }
            // amountAvailable = items[key].AmountMax - items[key].Amount - originalNum;
            amountAvailable = Math.floor(Math.random() * 20);
            _productInfo[productId].amountTable[Object.keys(_productItemIdQueryTable)[items[key].ID - 1]] = {
              id: items[key].ID,
              // amountMax: items[key].AmountMax,
              amountMax: 4,
              amountAvailable: amountAvailable > 0 ? amountAvailable : 0,
              originalAmountAvailable: amountAvailable > 0 ? amountAvailable : 0,
              isSoldout: !(amountAvailable > 0)
            }
          }
          return _productInfo[productId];
        } else {
          alert(data.message);
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
   *  Get Order ID
   *
   *  @return {object} _orderId
   */
  getOrderId: function () {
    return _orderId;
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
      console.log(AppStore.getProductSelected());
      productItemAdd(AppStore.getProductSelected());
      console.log(AppStore.getProductSelected());
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

    default:
  }
});

module.exports = AppStore;
