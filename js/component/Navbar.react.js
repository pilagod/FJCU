/**
 *  Navbar Component
 */

var React = require('react'),
    assign = require('object-assign'),
    classNames = require('classnames'),
    AppStore = require('../store/AppStore.js'),
    AppConstant = require('../constant/AppConstant.js');

function getOrderState() {
  return {
    productItems: AppStore.getOrderProductItem()
  }
}

var timeoutObject;

var NavbarFunctionBlock = React.createClass({

  getInitialState: function () {
    var orderState = getOrderState();
    return assign({}, orderState, {
      shoppingCartHover: false,
      shoppingCartAdd: false,
      check: (Object.keys(orderState.productItems).length > 0)
    });
  },

  componentDidMount: function () {
    AppStore.addChangeListener(AppConstant.ORDER_CHANGE_EVENT, this._onOrderChange);
    AppStore.addChangeListener(AppConstant.SHOPPING_CART_NOTIFICATION_SHOW_EVENT, this._onProductAddToShoppingCart);
    AppStore.addChangeListener(AppConstant.CLEAR_ALL_EVENT, this._onOrderChange);
  },

  componentWillUnmount: function () {
    AppStore.removeChangeListener(AppConstant.ORDER_CHANGE_EVENT, this._onOrderChange);
    AppStore.removeChangeListener(AppConstant.SHOPPING_CART_NOTIFICATION_SHOW_EVENT, this._onProductAddToShoppingCart);
    AppStore.removeChangeListener(AppConstant.CLEAR_ALL_EVENT, this._onOrderChange);
  },

  render: function () {
    var shoppingCartHeader, shoppingCartHeaderClassName;
    var productItemNum = (function () {
      var num = 0,
      productItems = this.state.productItems;

      for (var i in productItems) {
        num += productItems[i].num;
      }

      return num;
    }.bind(this)());

    var shoppingCartAlertClassNames = classNames({
      "shoppingCartAlertShow": this.state.shoppingCartHover,
      "shoppingCartAlertNotificationShow": this.state.shoppingCartAdd
    });
    var checkButtonClassNames = classNames({
      "checkButtonShow": (this.state.shoppingCartHover && this.state.check)
    });

    var shoppingCartAlertContent = null;
    // Shopping Cart Hover
    if (this.state.shoppingCartHover) {
      var productItems = null;
      if (Object.keys(this.state.productItems).length > 0) {
        shoppingCartHeader = "已加入購物車商品（尚未折扣）";
        productItems = [];
        for (var key in this.state.productItems) {
          productItems.push((
            <div key={key} className="table-row">
              <div className="table-cell">
                <img src={this.state.productItems[key].image}></img>
              </div>
              <div className="table-cell">
                <span>{this.state.productItems[key].productName}</span>
              </div>
              <div className="table-cell">
                <span>{this.state.productItems[key].colorName + "-" + this.state.productItems[key].size}</span>
              </div>
              <div className="table-cell">
                <span>{this.state.productItems[key].num + "件"}</span>
              </div>
              <div className="table-cell">
                <span>{"NT$" + this.state.productItems[key].total}</span>
              </div>
            </div>
          ));
        }
      } else {
        shoppingCartHeader = "購物車內目前沒有商品";
        shoppingCartHeaderClassName = "empty";
      }

      shoppingCartAlertContent = (
        <div id="shoppingCartAlertContent" >
          <div id="checkButton" className={checkButtonClassNames} onClick={this._checkOnClick}>
            <span>結帳</span>
          </div>
          <header className={shoppingCartHeaderClassName}>
            <span>{shoppingCartHeader}</span>
          </header>
          <article className="table">
            {productItems}
          </article>
        </div>
      )
      // Shopping Cart Add
    } else if (this.state.shoppingCartAdd) {
      // var productSelected = AppStore.getProductSelected();
      shoppingCartAlertContent = (
        <div id="shoppingCartAlertNotification" className="flex flex-horizontal-center flex-vertical-center">
          <header>商品已加入購物車</header>
          <div className="triangle-right"></div>
       </div>
     );
   }

   return (
     <div className="container flex flex-vertical-bottom">
       <div id="logo" className="flex flex-horizontal-center flex-vertical-center" onClick={this._homeOnClick} style={{cursor: "pointer"}}>
         <img src="img/ubun-logo.svg" alt="Ubun Logo"/>
       </div>
       <div id="navbarFunctionBlock" className="flex flex-align-right">
         <div className="navbar-wrapper">
           <div>
             <div>
               <i className="fa fa-circle"></i>
               <span>
                 <a href="https://docs.google.com/forms/d/1DzL5GV7Qe1K3e9jYjuZwPmuB0Z2Jm35Bj9Oo_W52k44/viewform?c=0&w=1" target="_blank">我也要賣</a>
               </span>
             </div>
           </div>
           <div>
             <div>
               <i className="fa fa-circle"></i>
               <span>
                 <a href="https://www.facebook.com/ubun.tw/?fref=ts" target="_blank">關於Ubun</a>
               </span>
             </div>
           </div>
           <div>
             <div>
               <i className="fa fa-circle"></i>
               <span>
                 <a href="https://docs.google.com/forms/d/175-NO-BZVa1qlpYWyrl1B6IVRnxhgdu5miDNPwqQe7Q/viewform?usp=send_form" target="_blank">加入Ubun</a>
               </span>
             </div>
           </div>
           <div>
             <div>
               <i className="fa fa-circle"></i>
               <span>
                 <a href="https://www.facebook.com/FJUClassic/?fref=ts" target="_blank">關於輔大帽T</a>
               </span>
             </div>
           </div>
           <div id="searchOrder">
             <div onClick={this._searchOnClick}>
               <i className="fa fa-search"></i>
               <span>搜尋訂單</span>
             </div>
           </div>
           <div id="faq">
             <div>
               <i className="fa fa-question-circle"></i>
               <span>常見問題</span>
             </div>
           </div>
           <div id="shoppingCart" onMouseOver={this._shoppingCartOnMouseOver} onMouseOut={this._shoppingCartOnMouseOut}>
             <div>
               <i className="fa fa-shopping-cart"></i>
               <span>{productItemNum} 件商品</span>
             </div>
             <div id="shoppingCartAlert" className={shoppingCartAlertClassNames}>
               {shoppingCartAlertContent}
             </div>
           </div>
         </div>
       </div>
     </div>

   )
  },

  /*************************/
  /*   Html Event Handler  */
  /*************************/

  _shoppingCartOnMouseOver: function () {
    if (!this.state.shoppingCartAdd){
      clearTimeout(timeoutObject);
      this.setState({shoppingCartHover: true});
    }
  },

  _shoppingCartOnMouseOut: function () {
    if (!this.state.shoppingCartAdd){
      timeoutObject = setTimeout(function () {
        this.setState({shoppingCartHover: false});
      }.bind(this), 200);
    }
  },

  /*************************/
  /*     Redirect App      */
  /*************************/

  _homeOnClick: function () {
    history.pushState({app: "ProductApp"}, "ProductApp", "");
    window.onpopstate();
  },

  _checkOnClick: function () {
    if (Object.keys(this.state.productItems).length > 0) {
      history.pushState({app: "OrderApp"}, "OrderApp", "");
      window.onpopstate();
    } else {
      alert("目前購物車內沒有商品，\n請先選購商品再進行結帳。");
    }
    clearTimeout(timeoutObject);
    this.setState({shoppingCartHover: false});
    this.setState({shoppingCartAdd: false});
  },

  _searchOnClick: function () {
    history.pushState({app: "SearchApp"}, "SearchApp", "");
    window.onpopstate();
  },

  /*************************/
  /*  View Change Handler  */
  /*************************/

  _onOrderChange: function () {
    var orderState = getOrderState();
    this.setState(assign({}, orderState, {
      check: (Object.keys(orderState.productItems).length > 0)
    }));
  },

  _onProductAddToShoppingCart: function () {
    clearTimeout(timeoutObject);
    this.setState({shoppingCartAdd: true});
    timeoutObject = setTimeout(function () {
      this.setState({shoppingCartAdd: false});
    }.bind(this), 1000);
  }
});

module.exports = NavbarFunctionBlock;
