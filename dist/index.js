"use strict";function r(r,e){return r=parseInt(r),2===(e=parseInt(e))?function(r){return r%100!=0&&r%4==0||r%400==0}(r)?29:28:[4,6,9,11].indexOf(e)>=0?30:31}function e(r){return r=(r=(r=String(r))?parseInt(r.replace(/^0+/g,"")):"")||0,r+=""}function u(r,e,u){var n=0;return"上午"===u?n=Number(r)-Number(e)+1:"下午"===u&&(n=Number(r)-Number(e)+.5),Number(n)}function n(r,e){var u=0;return"上午"===e?u=r-.5:"下午"===e&&(u=r),Number(u)}module.exports=function(t,o){if(!t||!o)return 0;var i,f,m=t.split(" "),b=o.split(" "),N=m[0],c=b[0],s=N.split("-"),a=c.split("-"),l=s[0],p=s[1],v=s[2],g=m[1],h=a[0],d=a[1],x=a[2],I=b[1],E=r(l,p),F=0;if(l===h)if(p===d)v===x?F=function(r,e){var u=0;return r===e?u=.5:"上午"===r&&"下午"===e?u=1:"下午"===r&&"上午"===e&&console.log("您选择的时间有误"),u}(g,I):v<x?F=function(r,e,u,n){var t=0;return u===n?t=e-r+.5:"上午"===u&&"下午"===n?t=e-r+1:"下午"===u&&"上午"===n&&(t=e-r),t}(v,x,g,I):console.log("结束时间的天不对");else if(p<d){var O=(i=u(E,v,g),f=n(x,I),Number(i)+Number(f)||0),S=function(){for(var u=[],n=Number(e(p));n<=Number(e(d));n++)u.push(n);var t=0;return u.length>2&&(u.pop(),u.shift(),u.forEach((function(e){t=Number(t)+Number(r(l,e))}))),(Number(0)+Number(t)).toFixed(1)}();F=Number(O)+Number(S)}else console.log("结束时间的月份不对");else if(l<h){var j=function(){for(var n=u(E,v,g),t=0,o=Number(e(p))+1;o<=12;o++)t=Number(t)+Number(r(l,o));return Number(n)+Number(t)||0}(),k=function(){for(var u=0,t=n(x,I),o=1;o<e(d);o++)u=Number(u)+Number(r(h,o));return Number(u)+Number(t)}(),q=function(){var e=0;if(h-l>1){for(var u=[],n=void 0;n<h;n++)u.push(n);u.pop(),u.shift(),u.forEach((function(u){for(var n=1;n<=12;n++)e+=r(u,n)}))}return e}();F=Number(j)+Number(k)+Number(q)}else console.log("结束时间的年份不对");return F};