(this["webpackJsonpphoto-app"]=this["webpackJsonpphoto-app"]||[]).push([[0],{32:function(n,t,e){},35:function(n,t,e){},39:function(n,t,e){"use strict";e.r(t);var o=e(2),r=e(4),i=e.n(r),c=e(20),a=e.n(c),u=(e(32),e(9)),s=e(5),l=e(6);function f(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: center;\n"]);return f=function(){return n},n}function d(){var n=Object(s.a)(["\n    display: flex;\n    flex-direction: column;\n"]);return d=function(){return n},n}function h(){var n=Object(s.a)(["\n    color: white;\n"]);return h=function(){return n},n}function j(){var n=Object(s.a)(["\n    display:inline-block;\n    padding: 0.35em 1.2em;\n    border: 0.1em solid #FFFFFF;\n    margin: 0 0.3em 0.3em 0;\n    border-radius:0.12em;\n    box-sizing: border-box;\n    text-decoration:none;\n    font-weight:300;\n    color:#FFFFFF;\n    text-align:center;\n    transition: all 0.2s;\n    background-color: transparent;\n    width: 120px;\n    font-size: 20px;\n    transition: color 300ms;\n    transition: background-color 350ms;\n\n    &:hover{\n        background-color: white;\n        color: black;\n        cursor: pointer;\n    }\n"]);return j=function(){return n},n}function p(){var n=Object(s.a)(["\n    width: 400px;\n    height: 30px;\n    font-size: 20px;\n    transition: height 500ms;\n\n    &:focus {\n        height: 40px;\n    }\n"]);return p=function(){return n},n}l.a.input(p());var b=l.a.button(j()),m=(l.a.div(h()),l.a.div(d()),l.a.div(f()),e(17)),x=(e(34),m.a.initializeApp({apiKey:"AIzaSyDdoQaGgfQzmsXKHgytAROdzRjVaw_wE3M",authDomain:"photos-634e7.firebaseapp.com",databaseURL:"https://photos-634e7.firebaseio.com",projectId:"photos-634e7",storageBucket:"photos-634e7.appspot.com",messagingSenderId:"23335646481",appId:"1:23335646481:web:f6d39ff77620ebd80388b0",measurementId:"G-K4NLQYSDWM"}).firestore());m.a;function O(){var n=Object(s.a)(["\n    cursor: pointer;\n    -webkit-touch-callout: none; \n    -webkit-user-select: none; \n    -khtml-user-select: none; \n    -moz-user-select: none; \n    -ms-user-select: none; \n    user-select: none; \n"]);return O=function(){return n},n}function v(){var n=Object(s.a)(["\n    width: 90%;\n    padding: 0;\n    margin: 0;\n    list-style-type: none;\n    color: whitesmoke;\n    display: flex;\n    justify-content: space-between;\n    font-size: 25px;\n"]);return v=function(){return n},n}function g(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n"]);return g=function(){return n},n}var w=l.a.div(g()),I=l.a.ul(v()),y=l.a.li(O()),P=function(n){var t=function(t){var e=[];x.collection("posts").where("continent","==",t).get().then((function(t){t.docs.forEach((function(n){e.push(n.data())})),console.log(e),n.setHomePhotoInformation(e)}))};return Object(o.jsxs)(w,{className:"test",children:[Object(o.jsxs)(I,{children:[Object(o.jsx)(y,{onClick:function(){return t("North America")},children:"NORTH AMERICA"}),Object(o.jsx)(y,{onClick:function(){return t("South America")},children:"SOUTH AMERICA"}),Object(o.jsx)(y,{onClick:function(){return t("Europe")},children:"EUROPE"}),Object(o.jsx)(y,{onClick:function(){return t("Oceania")},children:"OCEANIA"}),Object(o.jsx)(y,{onClick:function(){return t("Asia")},children:"ASIA"}),Object(o.jsx)(y,{onClick:function(){return t("Africa")},children:"AFRICA"})]}),n.user?Object(o.jsx)(b,{onClick:function(){return n.setPageRoute("Profile")},children:"Profile"}):null]})};function k(){var n=Object(s.a)(["\n    -webkit-overflow-scrolling: touch;\n    height: 90vh;\n    overflow-Y: scroll;\n"]);return k=function(){return n},n}var A=l.a.div(k()),C=function(n){return Object(o.jsx)(A,{children:n.children})};function R(){var n=Object(s.a)(["\n    height: 300px;\n    width: auto;\n    padding-right: 10px;\n    cursor: pointer;\n"]);return R=function(){return n},n}function H(){var n=Object(s.a)(["\n    overflow-x: scroll;\n    display: flex;\n    -webkit-overflow-scrolling: touch;\n"]);return H=function(){return n},n}function S(){var n=Object(s.a)(["\n    color: white;\n    cursor: pointer;\n"]);return S=function(){return n},n}function E(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-end;\n"]);return E=function(){return n},n}function z(){var n=Object(s.a)(["\n    color: white;\n    font-size: 25px\n"]);return z=function(){return n},n}var F=l.a.div(z()),N=l.a.div(E()),G=l.a.div(S()),L=l.a.div(H()),T=l.a.img(R()),B=function(n){return Object(o.jsx)("div",{children:Object(o.jsx)(T,{onClick:function(){return n.setPhotoInformation(n.info)},className:"grid-item",alt:"",src:n.url})})},M=function(n){return Object(o.jsx)("div",{children:n.photos?Object(o.jsxs)("div",{children:[Object(o.jsxs)(N,{children:[Object(o.jsx)(F,{children:n.title}),Object(o.jsx)(G,{onClick:function(){var t=[];x.collection("posts").where(n.place,"==",n.placeName).get().then((function(e){e.docs.forEach((function(n){t.push(n.data())})),n.setHomePhotoInformation(t),n.setPageRoute("GetPhotos")}))},children:"See more"})]}),Object(o.jsx)(L,{children:n.photos.map((function(t,e){return t.image!==n.photoInformation.image?Object(o.jsx)(B,{getCountries:n.getCountries,setPhotoInformation:n.setPhotoInformation,setHomePhotoInformation:n.setHomePhotoInformation,info:t,url:t.image},e):null}))})]}):null})},D=e(26);function K(){var n=Object(s.a)(["\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    font-size: 18px;\n    cursor: pointer;\n    height: 30px;\n    &:hover {\n        background-color: gray;\n    }\n"]);return K=function(){return n},n}function Q(){var n=Object(s.a)(["\n    width: 250px;\n    background-color: black;\n    position: absolute;\n"]);return Q=function(){return n},n}var U=l.a.div(Q()),J=l.a.div(K()),Y=function(n){return Object(o.jsxs)(J,{className:"dropdown",onClick:function(){x.collection("users").doc(n.user).collection("collections").doc(n.collection).collection(n.collection).doc(n.photoInformation.id).set(Object(D.a)({},n.photoInformation)).then(null)},children:[Object(o.jsx)("div",{className:"dropdown",children:n.collection}),n.isAdded[n.index]?Object(o.jsx)("div",{className:"dropdown",onClick:function(){var t=n.isAdded;t[t[n.index]]=!1,n.setIsAdded(t)},children:"Remove"}):Object(o.jsx)("div",{className:"dropdown",onClick:function(){n.isAdded[n.index]=!0,n.setIsAdded([!0,!0])},children:"Add"})]})},V=function(n){var t,e=Object(r.useState)([!1,!1]),i=Object(u.a)(e,2),c=i[0],a=i[1];Array(2).fill(!1);return Object(o.jsx)(U,{children:null===(t=n.collectionsList)||void 0===t?void 0:t.map((function(t,e){return Object(o.jsx)(Y,{setIsAdded:a,isAdded:c,index:e,className:"dropdown",user:n.user,photoInformation:n.photoInformation,collection:t},e)}))})};function W(){var n=Object(s.a)(["\n    height: 500px;\n    width: auto;\n    position: relative;\n"]);return W=function(){return n},n}function X(){var n=Object(s.a)(["\n    width: 60vw;\n    height: 40px;\n    font-size: 20px;\n"]);return X=function(){return n},n}function _(){var n=Object(s.a)(["\n    width: 60vw;\n    height: 150px;\n    font-size: 20px;\n"]);return _=function(){return n},n}function q(){var n=Object(s.a)(["\n    width: 60vw;\n    height: 40px;\n    font-size: 20px;\n"]);return q=function(){return n},n}function Z(){var n=Object(s.a)(["\n    width: 100%;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n"]);return Z=function(){return n},n}function $(){var n=Object(s.a)(["\n    display: flex;\n    justify-content: center;\n"]);return $=function(){return n},n}function nn(){var n=Object(s.a)(["\n    color: white;\n    background-color: #141414;\n    border: none;\n    width: 120px;\n    height: 50px;\n    cursor: pointer;\n    transition: background-color 400ms;\n\n    &:hover {\n        background-color: #212121;\n        /* color: grey; */\n    }\n"]);return nn=function(){return n},n}var tn=l.a.button(nn());l.a.div($()),l.a.form(Z()),l.a.input(q()),l.a.textarea(_()),l.a.select(X()),l.a.img(W());function en(){var n=Object(s.a)(["\n    color: white;\n    padding: 0 350px;\n    display: flex;\n    justify-content: center;\n    font-size: 20px;\n    white-space: pre-wrap;\n"]);return en=function(){return n},n}function on(){var n=Object(s.a)(["\n    color: white;\n    display: flex;\n    justify-content: center;\n"]);return on=function(){return n},n}function rn(){var n=Object(s.a)(["\n    width: 800px;\n    /* display: flex;\n    justify-content: center; */\n"]);return rn=function(){return n},n}function cn(){var n=Object(s.a)(["\n    color: white;\n    display: flex;\n    justify-content: center;\n"]);return cn=function(){return n},n}function an(){var n=Object(s.a)(["\n    display: flex;\n    /* flex-direction: column; */\n    justify-content: center;\n"]);return an=function(){return n},n}function un(){var n=Object(s.a)(["\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n"]);return un=function(){return n},n}function sn(){var n=Object(s.a)(["\n    display: flex;\n    flex-direction: column;\n"]);return sn=function(){return n},n}var ln=l.a.div(sn()),fn=l.a.div(un()),dn=l.a.div(an()),hn=l.a.div(cn()),jn=l.a.img(rn()),pn=l.a.div(on()),bn=l.a.div(en()),mn=function(n){var t=Object(r.useState)([]),e=Object(u.a)(t,2),i=e[0],c=e[1],a=Object(r.useState)(null),s=Object(u.a)(a,2),l=s[0],f=s[1],d=Object(r.useState)([]),h=Object(u.a)(d,2),j=h[0],p=h[1],b=Object(r.useState)([]),m=Object(u.a)(b,2),O=m[0],v=m[1],g=n.photoInformation,w=g.city,I=g.continent,y=g.country,P=function(){var n=x.collection("posts").where("continent","==",I).where("country","==",y);n.where("city","==",w).get().then((function(n){var t=[];n.forEach((function(n){t.push(n.data())})),v(t)})),n.get().then((function(n){var t=[];n.docs.forEach((function(n){t.push(n.data())})),p(t)})),window.scrollTo({top:0})};Object(r.useEffect)(P,[w,I,y]);return window.onclick=function(n){n.target.matches(".dropdown")||f(!1)},Object(o.jsxs)("div",{children:[Object(o.jsx)(tn,{onClick:function(){return n.setPageRoute("GetPhotos")},children:"Back"}),Object(o.jsx)(dn,{children:Object(o.jsxs)(ln,{children:[Object(o.jsx)(hn,{children:n.photoInformation.title}),Object(o.jsx)(dn,{children:Object(o.jsxs)(fn,{children:[Object(o.jsx)(jn,{alt:"display",src:n.photoInformation.image}),Object(o.jsxs)("div",{children:[Object(o.jsx)(tn,{className:"dropdown",onClick:function(){f(!l),0===(null===i||void 0===i?void 0:i.length)&&x.collection("users").doc(n.user).get().then((function(n){c(Object.keys(n.data()))}))},children:Object(o.jsx)("div",{className:"dropdown",children:"Add to collection"})}),l?Object(o.jsx)(V,{className:"dropdown",photoInformation:n.photoInformation,user:n.user,collectionsList:i}):null]})]})}),Object(o.jsx)(pn,{children:n.photoInformation.author}),Object(o.jsx)(bn,{children:n.photoInformation.description})]})}),Object(o.jsx)(M,{getCountries:P,setHomePhotoInformation:n.setHomePhotoInformation,setPageRoute:n.setPageRoute,placeName:n.photoInformation.city,place:"city",title:n.photoInformation.city,photoInformation:n.photoInformation,photos:O,setPhotoInformation:n.setPhotoInformation}),Object(o.jsx)(M,{setHomePhotoInformation:n.setHomePhotoInformation,setPageRoute:n.setPageRoute,placeName:n.photoInformation.country,place:"country",title:n.photoInformation.country,setPhotoInformation:n.setPhotoInformation,photos:j,photoInformation:n.photoInformation})]})};e(35);function xn(){var n=Object(s.a)(["\n    width: ",";\n\n    @media(max-width: 520px) {\n        width: 40vw;\n    }\n\n    @media(max-width: 400px) {\n        width: 90vw;\n    }\n\n    cursor: pointer;\n    animation: fadeIn ease 3s;\n    -webkit-animation: fadeIn ease 3s;\n    -moz-animation: fadeIn ease 3s;\n    -o-animation: fadeIn ease 3s;\n    -ms-animation: fadeIn ease 3s;\n    \n    @keyframes fadeIn {\n        0% {opacity:0;}\n        100% {opacity:1;}\n    }\n\n    @-moz-keyframes fadeIn {\n        0% {opacity:0;}\n        100% {opacity:1;}\n    }\n\n    @-webkit-keyframes fadeIn {\n        0% {opacity:0;}\n        100% {opacity:1;}\n    }\n\n    @-o-keyframes fadeIn {\n        0% {opacity:0;}\n        100% {opacity:1;}\n    }\n\n    @-ms-keyframes fadeIn {\n        0% {opacity:0;}\n        100% {opacity:1;}\n    }\n"]);return xn=function(){return n},n}function On(){var n=Object(s.a)(["\n    margin: 0 15px;\n    margin-left: 35px;\n"]);return On=function(){return n},n}var vn=l.a.div(On()),gn=l.a.img(xn(),(function(n){return n.width})),wn=e(24),In=e.n(wn),yn=function(n){Object(r.useEffect)((function(){n.grid()}),[]);return Object(o.jsx)("div",{children:Object(o.jsx)("a",{href:n.url,children:Object(o.jsx)(gn,{width:"30vw",onClick:function(){n.setPageRoute("PhotoFeatured"),n.setPhotoInformation(n.photoInfo)},className:"grid-item",alt:"",src:n.photoInfo.image})})})},Pn=function(n){var t=n.setHomePhotoInformation,e=n.homePhotoInformation;Object(r.useEffect)((function(){(window.scrollTo({top:0}),e)||x.collection("posts").get().then((function(n){var e=[];n.docs.forEach((function(n){e.push(n.data())})),t(e),console.log("running")}))}),[t,e]);var i=function(){var n=document.getElementById("grid");In()({container:n,columns:2,trueOrder:!1,breakAt:{1500:3,520:2,400:1}})};return Object(o.jsx)("div",{children:Object(o.jsx)(vn,{children:Object(o.jsx)("div",{id:"grid",children:n.homePhotoInformation?n.homePhotoInformation.map((function(t,e){return Object(o.jsx)(yn,{setPageRoute:n.setPageRoute,setPhotoInformation:n.setPhotoInformation,grid:i,photoInfo:t},e)})):null})})})};function kn(){var n=Object(s.a)(["\n    color: white;\n    font-size: 20px;\n"]);return kn=function(){return n},n}function An(){var n=Object(s.a)(["\n    margin: 20px;\n    cursor: pointer;\n"]);return An=function(){return n},n}function Cn(){var n=Object(s.a)(["\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n"]);return Cn=function(){return n},n}function Rn(){var n=Object(s.a)(["\n    object-fit: cover;\n    height: 180px;\n    width: 180px;\n    border-radius: 50%;\n"]);return Rn=function(){return n},n}function Hn(){var n=Object(s.a)(["\n    color: white;\n    font-size: 25px;\n"]);return Hn=function(){return n},n}var Sn=l.a.div(Hn());l.a.img(Rn()),l.a.div(Cn()),l.a.div(An()),l.a.div(kn());function En(){var n=Object(s.a)(["\n    display: flex;\n    flex-wrap: wrap;\n"]);return En=function(){return n},n}function zn(){var n=Object(s.a)(["\n    display: flex;\n    flex-wrap: wrap;\n    max-height: 270px;\n    max-width: 270px;\n    overflow: hidden;\n    cursor: pointer;\n"]);return zn=function(){return n},n}function Fn(){var n=Object(s.a)(["\n    height: ",";\n    width: ",";\n"]);return Fn=function(){return n},n}var Nn=l.a.img(Fn(),(function(n){return n.height}),(function(n){return n.width})),Gn=l.a.div(zn()),Ln=l.a.div(En()),Tn=function(n){var t=n.collection[1].length,e=n.collection;return Object(o.jsxs)("div",{children:[Object(o.jsx)(Sn,{children:n.collection[0]}),Object(o.jsxs)(Gn,{onClick:function(){x.collection("users").doc(n.user).collection("collections").doc(n.collection[0]).collection(n.collection[0]).get().then((function(t){var e=[];t.docs.forEach((function(n){e.push(n.data())})),n.setHomePhotoInformation(e),n.setPageRoute("GetPhotos")}))},children:[Object(o.jsx)(Nn,{height:Dn[t].height[1],width:Dn[t].width[1],src:e[1][0],alt:"placeholder"},"1"),Object(o.jsx)(Nn,{height:Dn[t].height[2],width:Dn[t].width[2],src:e[1][1],alt:"placeholder"},"2"),Object(o.jsx)(Nn,{height:Dn[t].height[3],width:Dn[t].width[3],src:e[1][2],alt:"placeholder"},"3"),Object(o.jsx)(Nn,{height:Dn[t].height[4],width:Dn[t].width[4],src:e[1][3],alt:"placeholder"},"4")]})]})},Bn=270,Mn=135,Dn={1:{height:{1:Bn},width:{1:Bn}},2:{height:{1:Mn,2:Mn},width:{1:Bn,2:Bn}},3:{height:{1:Mn,2:Mn,3:Mn},width:{1:Mn,2:Mn,3:Bn}},4:{height:{1:Mn,2:Mn,3:Mn,4:Mn},width:{1:Mn,2:Mn,3:Mn,4:Mn}}},Kn=function(n){var t=Object(r.useState)(null),e=Object(u.a)(t,2),i=e[0],c=e[1];return Object(r.useEffect)((function(){n.user&&x.collection("users").doc(n.user).get().then((function(n){c(Object.entries(n.data()))}))}),[n.user]),Object(o.jsx)(Ln,{children:null===i||void 0===i?void 0:i.map((function(t,e){return Object(o.jsx)(Tn,{user:n.user,setHomePhotoInformation:n.setHomePhotoInformation,setPageRoute:n.setPageRoute,collection:t},e)}))})};function Qn(){var n=Object(s.a)(["\n    list-style-type: none;\n    display: flex;\n    justify-content: space-between;\n    padding: 0;\n"]);return Qn=function(){return n},n}var Un=l.a.ul(Qn()),Jn=function(n){return Object(o.jsxs)("div",{children:[Object(o.jsx)("div",{style:{width:"50%"},children:Object(o.jsxs)(Un,{children:[Object(o.jsx)(y,{children:"Collections"}),Object(o.jsx)(y,{children:"Posts"}),Object(o.jsx)(y,{children:"Settings"})]})}),Object(o.jsx)(Kn,{setHomePhotoInformation:n.setHomePhotoInformation,setPageRoute:n.setPageRoute,user:n.user})]})},Yn=e(25),Vn=function(){var n=Object(r.useState)(),t=Object(u.a)(n,2),e=t[0],i=t[1],c=Object(r.useState)(null),a=Object(u.a)(c,2),s=a[0],l=a[1],f=Object(r.useState)(null),d=Object(u.a)(f,2),h=d[0],j=d[1],p=Object(r.useState)("GetPhotos"),b=Object(u.a)(p,2),m=b[0],x=b[1];return Object(r.useEffect)((function(){Yn.a.auth().onAuthStateChanged((function(n){n&&i(n.uid)}))}),[]),Object(o.jsxs)("div",{children:["GetPhotos"===m?Object(o.jsx)(P,{setHomePhotoInformation:l,setPageRoute:x,user:e}):null,function(){switch(m){case"GetPhotos":return Object(o.jsx)(C,{children:Object(o.jsx)(Pn,{homePhotoInformation:s,setHomePhotoInformation:l,setPageRoute:x,setPhotoInformation:j})});case"PhotoFeatured":return Object(o.jsx)(mn,{user:e,setHomePhotoInformation:l,setPageRoute:x,setPhotoInformation:j,photoInformation:h});case"Profile":return Object(o.jsx)(Jn,{setHomePhotoInformation:l,setPhotoInformation:j,user:e,setPageRoute:x});default:return null}}()]})},Wn=function(n){n&&n instanceof Function&&e.e(3).then(e.bind(null,40)).then((function(t){var e=t.getCLS,o=t.getFID,r=t.getFCP,i=t.getLCP,c=t.getTTFB;e(n),o(n),r(n),i(n),c(n)}))};a.a.render(Object(o.jsx)(i.a.StrictMode,{children:Object(o.jsx)(Vn,{})}),document.getElementById("root")),Wn()}},[[39,1,2]]]);
//# sourceMappingURL=main.31abcb26.chunk.js.map