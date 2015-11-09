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

  /*************************/
  /* Product Select Action */
  /*************************/

  /**
   *  Action of Product Update
   *  @param {object} productInfo
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

  sendShoppingCartNotificationShowEvent: function () {
    AppDispatcher.dispatch({
      actionType: AppConstant.SHOPPING_CART_NOTIFICATION_SHOW_EVENT
    });
  },

  /*************************/
  /*    BuyerInfo Action   */
  /*************************/

  buyerInfoUpdate: function (buyerInfo) {
    AppDispatcher.dispatch({
      actionType: AppConstant.BUYERINFO_UPDATE,
      buyerInfo: buyerInfo
    });
  }
}

module.exports = AppAction;
