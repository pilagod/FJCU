/**
 *  AppConstant
 */

var keymirror = require('keymirror');

module.exports = keymirror({

  /*************************/
  /*    Event Constants    */
  /*************************/

  ORDER_CHANGE_EVENT: null,
  ORDER_CONFIRM_EVENT: null,
  ORDER_CONFIRM_FAIL_EVENT: null,

  PRODUCT_CHANGE_EVENT: null,
  PRODUCTINFO_CHANGE_EVENT: null,

  BUYERINFO_CHANGE_EVENT: null,

  SHOPPING_CART_NOTIFICATION_SHOW_EVENT: null,

  /*************************/
  /*     Select Actions    */
  /*************************/

  PRODUCT_UPDATE: null,

  /*************************/
  /*     Order Actions     */
  /*************************/

  PRODUCT_ITEM_ADD: null,
  PRODUCT_ITEM_DELETE: null,
  PRODUCT_ITEM_UPDATE: null,

  /*************************/
  /*     Buyer Actions     */
  /*************************/

  BUYERINFO_UPDATE: null,

  /*************************/
  /*   ProductInfo Action  */
  /*************************/

  PRODUCTINFO_UPDATE: null,
  PRODUCTINFO_AMOUNT_UPDATE: null

});
