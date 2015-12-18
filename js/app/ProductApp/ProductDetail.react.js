/**
 *  ProductDetail.react.js - Detail of Product
 */

var React = require('react');

var ProductDetail = React.createClass({
  render: function () {
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
        <img src="http://imgur.com/0FWT2h9.png" alt="product detail 1"></img>
        <img src="http://imgur.com/OLLSZ76.png" alt="product detail 2-1"></img>
        <img src="http://imgur.com/w3GtZ5a.png" alt="product detail 2-2"></img>
        <img src="http://imgur.com/mGRTeyS.png" alt="product detail 3"></img>
        <img src="http://imgur.com/3dyR6m6.png" alt="product detail 4"></img>
        <img src="http://imgur.com/IC5OJML.png" alt="product detail 5"></img>
        <img src="http://imgur.com/c2vtGHL.png" alt="product detail 6"></img>
      </section>
    )
  }
});



module.exports = ProductDetail;
