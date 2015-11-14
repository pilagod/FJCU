/**
*  Side Bar
*/

var React = require('react');

var SideBar = React.createClass({
  render: function () {
    return (
      <ul>
        <li>
          <a target="_blank">認識輔大帽T</a>
        </li>
        <li>
          <a target="_blank">認識Ubun</a>
        </li>
        <li>
          <a target="_blank">校園電商我也要</a>
        </li>
        <li>
          <a target="_blank">找輔大活動 - Ubun Meet</a>
        </li>
        <li>
          <a target="_blank">加入Ubun</a>
        </li>
      </ul>
    )
  }
});

module.exports = SideBar;
