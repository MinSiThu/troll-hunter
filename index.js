!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e){class r{constructor(t){this.data=t,this.data.updateState=this.updateState,this.actions,this.templates}updateState(t,e){console.log(e),this[t]=e,document.querySelectorAll(`*[var=${t}]`).forEach(e=>{console.log(e,this[t]),e.innerHTML=this[t],console.log(e)})}init(){document.querySelectorAll("*[var]").forEach(t=>{let e=t.getAttribute("var");t.innerHTML=this.data[e]})}setActions(t){this.actions=t,document.querySelectorAll("*[on]").forEach(t=>{let e=t.getAttribute("on"),r=t.getAttribute("action");t.addEventListener(e,this.actions[r])})}setTemplates(t){if(this.templates=t,void 0!=this.templates){document.querySelectorAll("*[for]").forEach(t=>{let e=t.getAttribute("for"),r=t.getAttribute("template"),n=this.data[e].map((t,e)=>this.templates[r](t,e));t.innerHTML=n})}}}window&&(window.TrollHunter=r),t.exports=r}]);