webpackJsonp([2],{146:function(e,r,n){"use strict";function t(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function o(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!==typeof r&&"function"!==typeof r?e:r}function i(e,r){if("function"!==typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}Object.defineProperty(r,"__esModule",{value:!0});var a=n(0),s=n.n(a),c=n(6),p=n(11),l=n(158),u=n.n(l),d=n(160),f=n(50),b=n(49),A=n(13),x=function(){function e(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(r,n,t){return n&&e(r.prototype,n),t&&e(r,t),r}}(),h=function(e){function r(){var e,n,i,a;t(this,r);for(var s=arguments.length,c=Array(s),p=0;p<s;p++)c[p]=arguments[p];return n=i=o(this,(e=r.__proto__||Object.getPrototypeOf(r)).call.apply(e,[this].concat(c))),i.state={loading:!0,orders:[]},a=n,o(i,a)}return i(r,e),x(r,[{key:"componentDidMount",value:function(){this.props.onFetchOrders(this.props.token,this.props.userId)}},{key:"render",value:function(){var e=s.a.createElement(b.a,null);return this.props.loading||(e=s.a.createElement("p",null,"No orders placed yet. Please make an order first!"),this.props.orders.length>0&&(e=this.props.orders.map(function(e){return s.a.createElement(d.a,{key:e.id,ingredients:e.ingredients,price:e.price})}))),s.a.createElement("div",{className:u.a},e)}}]),r}(a.Component),g=function(e){return{loading:e.order.loading,orders:e.order.orders,token:e.auth.token,userId:e.auth.userId}},m=function(e){return{onFetchOrders:function(r,n){return e(p.e(r,n))}}};r.default=Object(c.b)(g,m)(Object(f.a)(h,A.a))},158:function(e,r,n){var t=n(159);"string"===typeof t&&(t=[[e.i,t,""]]);var o={};o.transform=void 0;n(143)(t,o);t.locals&&(e.exports=t.locals)},159:function(e,r,n){r=e.exports=n(142)(!0),r.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"Orders.css",sourceRoot:""}])},160:function(e,r,n){"use strict";var t=n(0),o=n.n(t),i=n(161),a=n.n(i),s=function(e){var r=[];for(var n in e.ingredients)r.push(o.a.createElement("span",{style:{margin:"0 8px",padding:"5px",border:"1px solid #ccc",boxSizing:"border-box",display:"inline-block",textTransform:"capitalize"},key:n},n," (",e.ingredients[n],")"));return o.a.createElement("div",{className:a.a.Order},o.a.createElement("p",null,"Ingredients: ",r),o.a.createElement("p",null,"Price: ",o.a.createElement("strong",null,"USD ",e.price)))};r.a=s},161:function(e,r,n){var t=n(162);"string"===typeof t&&(t=[[e.i,t,""]]);var o={};o.transform=void 0;n(143)(t,o);t.locals&&(e.exports=t.locals)},162:function(e,r,n){r=e.exports=n(142)(!0),r.push([e.i,".Order__Order__2-sy4{width:100%;border:1px solid #eee;-webkit-box-shadow:0 2px 3px #ccc;box-shadow:0 2px 3px #ccc;padding:10px;margin:10px auto;-webkit-box-sizing:border-box;box-sizing:border-box}","",{version:3,sources:["C:/Users/Raphael/Google Drive/IT/JavaScript/React-Udemy/ReactDemoBurgerApp/src/components/Order/Order/Order.css"],names:[],mappings:"AAAA,qBACE,WAAY,AACZ,sBAAuB,AACvB,kCAAmC,AAC3B,0BAA2B,AACnC,aAAc,AACd,iBAAkB,AAClB,8BAA+B,AACvB,qBAAuB,CAChC",file:"Order.css",sourcesContent:[".Order {\r\n  width: 100%;\r\n  border: 1px solid #eee;\r\n  -webkit-box-shadow: 0 2px 3px #ccc;\r\n          box-shadow: 0 2px 3px #ccc;\r\n  padding: 10px;\r\n  margin: 10px auto;\r\n  -webkit-box-sizing: border-box;\r\n          box-sizing: border-box;\r\n}\r\n"],sourceRoot:""}]),r.locals={Order:"Order__Order__2-sy4"}}});
//# sourceMappingURL=2.35ddfe12.chunk.js.map