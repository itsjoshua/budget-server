(this["webpackJsonpbudget-entry"]=this["webpackJsonpbudget-entry"]||[]).push([[0],{83:function(e,t,n){},85:function(e,t,n){},94:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),c=n(32),r=n.n(c),i=(n(83),n(30)),u=n.n(i),s=n(42),l=n(22),d=n(11),b=(n.p,n(85),n(146)),O=n(147),p=n(151),j=n(65),f=n.n(j),g=n(149),S=n(150),m=n(141),y=n(2);var h=function(){var e=["GPay","Card","Cash"],t=Object(a.useState)(!1),n=Object(d.a)(t,2),o=n[0],c=n[1],r=Object(a.useState)(!0),i=Object(d.a)(r,2),j=i[0],h=i[1],C=Object(a.useState)({}),v=Object(d.a)(C,2),x=v[0],_=v[1],E=Object(a.useState)([]),T=Object(d.a)(E,2),I=T[0],P=T[1],V=Object(a.useState)({mainCategorySelectedVal:"",subCategorySelectedVal:"",amountVal:"",modeOfPayment:e}),w=Object(d.a)(V,2),L=w[0],D=w[1],k=function(){var e=Object(s.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={date:(new Date).toLocaleDateString("en-GB"),categoryMain:L.mainCategorySelectedVal,categorySub:L.subCategorySelectedVal,amount:L.amountVal,mode:L.modeOfPayment,comment:""},e.next=3,fetch("/budget/submitSingleEntry",{method:"POST",body:JSON.stringify({budgetEntryObj:t}),headers:{"Content-Type":"application/json"}});case 3:e.sent&&((n=Object(l.a)({},L)).mainCategorySelectedVal="",n.subCategorySelectedVal="",n.amountVal="",n.modeOfPayment="",D(n));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();function G(){return N.apply(this,arguments)}function N(){return(N=Object(s.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o){e.next=2;break}return e.abrupt("return");case 2:return t={},e.next=5,fetch("/budget/categories");case 5:return n=e.sent,e.next=8,n.json();case 8:t=e.sent,_(t);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function A(){return(A=Object(s.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/v1/auth/google",{method:"POST",body:JSON.stringify({token:t.tokenId}),headers:{"Content-Type":"application/json"}});case 2:return n=e.sent,e.next=5,n.json();case 5:e.sent,h(!1),c(!0);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(a.useEffect)((function(){function e(){return(e=Object(s.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/budget/needsSignIn",{method:"POST"});case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,h(n.needsSignIn),n.needsSignIn||c(!0);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(a.useEffect)((function(){G()}),[o]),Object(y.jsxs)("div",{className:"App",children:[j&&Object(y.jsx)(f.a,{clientId:Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_GOOGLE_CLIENT_ID:"93692374627-igi73o54qm5f6n0ngo4ftpa66ld11f5o.apps.googleusercontent.com"}).GOOGLE_CLIENT_ID,buttonText:"Log in with Google",onSuccess:function(e){return A.apply(this,arguments)},onFailure:function(e){h(!0),c(!1)},cookiePolicy:"single_host_origin"}),console.log("************client side id***********: "+Object({NODE_ENV:"production",PUBLIC_URL:".",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_GOOGLE_CLIENT_ID:"93692374627-igi73o54qm5f6n0ngo4ftpa66ld11f5o.apps.googleusercontent.com"}).GOOGLE_CLIENT_ID),!j&&Object(y.jsx)(g.a,{maxWidth:"sm",children:Object(y.jsx)("div",{id:"content",children:Object(y.jsxs)(m.a,{spacing:5,children:[Object(y.jsx)("p",{children:"Budget-Entry"}),Object(y.jsx)(b.a,{id:"main-categories",options:Object.keys(x),freeSolo:!0,inputValue:L.mainCategorySelectedVal,style:{width:300},onInputChange:function(e,t,n){!function(e,t,n){var a=x[t];a||(a=[""]),P(a);var o=Object(l.a)({},L);o.subCategorySelectedVal="",o.mainCategorySelectedVal=t,D(o)}(0,t)},renderInput:function(e){return Object(y.jsx)(O.a,Object(l.a)(Object(l.a)({},e),{},{label:"Main Category",variant:"outlined"}))}}),Object(y.jsx)(b.a,{id:"sub-categories",options:I,inputValue:L.subCategorySelectedVal,onInputChange:function(e,t,n){!function(e,t,n){var a=Object(l.a)({},L);a.subCategorySelectedVal=t,D(a)}(0,t)},freeSolo:!0,style:{width:300},renderInput:function(e){return Object(y.jsx)(O.a,Object(l.a)(Object(l.a)({},e),{},{label:"Sub Category",variant:"outlined"}))}}),Object(y.jsx)(O.a,{id:"amount-val",label:"Amount",type:"number",value:L.amountVal,inputProps:{step:.01},onChange:function(e){!function(e){var t=Object(l.a)({},L);t.amountVal=e.target.value,D(t)}(e)},style:{width:300},InputLabelProps:{shrink:!0},variant:"outlined"}),Object(y.jsx)(b.a,{id:"mode-of-payment",options:e,inputValue:L.modeOfPayment,onInputChange:function(e,t,n){!function(e,t,n){var a=Object(l.a)({},L);a.modeOfPayment=t,D(a)}(0,t)},freeSolo:!0,style:{width:300},renderInput:function(e){return Object(y.jsx)(O.a,Object(l.a)(Object(l.a)({},e),{},{label:"Mode",variant:"outlined"}))}}),Object(y.jsx)(S.a,{sx:{width:300},children:Object(y.jsx)(p.a,{variant:"contained",color:"primary",size:"large",onClick:function(){k()},children:"Submit"})})]})})})]})},C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,153)).then((function(t){var n=t.getCLS,a=t.getFID,o=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),a(e),o(e),c(e),r(e)}))};r.a.render(Object(y.jsx)(o.a.StrictMode,{children:Object(y.jsx)(h,{})}),document.getElementById("root")),C()}},[[94,1,2]]]);
//# sourceMappingURL=main.de7f14ed.chunk.js.map