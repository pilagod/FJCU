/**
 *  ProductDetail.react.js - Detail of Product
 */

var React = require('react');

var ProductDetail = React.createClass({
  render: function () {
    return (
      <section id="productDetail">
        <div id="productInstruction">
          <header className="flex flex-vertical-center">
            <i className="fa fa-file-text-o fa-lg"></i>
            <h2>產品說明</h2>
          </header>
          <article>
            <div>
              <i className="fa fa-circle"></i>
              <span>產地：台灣</span>
            </div>
            <div>
              <i className="fa fa-circle"></i>
              <span>主布材質：棉 100％</span>
            </div>
            <div>
              <i className="fa fa-circle"></i>
              <span>羅紋材質：棉 96％、彈性纖維 4％</span>
            </div>
            <div>
              <i className="fa fa-circle"></i>
              <span>不可烘乾／不可漂白／水溫請低於40℃</span>
            </div>
            <div>
              <i className="fa fa-circle"></i>
              <span>建議反面放入細網洗衣袋中清洗，深淺色請分開洗滌。</span>
            </div>
            <div>
              <i className="fa fa-circle"></i>
              <span>注意！實品顏色請以平拍單品照為準！</span>
            </div>
          </article>
        </div>
        <div className="banner">
          <img className="step-img" src="img/ProductApp/step1.png" alt="step1"></img>
        </div>
        <img src="img/ProductApp/product-detail.png" alt="product detail"></img>
      </section>
    )
  }
});

module.exports = ProductDetail;
