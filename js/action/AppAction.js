/**
 *  AppAction
 */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstant = require('../constant/AppConstant');

var AppAction = {

  /*************************/
  /*  Order Update Action  */
  /*************************/

  /**
   *  Add ProductItem to Order
   */
  productItemAdd: function () {
    AppDispatcher.dispatch({
      actionType: AppConstant.PRODUCT_ITEM_ADD,
    });
  },

  /**
   *  Delete ProductItem from Order
   *  @param {number} id: product item id
   */
  productItemDelete: function (id) {
    AppDispatcher.dispatch({
      actionType: AppConstant.PRODUCT_ITEM_DELETE,
      id: id
    });
  },

  /**
   *  Update ProductItem in Order
   *  @param {number} id: product item id
   *  @param {object} productInfo: properties updated
   */
  productItemUpdate: function (id, productInfo) {
    AppDispatcher.dispatch({
      actionType: AppConstant.PRODUCT_ITEM_UPDATE,
      productInfo: productInfo,
      id: id
    });
  },

  orderSend: function (orderInfo) {
    AppDispatcher.dispatch({
      actionType: AppConstant.ORDER_SEND,
      orderInfo: orderInfo
    });
  },

  /*************************/
  /* Product Select Action */
  /*************************/

  /**
   *  Action of Product Update
   *  @param {object} productInfo: properties updated
   */
  productUpdate: function (productInfo) {
    AppDispatcher.dispatch({
      actionType: AppConstant.PRODUCT_UPDATE,
      productInfo: productInfo
    });
  },

  /*************************/
  /*   Send Event Action   */
  /*************************/

  /**
   *  Send Shopping Cart Notification Show Event
   */
  sendShoppingCartNotificationShowEvent: function () {
    AppDispatcher.dispatch({
      actionType: AppConstant.SHOPPING_CART_NOTIFICATION_SHOW_EVENT
    });
  },

  /*************************/
  /*    BuyerInfo Action   */
  /*************************/

  /**
   *  Action of BuyerInfo Update
   *  @param {object} buyerInfo: properties updated
   */
  buyerInfoUpdate: function (buyerInfo) {
    AppDispatcher.dispatch({
      actionType: AppConstant.BUYERINFO_UPDATE,
      buyerInfo: buyerInfo
    });
  },

  /*************************/
  /*   ProductInfo Action  */
  /*************************/

  /**
   *  Action of ProductInfo Update
   *  @param {object} productInfo: properties updated
   */
  productInfoUpdate: function (productInfo) {
    AppDispatcher.dispatch({
      actionType: AppConstant.PRODUCTINFO_UPDATE,
      productInfo: productInfo
    })
  },

  /**
   *  Action of ProductInfo Amount Update
   *  @param {object} amountInfo: properties updated
   */
  productInfoAmountUpdate: function (productItemKey, amountInfo) {
    AppDispatcher.dispatch({
      actionType: AppConstant.PRODUCTINFO_AMOUNT_UPDATE,
      productItemKey: productItemKey,
      amountInfo: amountInfo
    });
  },

  /*************************/
  /*    Clear All Action   */
  /*************************/

  /**
   *  Clear All Store Data Related to Order
   */
  clearAll: function () {
    AppDispatcher.dispatch({
      actionType: AppConstant.CLEAR_ALL
    });
  },

  clearProductInfoAmountTable: function () {
    AppDispatcher.dispatch({
      actionType: AppConstant.CLEAR_PRODUCTINFO_AMOUNT_TABLE
    });
  }
};

module.exports = AppAction;
